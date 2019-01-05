/*
 * Copyright (c) 2015 Apple Inc. All rights reserved.
 *
 * @APPLE_LICENSE_HEADER_START@
 *
 * This file contains Original Code and/or Modifications of Original Code
 * as defined in and that are subject to the Apple Public Source License
 * Version 2.0 (the 'License'). You may not use this file except in
 * compliance with the License. Please obtain a copy of the License at
 * http://www.opensource.apple.com/apsl/ and read it before using this
 * file.
 *
 * The Original Code and all software distributed under the License are
 * distributed on an 'AS IS' basis, WITHOUT WARRANTY OF ANY KIND, EITHER
 * EXPRESS OR IMPLIED, AND APPLE HEREBY DISCLAIMS ALL SUCH WARRANTIES,
 * INCLUDING WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT.
 * Please see the License for the specific language governing rights and
 * limitations under the License.
 *
 * @APPLE_LICENSE_HEADER_END@
 */

/*	CFRunLoop.c
	Copyright (c) 1998-2014, Apple Inc. All rights reserved.
	Responsibility: Tony Parker
*/

#include <CoreFoundation/CFRunLoop.h>
#include <CoreFoundation/CFSet.h>
#include <CoreFoundation/CFBag.h>
#include <CoreFoundation/CFNumber.h>
#include <CoreFoundation/CFPreferences.h>
#include "CFInternal.h"
#include <math.h>
#include <stdio.h>
#include <limits.h>
#include <pthread.h>
#include <dispatch/dispatch.h>



static int _LogCFRunLoop = 0;
static void _runLoopTimerWithBlockContext(CFRunLoopTimerRef timer, void *opaqueBlock);

// for conservative arithmetic safety, such that (TIMER_DATE_LIMIT + TIMER_INTERVAL_LIMIT + kCFAbsoluteTimeIntervalSince1970) * 10^9 < 2^63
#define TIMER_DATE_LIMIT	4039289856.0
#define TIMER_INTERVAL_LIMIT	504911232.0

#define HANDLE_DISPATCH_ON_BASE_INVOCATION_ONLY 0

#define CRASH(string, errcode) do { char msg[256]; snprintf(msg, 256, string, errcode); CRSetCrashLogMessage(msg); HALT; } while (0)

#if DEPLOYMENT_TARGET_WINDOWS

static pthread_t kNilPthreadT = { nil, nil };
#define pthreadPointer(a) a.p
typedef	int kern_return_t;
#define KERN_SUCCESS 0

#else

static pthread_t kNilPthreadT = (pthread_t)0;
#define pthreadPointer(a) a
#define lockCount(a) a
#endif

#pragma mark -

#define CF_RUN_LOOP_PROBES 0

#if CF_RUN_LOOP_PROBES
#include "CFRunLoopProbes.h"
#else
#define	CFRUNLOOP_NEXT_TIMER_ARMED(arg0) do { } while (0)
#define	CFRUNLOOP_NEXT_TIMER_ARMED_ENABLED() (0)
#define	CFRUNLOOP_POLL() do { } while (0)
#define	CFRUNLOOP_POLL_ENABLED() (0)
#define	CFRUNLOOP_SLEEP() do { } while (0)
#define	CFRUNLOOP_SLEEP_ENABLED() (0)
#define	CFRUNLOOP_SOURCE_FIRED(arg0, arg1, arg2) do { } while (0)
#define	CFRUNLOOP_SOURCE_FIRED_ENABLED() (0)
#define	CFRUNLOOP_TIMER_CREATED(arg0, arg1, arg2, arg3, arg4, arg5, arg6) do { } while (0)
#define	CFRUNLOOP_TIMER_CREATED_ENABLED() (0)
#define	CFRUNLOOP_TIMER_FIRED(arg0, arg1, arg2, arg3, arg4) do { } while (0)
#define	CFRUNLOOP_TIMER_FIRED_ENABLED() (0)
#define	CFRUNLOOP_TIMER_RESCHEDULED(arg0, arg1, arg2, arg3, arg4, arg5) do { } while (0)
#define	CFRUNLOOP_TIMER_RESCHEDULED_ENABLED() (0)
#define	CFRUNLOOP_WAKEUP(arg0) do { } while (0)
#define	CFRUNLOOP_WAKEUP_ENABLED() (0)
#define	CFRUNLOOP_WAKEUP_FOR_DISPATCH() do { } while (0)
#define	CFRUNLOOP_WAKEUP_FOR_DISPATCH_ENABLED() (0)
#define	CFRUNLOOP_WAKEUP_FOR_NOTHING() do { } while (0)
#define	CFRUNLOOP_WAKEUP_FOR_NOTHING_ENABLED() (0)
#define	CFRUNLOOP_WAKEUP_FOR_SOURCE() do { } while (0)
#define	CFRUNLOOP_WAKEUP_FOR_SOURCE_ENABLED() (0)
#define	CFRUNLOOP_WAKEUP_FOR_TIMEOUT() do { } while (0)
#define	CFRUNLOOP_WAKEUP_FOR_TIMEOUT_ENABLED() (0)
#define	CFRUNLOOP_WAKEUP_FOR_TIMER() do { } while (0)
#define	CFRUNLOOP_WAKEUP_FOR_TIMER_ENABLED() (0)
#define	CFRUNLOOP_WAKEUP_FOR_WAKEUP() do { } while (0)
#define	CFRUNLOOP_WAKEUP_FOR_WAKEUP_ENABLED() (0)
#endif

// In order to reuse most of the code across Mach and Windows v1 RunLoopSources, we define a
// simple abstraction layer spanning Mach ports and Windows HANDLES
#if DEPLOYMENT_TARGET_MACOSX || DEPLOYMENT_TARGET_EMBEDDED || DEPLOYMENT_TARGET_EMBEDDED_MINI

