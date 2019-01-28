//
//  CFRunLoop_Timer_create.c
//  CF
//
//  Created by 王举范 on 2019/1/7.
//  Copyright © 2019年 wangjufan. All rights reserved.
//

#include "CFRunLoop_Timer_create.h"

CFRunLoopTimerRef CFRunLoopTimerCreate(CFAllocatorRef allocator,
                                       CFAbsoluteTime fireDate,
                                       CFTimeInterval interval,
                                       CFOptionFlags flags,
                                       CFIndex order,
                                       CFRunLoopTimerCallBack callout,
                                       CFRunLoopTimerContext *context) {
    CHECK_FOR_FORK();
    if (isnan(interval)) {
        CRSetCrashLogMessage("NaN was used as an interval for a CFRunLoopTimer");
        HALT;
    }
    CFRunLoopTimerRef memory;
    UInt32 size;
    size = sizeof(struct __CFRunLoopTimer) - sizeof(CFRuntimeBase);
    memory = (CFRunLoopTimerRef)_CFRuntimeCreateInstance(allocator, CFRunLoopTimerGetTypeID(), size, NULL);
    if (NULL == memory) {
        return NULL;
    }
    __CFSetValid(memory);
    __CFRunLoopTimerUnsetFiring(memory);
    __CFRunLoopLockInit(&memory->_lock);
    memory->_runLoop = NULL;
    memory->_rlModes = CFSetCreateMutable(kCFAllocatorSystemDefault, 0, &kCFTypeSetCallBacks);
    memory->_order = order;
    if (interval < 0.0) interval = 0.0;
    memory->_interval = interval;
    memory->_tolerance = 0.0;
    if (TIMER_DATE_LIMIT < fireDate) fireDate = TIMER_DATE_LIMIT;
    memory->_nextFireDate = fireDate;
    memory->_fireTSR = 0ULL;
    uint64_t now2 = mach_absolute_time();
    CFAbsoluteTime now1 = CFAbsoluteTimeGetCurrent();
    if (fireDate < now1) {
        memory->_fireTSR = now2;
    } else if (TIMER_INTERVAL_LIMIT < fireDate - now1) {
        memory->_fireTSR = now2 + __CFTimeIntervalToTSR(TIMER_INTERVAL_LIMIT);
    } else {
        memory->_fireTSR = now2 + __CFTimeIntervalToTSR(fireDate - now1);
    }
    memory->_callout = callout;
    if (NULL != context) {
        if (context->retain) {
            memory->_context.info = (void *)context->retain(context->info);
        } else {
            memory->_context.info = context->info;
        }
        memory->_context.retain = context->retain;
        memory->_context.release = context->release;
        memory->_context.copyDescription = context->copyDescription;
    } else {
        memory->_context.info = 0;
        memory->_context.retain = 0;
        memory->_context.release = 0;
        memory->_context.copyDescription = 0;
    }
    return memory;
}

static void _runLoopTimerWithBlockContext(CFRunLoopTimerRef timer, void *opaqueBlock) {
    typedef void (^timer_block_t) (CFRunLoopTimerRef timer);
    timer_block_t block = (timer_block_t)opaqueBlock;
    block(timer);
}
CFRunLoopTimerRef CFRunLoopTimerCreateWithHandler(CFAllocatorRef allocator, CFAbsoluteTime fireDate, CFTimeInterval interval, CFOptionFlags flags, CFIndex order,
                                                  void (^block) (CFRunLoopTimerRef timer)) {
    
    CFRunLoopTimerContext blockContext;
    blockContext.version = 0;
    blockContext.info = (void *)block;
    blockContext.retain = (const void *(*)(const void *info))_Block_copy;
    blockContext.release = (void (*)(const void *info))_Block_release;
    blockContext.copyDescription = NULL;
    return CFRunLoopTimerCreate(allocator, fireDate, interval, flags, order, _runLoopTimerWithBlockContext, &blockContext);
}



void CFRunLoopTimerInvalidate(CFRunLoopTimerRef rlt) {    /* DOES CALLOUT */
    
    CHECK_FOR_FORK();
    CF_OBJC_FUNCDISPATCHV(CFRunLoopTimerGetTypeID(), void,
                          (NSTimer *)rlt, invalidate);
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    __CFRunLoopTimerLock(rlt);
    
    if (!__CFRunLoopTimerIsDeallocating(rlt)) {
        CFRetain(rlt);
    }
    
    if (__CFIsValid(rlt)) {
        CFRunLoopRef rl = rlt->_runLoop;
        void *info = rlt->_context.info;
        rlt->_context.info = NULL;
        __CFUnsetValid(rlt);
        if (NULL != rl) {
            CFIndex cnt = CFSetGetCount(rlt->_rlModes);
            STACK_BUFFER_DECL(CFStringRef, modes, cnt);
            CFSetGetValues(rlt->_rlModes, (const void **)modes);
            // To avoid A->B, B->A lock ordering issues when coming up
            // towards the run loop from a source, the timer has to be
            // unlocked, which means we have to protect from object
            // invalidation, although that's somewhat expensive.
            for (CFIndex idx = 0; idx < cnt; idx++) {
                CFRetain(modes[idx]);
            }
            CFRetain(rl);
            __CFRunLoopTimerUnlock(rlt);
            // CFRunLoopRemoveTimer will lock the run loop while it
            // needs that, but we also lock it out here to keep
            // changes from occurring for this whole sequence.
            __CFRunLoopLock(rl);
            for (CFIndex idx = 0; idx < cnt; idx++) {
                CFRunLoopRemoveTimer(rl, rlt, modes[idx]);
            }
            CFRunLoopRemoveTimer(rl, rlt, kCFRunLoopCommonModes);
            __CFRunLoopUnlock(rl);
            for (CFIndex idx = 0; idx < cnt; idx++) {
                CFRelease(modes[idx]);
            }
            CFRelease(rl);
            __CFRunLoopTimerLock(rlt);
        }
        if (NULL != rlt->_context.release) {
            rlt->_context.release(info);    /* CALLOUT */
        }
    }
    __CFRunLoopTimerUnlock(rlt);
    if (!__CFRunLoopTimerIsDeallocating(rlt)) {
        CFRelease(rlt);
    }
}

Boolean CFRunLoopTimerIsValid(CFRunLoopTimerRef rlt) {
    CHECK_FOR_FORK();
    CF_OBJC_FUNCDISPATCHV(CFRunLoopTimerGetTypeID(), Boolean, (NSTimer *)rlt, isValid);
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    return __CFIsValid(rlt);
}
