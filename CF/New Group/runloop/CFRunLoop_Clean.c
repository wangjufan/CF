//
//  CFRunLoop_Clean.c
//  CF
//
//  Created by 王举范 on 2018/11/23.
//  Copyright © 2018年 wangjufan. All rights reserved.
//

#include "CFRunLoop_Clean.h"


// Remove backreferences the mode's sources have to the rl (context);
// the primary purpose of rls->_runLoops is so that Invalidation can remove
// the source from the run loops it is in, but during deallocation of a
// run loop, we already know that the sources are going to be punted
// from it, so invalidation of sources does not need to remove from a
// deallocating run loop.
static void __CFRunLoopCleanseSources(const void *value, void *context) {
    CFRunLoopModeRef rlm = (CFRunLoopModeRef)value;
    CFRunLoopRef rl = (CFRunLoopRef)context;
    CFIndex idx, cnt;
    const void **list, *buffer[256];
    if (NULL == rlm->_sources0 && NULL == rlm->_sources1) return;
    
    cnt = (rlm->_sources0 ? CFSetGetCount(rlm->_sources0) : 0) + (rlm->_sources1 ? CFSetGetCount(rlm->_sources1) : 0);
    list = (const void **)((cnt <= 256) ? buffer : CFAllocatorAllocate(kCFAllocatorSystemDefault, cnt * sizeof(void *), 0));
    if (rlm->_sources0) CFSetGetValues(rlm->_sources0, list);
    if (rlm->_sources1) CFSetGetValues(rlm->_sources1, list + (rlm->_sources0 ? CFSetGetCount(rlm->_sources0) : 0));
    for (idx = 0; idx < cnt; idx++) {
        CFRunLoopSourceRef rls = (CFRunLoopSourceRef)list[idx];
        __CFRunLoopSourceLock(rls);
        if (NULL != rls->_runLoops) {
            CFBagRemoveValue(rls->_runLoops, rl);
        }
        __CFRunLoopSourceUnlock(rls);
    }
    if (list != buffer) CFAllocatorDeallocate(kCFAllocatorSystemDefault, list);
}

static void __CFRunLoopDeallocateSources(const void *value, void *context) {
    CFRunLoopModeRef rlm = (CFRunLoopModeRef)value;
    CFRunLoopRef rl = (CFRunLoopRef)context;
    CFIndex idx, cnt;
    const void **list, *buffer[256];
    if (NULL == rlm->_sources0 && NULL == rlm->_sources1) return;
    
    cnt = (rlm->_sources0 ? CFSetGetCount(rlm->_sources0) : 0) + (rlm->_sources1 ? CFSetGetCount(rlm->_sources1) : 0);
    list = (const void **)((cnt <= 256) ? buffer : CFAllocatorAllocate(kCFAllocatorSystemDefault, cnt * sizeof(void *), 0));
    if (rlm->_sources0) CFSetGetValues(rlm->_sources0, list);
    if (rlm->_sources1) CFSetGetValues(rlm->_sources1, list + (rlm->_sources0 ? CFSetGetCount(rlm->_sources0) : 0));
    for (idx = 0; idx < cnt; idx++) {
        CFRetain(list[idx]);
    }
    if (rlm->_sources0) CFSetRemoveAllValues(rlm->_sources0);
    if (rlm->_sources1) CFSetRemoveAllValues(rlm->_sources1);
    for (idx = 0; idx < cnt; idx++) {
        CFRunLoopSourceRef rls = (CFRunLoopSourceRef)list[idx];
        __CFRunLoopSourceLock(rls);
        if (NULL != rls->_runLoops) {
            CFBagRemoveValue(rls->_runLoops, rl);
        }
        __CFRunLoopSourceUnlock(rls);
        if (0 == rls->_context.version0.version) {
            if (NULL != rls->_context.version0.cancel) {
                rls->_context.version0.cancel(rls->_context.version0.info, rl, rlm->_name);    /* CALLOUT */
            }
        } else if (1 == rls->_context.version0.version) {
            __CFPort port = rls->_context.version1.getPort(rls->_context.version1.info);    /* CALLOUT */
            if (CFPORT_NULL != port) {
                __CFPortSetRemove(port, rlm->_portSet);
            }
        }
        CFRelease(rls);
    }
    if (list != buffer) CFAllocatorDeallocate(kCFAllocatorSystemDefault, list);
}

static void __CFRunLoopDeallocateObservers(const void *value, void *context) {
    CFRunLoopModeRef rlm = (CFRunLoopModeRef)value;
    CFRunLoopRef rl = (CFRunLoopRef)context;
    CFIndex idx, cnt;
    const void **list, *buffer[256];
    if (NULL == rlm->_observers) return;
    cnt = CFArrayGetCount(rlm->_observers);
    list = (const void **)((cnt <= 256) ? buffer : CFAllocatorAllocate(kCFAllocatorSystemDefault, cnt * sizeof(void *), 0));
    CFArrayGetValues(rlm->_observers, CFRangeMake(0, cnt), list);
    for (idx = 0; idx < cnt; idx++) {
        CFRetain(list[idx]);
    }
    CFArrayRemoveAllValues(rlm->_observers);
    for (idx = 0; idx < cnt; idx++) {
        __CFRunLoopObserverCancel((CFRunLoopObserverRef)list[idx], rl, rlm);
        CFRelease(list[idx]);
    }
    if (list != buffer) CFAllocatorDeallocate(kCFAllocatorSystemDefault, list);
}

