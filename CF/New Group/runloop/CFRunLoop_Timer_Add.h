//
//  CFRunLoop_Timer_Add.h
//  CF
//
//  Created by 王举范 on 2019/1/5.
//  Copyright © 2019年 wangjufan. All rights reserved.
//

#ifndef CFRunLoop_Timer_Add_h
#define CFRunLoop_Timer_Add_h

#include <stdio.h>

/////////////////////////////////////////////
CF_EXPORT Boolean CFRunLoopContainsTimer(CFRunLoopRef rl, CFRunLoopTimerRef timer, CFStringRef mode);
CF_EXPORT void CFRunLoopAddTimer(CFRunLoopRef rl, CFRunLoopTimerRef timer, CFStringRef mode);
CF_EXPORT void CFRunLoopRemoveTimer(CFRunLoopRef rl, CFRunLoopTimerRef timer, CFStringRef mode);


static void __CFRepositionTimerInMode(CFRunLoopModeRef rlm, CFRunLoopTimerRef rlt, Boolean isInArray) __attribute__((noinline));

static CFIndex __CFRunLoopInsertionIndexInTimerArray(CFArrayRef array, CFRunLoopTimerRef rlt) __attribute__((noinline));


#endif /* CFRunLoop_Timer_Add_h */