CF_PRIVATE uint32_t __CFGetProcessPortCount(void) {
    ipc_info_space_t info;
    ipc_info_name_array_t table = 0;
    mach_msg_type_number_t tableCount = 0;
    ipc_info_tree_name_array_t tree = 0;
    mach_msg_type_number_t treeCount = 0;
    
    kern_return_t ret = mach_port_space_info(mach_task_self(), &info, &table, &tableCount, &tree, &treeCount);
    if (ret != KERN_SUCCESS) {
        return (uint32_t)0;
    }
    if (table != NULL) {
        ret = vm_deallocate(mach_task_self(), (vm_address_t)table, tableCount * sizeof(*table));
    }
    if (tree != NULL) {
        ret = vm_deallocate(mach_task_self(), (vm_address_t)tree, treeCount * sizeof(*tree));
    }
    return (uint32_t)tableCount;
}

CF_PRIVATE CFArrayRef __CFStopAllThreads(void) {
    CFMutableArrayRef suspended_list = CFArrayCreateMutable(kCFAllocatorSystemDefault, 0, NULL);
    mach_port_t my_task = mach_task_self();
    mach_port_t my_thread = mach_thread_self();
    thread_act_array_t thr_list = 0;
    mach_msg_type_number_t thr_cnt = 0;

    // really, should loop doing the stopping until no more threads get added to the list N times in a row
    kern_return_t ret = task_threads(my_task, &thr_list, &thr_cnt);
    if (ret == KERN_SUCCESS) {
        for (CFIndex idx = 0; idx < thr_cnt; idx++) {
            thread_act_t thread = thr_list[idx];
            if (thread == my_thread) continue;
            if (CFArrayContainsValue(suspended_list, CFRangeMake(0, CFArrayGetCount(suspended_list)), (const void *)(uintptr_t)thread)) continue;
            ret = thread_suspend(thread);
            if (ret == KERN_SUCCESS) {
                CFArrayAppendValue(suspended_list, (const void *)(uintptr_t)thread);
            } else {
                mach_port_deallocate(my_task, thread);
            }
        }
        vm_deallocate(my_task, (vm_address_t)thr_list, sizeof(thread_t) * thr_cnt);
    }
    mach_port_deallocate(my_task, my_thread);
    return suspended_list;
}

CF_PRIVATE void __CFRestartAllThreads(CFArrayRef threads) {
    for (CFIndex idx = 0; idx < CFArrayGetCount(threads); idx++) {
        thread_act_t thread = (thread_act_t)(uintptr_t)CFArrayGetValueAtIndex(threads, idx);
        kern_return_t ret = thread_resume(thread);
        if (ret != KERN_SUCCESS) CRASH("*** Failure from thread_resume (%d) ***", ret);
        mach_port_deallocate(mach_task_self(), thread);
    }
}

static uint32_t __CF_last_warned_port_count = 0;

static void foo() __attribute__((unused));
static void foo() {
    uint32_t pcnt = __CFGetProcessPortCount();
    if (__CF_last_warned_port_count + 1000 < pcnt) {
        CFArrayRef threads = __CFStopAllThreads();


// do stuff here
CFOptionFlags responseFlags = 0;
SInt32 result = CFUserNotificationDisplayAlert(0.0, kCFUserNotificationCautionAlertLevel, NULL, NULL, NULL, CFSTR("High Mach Port Usage"), CFSTR("This application is using a lot of Mach ports."), CFSTR("Default"), CFSTR("Altern"), CFSTR("Other b"), &responseFlags);
if (0 != result) {
    CFLog(3, CFSTR("ERROR"));
} else {
    switch (responseFlags) {
    case kCFUserNotificationDefaultResponse: CFLog(3, CFSTR("DefaultR")); break;
    case kCFUserNotificationAlternateResponse: CFLog(3, CFSTR("AltR")); break;
    case kCFUserNotificationOtherResponse: CFLog(3, CFSTR("OtherR")); break;
    case kCFUserNotificationCancelResponse: CFLog(3, CFSTR("CancelR")); break;
    }
}


        __CFRestartAllThreads(threads);
        CFRelease(threads);
        __CF_last_warned_port_count = pcnt;
    }
}


typedef mach_port_t __CFPort;
#define CFPORT_NULL MACH_PORT_NULL
typedef mach_port_t __CFPortSet;

static void __THE_SYSTEM_HAS_NO_PORTS_AVAILABLE__(kern_return_t ret) __attribute__((noinline));
static void __THE_SYSTEM_HAS_NO_PORTS_AVAILABLE__(kern_return_t ret) { HALT; };

static __CFPort __CFPortAllocate(void) {
    __CFPort result = CFPORT_NULL;
    kern_return_t ret = mach_port_allocate(mach_task_self(), MACH_PORT_RIGHT_RECEIVE, &result);
    if (KERN_SUCCESS != ret) {
        char msg[256];
        snprintf(msg, 256, "*** The system has no mach ports available. You may be able to diagnose which application(s) are using ports by using 'top' or Activity Monitor. (%d) ***", ret);
        CRSetCrashLogMessage(msg); 
        __THE_SYSTEM_HAS_NO_PORTS_AVAILABLE__(ret); 
        return CFPORT_NULL;
    }

    ret = mach_port_insert_right(mach_task_self(), result, result, MACH_MSG_TYPE_MAKE_SEND);
    if (KERN_SUCCESS != ret) CRASH("*** Unable to set send right on mach port. (%d) ***", ret);


    mach_port_limits_t limits;
    limits.mpl_qlimit = 1;
    ret = mach_port_set_attributes(mach_task_self(), result, MACH_PORT_LIMITS_INFO, (mach_port_info_t)&limits, MACH_PORT_LIMITS_INFO_COUNT);
    if (KERN_SUCCESS != ret) CRASH("*** Unable to set attributes on mach port. (%d) ***", ret);
    
    return result;
}

