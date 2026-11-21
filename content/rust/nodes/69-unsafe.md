---
title: Unsafe Rust
icon: "☢️"
branch: memory
requires: [deref]
summary: The escape hatch, what it allows, and why you'll rarely need it.
---
The borrow checker is conservative: it rejects some programs that are actually fine. For the rare cases where you need to do something it can't verify, there's `unsafe`.

An `unsafe` block unlocks a few extra abilities. The main ones:

- Following a **raw pointer** (`*const T` or `*mut T`).
- Calling an `unsafe fn`, including functions from C libraries.
- Changing a `static mut`.

```rust title=src/main.rs
fn main() {
    let mut n = 10;
    let p = &mut n as *mut i32; // making a raw pointer is safe

    unsafe {
        *p += 1; // following it is not
    }
    println!("{n}"); // 11
}
```

`unsafe` doesn't switch off the borrow checker for normal references. It just means: "I, the programmer, promise this is correct." If the promise is wrong, you get the same crashes as in C.

## Why it's not scary

Almost all `unsafe` code lives inside small, carefully reviewed functions that offer a **safe** interface. `Vec`, `String` and `Mutex` are built that way. You use them without ever writing `unsafe` yourself.

When you do write it, keep the block tiny and add a `// SAFETY:` comment explaining why it's correct:

```rust
// SAFETY: we just checked that index < len.
let item = unsafe { items.get_unchecked(index) };
```

```tip
If you're learning Rust, you can go a long way without `unsafe`. When the compiler fights you, a clone, an `Rc` or a redesign is usually the better answer.
```

```compare go
import "unsafe" // Go has a similar, rarely used escape hatch
```

```compare java
// sun.misc.Unsafe exists, but it's internal and discouraged
```

```compare python
import ctypes  # raw memory access through C types
```

```exercise
goal: "Following a raw pointer needs an `unsafe` block. Wrap the line in one."
code: |
  let value = *ptr;
checks:
  - match: 'unsafe\s*\{\s*\*ptr\s*\}'
    message: "Write let value = unsafe { *ptr };"
solution: |
  let value = unsafe { *ptr };
```

```quiz
question: What does an unsafe block do?
options:
  - Disables all compiler checks inside it.
  - Allows a few extra operations whose safety you must guarantee yourself.
  - Makes the code run faster.
answer: 1
explain: Normal rules still apply. unsafe only unlocks things like raw pointers, and you take responsibility for them.
```
