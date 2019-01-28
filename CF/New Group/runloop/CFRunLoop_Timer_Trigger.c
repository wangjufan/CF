//
//  CFRunLoop_Timer_Trigger.c
//  CF
//
//  Created by 王举范 on 2019/1/5.
//  Copyright © 2019年 wangjufan. All rights reserved.
//

#include "CFRunLoop_Timer_Trigger.h"


static void __CFArmNextTimerInMode(CFRunLoopModeRef rlm, CFRunLoopRef rl) {
    uint64_t nextHardDeadline = UINT64_MAX;
    uint64_t nextSoftDeadline = UINT64_MAX;
    
    if (rlm->_timers) {
        // Look at the list of timers. We will calculate two TSR values; the next soft and next hard deadline.
        // The next soft deadline is the first time we can fire any timer. This is the fire date of the first timer in our sorted list of timers.
        // The next hard deadline is the last time at which we can fire the timer before we've moved out of the allowable tolerance of the timers in our list.
        for (CFIndex idx = 0, cnt = CFArrayGetCount(rlm->_timers); idx < cnt; idx++) {
            CFRunLoopTimerRef t = (CFRunLoopTimerRef)CFArrayGetValueAtIndex(rlm->_timers , idx);
            // discount timers currently firing
            if (__CFRunLoopTimerIsFiring(t)) continue;
            
            int32_t err = CHECKINT_NO_ERROR;
            uint64_t oneTimerSoftDeadline = t->_fireTSR;
            uint64_t oneTimerHardDeadline = check_uint64_add(t->_fireTSR, __CFTimeIntervalToTSR(t->_tolerance), &err);
            if (err != CHECKINT_NO_ERROR) oneTimerHardDeadline = UINT64_MAX;
            
            // We can stop searching if the soft deadline for this timer exceeds the current hard deadline. Otherwise, later timers with lower tolerance could still have earlier hard deadlines.
            if (oneTimerSoftDeadline > nextHardDeadline) {
                break;
            }
            
            if (oneTimerSoftDeadline < nextSoftDeadline) {
                nextSoftDeadline = oneTimerSoftDeadline;
            }
            
            if (oneTimerHardDeadline < nextHardDeadline) {
                nextHardDeadline = oneTimerHardDeadline;
            }
        }
        
        if (nextSoftDeadline < UINT64_MAX && (nextHardDeadline != rlm->_timerHardDeadline || nextSoftDeadline != rlm->_timerSoftDeadline)) {
            if (CFRUNLOOP_NEXT_TIMER_ARMED_ENABLED()) {
                CFRUNLOOP_NEXT_TIMER_ARMED((unsigned long)(nextSoftDeadline - mach_absolute_time()));
            }
#if USE_DISPATCH_SOURCE_FOR_TIMERS
            // We're going to hand off the range of allowable timer fire date to dispatch and let it fire when appropriate for the system.
            uint64_t leeway = __CFTSRToNanoseconds(nextHardDeadline - nextSoftDeadline);
            dispatch_time_t deadline = __CFTSRToDispatchTime(nextSoftDeadline);
#if USE_MK_TIMER_TOO
            if (leeway > 0) {
                // Only use the dispatch timer if we have any leeway
                // <rdar://problem/14447675>
                
                // Cancel the mk timer
                if (rlm->_mkTimerArmed && rlm->_timerPort) {
                    AbsoluteTime dummy;
                    mk_timer_cancel(rlm->_timerPort, &dummy);
                    rlm->_mkTimerArmed = false;
                }
                
                // Arm the dispatch timer
                _dispatch_source_set_runloop_timer_4CF(rlm->_timerSource, deadline, DISPATCH_TIME_FOREVER, leeway);
                rlm->_dispatchTimerArmed = true;
            } else {
                // Cancel the dispatch timer
                if (rlm->_dispatchTimerArmed) {
                    // Cancel the dispatch timer
                    _dispatch_source_set_runloop_timer_4CF(rlm->_timerSource, DISPATCH_TIME_FOREVER, DISPATCH_TIME_FOREVER, 888);
                    rlm->_dispatchTimerArmed = false;
                }
                
                // Arm the mk timer
                if (rlm->_timerPort) {
                    mk_timer_arm(rlm->_timerPort, __CFUInt64ToAbsoluteTime(nextSoftDeadline));
                    rlm->_mkTimerArmed = true;
                }
            }
#else
            _dispatch_source_set_runloop_timer_4CF(rlm->_timerSource, deadline, DISPATCH_TIME_FOREVER, leeway);
#endif
#else
            if (rlm->_timerPort) {
                mk_timer_arm(rlm->_timerPort, __CFUInt64ToAbsoluteTime(nextSoftDeadline));
            }
#endif
        } else if (nextSoftDeadline == UINT64_MAX) {
            // Disarm the timers - there is no timer scheduled
            
            if (rlm->_mkTimerArmed && rlm->_timerPort) {
                AbsoluteTime dummy;
                mk_timer_cancel(rlm->_timerPort, &dummy);
                rlm->_mkTimerArmed = false;
            }
            
#if USE_DISPATCH_SOURCE_FOR_TIMERS
            if (rlm->_dispatchTimerArmed) {
                _dispatch_source_set_runloop_timer_4CF(rlm->_timerSource, DISPATCH_TIME_FOREVER, DISPATCH_TIME_FOREVER, 333);
                rlm->_dispatchTimerArmed = false;
            }
#endif
        }
    }
    rlm->_timerHardDeadline = nextHardDeadline;
    rlm->_timerSoftDeadline = nextSoftDeadline;
}