CF_INLINE void __CFPortFree(__CFPort port) {
    mach_port_destroy(mach_task_self(), port);
}

static void __THE_SYSTEM_HAS_NO_PORT_SETS_AVAILABLE__(kern_return_t ret) __attribute__((noinline));
static void __THE_SYSTEM_HAS_NO_PORT_SETS_AVAILABLE__(kern_return_t ret) { HALT; };

CF_INLINE __CFPortSet __CFPortSetAllocate(void) {
    __CFPortSet result;
    kern_return_t ret = mach_port_allocate(mach_task_self(), MACH_PORT_RIGHT_PORT_SET, &result);
    if (KERN_SUCCESS != ret) { __THE_SYSTEM_HAS_NO_PORT_SETS_AVAILABLE__(ret); }
    return (KERN_SUCCESS == ret) ? result : CFPORT_NULL;
}

CF_INLINE kern_return_t __CFPortSetInsert(__CFPort port, __CFPortSet portSet) {
    if (MACH_PORT_NULL == port) {
        return -1;
    }
    return mach_port_insert_member(mach_task_self(), port, portSet);
}

CF_INLINE kern_return_t __CFPortSetRemove(__CFPort port, __CFPortSet portSet) {
    if (MACH_PORT_NULL == port) {
        return -1;
    }
    return mach_port_extract_member(mach_task_self(), port, portSet);
}

CF_INLINE void __CFPortSetFree(__CFPortSet portSet) {
    kern_return_t ret;
    mach_port_name_array_t array;
    mach_msg_type_number_t idx, number;

    ret = mach_port_get_set_status(mach_task_self(), portSet, &array, &number);
    if (KERN_SUCCESS == ret) {
        for (idx = 0; idx < number; idx++) {
            mach_port_extract_member(mach_task_self(), array[idx], portSet);
        }
        vm_deallocate(mach_task_self(), (vm_address_t)array, number * sizeof(mach_port_name_t));
    }
    mach_port_destroy(mach_task_self(), portSet);
}

#elif DEPLOYMENT_TARGET_WINDOWS

typedef HANDLE __CFPort;
#define CFPORT_NULL NULL

// A simple dynamic array of HANDLEs, which grows to a high-water mark
typedef struct ___CFPortSet {
    uint16_t	used;
    uint16_t	size;
    HANDLE	*handles;
    CFLock_t lock;		// insert and remove must be thread safe, like the Mach calls
} *__CFPortSet;

CF_INLINE __CFPort __CFPortAllocate(void) {
    return CreateEventA(NULL, true, false, NULL);
}

CF_INLINE void __CFPortFree(__CFPort port) {
    CloseHandle(port);
}

static __CFPortSet __CFPortSetAllocate(void) {
    __CFPortSet result = (__CFPortSet)CFAllocatorAllocate(kCFAllocatorSystemDefault, sizeof(struct ___CFPortSet), 0);
    result->used = 0;
    result->size = 4;
    result->handles = (HANDLE *)CFAllocatorAllocate(kCFAllocatorSystemDefault, result->size * sizeof(HANDLE), 0);
    CF_SPINLOCK_INIT_FOR_STRUCTS(result->lock);
    return result;
}

static void __CFPortSetFree(__CFPortSet portSet) {
    CFAllocatorDeallocate(kCFAllocatorSystemDefault, portSet->handles);
    CFAllocatorDeallocate(kCFAllocatorSystemDefault, portSet);
}

// Returns portBuf if ports fit in that space, else returns another ptr that must be freed
static __CFPort *__CFPortSetGetPorts(__CFPortSet portSet, __CFPort *portBuf, uint32_t bufSize, uint32_t *portsUsed) {
    __CFLock(&(portSet->lock));
    __CFPort *result = portBuf;
    if (bufSize < portSet->used)
	result = (__CFPort *)CFAllocatorAllocate(kCFAllocatorSystemDefault, portSet->used * sizeof(HANDLE), 0);
    if (portSet->used > 1) {
	// rotate the ports to vaguely simulate round-robin behaviour
	uint16_t lastPort = portSet->used - 1;
	HANDLE swapHandle = portSet->handles[0];
	memmove(portSet->handles, &portSet->handles[1], lastPort * sizeof(HANDLE));
	portSet->handles[lastPort] = swapHandle;
    }
    memmove(result, portSet->handles, portSet->used * sizeof(HANDLE));
    *portsUsed = portSet->used;
    __CFUnlock(&(portSet->lock));
    return result;
}

static kern_return_t __CFPortSetInsert(__CFPort port, __CFPortSet portSet) {
    if (NULL == port) {
        return -1;
    }
    __CFLock(&(portSet->lock));
    if (portSet->used >= portSet->size) {
        portSet->size += 4;
        portSet->handles = (HANDLE *)CFAllocatorReallocate(kCFAllocatorSystemDefault, portSet->handles, portSet->size * sizeof(HANDLE), 0);
    }
    if (portSet->used >= MAXIMUM_WAIT_OBJECTS) {
        CFLog(kCFLogLevelWarning, CFSTR("*** More than MAXIMUM_WAIT_OBJECTS (%d) ports add to a port set.  The last ones will be ignored."), MAXIMUM_WAIT_OBJECTS);
    }
    portSet->handles[portSet->used++] = port;
    __CFUnlock(&(portSet->lock));
    return KERN_SUCCESS;
}

