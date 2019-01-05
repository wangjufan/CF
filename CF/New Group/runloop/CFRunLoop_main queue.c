 

#include "CFRunLoop_main queue.h"

static void __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__() __attribute__((noinline));
static void __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__(void *msg) {
    _dispatch_main_queue_callback_4CF(msg);
    asm __volatile__(""); // thwart tail-call optimization
}


// in libdispatch
//
//void
//_dispatch_main_queue_callback_4CF(mach_msg_header_t *msg DISPATCH_UNUSED)
//{
//    if (main_q_is_draining) {
//        return;
//    }
//    _dispatch_queue_set_mainq_drain_state(true);
//    _dispatch_main_queue_drain();
//    _dispatch_queue_set_mainq_drain_state(false);
//}
