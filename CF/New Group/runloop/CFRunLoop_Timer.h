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


struct __timeout_context {
    dispatch_source_t ds;
    CFRunLoopRef rl;
    uint64_t termTSR;
};

#endif /* CFRunLoop_Timer_h */