static kern_return_t __CFPortSetRemove(__CFPort port, __CFPortSet portSet) {
    int i, j;
    if (NULL == port) {
        return -1;
    }
    __CFLock(&(portSet->lock));
    for (i = 0; i < portSet->used; i++) {
        if (portSet->handles[i] == port) {
            for (j = i+1; j < portSet->used; j++) {
                portSet->handles[j-1] = portSet->handles[j];
            }
            portSet->used--;
            __CFUnlock(&(portSet->lock));
            return true;
        }
    }
    __CFUnlock(&(portSet->lock));
    return KERN_SUCCESS;
}

#endif

#if !defined(__MACTYPES__) && !defined(_OS_OSTYPES_H)
#if defined(__BIG_ENDIAN__)
typedef	struct UnsignedWide {
    UInt32		hi;
    UInt32		lo;
} UnsignedWide;
#elif defined(__LITTLE_ENDIAN__)
typedef	struct UnsignedWide {
    UInt32		lo;
    UInt32		hi;
} UnsignedWide;
#endif
typedef UnsignedWide		AbsoluteTime;
#endif

#if DEPLOYMENT_TARGET_MACOSX || DEPLOYMENT_TARGET_EMBEDDED || DEPLOYMENT_TARGET_EMBEDDED_MINI

#if USE_DISPATCH_SOURCE_FOR_TIMERS
#endif

#if USE_MK_TIMER_TOO
extern mach_port_name_t mk_timer_create(void);
extern kern_return_t mk_timer_destroy(mach_port_name_t name);
extern kern_return_t mk_timer_arm(mach_port_name_t name, AbsoluteTime expire_time);
extern kern_return_t mk_timer_cancel(mach_port_name_t name, AbsoluteTime *result_time);

CF_INLINE AbsoluteTime __CFUInt64ToAbsoluteTime(uint64_t x) {
    AbsoluteTime a;
    a.hi = x >> 32;
    a.lo = x & (uint64_t)0xFFFFFFFF;
    return a;
}
#endif

static uint32_t __CFSendTrivialMachMessage(mach_port_t port, uint32_t msg_id, CFOptionFlags options, uint32_t timeout) {
    kern_return_t result;
    mach_msg_header_t header;
    header.msgh_bits = MACH_MSGH_BITS(MACH_MSG_TYPE_COPY_SEND, 0);
    header.msgh_size = sizeof(mach_msg_header_t);
    header.msgh_remote_port = port;
    header.msgh_local_port = MACH_PORT_NULL;
    header.msgh_id = msg_id;
    result = mach_msg(&header, MACH_SEND_MSG|options, header.msgh_size, 0, MACH_PORT_NULL, timeout, MACH_PORT_NULL);
    if (result == MACH_SEND_TIMED_OUT) mach_msg_destroy(&header);
    return result;
}
#elif DEPLOYMENT_TARGET_WINDOWS

static HANDLE mk_timer_create(void) {
    return CreateWaitableTimer(NULL, FALSE, NULL);
}
static kern_return_t mk_timer_destroy(HANDLE name) {
    BOOL res = CloseHandle(name);
    if (!res) {
        DWORD err = GetLastError();
        CFLog(kCFLogLevelError, CFSTR("CFRunLoop: Unable to destroy timer: %d"), err);
    }
    return (int)res;
}
static kern_return_t mk_timer_arm(HANDLE name, LARGE_INTEGER expire_time) {
    BOOL res = SetWaitableTimer(name, &expire_time, 0, NULL, NULL, FALSE);
    if (!res) {
        DWORD err = GetLastError();
        CFLog(kCFLogLevelError, CFSTR("CFRunLoop: Unable to set timer: %d"), err);
    }
    return (int)res;
}
static kern_return_t mk_timer_cancel(HANDLE name, LARGE_INTEGER *result_time) {
    BOOL res = CancelWaitableTimer(name);
    if (!res) {
        DWORD err = GetLastError();
        CFLog(kCFLogLevelError, CFSTR("CFRunLoop: Unable to cancel timer: %d"), err);
    }
    return (int)res;
}
// The name of this function is a lie on Windows. The return value matches the argument of the fake mk_timer functions above. Note that the Windows timers expect to be given "system time". We have to do some calculations to get the right value, which is a FILETIME-like value.
CF_INLINE LARGE_INTEGER __CFUInt64ToAbsoluteTime(uint64_t desiredFireTime) {
    LARGE_INTEGER result;
    // There is a race we know about here, (timer fire time calculated -> thread suspended -> timer armed == late timer fire), but we don't have a way to avoid it at this time, since the only way to specify an absolute value to the timer is to calculate the relative time first. Fixing that would probably require not using the TSR for timers on Windows.
    uint64_t now = mach_absolute_time();
    if (now > desiredFireTime) {
        result.QuadPart = 0;
    } else {
        uint64_t timeDiff = desiredFireTime - now;
        CFTimeInterval amountOfTimeToWait = __CFTSRToTimeInterval(timeDiff);
        // Result is in 100 ns (10**-7 sec) units to be consistent with a FILETIME.
        // CFTimeInterval is in seconds.
        result.QuadPart = -(amountOfTimeToWait * 10000000);
    }
    return result;
}
#endif









CF_INLINE Boolean __CFRunLoopIsDeallocating(CFRunLoopRef rl) {
    return (Boolean)__CFBitfieldGetValue(((const CFRuntimeBase *)rl)->_cfinfo[CF_INFO_BITS], 2, 2);
}
CF_INLINE void __CFRunLoopSetDeallocating(CFRunLoopRef rl) {
    __CFBitfieldSetValue(((CFRuntimeBase *)rl)->_cfinfo[CF_INFO_BITS], 2, 2, 1);
}



