---
title: Tokio
icon: "🗼"
branch: concurrency
requires: [async, crates]
summary: The async runtime that actually runs your futures.
---
An `async fn` gives you a future, which does nothing until something drives it. Rust's standard library doesn't include that "something". You pick a **runtime**, and the most popular one is **Tokio**.

```repl shell
> cargo add tokio --features full
    Adding tokio v1 to dependencies
```

```rust title=src/main.rs
use std::time::Duration;
use tokio::time::sleep;

async fn brew(name: &str, secs: u64) -> String {
    sleep(Duration::from_secs(secs)).await;
    format!("{name} is ready")
}

#[tokio::main]
async fn main() {
    let tea = tokio::spawn(brew("tea", 2));
    let coffee = tokio::spawn(brew("coffee", 1));

    println!("{}", coffee.await.unwrap()); // after 1 s
    println!("{}", tea.await.unwrap());    // after 2 s, not 3
}
```

- `#[tokio::main]` sets up the runtime and lets `main` be `async`.
- `tokio::spawn` starts a **task**, a lightweight unit of work. Thousands are fine, much cheaper than threads.
- `.await` waits for a result without blocking the thread, so other tasks keep running.

To wait for several futures at once without spawning, use `tokio::join!`:

```rust
let (a, b) = tokio::join!(brew("tea", 2), brew("coffee", 1));
```

```warn
Inside async code, use `tokio::time::sleep`, not `std::thread::sleep`. The standard one blocks the whole thread, freezing every other task on it.
```

```compare javascript
const [tea, coffee] = await Promise.all([brew("tea", 2), brew("coffee", 1)]);
```

```compare python
tea, coffee = await asyncio.gather(brew("tea", 2), brew("coffee", 1))
```

```compare kotlin
val tea = async { brew("tea", 2) }; tea.await()
```

```compare go
go brew("tea", 2) // goroutines play the role of tasks
```

```exercise
goal: "Make `main` async with Tokio: add `#[tokio::main]` and the `async` keyword."
code: |
  fn main() {
      let page = fetch("https://example.com").await;
      println!("{page}");
  }
checks:
  - match: '#\[tokio::main\]\s*async\s+fn\s+main\s*\(\s*\)'
    message: "Put #[tokio::main] on the line above async fn main()."
solution: |
  #[tokio::main]
  async fn main() {
      let page = fetch("https://example.com").await;
      println!("{page}");
  }
```

```quiz
question: Why shouldn't you call std::thread::sleep inside a Tokio task?
options:
  - It blocks the thread, so other tasks on it can't run.
  - It doesn't compile in async code.
  - It sleeps for milliseconds instead of seconds.
answer: 0
explain: Async tasks share threads. A blocking call stalls every task scheduled on that thread.
```
