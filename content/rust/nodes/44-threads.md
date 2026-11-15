---
title: Threads
icon: "🧵"
kind: hub
branch: concurrency
requires: [closures, ownership]
summary: Run code in parallel, with the compiler watching your back.
---
Rust's slogan here is **fearless concurrency**. The same ownership rules that prevent dangling pointers also prevent data races, at compile time.

Start a [[thread]] with `thread::spawn` and a closure. `join` waits for it to finish:

```rust
use std::thread;

let handle = thread::spawn(|| {
    for i in 1..=3 {
        println!("worker: {i}");
    }
});

println!("main keeps going");
handle.join().unwrap();
```

Using a variable from outside? The thread might outlive the function that created it, so it can't just borrow:

```rust
let name = String::from("Ferris");
let h = thread::spawn(|| println!("hi {name}"));
```

```repl shell
> cargo build
error[E0373]: closure may outlive the current function, but it borrows `name`
  help: to force the closure to take ownership, use the `move` keyword
```

The fix is `move`, handing ownership to the thread:

```rust
let h = thread::spawn(move || println!("hi {name}"));
```

`join` returns whatever the closure returned:

```rust
let h = thread::spawn(|| (1..=100).sum::<u32>());
let total = h.join().unwrap(); // 5050
```

```tip
Scoped threads (`thread::scope`) may borrow local variables, because they're guaranteed to finish before the scope ends.
```

How do threads talk to each other? Either by sending messages, see [Channels](node:channels), or by carefully sharing memory, see [Shared state](node:arc-mutex).

```compare java
Thread t = new Thread(() -> System.out.println("hi"));
t.start(); t.join();
```

```compare kotlin
val t = thread { println("hi") }
t.join()
```

```compare go
go func() { fmt.Println("hi") }() // goroutines; use a WaitGroup to wait
```

```compare python
t = threading.Thread(target=work); t.start(); t.join()
```

```compare javascript
const worker = new Worker("work.js"); // no shared memory by default
```

```exercise
goal: Fix the error by moving `data` into the thread.
code: |
  let data = vec![1, 2, 3];
  let h = thread::spawn(|| {
      println!("{data:?}");
  });
  h.join().unwrap();
checks:
  - match: 'spawn\(\s*move\s*\|\|'
    message: "Add move before the closure: spawn(move || { ... })"
output: "[1, 2, 3]"
```
