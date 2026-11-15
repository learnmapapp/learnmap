---
title: async and await
icon: "⏱️"
branch: concurrency
requires: [threads, trait-bounds]
summary: Thousands of waiting tasks on a handful of threads.
---
Threads are great for CPU work. But a web server mostly *waits*: for the network, the database, a file. One thread per connection gets expensive at ten thousand connections.

`async` functions return a **future**: a value that represents work which will finish later. `.await` pauses the current task until it does, letting the thread run other tasks in the meantime:

```rust
async fn fetch_name(id: u32) -> String {
    let user = db_lookup(id).await;
    user.name
}
```

Unlike other languages, Rust's standard library doesn't include the thing that *runs* futures, the **runtime**. You pick one; Tokio is by far the most common:

```toml title=Cargo.toml
[dependencies]
tokio = { version = "1", features = ["full"] }
```

```rust
#[tokio::main]
async fn main() {
    let (a, b) = tokio::join!(fetch_name(1), fetch_name(2)); // both at once
    println!("{a} and {b}");
}
```

Futures are lazy: calling `fetch_name(1)` does nothing until it's awaited or spawned. Forgetting `.await` is a common slip, and the compiler warns about it:

```repl shell
> cargo build
warning: unused implementer of `Future` that must be used
  note: futures do nothing unless you `.await` or poll them
```

Spawn independent background tasks with `tokio::spawn`, much like threads but far cheaper:

```rust
let task = tokio::spawn(async { expensive_io().await });
let result = task.await.unwrap();
```

```warn
Don't call slow blocking code (like std::thread::sleep or heavy computation) inside async code: it freezes the whole thread and all tasks on it. Use the async versions, or tokio::task::spawn_blocking.
```

```compare javascript
async function fetchName(id) { const user = await dbLookup(id); return user.name; }
```

```compare python
async def fetch_name(id): user = await db_lookup(id); return user.name
```

```compare kotlin
suspend fun fetchName(id: Int): String = dbLookup(id).name
```

```compare java
CompletableFuture<String> name = dbLookup(id).thenApply(u -> u.name());
```

```compare go
// Goroutines block cheaply, so Go needs no async/await at all.
```

```exercise
goal: Wait for the result of `load()` before using it.
code: |
  async fn run() {
      let data = load();
      println!("{}", data.len());
  }
checks:
  - match: 'load\(\)\.await'
    message: Add .await after load()
output: "42"
```
