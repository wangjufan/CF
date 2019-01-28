//
//  CFRunLoop_Timer_Date.c
//  CF
//
//  Created by 王举范 on 2019/1/7.
//  Copyright © 2019年 wangjufan. All rights reserved.
//

#include "CFRunLoop_Timer_Date.h"

//number zero timer

CFAbsoluteTime CFRunLoopGetNextTimerFireDate(CFRunLoopRef rl,
                                             CFStringRef modeName) {
    CHECK_FOR_FORK();
    __CFRunLoopLock(rl);
    
    CFRunLoopModeRef rlm = __CFRunLoopFindMode(rl, modeName, false);
    CFAbsoluteTime at = 0.0;
    CFRunLoopTimerRef nextTimer = (rlm
                && rlm->_timers
                &&  0 < CFArrayGetCount(rlm->_timers))
                    ? (CFRunLoopTimerRef)CFArrayGetValueAtIndex(rlm->_timers, 0)
                    : NULL;
    if (nextTimer) {
        at = CFRunLoopTimerGetNextFireDate(nextTimer);
    }
    if (rlm) __CFRunLoopModeUnlock(rlm);
    __CFRunLoopUnlock(rl);
    return at;
}
CFAbsoluteTime CFRunLoopTimerGetNextFireDate(CFRunLoopTimerRef rlt) {
//
    CHECK_FOR_FORK();
    CF_OBJC_FUNCDISPATCHV(CFRunLoopTimerGetTypeID(), CFAbsoluteTime,
                          (NSTimer *)rlt, _cffireTime);
    
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    CFAbsoluteTime at = 0.0;
    
    __CFRunLoopTimerLock(rlt);
    __CFRunLoopTimerFireTSRLock();
    if (__CFIsValid(rlt)) {
        at = rlt->_nextFireDate;
    }
    __CFRunLoopTimerFireTSRUnlock();
    __CFRunLoopTimerUnlock(rlt);
    
    return at;
}


void CFRunLoopTimerSetNextFireDate(CFRunLoopTimerRef rlt,
                                   CFAbsoluteTime fireDate) {
    CHECK_FOR_FORK();
    if (!__CFIsValid(rlt)) return;
    if (TIMER_DATE_LIMIT < fireDate) fireDate = TIMER_DATE_LIMIT;
    uint64_t nextFireTSR = 0ULL;
    uint64_t now2 = mach_absolute_time();
    CFAbsoluteTime now1 = CFAbsoluteTimeGetCurrent();
    if (fireDate < now1) {
        nextFireTSR = now2;
    } else if (TIMER_INTERVAL_LIMIT < fireDate - now1) {
        nextFireTSR = now2 + __CFTimeIntervalToTSR(TIMER_INTERVAL_LIMIT);
    } else {
        nextFireTSR = now2 + __CFTimeIntervalToTSR(fireDate - now1);
    }
    __CFRunLoopTimerLock(rlt);
    if (NULL != rlt->_runLoop) {
        CFIndex cnt = CFSetGetCount(rlt->_rlModes);
        STACK_BUFFER_DECL(CFTypeRef, modes, cnt);
        CFSetGetValues(rlt->_rlModes, (const void **)modes);
        // To avoid A->B, B->A lock ordering issues when coming up
        // towards the run loop from a source, the timer has to be
        // unlocked, which means we have to protect from object
        // invalidation, although that's somewhat expensive.
        for (CFIndex idx = 0; idx < cnt; idx++) {
            CFRetain(modes[idx]);
        }
        CFRunLoopRef rl = (CFRunLoopRef)CFRetain(rlt->_runLoop);
        __CFRunLoopTimerUnlock(rlt);
        __CFRunLoopLock(rl);
        for (CFIndex idx = 0; idx < cnt; idx++) {
            CFStringRef name = (CFStringRef)modes[idx];
            modes[idx] = __CFRunLoopFindMode(rl, name, false);
            CFRelease(name);
        }
        __CFRunLoopTimerFireTSRLock();
        rlt->_fireTSR = nextFireTSR;
        rlt->_nextFireDate = fireDate;
        for (CFIndex idx = 0; idx < cnt; idx++) {
            CFRunLoopModeRef rlm = (CFRunLoopModeRef)modes[idx];
            if (rlm) {
                __CFRepositionTimerInMode(rlm, rlt, true);
            }
        }
        __CFRunLoopTimerFireTSRUnlock();
        for (CFIndex idx = 0; idx < cnt; idx++) {
            __CFRunLoopModeUnlock((CFRunLoopModeRef)modes[idx]);
        }
        __CFRunLoopUnlock(rl);
        // This is setting the date of a timer, not a direct
        // interaction with a run loop, so we'll do a wakeup
        // (which may be costly) for the caller, just in case.
        // (And useful for binary compatibility with older
        // code used to the older timer implementation.)
        if (rl != CFRunLoopGetCurrent()) CFRunLoopWakeUp(rl);
        CFRelease(rl);
    } else {
        __CFRunLoopTimerFireTSRLock();
        rlt->_fireTSR = nextFireTSR;
        rlt->_nextFireDate = fireDate;
        __CFRunLoopTimerFireTSRUnlock();
        __CFRunLoopTimerUnlock(rlt);
    }
}



