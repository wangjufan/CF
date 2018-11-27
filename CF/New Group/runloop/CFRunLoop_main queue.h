//
//  CFRunLoop_main queue.h
//  CF
//
//  Created by 王举范 on 2018/11/26.
//  Copyright © 2018年 wangjufan. All rights reserved.
//

#ifndef CFRunLoop_main_queue_h
#define CFRunLoop_main_queue_h

#include <stdio.h>

#if DEPLOYMENT_TARGET_WINDOWS
#include <typeinfo.h>
#endif
#include <checkint.h>


#if DEPLOYMENT_TARGET_MACOSX || DEPLOYMENT_TARGET_EMBEDDED || DEPLOYMENT_TARGET_EMBEDDED_MINI
#include <sys/param.h>
#include <dispatch/private.h>
#include <CoreFoundation/CFUserNotification.h>
#include <mach/mach.h>
#include <mach/clock_types.h>
#include <mach/clock.h>
#include <unistd.h>
#include <dlfcn.h>
#include <pthread/private.h>
#include <os/voucher_private.h>
extern mach_port_t _dispatch_get_main_queue_port_4CF(void);
extern void _dispatch_main_queue_callback_4CF(mach_msg_header_t *msg);

#elif DEPLOYMENT_TARGET_WINDOWS
#include <process.h>
DISPATCH_EXPORT HANDLE _dispatch_get_main_queue_handle_4CF(void);
DISPATCH_EXPORT void _dispatch_main_queue_callback_4CF(void);
#define MACH_PORT_NULL 0
#define mach_port_name_t HANDLE
#define mach_port_t HANDLE
#define _dispatch_get_main_queue_port_4CF _dispatch_get_main_queue_handle_4CF
#define _dispatch_main_queue_callback_4CF(x) _dispatch_main_queue_callback_4CF()
#define AbsoluteTime LARGE_INTEGER

#endif


#if DEPLOYMENT_TARGET_WINDOWS || DEPLOYMENT_TARGET_IPHONESIMULATOR
CF_EXPORT pthread_t _CF_pthread_main_thread_np(void);
#define pthread_main_thread_np() _CF_pthread_main_thread_np()
#endif


#include <Block.h>
#include <Block_private.h>

#if DEPLOYMENT_TARGET_MACOSX
#define USE_DISPATCH_SOURCE_FOR_TIMERS 1
#define USE_MK_TIMER_TOO 1
#else
#define USE_DISPATCH_SOURCE_FOR_TIMERS 0
#define USE_MK_TIMER_TOO 1
#endif

#endif /* CFRunLoop_main_queue_h */