static CFStringRef __CFRunLoopCopyDescription(CFTypeRef cf) {
    CFRunLoopRef rl = (CFRunLoopRef)cf;
    CFMutableStringRef result;
    result = CFStringCreateMutable(kCFAllocatorSystemDefault, 0);
#if DEPLOYMENT_TARGET_WINDOWS
    CFStringAppendFormat(result, NULL, CFSTR("<CFRunLoop %p [%p]>{wakeup port = 0x%x, stopped = %s, ignoreWakeUps = %s, \ncurrent mode = %@,\n"), cf, CFGetAllocator(cf), rl->_wakeUpPort, __CFRunLoopIsStopped(rl) ? "true" : "false", __CFRunLoopIsIgnoringWakeUps(rl) ? "true" : "false", rl->_currentMode ? rl->_currentMode->_name : CFSTR("(none)"));
#else
    CFStringAppendFormat(result, NULL, CFSTR("<CFRunLoop %p [%p]>{wakeup port = 0x%x, stopped = %s, ignoreWakeUps = %s, \ncurrent mode = %@,\n"), cf, CFGetAllocator(cf), rl->_wakeUpPort, __CFRunLoopIsStopped(rl) ? "true" : "false", __CFRunLoopIsIgnoringWakeUps(rl) ? "true" : "false", rl->_currentMode ? rl->_currentMode->_name : CFSTR("(none)"));
#endif
    CFStringAppendFormat(result, NULL, CFSTR("common modes = %@,\ncommon mode items = %@,\nmodes = %@}\n"), rl->_commonModes, rl->_commonModeItems, rl->_modes);
    return result;
}

CF_PRIVATE void __CFRunLoopDump() { // __private_extern__ to keep the compiler from discarding it
    CFShow(CFCopyDescription(CFRunLoopGetCurrent()));
}

CF_INLINE void __CFRunLoopLockInit(pthread_mutex_t *lock) {
    pthread_mutexattr_t mattr;
    pthread_mutexattr_init(&mattr);
    pthread_mutexattr_settype(&mattr, PTHREAD_MUTEX_RECURSIVE);
    int32_t mret = pthread_mutex_init(lock, &mattr);
    pthread_mutexattr_destroy(&mattr);
    if (0 != mret) {
    }
}


#if DEPLOYMENT_TARGET_WINDOWS

uint32_t _CFRunLoopGetWindowsMessageQueueMask(CFRunLoopRef rl, CFStringRef modeName) {
    if (modeName == kCFRunLoopCommonModes) {
	CFLog(kCFLogLevelError, CFSTR("_CFRunLoopGetWindowsMessageQueueMask: kCFRunLoopCommonModes unsupported"));
	HALT;
    }
    DWORD result = 0;
    __CFRunLoopLock(rl);
    CFRunLoopModeRef rlm = __CFRunLoopFindMode(rl, modeName, false);
    if (rlm) {
	result = rlm->_msgQMask;
	__CFRunLoopModeUnlock(rlm);
    }
    __CFRunLoopUnlock(rl);
    return (uint32_t)result;
}

void _CFRunLoopSetWindowsMessageQueueMask(CFRunLoopRef rl, uint32_t mask, CFStringRef modeName) {
    if (modeName == kCFRunLoopCommonModes) {
	CFLog(kCFLogLevelError, CFSTR("_CFRunLoopSetWindowsMessageQueueMask: kCFRunLoopCommonModes unsupported"));
	HALT;
    }
    __CFRunLoopLock(rl);
    CFRunLoopModeRef rlm = __CFRunLoopFindMode(rl, modeName, true);
    rlm->_msgQMask = (DWORD)mask;
    __CFRunLoopModeUnlock(rlm);
    __CFRunLoopUnlock(rl);
}

uint32_t _CFRunLoopGetWindowsThreadID(CFRunLoopRef rl) {
    return rl->_winthread;
}

CFWindowsMessageQueueHandler _CFRunLoopGetWindowsMessageQueueHandler(CFRunLoopRef rl, CFStringRef modeName) {
    if (modeName == kCFRunLoopCommonModes) {
	CFLog(kCFLogLevelError, CFSTR("_CFRunLoopGetWindowsMessageQueueMask: kCFRunLoopCommonModes unsupported"));
	HALT;
    }
    if (rl != CFRunLoopGetCurrent()) {
	CFLog(kCFLogLevelError, CFSTR("_CFRunLoopGetWindowsMessageQueueHandler: run loop parameter must be the current run loop"));
	HALT;
    }
    void (*result)(void) = NULL;
    __CFRunLoopLock(rl);
    CFRunLoopModeRef rlm = __CFRunLoopFindMode(rl, modeName, false);
    if (rlm) {
	result = rlm->_msgPump;
	__CFRunLoopModeUnlock(rlm);
    }
    __CFRunLoopUnlock(rl);
    return result;
}

void _CFRunLoopSetWindowsMessageQueueHandler(CFRunLoopRef rl, CFStringRef modeName, CFWindowsMessageQueueHandler func) {
    if (modeName == kCFRunLoopCommonModes) {
	CFLog(kCFLogLevelError, CFSTR("_CFRunLoopGetWindowsMessageQueueMask: kCFRunLoopCommonModes unsupported"));
	HALT;
    }
    if (rl != CFRunLoopGetCurrent()) {
	CFLog(kCFLogLevelError, CFSTR("_CFRunLoopGetWindowsMessageQueueHandler: run loop parameter must be the current run loop"));
	HALT;
    }
    __CFRunLoopLock(rl);
    CFRunLoopModeRef rlm = __CFRunLoopFindMode(rl, modeName, true);
    rlm->_msgPump = func;
    __CFRunLoopModeUnlock(rlm);
    __CFRunLoopUnlock(rl);
}

#endif

#pragma mark -
#pragma mark Sources

