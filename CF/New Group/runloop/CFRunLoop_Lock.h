//
//  CFRunLoop_Lock.h
//  CF
//
//  Created by 王举范 on 2018/11/26.
//  Copyright © 2018年 wangjufan. All rights reserved.
//

#ifndef CFRunLoop_Lock_h
#define CFRunLoop_Lock_h

#include <stdio.h>

CF_INLINE void __CFRunLoopLock(CFRunLoopRef rl) {
    pthread_mutex_lock(&(((CFRunLoopRef)rl)->_lock));
    //    CFLog(6, CFSTR("__CFRunLoopLock locked %p"), rl);
}
CF_INLINE void __CFRunLoopUnlock(CFRunLoopRef rl) {
    //    CFLog(6, CFSTR("__CFRunLoopLock unlocking %p"), rl);
    pthread_mutex_unlock(&(((CFRunLoopRef)rl)->_lock));
}

#endif /* CFRunLoop_Lock_h */
