#include "CFRunLoop_Block.h"

void CFRunLoopPerformBlock(CFRunLoopRef rl,
                           CFTypeRef mode,
                           void (^block)(void)) {
    
    CHECK_FOR_FORK();
    
    if (CFStringGetTypeID() == CFGetTypeID(mode)) {
        
        mode = CFStringCreateCopy(kCFAllocatorSystemDefault, (CFStringRef)mode);
        
        __CFRunLoopLock(rl);
        // ensure mode exists
        CFRunLoopModeRef currentMode = __CFRunLoopFindMode(rl, (CFStringRef)mode, true);
        if (currentMode) __CFRunLoopModeUnlock(currentMode);//////?????
        __CFRunLoopUnlock(rl);
        
    } else if (CFArrayGetTypeID() == CFGetTypeID(mode)) {
        
        CFIndex cnt = CFArrayGetCount((CFArrayRef)mode);
        const void **values = (const void **)malloc(sizeof(const void *) * cnt);
        CFArrayGetValues((CFArrayRef)mode, CFRangeMake(0, cnt), values);
        mode = CFSetCreate(kCFAllocatorSystemDefault, values, cnt, &kCFTypeSetCallBacks);
        __CFRunLoopLock(rl);
        // ensure modes exist
        for (CFIndex idx = 0; idx < cnt; idx++) {
            CFRunLoopModeRef currentMode = __CFRunLoopFindMode(rl, (CFStringRef)values[idx], true);
            if (currentMode) __CFRunLoopModeUnlock(currentMode);
        }
        __CFRunLoopUnlock(rl);
        free(values);
    } else if (CFSetGetTypeID() == CFGetTypeID(mode)) {
        CFIndex cnt = CFSetGetCount((CFSetRef)mode);
        const void **values = (const void **)malloc(sizeof(const void *) * cnt);
        CFSetGetValues((CFSetRef)mode, values);
        mode = CFSetCreate(kCFAllocatorSystemDefault, values, cnt, &kCFTypeSetCallBacks);
        __CFRunLoopLock(rl);
        // ensure modes exist
        for (CFIndex idx = 0; idx < cnt; idx++) {
            CFRunLoopModeRef currentMode = __CFRunLoopFindMode(rl, (CFStringRef)values[idx], true);
            if (currentMode) __CFRunLoopModeUnlock(currentMode);
        }
        __CFRunLoopUnlock(rl);
        free(values);
    } else {
        mode = NULL;
    }
    block = Block_copy(block);
    if (!mode || !block) {
        if (mode) CFRelease(mode);
        if (block) Block_release(block);
        return;
    }
    
    __CFRunLoopLock(rl);
    struct _block_item *new_item = (struct _block_item *)malloc(sizeof(struct _block_item));
    new_item->_next = NULL;
    new_item->_mode = mode;
    new_item->_block = block;
    if (!rl->_blocks_tail) {
        rl->_blocks_head = new_item;
    } else {
        rl->_blocks_tail->_next = new_item;
    }
    rl->_blocks_tail = new_item;
    __CFRunLoopUnlock(rl);
    
}