void CFRunLoopTimerGetContext(CFRunLoopTimerRef rlt, CFRunLoopTimerContext *context) {
    CHECK_FOR_FORK();
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    CFAssert1(0 == context->version, __kCFLogAssertion, "%s(): context version not initialized to 0", __PRETTY_FUNCTION__);
    *context = rlt->_context;
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

CFTimeInterval CFRunLoopTimerGetInterval(CFRunLoopTimerRef rlt) {
    CHECK_FOR_FORK();
    CF_OBJC_FUNCDISPATCHV(CFRunLoopTimerGetTypeID(), CFTimeInterval, (NSTimer *)rlt, timeInterval);
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    return rlt->_interval;
}

Boolean CFRunLoopTimerDoesRepeat(CFRunLoopTimerRef rlt) {
    CHECK_FOR_FORK();
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    return (0.0 < rlt->_interval);
}

CFIndex CFRunLoopTimerGetOrder(CFRunLoopTimerRef rlt) {
    CHECK_FOR_FORK();
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    return rlt->_order;
}
////////////////////////////////////////////////////////

CFTimeInterval CFRunLoopTimerGetTolerance(CFRunLoopTimerRef rlt) {
#if DEPLOYMENT_TARGET_MACOSX || DEPLOYMENT_TARGET_EMBEDDED || DEPLOYMENT_TARGET_EMBEDDED_MINI
    CHECK_FOR_FORK();
    CF_OBJC_FUNCDISPATCHV(CFRunLoopTimerGetTypeID(), CFTimeInterval, (NSTimer *)rlt, tolerance);
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    return rlt->_tolerance;
#else
    return 0.0;
#endif
}

void CFRunLoopTimerSetTolerance(CFRunLoopTimerRef rlt,
                                CFTimeInterval tolerance) {
#if DEPLOYMENT_TARGET_MACOSX || DEPLOYMENT_TARGET_EMBEDDED || DEPLOYMENT_TARGET_EMBEDDED_MINI
    CHECK_FOR_FORK();
    CF_OBJC_FUNCDISPATCHV(CFRunLoopTimerGetTypeID(), void, (NSTimer *)rlt, setTolerance:tolerance);
    __CFGenericValidateType(rlt, CFRunLoopTimerGetTypeID());
    /*
     * dispatch rules:
     *
     * For the initial timer fire at 'start', the upper limit to the allowable
     * delay is set to 'leeway' nanoseconds. For the subsequent timer fires at
     * 'start' + N * 'interval', the upper limit is MIN('leeway','interval'/2).
     */
    if (rlt->_interval > 0) {
        rlt->_tolerance = MIN(tolerance, rlt->_interval / 2);
    } else {
        // Tolerance must be a positive value or zero
        if (tolerance < 0) tolerance = 0.0;
        rlt->_tolerance = tolerance;
    }
#endif
}
