---
title: Read-write locks
icon: "📖"
branch: concurrency
requires: [arc-mutex]
summary: Many readers at once, or one writer.
---
A `Mutex` lets one thread in at a time, even if all of them only want to **read**. For data that's read often and changed rarely, like a config or a cache, that's wasteful.

`RwLock` follows the borrow rules at run time: many readers **or** one writer.

```rust title=src/main.rs
use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let config = Arc::new(RwLock::new(String::from("dark")));

    let readers: Vec<_> = (0..3)
        .map(|i| {
            let config = Arc::clone(&config);
            thread::spawn(move || {
                let theme = config.read().unwrap();
                println!("reader {i} sees {theme}");
            })
        })
        .collect();

    {
        let mut theme = config.write().unwrap();
        *theme = String::from("light");
    } // the write lock is released here

    for r in readers {
        r.join().unwrap();
    }
}
```

- `.read()` waits until no one is writing, then gives shared access. Many threads can hold it together.
- `.write()` waits until no one is reading **or** writing, then gives exclusive access.

Both return a guard, just like `Mutex::lock()`. The lock is released when the guard is dropped, which is why the write above sits in its own `{ }` block.

The `.unwrap()` is there because a lock becomes "poisoned" if a thread panics while holding it. Unwrapping passes that panic on.

```tip
Not sure which to pick? Start with `Mutex`. It's simpler and often just as fast. Switch to `RwLock` when many threads mostly read.
```

```compare java
ReadWriteLock lock = new ReentrantReadWriteLock(); lock.readLock().lock();
```

```compare go
var mu sync.RWMutex
mu.RLock(); defer mu.RUnlock()
```

```compare python
# The standard library has no RWLock; threading.Lock is the usual choice
```

```exercise
goal: "Readers don't need exclusive access. Use `RwLock` and take a `read()` lock."
code: |
  let prices = Arc::new(Mutex::new(load_prices()));
  let p = prices.lock().unwrap();
checks:
  - match: 'Arc::new\(\s*RwLock::new\('
    message: Wrap the data in RwLock::new instead of Mutex::new.
  - match: 'prices\.read\(\)\.unwrap\(\)'
    message: Use prices.read().unwrap() to read.
solution: |
  let prices = Arc::new(RwLock::new(load_prices()));
  let p = prices.read().unwrap();
```

```quiz
question: Three threads call read() on an RwLock at the same time. What happens?
options:
  - They all get access at once.
  - They take turns, one at a time.
  - The program panics.
answer: 0
explain: Read locks can be shared. Only a write lock needs exclusive access.
```
