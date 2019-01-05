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

static void __CFRepositionTimerInMode(CFRunLoopModeRef rlm, CFRunLoopTimerRef rlt, Boolean isInArray) __attribute__((noinline));

static CFIndex __CFRunLoopInsertionIndexInTimerArray(CFArrayRef array, CFRunLoopTimerRef rlt) __attribute__((noinline));

#endif /* CFRunLoop_Timer_Trigger_h */
