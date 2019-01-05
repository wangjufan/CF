#ifndef CFRunLoop_Timer_h
#define CFRunLoop_Timer_h

#include <stdio.h>
#include "CFRunLoop.h"

#pragma mark Timers

//多次加入
//idx = CFArrayGetFirstIndexOfValue(timerList, CFRangeMake(0, CFArrayGetCount(timerList)), rlt);

struct __CFRunLoopTimer {
    CFRuntimeBase _base;
    uint16_t _bits;
    pthread_mutex_t _lock;
    CFRunLoopRef _runLoop;
    CFMutableSetRef _rlModes;
    CFAbsoluteTime _nextFireDate;
    CFTimeInterval _interval;        /* immutable */
    CFTimeInterval _tolerance;          /* mutable */
    
    uint64_t _fireTSR;            /* TSR units 上次应当触发的时间 */
    CFIndex _order;            /* immutable */
    
    CFRunLoopTimerCallBack _callout;    /* immutable */
    CFRunLoopTimerContext _context;    /* immutable, except invalidation */
};
typedef struct CF_BRIDGED_MUTABLE_TYPE(NSTimer) __CFRunLoopTimer * CFRunLoopTimerRef;

typedef struct {
    CFIndex    version;
    void *    info;
    const void *(*retain)(const void *info);
    void    (*release)(const void *info);
    CFStringRef    (*copyDescription)(const void *info);
} CFRunLoopTimerContext;
typedef void (*CFRunLoopTimerCallBack)(CFRunLoopTimerRef timer, void *info);

CF_EXPORT CFTypeID CFRunLoopTimerGetTypeID(void);
CF_EXPORT CFRunLoopTimerRef CFRunLoopTimerCreate(CFAllocatorRef allocator, CFAbsoluteTime fireDate, CFTimeInterval interval, CFOptionFlags flags, CFIndex order, CFRunLoopTimerCallBack callout, CFRunLoopTimerContext *context);
#if __BLOCKS__
CF_EXPORT CFRunLoopTimerRef CFRunLoopTimerCreateWithHandler(CFAllocatorRef allocator, CFAbsoluteTime fireDate, CFTimeInterval interval, CFOptionFlags flags, CFIndex order, void (^block) (CFRunLoopTimerRef timer)) CF_AVAILABLE(10_7, 5_0);
#endif

CF_EXPORT CFAbsoluteTime CFRunLoopTimerGetNextFireDate(CFRunLoopTimerRef timer);
CF_EXPORT void CFRunLoopTimerSetNextFireDate(CFRunLoopTimerRef timer, CFAbsoluteTime fireDate);
CF_EXPORT CFTimeInterval CFRunLoopTimerGetInterval(CFRunLoopTimerRef timer);
CF_EXPORT Boolean CFRunLoopTimerDoesRepeat(CFRunLoopTimerRef timer);
CF_EXPORT CFIndex CFRunLoopTimerGetOrder(CFRunLoopTimerRef timer);
CF_EXPORT void CFRunLoopTimerInvalidate(CFRunLoopTimerRef timer);
CF_EXPORT Boolean CFRunLoopTimerIsValid(CFRunLoopTimerRef timer);
CF_EXPORT void CFRunLoopTimerGetContext(CFRunLoopTimerRef timer, CFRunLoopTimerContext *context);

// Setting a tolerance for a timer allows it to fire later than the scheduled fire date,
// improving the ability of the system to optimize for increased power savings and responsiveness.
//The timer may fire at any time between its scheduled fire date and the scheduled fire date plus the tolerance.
//The timer will not fire before the scheduled fire date.

//For repeating timers, the next fire date is calculated from the original fire date regardless of tolerance applied at individual fire times, to avoid drift.
//The default value is zero, which means no additional tolerance is applied.
//The system reserves the right to apply a small amount of tolerance to certain timers regardless of the value of this property.

// As the user of the timer, you will have the best idea of what an appropriate tolerance for a timer may be.
// A general rule of thumb, though, is to set the tolerance to at least 10% of the interval, for a repeating timer.
//Even a small amount of tolerance will have a significant positive impact on the power usage of your application. The system may put a maximum value of the tolerance.