static void __CFRunLoopDeallocateTimers(const void *value, void *context) {
    CFRunLoopModeRef rlm = (CFRunLoopModeRef)value;
    if (NULL == rlm->_timers) return;
    void (^deallocateTimers)(CFMutableArrayRef timers) = ^(CFMutableArrayRef timers) {
        CFIndex idx, cnt;
        const void **list, *buffer[256];
        cnt = CFArrayGetCount(timers);
        list = (const void **)((cnt <= 256) ? buffer : CFAllocatorAllocate(kCFAllocatorSystemDefault, cnt * sizeof(void *), 0));
        CFArrayGetValues(timers, CFRangeMake(0, CFArrayGetCount(timers)), list);
        for (idx = 0; idx < cnt; idx++) {
            CFRetain(list[idx]);
        }
        CFArrayRemoveAllValues(timers);
        for (idx = 0; idx < cnt; idx++) {
            CFRunLoopTimerRef rlt = (CFRunLoopTimerRef)list[idx];
            __CFRunLoopTimerLock(rlt);
            // if the run loop is deallocating, and since a timer can only be in one
            // run loop, we're going to be removing the timer from all modes, so be
            // a little heavy-handed and direct
            CFSetRemoveAllValues(rlt->_rlModes);
            rlt->_runLoop = NULL;
            __CFRunLoopTimerUnlock(rlt);
            CFRelease(list[idx]);
        }
        if (list != buffer) CFAllocatorDeallocate(kCFAllocatorSystemDefault, list);
    };
    
    if (rlm->_timers && CFArrayGetCount(rlm->_timers)) deallocateTimers(rlm->_timers);
}

CF_EXPORT CFRunLoopRef _CFRunLoopGet0b(pthread_t t);

static void __CFRunLoopDeallocate(CFTypeRef cf) {
    CFRunLoopRef rl = (CFRunLoopRef)cf;
    
    if (_CFRunLoopGet0b(pthread_main_thread_np()) == cf) HALT;
    
    /* We try to keep the run loop in a valid state as long as possible,
     since sources may have non-retained references to the run loop.
     Another reason is that we don't want to lock the run loop for
     callback reasons, if we can get away without that.  We start by
     eliminating the sources, since they are the most likely to call
     back into the run loop during their "cancellation". Common mode
     items will be removed from the mode indirectly by the following
     three lines. */
    __CFRunLoopSetDeallocating(rl);
    if (NULL != rl->_modes) {
        CFSetApplyFunction(rl->_modes, (__CFRunLoopCleanseSources), rl); // remove references to rl
        CFSetApplyFunction(rl->_modes, (__CFRunLoopDeallocateSources), rl);
        CFSetApplyFunction(rl->_modes, (__CFRunLoopDeallocateObservers), rl);
        CFSetApplyFunction(rl->_modes, (__CFRunLoopDeallocateTimers), rl);
    }
    __CFRunLoopLock(rl);
    struct _block_item *item = rl->_blocks_head;
    while (item) {
        struct _block_item *curr = item;
        item = item->_next;
        CFRelease(curr->_mode);
        Block_release(curr->_block);
        free(curr);
    }
    if (NULL != rl->_commonModeItems) {
        CFRelease(rl->_commonModeItems);
    }
    if (NULL != rl->_commonModes) {
        CFRelease(rl->_commonModes);
    }
    if (NULL != rl->_modes) {
        CFRelease(rl->_modes);
    }
    __CFPortFree(rl->_wakeUpPort);
    rl->_wakeUpPort = CFPORT_NULL;
    __CFRunLoopPopPerRunData(rl, NULL);
    __CFRunLoopUnlock(rl);
    pthread_mutex_destroy(&rl->_lock);
    memset((char *)cf + sizeof(CFRuntimeBase), 0x8C, sizeof(struct __CFRunLoop) - sizeof(CFRuntimeBase));
}


// Called for each thread as it exits
CF_PRIVATE void __CFFinalizeRunLoop(uintptr_t data) {
    CFRunLoopRef rl = NULL;
    if (data <= 1) {
        __CFLock(&loopsLock);
        if (__CFRunLoops) {
            rl = (CFRunLoopRef)CFDictionaryGetValue(__CFRunLoops, pthreadPointer(pthread_self()));
            if (rl) CFRetain(rl);
            CFDictionaryRemoveValue(__CFRunLoops, pthreadPointer(pthread_self()));
        }
        __CFUnlock(&loopsLock);
    } else {
        _CFSetTSD(__CFTSDKeyRunLoopCntr, (void *)(data - 1), (void (*)(void *))__CFFinalizeRunLoop);
    }
    if (rl && CFRunLoopGetMain() != rl) { // protect against cooperative threads
        if (NULL != rl->_counterpart) {
            CFRelease(rl->_counterpart);
            rl->_counterpart = NULL;
        }
        // purge all sources before deallocation
        CFArrayRef array = CFRunLoopCopyAllModes(rl);
        for (CFIndex idx = CFArrayGetCount(array); idx--;) {
            CFStringRef modeName = (CFStringRef)CFArrayGetValueAtIndex(array, idx);
            __CFRunLoopRemoveAllSources(rl, modeName);
        }
        __CFRunLoopRemoveAllSources(rl, kCFRunLoopCommonModes);
        CFRelease(array);
    }
    if (rl) CFRelease(rl);
}

