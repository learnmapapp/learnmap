---
title: Atomics
icon: "⚛️"
branch: concurrency
requires: [send-sync]
summary: Lock-free counters and flags.
---
For a single number or flag shared between threads, a `Mutex` is overkill. **Atomic** types are changed in one indivisible step by the CPU itself, so no lock is needed:

```rust title=src/main.rs
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;
use std::thread;

fn main() {
    let visits = Arc::new(AtomicUsize::new(0));

    let handles: Vec<_> = (0..8)
        .map(|_| {
            let visits = Arc::clone(&visits);
            thread::spawn(move || {
                for _ in 0..1000 {
                    visits.fetch_add(1, Ordering::Relaxed);
                }
            })
        })
        .collect();

    for h in handles {
        h.join().unwrap();
    }
    println!("{}", visits.load(Ordering::Relaxed)); // 8000, every time
}
```

Notice there's no `mut` anywhere. Atomics change through a shared reference, like `RefCell` but thread-safe.

The common methods:

- `load(order)` reads the value; `store(v, order)` writes one.
- `fetch_add(n, order)` adds and returns the old value. There's `fetch_sub` too.
- `swap` and `compare_exchange` for fancier updates.

There are `AtomicBool`, `AtomicI32`, `AtomicU64` and more.

## What's `Ordering`?

It controls how this operation lines up with memory operations around it. For a plain counter or statistic, `Ordering::Relaxed` is fine. When an atomic flag guards *other* data ("the result is ready, go read it"), use `Ordering::SeqCst`, the strictest and simplest option, unless you really know the details.

```compare java
AtomicInteger visits = new AtomicInteger(); visits.incrementAndGet();
```

```compare go
var visits atomic.Int64
visits.Add(1)
```

```compare kotlin
val visits = AtomicInteger(); visits.incrementAndGet()
```

```exercise
goal: "Replace the mutex-protected flag with an `AtomicBool`, and set it with `store(true, Ordering::SeqCst)`."
code: |
  let done = Mutex::new(false);
  *done.lock().unwrap() = true;
checks:
  - match: 'AtomicBool::new\(\s*false\s*\)'
    message: Create it with AtomicBool::new(false).
  - match: 'done\.store\(\s*true\s*,\s*Ordering::SeqCst\s*\)'
    message: "Set it with done.store(true, Ordering::SeqCst);"
  - notMatch: 'Mutex'
    message: No Mutex is needed any more.
solution: |
  let done = AtomicBool::new(false);
  done.store(true, Ordering::SeqCst);
```

```quiz
question: Why does visits end at exactly 8000 without a lock?
options:
  - fetch_add happens as one indivisible step, so no increment is lost.
  - The threads happen to run one after another.
  - Relaxed ordering adds a hidden lock.
answer: 0
explain: An atomic read-modify-write can't be interrupted halfway, so two threads can't overwrite each other's update.
```
