---
title: Shared state
icon: "🔒"
branch: concurrency
requires: [threads, rc]
summary: Arc and Mutex, for data many threads can change.
---
Sometimes threads need to work on the same data, like a shared counter. You need two things:

- **Several owners** across threads: `Arc<T>`, the thread-safe version of `Rc` (Atomic Reference Counted).
- **One writer at a time**: `Mutex<T>`, a lock around the data.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
    let counter = Arc::clone(&counter);
    handles.push(thread::spawn(move || {
        let mut n = counter.lock().unwrap();
        *n += 1;
    }));
}

for h in handles {
    h.join().unwrap();
}
println!("{}", *counter.lock().unwrap()); // 10
```

Notice that a Rust `Mutex` *contains* the data. You can't touch it without locking first, so "forgot to take the lock" bugs can't happen. The lock is released when the guard `n` is dropped.

Try it with `Rc` instead and the compiler stops you:

```repl shell
> cargo build
error[E0277]: `Rc<Mutex<i32>>` cannot be sent between threads safely
  the trait `Send` is not implemented for `Rc<Mutex<i32>>`
```

`Send` and `Sync` are marker traits the compiler tracks automatically: which types may move to, or be shared between, threads. `Rc` uses a non-atomic counter, so it's not `Send`.

```tip
Mostly reading? `RwLock` allows many readers or one writer. Just a number? `AtomicUsize` needs no lock at all.
```

```compare java
AtomicInteger counter = new AtomicInteger();
synchronized (lock) { shared.add(x); } // nothing forces you to lock
```

```compare kotlin
val mutex = Mutex()
mutex.withLock { counter++ }
```

```compare go
var mu sync.Mutex
mu.Lock(); counter++; mu.Unlock() // the mutex sits next to the data
```

```compare python
lock = threading.Lock()
with lock: counter += 1
```

```compare javascript
// Shared memory needs SharedArrayBuffer and Atomics; rare in practice.
```

```exercise
goal: Wrap the Mutex in an Arc, so it can be shared between threads.
code: |
  let scores = Mutex::new(Vec::new());
checks:
  - match: 'Arc::new\(\s*Mutex::new\(\s*Vec::new\(\)\s*\)\s*\)'
    message: Use Arc::new(Mutex::new(Vec::new()))
output: Arc<Mutex<Vec<i32>>>
```