/* Bit 3 in the base reserved bits is used for invalid state in run loop objects */

CF_INLINE Boolean __CFIsValid(const void *cf) {
    return (Boolean)__CFBitfieldGetValue(((const CFRuntimeBase *)cf)->_cfinfo[CF_INFO_BITS], 3, 3);
}

CF_INLINE void __CFSetValid(void *cf) {
    __CFBitfieldSetValue(((CFRuntimeBase *)cf)->_cfinfo[CF_INFO_BITS], 3, 3, 1);
}

CF_INLINE void __CFUnsetValid(void *cf) {
    __CFBitfieldSetValue(((CFRuntimeBase *)cf)->_cfinfo[CF_INFO_BITS], 3, 3, 0);
}

struct __CFRunLoopSource {
    CFRuntimeBase _base;
    uint32_t _bits;
    pthread_mutex_t _lock;
    CFIndex _order;			/* immutable */
    CFMutableBagRef _runLoops;
    union {
	CFRunLoopSourceContext version0;	/* immutable, except invalidation */
        CFRunLoopSourceContext1 version1;	/* immutable, except invalidation */
    } _context;
};

/* Bit 1 of the base reserved bits is used for signalled state */

CF_INLINE Boolean __CFRunLoopSourceIsSignaled(CFRunLoopSourceRef rls) {
    return (Boolean)__CFBitfieldGetValue(rls->_bits, 1, 1);
}

CF_INLINE void __CFRunLoopSourceSetSignaled(CFRunLoopSourceRef rls) {
    __CFBitfieldSetValue(rls->_bits, 1, 1, 1);
}

CF_INLINE void __CFRunLoopSourceUnsetSignaled(CFRunLoopSourceRef rls) {
    __CFBitfieldSetValue(rls->_bits, 1, 1, 0);
}

CF_INLINE void __CFRunLoopSourceLock(CFRunLoopSourceRef rls) {
    pthread_mutex_lock(&(rls->_lock));
//    CFLog(6, CFSTR("__CFRunLoopSourceLock locked %p"), rls);
}

CF_INLINE void __CFRunLoopSourceUnlock(CFRunLoopSourceRef rls) {
//    CFLog(6, CFSTR("__CFRunLoopSourceLock unlocking %p"), rls);
    pthread_mutex_unlock(&(rls->_lock));
}

#pragma mark Observers

struct __CFRunLoopObserver {
    CFRuntimeBase _base;
    pthread_mutex_t _lock;
    CFRunLoopRef _runLoop;
    CFIndex _rlCount;
    CFOptionFlags _activities;		/* immutable */
    CFIndex _order;			/* immutable */
    CFRunLoopObserverCallBack _callout;	/* immutable */
    CFRunLoopObserverContext _context;	/* immutable, except invalidation */
};

/* Bit 0 of the base reserved bits is used for firing state */
/* Bit 1 of the base reserved bits is used for repeats state */

CF_INLINE Boolean __CFRunLoopObserverIsFiring(CFRunLoopObserverRef rlo) {
    return (Boolean)__CFBitfieldGetValue(((const CFRuntimeBase *)rlo)->_cfinfo[CF_INFO_BITS], 0, 0);
}

CF_INLINE void __CFRunLoopObserverSetFiring(CFRunLoopObserverRef rlo) {
    __CFBitfieldSetValue(((CFRuntimeBase *)rlo)->_cfinfo[CF_INFO_BITS], 0, 0, 1);
}

CF_INLINE void __CFRunLoopObserverUnsetFiring(CFRunLoopObserverRef rlo) {
    __CFBitfieldSetValue(((CFRuntimeBase *)rlo)->_cfinfo[CF_INFO_BITS], 0, 0, 0);
}

CF_INLINE Boolean __CFRunLoopObserverRepeats(CFRunLoopObserverRef rlo) {
    return (Boolean)__CFBitfieldGetValue(((const CFRuntimeBase *)rlo)->_cfinfo[CF_INFO_BITS], 1, 1);
}

CF_INLINE void __CFRunLoopObserverSetRepeats(CFRunLoopObserverRef rlo) {
    __CFBitfieldSetValue(((CFRuntimeBase *)rlo)->_cfinfo[CF_INFO_BITS], 1, 1, 1);
}

CF_INLINE void __CFRunLoopObserverUnsetRepeats(CFRunLoopObserverRef rlo) {
    __CFBitfieldSetValue(((CFRuntimeBase *)rlo)->_cfinfo[CF_INFO_BITS], 1, 1, 0);
}

CF_INLINE void __CFRunLoopObserverLock(CFRunLoopObserverRef rlo) {
    pthread_mutex_lock(&(rlo->_lock));
//    CFLog(6, CFSTR("__CFRunLoopObserverLock locked %p"), rlo);
}

CF_INLINE void __CFRunLoopObserverUnlock(CFRunLoopObserverRef rlo) {
//    CFLog(6, CFSTR("__CFRunLoopObserverLock unlocking %p"), rlo);
    pthread_mutex_unlock(&(rlo->_lock));
}

static void __CFRunLoopObserverSchedule(CFRunLoopObserverRef rlo, CFRunLoopRef rl, CFRunLoopModeRef rlm) {
    __CFRunLoopObserverLock(rlo);
    if (0 == rlo->_rlCount) {
	rlo->_runLoop = rl;
    }
    rlo->_rlCount++;
    __CFRunLoopObserverUnlock(rlo);
}

static void __CFRunLoopObserverCancel(CFRunLoopObserverRef rlo, CFRunLoopRef rl, CFRunLoopModeRef rlm) {
    __CFRunLoopObserverLock(rlo);
    rlo->_rlCount--;
    if (0 == rlo->_rlCount) {
	rlo->_runLoop = NULL;
    }
    __CFRunLoopObserverUnlock(rlo);
}


