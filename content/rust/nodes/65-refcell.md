---
title: RefCell
icon: "🫙"
branch: memory
requires: [rc]
summary: Interior mutability, with borrow rules checked while the program runs.
---
The borrow rules say: many readers **or** one writer. Normally the compiler checks this. But sometimes you know your code is fine and the compiler can't prove it, most often with `Rc`, which only hands out shared (read-only) access.

`RefCell<T>` moves the borrow check from compile time to **run time**. You can change the value inside through a shared reference. This is called [[interior mutability]]:

```rust title=src/main.rs
use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let log = Rc::new(RefCell::new(Vec::new()));
    let writer = Rc::clone(&log);

    writer.borrow_mut().push("started");
    writer.borrow_mut().push("done");

    println!("{:?}", log.borrow()); // ["started", "done"]
}
```

- `.borrow()` gives read access, like `&T`.
- `.borrow_mut()` gives write access, like `&mut T`.

The rules haven't gone away. Break them and the program panics:

```rust
let a = log.borrow_mut();
let b = log.borrow_mut(); // panics: already mutably borrowed
```

```repl shell
> cargo run
thread 'main' panicked at src/main.rs:5:17:
already borrowed: BorrowMutError
```

`Rc<RefCell<T>>` is the standard recipe for "shared and changeable" data in single-threaded code, like a graph of nodes. For threads, the matching pair is [Arc and Mutex](node:arc-mutex).

```tip
For simple `Copy` values like numbers, `Cell<T>` is lighter: `.get()` and `.set()`, no borrows at all.
```

```compare python
log = []      # every Python object is shared and mutable
```

```compare java
final List<String> log = new ArrayList<>(); // final ref, mutable contents
```

```compare kotlin
val log = mutableListOf<String>()
```

```exercise
goal: "Wrap the counter in a `RefCell`, then add 1 through `borrow_mut()`."
code: |
  let counter = Rc::new(0);
  *counter += 1;
checks:
  - match: 'Rc::new\(\s*RefCell::new\(\s*0\s*\)\s*\)'
    message: Create it with Rc::new(RefCell::new(0)).
  - match: '\*counter\.borrow_mut\(\)\s*\+=\s*1'
    message: "Change it with *counter.borrow_mut() += 1;"
solution: |
  let counter = Rc::new(RefCell::new(0));
  *counter.borrow_mut() += 1;
```

```quiz
question: What happens if you call borrow_mut() twice at the same time on one RefCell?
options:
  - The compiler rejects it.
  - The program panics at run time.
  - The second borrow waits for the first.
answer: 1
explain: RefCell checks the borrow rules while the program runs, and panics when they're broken.
```
