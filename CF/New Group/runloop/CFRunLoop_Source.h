#ifndef CFRunLoop_Source_h
#define CFRunLoop_Source_h

#include <stdio.h>

CF_EXPORT Boolean CFRunLoopContainsSource(CFRunLoopRef rl, CFRunLoopSourceRef source, CFStringRef mode);
CF_EXPORT void CFRunLoopAddSource(CFRunLoopRef rl, CFRunLoopSourceRef source, CFStringRef mode);
CF_EXPORT void CFRunLoopRemoveSource(CFRunLoopRef rl, CFRunLoopSourceRef source, CFStringRef mode);

typedef struct {
    CFIndex    version;
    void *    info;
    const void *(*retain)(const void *info);
    void    (*release)(const void *info);
    CFStringRef    (*copyDescription)(const void *info);
    Boolean    (*equal)(const void *info1, const void *info2);
    CFHashCode    (*hash)(const void *info);
    void    (*schedule)(void *info, CFRunLoopRef rl, CFStringRef mode);
    void    (*cancel)(void *info, CFRunLoopRef rl, CFStringRef mode);
    void    (*perform)(void *info);
} CFRunLoopSourceContext;

typedef struct {
    CFIndex    version;
    void *    info;
    const void *(*retain)(const void *info);
    void    (*release)(const void *info);
    CFStringRef    (*copyDescription)(const void *info);
    Boolean    (*equal)(const void *info1, const void *info2);
    CFHashCode    (*hash)(const void *info);
#if (TARGET_OS_MAC && !(TARGET_OS_EMBEDDED || TARGET_OS_IPHONE)) || (TARGET_OS_EMBEDDED || TARGET_OS_IPHONE)
    mach_port_t    (*getPort)(void *info);
    void *    (*perform)(void *msg, CFIndex size, CFAllocatorRef allocator, void *info);
#else
    void *    (*getPort)(void *info);
    void    (*perform)(void *info);
#endif
} CFRunLoopSourceContext1;

CF_EXPORT CFTypeID CFRunLoopSourceGetTypeID(void);

CF_EXPORT CFRunLoopSourceRef CFRunLoopSourceCreate(CFAllocatorRef allocator, CFIndex order, CFRunLoopSourceContext *context);

CF_EXPORT CFIndex CFRunLoopSourceGetOrder(CFRunLoopSourceRef source);
CF_EXPORT void CFRunLoopSourceInvalidate(CFRunLoopSourceRef source);
CF_EXPORT Boolean CFRunLoopSourceIsValid(CFRunLoopSourceRef source);
CF_EXPORT void CFRunLoopSourceGetContext(CFRunLoopSourceRef source, CFRunLoopSourceContext *context);
CF_EXPORT void CFRunLoopSourceSignal(CFRunLoopSourceRef source);

#endif /* CFRunLoop_Source_h */
