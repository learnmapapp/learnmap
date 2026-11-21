---
title: Scoped threads
icon: "🔭"
branch: concurrency
requires: [threads, borrowing]
summary: Threads that can borrow local data, because they're guaranteed to finish.
---
`thread::spawn` needs `move` and owned data, because the new thread might outlive the function that started it. That's why you end up wrapping things in `Arc`.

But often you start some threads and wait for all of them right away. **Scoped threads** promise exactly that, so they're allowed to borrow:

```rust title=src/main.rs
use std::thread;

fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6];
    let (left, right) = numbers.split_at(3);

    let (a, b) = thread::scope(|s| {
        let first = s.spawn(|| left.iter().sum::<i32>());
        let second = s.spawn(|| right.iter().sum::<i32>());
        (first.join().unwrap(), second.join().unwrap())
    });

    println!("{a} + {b} = {}", a + b); // 6 + 15 = 21
    println!("{numbers:?}");           // still ours
}
```

`thread::scope` doesn't return until every thread spawned with `s.spawn` has finished. Because of that guarantee, the threads can borrow `left`, `right` or anything else from the surrounding function. No `Arc`, no `move`, no cloning.

The borrow rules still apply. Two threads can read the same data, but only one can borrow it mutably:

```rust
let mut total = 0;
thread::scope(|s| {
    s.spawn(|| total += 1);
    s.spawn(|| total += 1); // error: total is already borrowed mutably
});
```

```tip
For splitting work over a big slice, `chunks()` plus scoped threads is a neat pattern. For heavier use, the `rayon` crate does it for you with `par_iter()`.
```

```compare go
var wg sync.WaitGroup
wg.Add(2); go func() { defer wg.Done() }(); wg.Wait()
```

```compare java
try (var scope = new StructuredTaskScope<>()) { scope.fork(task); scope.join(); }
```

```compare kotlin
coroutineScope { launch { work() }; launch { work() } }
```

```exercise
goal: "Run the `count_words(&text)` call in a scoped thread with `thread::scope` and `s.spawn`."
code: |
  let text = load_book();
  let words = count_words(&text);
checks:
  - match: 'thread::scope\(\s*\|\s*s\s*\|'
    message: "Use thread::scope(|s| { ... })."
  - match: 's\.spawn\(\s*\|\|\s*count_words\(\s*&text\s*\)\s*\)'
    message: "Inside, call s.spawn(|| count_words(&text))."
  - match: '\.join\(\)'
    message: Join the handle to get the result.
solution: |
  let text = load_book();
  let words = thread::scope(|s| {
      s.spawn(|| count_words(&text)).join().unwrap()
  });
```

```quiz
question: Why can scoped threads borrow local variables?
options:
  - thread::scope waits for all its threads before returning.
  - They run on the same thread.
  - They copy every variable first.
answer: 0
explain: The borrowed data is guaranteed to outlive the threads, so the borrow checker is happy.
```
