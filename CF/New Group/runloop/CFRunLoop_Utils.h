//
//  CFRunLoop_Utils.h
//  CF
//
//  Created by 王举范 on 2018/11/23.
//  Copyright © 2018年 wangjufan. All rights reserved.
//

#ifndef CFRunLoop_Utils_h
#define CFRunLoop_Utils_h

#include <stdio.h>

#pragma mark -
#pragma mark Run Loops


typedef struct _per_run_data {
    uint32_t a;
    uint32_t b;
    uint32_t stopped;
    uint32_t ignoreWakeUps;
} _per_run_data;

struct __CFRunLoop {
    CFRuntimeBase _base;
    pthread_mutex_t _lock;            /* locked for accessing mode list */
    __CFPort _wakeUpPort;            // used for CFRunLoopWakeUp
    Boolean _unused;
    volatile _per_run_data *_perRunData;              // reset for runs of the run loop
    pthread_t _pthread;
    uint32_t _winthread;
    CFMutableSetRef _commonModes;
    CFMutableSetRef _commonModeItems;
    CFRunLoopModeRef _currentMode;
    CFMutableSetRef _modes;
    struct _block_item *_blocks_head;
    struct _block_item *_blocks_tail;
    CFAbsoluteTime _runTime;
    CFAbsoluteTime _sleepTime;
    CFTypeRef _counterpart;
};


static const CFRuntimeClass __CFRunLoopModeClass = {
    0,
    "CFRunLoopMode",
    NULL,      // init
    NULL,      // copy
    __CFRunLoopModeDeallocate,
    __CFRunLoopModeEqual,
    __CFRunLoopModeHash,
    NULL,      //
    __CFRunLoopModeCopyDescription
};
static const CFRuntimeClass __CFRunLoopClass = {
    0,
    "CFRunLoop",
    NULL,      // init
    NULL,      // copy
    __CFRunLoopDeallocate,
    NULL,
    NULL,
    NULL,      //
    __CFRunLoopCopyDescription
};


#endif /* CFRunLoop_Utils_h */
