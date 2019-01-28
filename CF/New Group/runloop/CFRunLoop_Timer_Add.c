//
//  CFRunLoop_Timer_Add.c
//  CF
//
//  Created by 王举范 on 2019/1/5.
//  Copyright © 2019年 wangjufan. All rights reserved.
//

#include "CFRunLoop_Timer_Add.h"

void CFRunLoopAddTimer(CFRunLoopRef rl,
                       CFRunLoopTimerRef rlt,
                       CFStringRef modeName) {
    CHECK_FOR_FORK();
    if (__CFRunLoopIsDeallocating(rl)) return;
    if (!__CFIsValid(rlt) || (NULL != rlt->_runLoop && rlt->_runLoop != rl)) return;
    __CFRunLoopLock(rl);
    
    if (modeName == kCFRunLoopCommonModes) {
        
        CFSetRef set = rl->_commonModes ? CFSetCreateCopy(kCFAllocatorSystemDefault, rl->_commonModes) : NULL;
        if (NULL == rl->_commonModeItems) {
            rl->_commonModeItems = CFSetCreateMutable(kCFAllocatorSystemDefault, 0, &kCFTypeSetCallBacks);
        }
        CFSetAddValue(rl->_commonModeItems, rlt);
        if (NULL != set) {
            CFTypeRef context[2] = {rl, rlt};
            /* add new item to all common-modes */
            CFSetApplyFunction(set, (__CFRunLoopAddItemToCommonModes), (void *)context);
            CFRelease(set);
        }
    } else {
        CFRunLoopModeRef rlm = __CFRunLoopFindMode(rl, modeName, true);
        if (NULL != rlm) {
            if (NULL == rlm->_timers) {
                CFArrayCallBacks cb = kCFTypeArrayCallBacks;
                cb.equal = NULL;
                rlm->_timers = CFArrayCreateMutable(kCFAllocatorSystemDefault, 0, &cb);
            }
        }
        if (NULL != rlm && !CFSetContainsValue(rlt->_rlModes, rlm->_name)) {
            __CFRunLoopTimerLock(rlt);
            if (NULL == rlt->_runLoop) {
                rlt->_runLoop = rl;
            } else if (rl != rlt->_runLoop) {
                __CFRunLoopTimerUnlock(rlt);
                __CFRunLoopModeUnlock(rlm);
                __CFRunLoopUnlock(rl);
                return;
            }
            CFSetAddValue(rlt->_rlModes, rlm->_name);
            __CFRunLoopTimerUnlock(rlt);
            __CFRunLoopTimerFireTSRLock();
            __CFRepositionTimerInMode(rlm, rlt, false);
            __CFRunLoopTimerFireTSRUnlock();
            if (!_CFExecutableLinkedOnOrAfter(CFSystemVersionLion)) {
                // Normally we don't do this on behalf of clients, but for
                // backwards compatibility due to the change in timer handling...
                if (rl != CFRunLoopGetCurrent()) CFRunLoopWakeUp(rl);
            }
        }
        if (NULL != rlm) {
            __CFRunLoopModeUnlock(rlm);
        }
    }
    __CFRunLoopUnlock(rl);
}

void CFRunLoopRemoveTimer(CFRunLoopRef rl,
                          CFRunLoopTimerRef rlt,
                          CFStringRef modeName) {
    CHECK_FOR_FORK();
    __CFRunLoopLock(rl);
    if (modeName == kCFRunLoopCommonModes) {
        if (NULL != rl->_commonModeItems && CFSetContainsValue(rl->_commonModeItems, rlt)) {
            CFSetRef set = rl->_commonModes ? CFSetCreateCopy(kCFAllocatorSystemDefault, rl->_commonModes) : NULL;
            CFSetRemoveValue(rl->_commonModeItems, rlt);
            if (NULL != set) {
                CFTypeRef context[2] = {rl, rlt};
                /* remove new item from all common-modes */
                CFSetApplyFunction(set, (__CFRunLoopRemoveItemFromCommonModes), (void *)context);
                CFRelease(set);
            }
        } else {
        }
    } else {
        CFRunLoopModeRef rlm = __CFRunLoopFindMode(rl, modeName, false);
        CFIndex idx = kCFNotFound;
        CFMutableArrayRef timerList = NULL;
        if (NULL != rlm) {
            timerList = rlm->_timers;
            if (NULL != timerList) {
                idx = CFArrayGetFirstIndexOfValue(timerList, CFRangeMake(0, CFArrayGetCount(timerList)), rlt);
            }
        }
        if (kCFNotFound != idx) {
            __CFRunLoopTimerLock(rlt);
            CFSetRemoveValue(rlt->_rlModes, rlm->_name);
            if (0 == CFSetGetCount(rlt->_rlModes)) {
                rlt->_runLoop = NULL;
            }
            __CFRunLoopTimerUnlock(rlt);
            CFArrayRemoveValueAtIndex(timerList, idx);
            __CFArmNextTimerInMode(rlm, rl);
        }
        if (NULL != rlm) {
            __CFRunLoopModeUnlock(rlm);
        }
    }
    __CFRunLoopUnlock(rl);
}

