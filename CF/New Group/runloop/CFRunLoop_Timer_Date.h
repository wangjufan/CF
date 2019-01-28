//
//  CFRunLoop_Timer_Date.h
//  CF
//
//  Created by 王举范 on 2019/1/7.
//  Copyright © 2019年 wangjufan. All rights reserved.
//

#ifndef CFRunLoop_Timer_Date_h
#define CFRunLoop_Timer_Date_h

#include <stdio.h>

CF_EXPORT CFAbsoluteTime CFRunLoopGetNextTimerFireDate(CFRunLoopRef rl, CFStringRef mode);

CF_EXPORT CFAbsoluteTime CFRunLoopTimerGetNextFireDate(CFRunLoopTimerRef timer);

CF_EXPORT void CFRunLoopTimerSetNextFireDate(CFRunLoopTimerRef timer, CFAbsoluteTime fireDate);

#endif /* CFRunLoop_Timer_Date_h */
