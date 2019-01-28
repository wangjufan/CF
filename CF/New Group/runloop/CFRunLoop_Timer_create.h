//
//  CFRunLoop_Timer_create.h
//  CF
//
//  Created by 王举范 on 2019/1/7.
//  Copyright © 2019年 wangjufan. All rights reserved.
//

#ifndef CFRunLoop_Timer_create_h
#define CFRunLoop_Timer_create_h

#include <stdio.h>

CF_EXPORT CFRunLoopTimerRef CFRunLoopTimerCreate(CFAllocatorRef allocator, CFAbsoluteTime fireDate, CFTimeInterval interval, CFOptionFlags flags, CFIndex order, CFRunLoopTimerCallBack callout, CFRunLoopTimerContext *context);
#if __BLOCKS__
CF_EXPORT CFRunLoopTimerRef CFRunLoopTimerCreateWithHandler(CFAllocatorRef allocator, CFAbsoluteTime fireDate, CFTimeInterval interval, CFOptionFlags flags, CFIndex order, void (^block) (CFRunLoopTimerRef timer)) CF_AVAILABLE(10_7, 5_0);
#endif

CF_EXPORT void CFRunLoopTimerInvalidate(CFRunLoopTimerRef timer);
CF_EXPORT Boolean CFRunLoopTimerIsValid(CFRunLoopTimerRef timer);
CF_EXPORT void CFRunLoopTimerGetContext(CFRunLoopTimerRef timer, CFRunLoopTimerContext *context);

#endif /* CFRunLoop_Timer_create_h */