Boolean CFRunLoopContainsTimer(CFRunLoopRef rl, CFRunLoopTimerRef rlt, CFStringRef modeName) {
    CHECK_FOR_FORK();
    if (NULL == rlt->_runLoop || rl != rlt->_runLoop) return false;
    Boolean hasValue = false;
    __CFRunLoopLock(rl);
    if (modeName == kCFRunLoopCommonModes) {
        if (NULL != rl->_commonModeItems) {
            hasValue = CFSetContainsValue(rl->_commonModeItems, rlt);
        }
    } else {
        CFRunLoopModeRef rlm = __CFRunLoopFindMode(rl, modeName, false);
        if (NULL != rlm) {
            if (NULL != rlm->_timers) {
                CFIndex idx = CFArrayGetFirstIndexOfValue(rlm->_timers, CFRangeMake(0, CFArrayGetCount(rlm->_timers)), rlt);
                hasValue = (kCFNotFound != idx);
            }
            __CFRunLoopModeUnlock(rlm);
        }
    }
    __CFRunLoopUnlock(rl);
    return hasValue;
}


// call with rlm and its run loop locked, and the TSRLock locked; rlt not locked; returns with same state
static void __CFRepositionTimerInMode(CFRunLoopModeRef rlm, CFRunLoopTimerRef rlt, Boolean isInArray) {
    if (!rlt) return;
    
    CFMutableArrayRef timerArray = rlm->_timers;
    if (!timerArray) return;
    Boolean found = false;
    
    // If we know in advance that the timer is not in the array (just being added now) then we can skip this search
    if (isInArray) {
        CFIndex idx = CFArrayGetFirstIndexOfValue(timerArray, CFRangeMake(0, CFArrayGetCount(timerArray)), rlt);
        if (kCFNotFound != idx) {
            CFRetain(rlt);
            CFArrayRemoveValueAtIndex(timerArray, idx);
            found = true;
        }
    }
    if (!found && isInArray) return;
    CFIndex newIdx = __CFRunLoopInsertionIndexInTimerArray(timerArray, rlt);
    CFArrayInsertValueAtIndex(timerArray, newIdx, rlt);
    __CFArmNextTimerInMode(rlm, rlt->_runLoop);
    if (isInArray) CFRelease(rlt);
}


static CFIndex __CFRunLoopInsertionIndexInTimerArray(CFArrayRef array, CFRunLoopTimerRef rlt) {
    CFIndex cnt = CFArrayGetCount(array);
    if (cnt <= 0) {
        return 0;
    }
    if (256 < cnt) {
        CFRunLoopTimerRef item = (CFRunLoopTimerRef)CFArrayGetValueAtIndex(array, cnt - 1);
        if (item->_fireTSR <= rlt->_fireTSR) {
            return cnt;
        }
        item = (CFRunLoopTimerRef)CFArrayGetValueAtIndex(array, 0);
        if (rlt->_fireTSR < item->_fireTSR) {
            return 0;
        }
    }
    
    CFIndex add = (1 << flsl(cnt)) * 2;
    CFIndex idx = 0;
    Boolean lastTestLEQ;
    do {
        add = add / 2;
        lastTestLEQ = false;
        CFIndex testIdx = idx + add;
        if (testIdx < cnt) {
            CFRunLoopTimerRef item = (CFRunLoopTimerRef)CFArrayGetValueAtIndex(array, testIdx);
            if (item->_fireTSR <= rlt->_fireTSR) {
                idx = testIdx;
                lastTestLEQ = true;
            }
        }
    } while (0 < add);
    
    return lastTestLEQ ? idx + 1 : idx;
}