// if one cut point was pass and
//not recalculated the _fireTSR value
//some outdate call may happens
// if not _fireTSR re-calculating , wjf
CF_EXPORT CFTimeInterval CFRunLoopTimerGetTolerance(CFRunLoopTimerRef timer) CF_AVAILABLE(10_9, 7_0);
CF_EXPORT void CFRunLoopTimerSetTolerance(CFRunLoopTimerRef timer, CFTimeInterval tolerance) CF_AVAILABLE(10_9, 7_0);
//

/////////////////////////////////////////////
CF_EXPORT Boolean CFRunLoopContainsTimer(CFRunLoopRef rl, CFRunLoopTimerRef timer, CFStringRef mode);
CF_EXPORT void CFRunLoopAddTimer(CFRunLoopRef rl, CFRunLoopTimerRef timer, CFStringRef mode);
CF_EXPORT void CFRunLoopRemoveTimer(CFRunLoopRef rl, CFRunLoopTimerRef timer, CFStringRef mode);


/* Bit 0 of the base reserved bits is used for firing state */
/* Bit 1 of the base reserved bits is used for fired-during-callout state */
/* Bit 2 of the base reserved bits is used for waking state */

CF_INLINE Boolean __CFRunLoopTimerIsFiring(CFRunLoopTimerRef rlt) {
    return (Boolean)__CFBitfieldGetValue(rlt->_bits, 0, 0);
}

CF_INLINE void __CFRunLoopTimerSetFiring(CFRunLoopTimerRef rlt) {
    __CFBitfieldSetValue(rlt->_bits, 0, 0, 1);
}

CF_INLINE void __CFRunLoopTimerUnsetFiring(CFRunLoopTimerRef rlt) {
    __CFBitfieldSetValue(rlt->_bits, 0, 0, 0);
}

CF_INLINE Boolean __CFRunLoopTimerIsDeallocating(CFRunLoopTimerRef rlt) {
    return (Boolean)__CFBitfieldGetValue(rlt->_bits, 2, 2);
}

CF_INLINE void __CFRunLoopTimerSetDeallocating(CFRunLoopTimerRef rlt) {
    __CFBitfieldSetValue(rlt->_bits, 2, 2, 1);
}

CF_INLINE void __CFRunLoopTimerLock(CFRunLoopTimerRef rlt) {
    pthread_mutex_lock(&(rlt->_lock));
    //    CFLog(6, CFSTR("__CFRunLoopTimerLock locked %p"), rlt);
}

CF_INLINE void __CFRunLoopTimerUnlock(CFRunLoopTimerRef rlt) {
    //    CFLog(6, CFSTR("__CFRunLoopTimerLock unlocking %p"), rlt);
    pthread_mutex_unlock(&(rlt->_lock));
}

static CFLock_t __CFRLTFireTSRLock = CFLockInit;
//#define CFLockInit ((pthread_mutex_t)PTHREAD_ERRORCHECK_MUTEX_INITIALIZER)
CF_INLINE void __CFRunLoopTimerFireTSRLock(void) {
    __CFLock(&__CFRLTFireTSRLock);
}
CF_INLINE void __CFRunLoopTimerFireTSRUnlock(void) {
    __CFUnlock(&__CFRLTFireTSRLock);
}

CF_EXPORT CFAbsoluteTime CFRunLoopGetNextTimerFireDate(CFRunLoopRef rl, CFStringRef mode);



struct __timeout_context {
    dispatch_source_t ds;
    CFRunLoopRef rl;
    uint64_t termTSR;
};
static void __CFRunLoopTimeoutCancel(void *arg) {
    struct __timeout_context *context = (struct __timeout_context *)arg;
    CFRelease(context->rl);
    dispatch_release(context->ds);
    free(context);
}
static void __CFRunLoopTimeout(void *arg) {
    struct __timeout_context *context = (struct __timeout_context *)arg;
    context->termTSR = 0ULL;
    CFRUNLOOP_WAKEUP_FOR_TIMEOUT();
    CFRunLoopWakeUp(context->rl);
    // The interval is DISPATCH_TIME_FOREVER, so this won't fire again
}


#endif /* CFRunLoop_Timer_h */
