---
title: Send and Sync
icon: "📨"
branch: concurrency
requires: [arc-mutex]
summary: The two traits that make data races a compile error.
---
How does Rust know that `Rc` can't go to another thread, but `Arc` can? Two **marker traits**, which have no methods at all. They only label what a type is allowed to do:

- `Send`: a value of this type can be **moved** to another thread.
- `Sync`: a value of this type can be **shared** between threads (through `&T`).

You almost never implement them yourself. The compiler works them out: a struct is `Send` if all its fields are `Send`, and so on.

| Type | Send | Sync | Why |
| --- | --- | --- | --- |
| `i32`, `String`, `Vec<T>` | ✅ | ✅ | plain owned data |
| `Rc<T>` | ❌ | ❌ | its counter isn't thread-safe |
| `Arc<T>` | ✅ | ✅ | atomic counter (if `T` is too) |
| `RefCell<T>` | ✅ | ❌ | borrow tracking isn't thread-safe |
| `Mutex<T>` | ✅ | ✅ | locking makes sharing safe |

`thread::spawn` requires its closure to be `Send`. That's where the error comes from when you try to use `Rc`:

```rust title=src/main.rs
use std::rc::Rc;
use std::thread;

fn main() {
    let data = Rc::new(5);
    thread::spawn(move || {
        println!("{data}");
    });
}
```

```repl shell
> cargo build
error[E0277]: `Rc<i32>` cannot be sent between threads safely
```

You can use them as bounds in your own code, for anything that will cross threads:

```rust
fn run_later<F: FnOnce() + Send + 'static>(job: F) {
    std::thread::spawn(job);
}
```

The `'static` means the job can't hold references to local variables that might disappear before the thread runs.

```compare java
// Java has no equivalent; thread safety is documented, not checked
```

```compare go
// Go's race detector (go run -race) finds races at run time instead
```

```compare kotlin
// Kotlin relies on conventions and annotations like @ThreadSafe
```

```exercise
goal: "This counter is shared between threads. Replace `Rc` with `Arc` so it's `Send`."
code: |
  let hits = Rc::new(AtomicUsize::new(0));
  let h = Rc::clone(&hits);
  thread::spawn(move || h.fetch_add(1, Ordering::Relaxed));
checks:
  - match: 'Arc::new\(\s*AtomicUsize::new\(\s*0\s*\)\s*\)'
    message: Create it with Arc::new.
  - match: 'Arc::clone\(\s*&hits\s*\)'
    message: Clone it with Arc::clone(&hits).
  - notMatch: '\bRc\b'
    message: No Rc should be left.
solution: |
  let hits = Arc::new(AtomicUsize::new(0));
  let h = Arc::clone(&hits);
  thread::spawn(move || h.fetch_add(1, Ordering::Relaxed));
```

```quiz
question: Who usually implements Send and Sync for your structs?
options:
  - You, by hand, for every struct.
  - The compiler, automatically, based on the fields.
  - The thread library at run time.
answer: 1
explain: They're auto traits. A type is Send or Sync when all of its parts are.
```
