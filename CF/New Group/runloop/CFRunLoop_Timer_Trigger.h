//
//  CFRunLoop_Timer_Trigger.h
//  CF
//
//  Created by 王举范 on 2019/1/5.
//  Copyright © 2019年 wangjufan. All rights reserved.
//

#ifndef CFRunLoop_Timer_Trigger_h
#define CFRunLoop_Timer_Trigger_h

#include <stdio.h>


static void __CFArmNextTimerInMode(CFRunLoopModeRef rlm, CFRunLoopRef rl);



CF_EXPORT CFTimeInterval CFRunLoopTimerGetInterval(CFRunLoopTimerRef timer);
CF_EXPORT Boolean CFRunLoopTimerDoesRepeat(CFRunLoopTimerRef timer);
CF_EXPORT CFIndex CFRunLoopTimerGetOrder(CFRunLoopTimerRef timer);



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

#endif /* CFRunLoop_Timer_Trigger_h */


//CFAbsoluteTime refTime = CFAbsoluteTimeGetCurrent();
//NSLog(@"555 start time 0.000000");
//NSTimer *timer = [NSTimer timerWithTimeInterval:5.0 repeats:YES block:^(NSTimer * _Nonnull timer) {
//    NSLog(@"555 timer fire %f",CFAbsoluteTimeGetCurrent() - refTime);
//}];
//timer.tolerance = 0.5;
//[[NSRunLoop mainRunLoop] addTimer:timer forMode:NSDefaultRunLoopMode];
//
//dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(4.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//    NSLog(@"555 before busy %f", CFAbsoluteTimeGetCurrent() - refTime);
//    NSInteger j;
//    for (long  i = 0; i< 1000000000*2.65; i++) {
//        j = i*3;
//    }
//    NSLog(@"555 after busy %f", CFAbsoluteTimeGetCurrent() - refTime);
//});
//
//2019-01-05 20:00:45.249533+0800 Trans[7085:1249995] 555 start time 0.000000
//2019-01-05 20:00:49.621382+0800 Trans[7085:1249995] 555 before busy 4.371830
//2019-01-05 20:01:00.220443+0800 Trans[7085:1249995] 555 after busy 14.970899
//
//2019-01-05 20:01:00.220790+0800 Trans[7085:1249995] 555 timer fire 14.971265
//2019-01-05 20:01:00.741065+0800 Trans[7085:1249995] 555 timer fire 15.491507
//
//2019-01-05 20:01:05.734789+0800 Trans[7085:1249995] 555 timer fire 20.485052
//2019-01-05 20:01:10.739751+0800 Trans[7085:1249995] 555 timer fire 25.490196
//2019-01-05 20:01:15.744205+0800 Trans[7085:1249995] 555 timer fire 30.494648
//2019-01-05 20:01:20.749219+0800 Trans[7085:1249995] 555 timer fire 35.499661
//双重标准 调度标准 执行时标准
//调度标准 以容忍误差为准
//执行时标准 以调度周期为标准
//调度前，误差在[nx,nx+容忍误差)之内
//调度后执行，误差在[nx,nx+x)之内

