//
//  CFRunLoop_Run.h
//  CF
//
//  Created by 王举范 on 2018/11/26.
//  Copyright © 2018年 wangjufan. All rights reserved.
//

#ifndef CFRunLoop_Run_h
#define CFRunLoop_Run_h

#include <stdio.h>

//定时器-观察者-处理源0-是否有源1，有处理事件；没有更新费Mach计时器，，去处理事件
//{{普通timer（循环内设置）-Mach timer（系统设置）->main queue （循环内设置）->mach 1 （默认事件）->} -> blocks }
/*
 系统如何 激发MACH计时器的？
 
 */

static int32_t __CFRunLoopRun(CFRunLoopRef rl, CFRunLoopModeRef rlm, CFTimeInterval seconds, Boolean stopAfterHandle, CFRunLoopModeRef previousMode) __attribute__((noinline));

CF_EXPORT void CFRunLoopRun(void);
CF_EXPORT SInt32 CFRunLoopRunInMode(CFStringRef mode,
                                    CFTimeInterval seconds,
                                    Boolean returnAfterSourceHandled);

CF_EXPORT Boolean CFRunLoopIsWaiting(CFRunLoopRef rl);
CF_EXPORT void CFRunLoopWakeUp(CFRunLoopRef rl);
CF_EXPORT void CFRunLoopStop(CFRunLoopRef rl);

#endif /* CFRunLoop_Run_h */