#pragma mark -

/* CFRunLoop */

CONST_STRING_DECL(kCFRunLoopDefaultMode, "kCFRunLoopDefaultMode")
CONST_STRING_DECL(kCFRunLoopCommonModes, "kCFRunLoopCommonModes")

// call with rl and rlm locked
static CFRunLoopSourceRef __CFRunLoopModeFindSourceForMachPort(CFRunLoopRef rl, CFRunLoopModeRef rlm, __CFPort port) {	/* DOES CALLOUT */
    CHECK_FOR_FORK();
    CFRunLoopSourceRef found = rlm->_portToV1SourceMap ? (CFRunLoopSourceRef)CFDictionaryGetValue(rlm->_portToV1SourceMap, (const void *)(uintptr_t)port) : NULL;
    return found;
}



CF_PRIVATE void __CFFinalizeRunLoop(uintptr_t data);

CFTypeID CFRunLoopGetTypeID(void) {
    static dispatch_once_t initOnce;
    dispatch_once(&initOnce, ^
     { __kCFRunLoopTypeID = _CFRuntimeRegisterClass(&__CFRunLoopClass);
        __kCFRunLoopModeTypeID = _CFRuntimeRegisterClass(&__CFRunLoopModeClass);
     });
    return __kCFRunLoopTypeID;
}

static CFRunLoopRef __CFRunLoopCreate(pthread_t t) {
    CFRunLoopRef loop = NULL;
    CFRunLoopModeRef rlm;
    uint32_t size = sizeof(struct __CFRunLoop) - sizeof(CFRuntimeBase);
    loop = (CFRunLoopRef)_CFRuntimeCreateInstance(kCFAllocatorSystemDefault, CFRunLoopGetTypeID(), size, NULL);
    if (NULL == loop) {
	return NULL;
    }
    (void)__CFRunLoopPushPerRunData(loop);
    __CFRunLoopLockInit(&loop->_lock);
    loop->_wakeUpPort = __CFPortAllocate();
    if (CFPORT_NULL == loop->_wakeUpPort) HALT;
    __CFRunLoopSetIgnoreWakeUps(loop);
    loop->_commonModes = CFSetCreateMutable(kCFAllocatorSystemDefault, 0, &kCFTypeSetCallBacks);
    CFSetAddValue(loop->_commonModes, kCFRunLoopDefaultMode);
    loop->_commonModeItems = NULL;
    loop->_currentMode = NULL;
    loop->_modes = CFSetCreateMutable(kCFAllocatorSystemDefault, 0, &kCFTypeSetCallBacks);
    loop->_blocks_head = NULL;
    loop->_blocks_tail = NULL;
    loop->_counterpart = NULL;
    loop->_pthread = t;
#if DEPLOYMENT_TARGET_WINDOWS
    loop->_winthread = GetCurrentThreadId();
#else
    loop->_winthread = 0;
#endif
    rlm = __CFRunLoopFindMode(loop, kCFRunLoopDefaultMode, true);
    if (NULL != rlm) __CFRunLoopModeUnlock(rlm);
    return loop;
}


static void __CFRunLoopRemoveAllSources(CFRunLoopRef rl, CFStringRef modeName);


static CFComparisonResult __CFRunLoopSourceComparator(const void *val1, const void *val2, void *context) {
    CFRunLoopSourceRef o1 = (CFRunLoopSourceRef)val1;
    CFRunLoopSourceRef o2 = (CFRunLoopSourceRef)val2;
    if (o1->_order < o2->_order) return kCFCompareLessThan;
    if (o2->_order < o1->_order) return kCFCompareGreaterThan;
    return kCFCompareEqualTo;
}

static void __CFRunLoopCollectSources0(const void *value, void *context) {
    CFRunLoopSourceRef rls = (CFRunLoopSourceRef)value;
    CFTypeRef *sources = (CFTypeRef *)context;
    if (0 == rls->_context.version0.version && __CFIsValid(rls) && __CFRunLoopSourceIsSignaled(rls)) {
	if (NULL == *sources) {
	    *sources = CFRetain(rls);
	} else if (CFGetTypeID(*sources) == CFRunLoopSourceGetTypeID()) {
	    CFTypeRef oldrls = *sources;
	    *sources = CFArrayCreateMutable(kCFAllocatorSystemDefault, 0, &kCFTypeArrayCallBacks);
	    CFArrayAppendValue((CFMutableArrayRef)*sources, oldrls);
	    CFArrayAppendValue((CFMutableArrayRef)*sources, rls);
	    CFRelease(oldrls);
	} else {
	    CFArrayAppendValue((CFMutableArrayRef)*sources, rls);
	}
    }
}



CF_EXPORT Boolean _CFRunLoopFinished(CFRunLoopRef rl, CFStringRef modeName) {
    CHECK_FOR_FORK();
    CFRunLoopModeRef rlm;
    Boolean result = false;
    __CFRunLoopLock(rl);
    rlm = __CFRunLoopFindMode(rl, modeName, false);
    if (NULL == rlm || __CFRunLoopModeIsEmpty(rl, rlm, NULL)) {
	result = true;
    }
    if (rlm) __CFRunLoopModeUnlock(rlm);
    __CFRunLoopUnlock(rl);
    return result;
}


#if DEPLOYMENT_TARGET_MACOSX || DEPLOYMENT_TARGET_EMBEDDED || DEPLOYMENT_TARGET_EMBEDDED_MINI

#define TIMEOUT_INFINITY (~(mach_msg_timeout_t)0)

