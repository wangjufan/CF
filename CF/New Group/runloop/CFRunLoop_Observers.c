#include "CFRunLoop_Observers.h"

Boolean CFRunLoopContainsObserver(CFRunLoopRef rl, CFRunLoopObserverRef rlo, CFStringRef modeName) {
    CHECK_FOR_FORK();
    CFRunLoopModeRef rlm;
    Boolean hasValue = false;
    __CFRunLoopLock(rl);
    if (modeName == kCFRunLoopCommonModes) {
        if (NULL != rl->_commonModeItems) {
            hasValue = CFSetContainsValue(rl->_commonModeItems, rlo);
        }
    } else {
        rlm = __CFRunLoopFindMode(rl, modeName, false);
        if (NULL != rlm && NULL != rlm->_observers) {
            hasValue = CFArrayContainsValue(rlm->_observers, CFRangeMake(0, CFArrayGetCount(rlm->_observers)), rlo);
        }
        if (NULL != rlm) {
            __CFRunLoopModeUnlock(rlm);
        }
    }
    __CFRunLoopUnlock(rl);
    return hasValue;
}

void CFRunLoopAddObserver(CFRunLoopRef rl,
                          CFRunLoopObserverRef rlo,
                          CFStringRef modeName) {
    
    CHECK_FOR_FORK();
    CFRunLoopModeRef rlm;
    if (__CFRunLoopIsDeallocating(rl)) return;
    if (!__CFIsValid(rlo) || (NULL != rlo->_runLoop && rlo->_runLoop != rl)) return;
    
    __CFRunLoopLock(rl);
    
    if (modeName == kCFRunLoopCommonModes) {
        
        CFSetRef set = rl->_commonModes ? CFSetCreateCopy(kCFAllocatorSystemDefault, rl->_commonModes) : NULL;
        
        if (NULL == rl->_commonModeItems) {
            rl->_commonModeItems = CFSetCreateMutable(kCFAllocatorSystemDefault,
                                                      0, &kCFTypeSetCallBacks);
        }
        
        CFSetAddValue(rl->_commonModeItems, rlo);///just add
        if (NULL != set) {
            CFTypeRef context[2] = {rl, rlo};
            /* add new item to all common-modes */
            CFSetApplyFunction(set, (__CFRunLoopAddItemToCommonModes), (void *)context);
            CFRelease(set);
        }
    } else {
        rlm = __CFRunLoopFindMode(rl, modeName, true);
        if (NULL != rlm && NULL == rlm->_observers)
        {
            rlm->_observers = CFArrayCreateMutable(kCFAllocatorSystemDefault,
                                                   0, &kCFTypeArrayCallBacks);
        }
        if (NULL != rlm
            && !CFArrayContainsValue(
                        rlm->_observers,
                        CFRangeMake(0, CFArrayGetCount(rlm->_observers)),
                        rlo))
        {
            Boolean inserted = false;
            for (CFIndex idx = CFArrayGetCount(rlm->_observers); idx--; )
            {
                CFRunLoopObserverRef obs = (CFRunLoopObserverRef)CFArrayGetValueAtIndex(rlm->_observers, idx);
                if (obs->_order <= rlo->_order) {// 1 2 3 ...递增插入
                    CFArrayInsertValueAtIndex(rlm->_observers, idx + 1, rlo);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                CFArrayInsertValueAtIndex(rlm->_observers, 0, rlo);
            }
            rlm->_observerMask |= rlo->_activities;
            __CFRunLoopObserverSchedule(rlo, rl, rlm);
        }
        if (NULL != rlm) {
            __CFRunLoopModeUnlock(rlm);
        }
    }
    __CFRunLoopUnlock(rl);
}

void CFRunLoopRemoveObserver(CFRunLoopRef rl, CFRunLoopObserverRef rlo, CFStringRef modeName) {
    CHECK_FOR_FORK();
    CFRunLoopModeRef rlm;
    __CFRunLoopLock(rl);
    if (modeName == kCFRunLoopCommonModes) {
        if (NULL != rl->_commonModeItems && CFSetContainsValue(rl->_commonModeItems, rlo)) {
            CFSetRef set = rl->_commonModes ? CFSetCreateCopy(kCFAllocatorSystemDefault, rl->_commonModes) : NULL;
            CFSetRemoveValue(rl->_commonModeItems, rlo);
            if (NULL != set) {
                CFTypeRef context[2] = {rl, rlo};
                /* remove new item from all common-modes */
                CFSetApplyFunction(set, (__CFRunLoopRemoveItemFromCommonModes), (void *)context);
                CFRelease(set);
            }
        } else {
        }
    } else {
        rlm = __CFRunLoopFindMode(rl, modeName, false);
        if (NULL != rlm && NULL != rlm->_observers) {
            CFRetain(rlo);
            CFIndex idx = CFArrayGetFirstIndexOfValue(rlm->_observers, CFRangeMake(0, CFArrayGetCount(rlm->_observers)), rlo);
            if (kCFNotFound != idx) {
                CFArrayRemoveValueAtIndex(rlm->_observers, idx);
                __CFRunLoopObserverCancel(rlo, rl, rlm);
            }
            CFRelease(rlo);
        }
        if (NULL != rlm) {
            __CFRunLoopModeUnlock(rlm);
        }
    }
    __CFRunLoopUnlock(rl);
}

///////////////////////////////////////////////

/* CFRunLoopObserver */

static CFStringRef __CFRunLoopObserverCopyDescription(CFTypeRef cf) {    /* DOES CALLOUT */
    CFRunLoopObserverRef rlo = (CFRunLoopObserverRef)cf;
    CFStringRef result;
    CFStringRef contextDesc = NULL;
    if (NULL != rlo->_context.copyDescription) {
        contextDesc = rlo->_context.copyDescription(rlo->_context.info);
    }
    if (!contextDesc) {
        contextDesc = CFStringCreateWithFormat(kCFAllocatorSystemDefault, NULL, CFSTR("<CFRunLoopObserver context %p>"), rlo->_context.info);
    }
#if DEPLOYMENT_TARGET_WINDOWS
    result = CFStringCreateWithFormat(kCFAllocatorSystemDefault, NULL, CFSTR("<CFRunLoopObserver %p [%p]>{valid = %s, activities = 0x%x, repeats = %s, order = %d, callout = %p, context = %@}"), cf, CFGetAllocator(rlo), __CFIsValid(rlo) ? "Yes" : "No", rlo->_activities, __CFRunLoopObserverRepeats(rlo) ? "Yes" : "No", rlo->_order, rlo->_callout, contextDesc);
#elif DEPLOYMENT_TARGET_MACOSX || DEPLOYMENT_TARGET_EMBEDDED || DEPLOYMENT_TARGET_EMBEDDED_MINI
    void *addr = rlo->_callout;
    Dl_info info;
    const char *name = (dladdr(addr, &info) && info.dli_saddr == addr && info.dli_sname) ? info.dli_sname : "???";
    result = CFStringCreateWithFormat(kCFAllocatorSystemDefault, NULL, CFSTR("<CFRunLoopObserver %p [%p]>{valid = %s, activities = 0x%lx, repeats = %s, order = %ld, callout = %s (%p), context = %@}"), cf, CFGetAllocator(rlo), __CFIsValid(rlo) ? "Yes" : "No", (long)rlo->_activities, __CFRunLoopObserverRepeats(rlo) ? "Yes" : "No", (long)rlo->_order, name, addr, contextDesc);
#endif
    CFRelease(contextDesc);
    return result;
}

static void __CFRunLoopObserverDeallocate(CFTypeRef cf) {    /* DOES CALLOUT */
    CFRunLoopObserverRef rlo = (CFRunLoopObserverRef)cf;
    CFRunLoopObserverInvalidate(rlo);
    pthread_mutex_destroy(&rlo->_lock);
}

static const CFRuntimeClass __CFRunLoopObserverClass = {
    0,
    "CFRunLoopObserver",
    NULL,      // init
    NULL,      // copy
    __CFRunLoopObserverDeallocate,
    NULL,
    NULL,
    NULL,      //
    __CFRunLoopObserverCopyDescription
};

CFTypeID CFRunLoopObserverGetTypeID(void) {
    static dispatch_once_t initOnce;
    dispatch_once(&initOnce, ^{ __kCFRunLoopObserverTypeID = _CFRuntimeRegisterClass(&__CFRunLoopObserverClass); });
    return __kCFRunLoopObserverTypeID;
}

CFRunLoopObserverRef CFRunLoopObserverCreate(CFAllocatorRef allocator,
                                             CFOptionFlags activities,
                                             Boolean repeats,
                                             CFIndex order,
                                             CFRunLoopObserverCallBack callout,
                                             CFRunLoopObserverContext *context) {
    CHECK_FOR_FORK();
    CFRunLoopObserverRef memory;
    UInt32 size;
    size = sizeof(struct __CFRunLoopObserver) - sizeof(CFRuntimeBase);
    memory = (CFRunLoopObserverRef)_CFRuntimeCreateInstance(allocator, CFRunLoopObserverGetTypeID(), size, NULL);
    if (NULL == memory) {
        return NULL;
    }
    __CFSetValid(memory);
    __CFRunLoopObserverUnsetFiring(memory);
    if (repeats) {
        __CFRunLoopObserverSetRepeats(memory);
    } else {
        __CFRunLoopObserverUnsetRepeats(memory);
    }
    __CFRunLoopLockInit(&memory->_lock);
    memory->_runLoop = NULL;
    memory->_rlCount = 0;
    memory->_activities = activities;
    memory->_order = order;
    memory->_callout = callout;
    if (context) {
        if (context->retain) {
            memory->_context.info = (void *)context->retain(context->info);
        } else {
            memory->_context.info = context->info;
        }
        memory->_context.retain = context->retain;
        memory->_context.release = context->release;
        memory->_context.copyDescription = context->copyDescription;
    } else {
        memory->_context.info = 0;
        memory->_context.retain = 0;
        memory->_context.release = 0;
        memory->_context.copyDescription = 0;
    }
    return memory;
}

static void _runLoopObserverWithBlockContext(CFRunLoopObserverRef observer, CFRunLoopActivity activity, void *opaqueBlock) {
    typedef void (^observer_block_t) (CFRunLoopObserverRef observer, CFRunLoopActivity activity);
    observer_block_t block = (observer_block_t)opaqueBlock;
    block(observer, activity);
}

CFRunLoopObserverRef CFRunLoopObserverCreateWithHandler(CFAllocatorRef allocator,
                                                        CFOptionFlags activities,
                                                        Boolean repeats,
                                                        CFIndex order,
                                                        void (^block) (CFRunLoopObserverRef observer,
                                                            CFRunLoopActivity activity)) {
    CFRunLoopObserverContext blockContext;
    blockContext.version = 0;
    blockContext.info = (void *)block;
    blockContext.retain = (const void *(*)(const void *info))_Block_copy;
    blockContext.release = (void (*)(const void *info))_Block_release;
    blockContext.copyDescription = NULL;
    return CFRunLoopObserverCreate(allocator, activities, repeats, order, _runLoopObserverWithBlockContext, &blockContext);
}

CFOptionFlags CFRunLoopObserverGetActivities(CFRunLoopObserverRef rlo) {
    CHECK_FOR_FORK();
    __CFGenericValidateType(rlo, CFRunLoopObserverGetTypeID());
    return rlo->_activities;
}

CFIndex CFRunLoopObserverGetOrder(CFRunLoopObserverRef rlo) {
    CHECK_FOR_FORK();
    __CFGenericValidateType(rlo, CFRunLoopObserverGetTypeID());
    return rlo->_order;
}

Boolean CFRunLoopObserverDoesRepeat(CFRunLoopObserverRef rlo) {
    CHECK_FOR_FORK();
    __CFGenericValidateType(rlo, CFRunLoopObserverGetTypeID());
    return __CFRunLoopObserverRepeats(rlo);
}

void CFRunLoopObserverInvalidate(CFRunLoopObserverRef rlo) {    /* DOES CALLOUT */
    CHECK_FOR_FORK();
    __CFGenericValidateType(rlo, CFRunLoopObserverGetTypeID());
    __CFRunLoopObserverLock(rlo);
    CFRetain(rlo);
    if (__CFIsValid(rlo)) {
        CFRunLoopRef rl = rlo->_runLoop;
        void *info = rlo->_context.info;
        rlo->_context.info = NULL;
        __CFUnsetValid(rlo);
        if (NULL != rl) {
            // To avoid A->B, B->A lock ordering issues when coming up
            // towards the run loop from an observer, it has to be
            // unlocked, which means we have to protect from object
            // invalidation.
            CFRetain(rl);
            __CFRunLoopObserverUnlock(rlo);
            // CFRunLoopRemoveObserver will lock the run loop while it
            // needs that, but we also lock it out here to keep
            // changes from occurring for this whole sequence.
            __CFRunLoopLock(rl);
            CFArrayRef array = CFRunLoopCopyAllModes(rl);
            for (CFIndex idx = CFArrayGetCount(array); idx--;) {
                CFStringRef modeName = (CFStringRef)CFArrayGetValueAtIndex(array, idx);
                CFRunLoopRemoveObserver(rl, rlo, modeName);
            }
            CFRunLoopRemoveObserver(rl, rlo, kCFRunLoopCommonModes);
            __CFRunLoopUnlock(rl);
            CFRelease(array);
            CFRelease(rl);
            __CFRunLoopObserverLock(rlo);
        }
        if (NULL != rlo->_context.release) {
            rlo->_context.release(info);        /* CALLOUT */
        }
    }
    __CFRunLoopObserverUnlock(rlo);
    CFRelease(rlo);
}

Boolean CFRunLoopObserverIsValid(CFRunLoopObserverRef rlo) {
    CHECK_FOR_FORK();
    return __CFIsValid(rlo);
}

void CFRunLoopObserverGetContext(CFRunLoopObserverRef rlo, CFRunLoopObserverContext *context) {
    CHECK_FOR_FORK();
    __CFGenericValidateType(rlo, CFRunLoopObserverGetTypeID());
    CFAssert1(0 == context->version, __kCFLogAssertion, "%s(): context version not initialized to 0", __PRETTY_FUNCTION__);
    *context = rlo->_context;
}

