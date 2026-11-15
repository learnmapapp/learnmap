---
title: Drop and scopes
icon: "🧹"
branch: memory
requires: [ownership, traits]
summary: Cleanup that runs automatically, at a moment you can predict.
---
When a value's owner goes out of scope, Rust **drops** it. For a `String` that means freeing its memory. For a `File`, closing it. For a lock, unlocking it.

You can hook into this with the `Drop` trait:

```rust
struct Noisy(&'static str);

impl Drop for Noisy {
    fn drop(&mut self) {
        println!("dropping {}", self.0);
    }
}

fn main() {
    let _a = Noisy("a");
    {
        let _b = Noisy("b");
        println!("inner scope ends");
    }
    println!("main ends");
}
```

```repl shell
> cargo run
inner scope ends
dropping b
main ends
dropping a
```

Values are dropped in reverse order of creation, at the closing brace. That's deterministic: no waiting for a garbage collector.

This pattern is called **RAII**: tie a resource to a value's lifetime, and cleanup can't be forgotten. You'll never write `file.close()` or `finally` in Rust.

Want to drop something early? Call `drop(value)`. It just takes ownership and lets the value fall out of scope:

```rust
let guard = lock.lock().unwrap();
// … use the data …
drop(guard); // unlock now, not at the end of the function
```

```compare java
try (var file = new FileReader("crab.txt")) { /* closed at the end */ }
```

```compare kotlin
File("crab.txt").bufferedReader().use { /* closed at the end */ }
```

```compare python
with open("crab.txt") as f:
    ...  # closed at the end
```

```compare javascript
// No deterministic cleanup; use try/finally.
```

```compare go
f, _ := os.Open("crab.txt")
defer f.Close()
```

```quiz
question: "In what order are `let a`, then `let b` dropped at the end of a scope?"
options:
  - a, then b
  - b, then a
  - Whenever the garbage collector runs
answer: 1
explain: Reverse order of creation, like a stack. Later values may depend on earlier ones, so they go first.
```