static Boolean __CFRunLoopServiceMachPort(mach_port_name_t port,
                                          mach_msg_header_t **buffer,
                                          size_t buffer_size,
                                          mach_port_t *livePort,
                                          mach_msg_timeout_t timeout,
                                          voucher_mach_msg_state_t *voucherState,
                                          voucher_t *voucherCopy) {
    Boolean originalBuffer = true;
    kern_return_t ret = KERN_SUCCESS;
    for (;;) {		/* In that sleep of death what nightmares may come ... */
        
        mach_msg_header_t *msg = (mach_msg_header_t *)*buffer;
        msg->msgh_bits = 0;
        msg->msgh_local_port = port;
        msg->msgh_remote_port = MACH_PORT_NULL;
        msg->msgh_size = buffer_size;
        msg->msgh_id = 0;
        
        if (TIMEOUT_INFINITY == timeout) { CFRUNLOOP_SLEEP(); }
        else { CFRUNLOOP_POLL(); }
        
        ret = mach_msg(msg,
                       MACH_RCV_MSG|(voucherState ? MACH_RCV_VOUCHER : 0)|MACH_RCV_LARGE|((TIMEOUT_INFINITY != timeout) ? MACH_RCV_TIMEOUT : 0)|MACH_RCV_TRAILER_TYPE(MACH_MSG_TRAILER_FORMAT_0)|MACH_RCV_TRAILER_ELEMENTS(MACH_RCV_TRAILER_AV),
                       0, msg->msgh_size, port, timeout, MACH_PORT_NULL);

        // Take care of all voucher-related work right after mach_msg.
        // If we don't release the previous voucher we're going to leak it.
        voucher_mach_msg_revert(*voucherState);
        
        // Someone will be responsible for calling voucher_mach_msg_revert. This call makes the received voucher the current one.
        *voucherState = voucher_mach_msg_adopt(msg);
        
        if (voucherCopy) {
            if (*voucherState != VOUCHER_MACH_MSG_STATE_UNCHANGED) {
                // Caller requested a copy of the voucher at this point. By doing this right next to mach_msg we make sure that no voucher has been set in between the return of mach_msg and the use of the voucher copy.
                // CFMachPortBoost uses the voucher to drop importance explicitly. However, we want to make sure we only drop importance for a new voucher (not unchanged), so we only set the TSD when the voucher is not state_unchanged.
                *voucherCopy = voucher_copy();
            } else {
                *voucherCopy = NULL;
            }
        }

        CFRUNLOOP_WAKEUP(ret);
        if (MACH_MSG_SUCCESS == ret) {
            *livePort = msg ? msg->msgh_local_port : MACH_PORT_NULL;
            return true;
        }
        if (MACH_RCV_TIMED_OUT == ret) {
            if (!originalBuffer) free(msg);
            *buffer = NULL;
            *livePort = MACH_PORT_NULL;
            return false;
        }
        if (MACH_RCV_TOO_LARGE != ret) break;
        buffer_size = round_msg(msg->msgh_size + MAX_TRAILER_SIZE);
        if (originalBuffer) *buffer = NULL;
        originalBuffer = false;
        *buffer = realloc(*buffer, buffer_size);
    }
    HALT;
    return false;
}

#elif DEPLOYMENT_TARGET_WINDOWS

#define TIMEOUT_INFINITY INFINITE

// pass in either a portSet or onePort
static Boolean __CFRunLoopWaitForMultipleObjects(__CFPortSet portSet, HANDLE *onePort, DWORD timeout, DWORD mask, HANDLE *livePort, Boolean *msgReceived) {
    DWORD waitResult = WAIT_TIMEOUT;
    HANDLE handleBuf[MAXIMUM_WAIT_OBJECTS];
    HANDLE *handles = NULL;
    uint32_t handleCount = 0;
    Boolean freeHandles = false;
    Boolean result = false;
    
    if (portSet) {
	// copy out the handles to be safe from other threads at work
	handles = __CFPortSetGetPorts(portSet, handleBuf, MAXIMUM_WAIT_OBJECTS, &handleCount);
	freeHandles = (handles != handleBuf);
    } else {
	handles = onePort;
	handleCount = 1;
	freeHandles = FALSE;
    }
    
    // The run loop mode and loop are already in proper unlocked state from caller
    waitResult = MsgWaitForMultipleObjectsEx(__CFMin(handleCount, MAXIMUM_WAIT_OBJECTS), handles, timeout, mask, MWMO_INPUTAVAILABLE);
    
    CFAssert2(waitResult != WAIT_FAILED, __kCFLogAssertion, "%s(): error %d from MsgWaitForMultipleObjects", __PRETTY_FUNCTION__, GetLastError());
    
    if (waitResult == WAIT_TIMEOUT) {
	// do nothing, just return to caller
	result = false;
    } else if (waitResult >= WAIT_OBJECT_0 && waitResult < WAIT_OBJECT_0+handleCount) {
	// a handle was signaled
	if (livePort) *livePort = handles[waitResult-WAIT_OBJECT_0];
	result = true;
    } else if (waitResult == WAIT_OBJECT_0+handleCount) {
	// windows message received
        if (msgReceived) *msgReceived = true;
	result = true;
    } else if (waitResult >= WAIT_ABANDONED_0 && waitResult < WAIT_ABANDONED_0+handleCount) {
	// an "abandoned mutex object"
	if (livePort) *livePort = handles[waitResult-WAIT_ABANDONED_0];
	result = true;
    } else {
	CFAssert2(waitResult == WAIT_FAILED, __kCFLogAssertion, "%s(): unexpected result from MsgWaitForMultipleObjects: %d", __PRETTY_FUNCTION__, waitResult);
	result = false;
    }
    
    if (freeHandles) {
	CFAllocatorDeallocate(kCFAllocatorSystemDefault, handles);
    }
    
    return result;
}

#endif


