---
title: Clone and Copy
icon: "🐑"
branch: memory
requires: [ownership]
summary: Why numbers copy, Strings move, and when clone is fine.
---
Assigning a number doesn't move it:

```rust
let a = 5;
let b = a;
println!("{a} {b}"); // fine
```

That's because `i32` is **Copy**: it's small, lives entirely on the stack, and duplicating it is just copying a few bytes. All the simple types are `Copy`: integers, floats, `bool`, `char`, and tuples or arrays made of them.

A `String` isn't. It points to text on the heap. A bitwise copy would give you two owners of the same text, and then Rust would free it twice. So `String` **moves**, and if you want two, you `clone()`:

```rust
let a = String::from("crab");
let b = a.clone(); // new heap allocation, same text
```

Your own types can opt in:

```rust
#[derive(Clone, Copy)]
struct Point { x: i32, y: i32 } // Copy: all fields are Copy

#[derive(Clone)]
struct Crab { name: String }    // only Clone: String isn't Copy
```

```tip
Is `.clone()` bad? No. Cloning is explicit, so you always see where copies happen. When you're learning, cloning to get past the borrow checker is totally fine. Optimise later.
```

The rule of thumb: **Copy** is implicit and cheap. **Clone** is explicit and might be expensive.

```compare python
b = a[:]           # an explicit copy of a list
b = copy.deepcopy(a)
```

```compare javascript
const b = structuredClone(a);
```

```compare java
// Primitives copy, objects share a reference. There's no move.
```

```compare kotlin
val b = a.copy() // data classes: a shallow copy
```

```compare go
b := a // structs copy, but slices and maps inside still share data
```

```quiz
question: Which of these types is NOT Copy?
options:
  - "(i32, bool)"
  - "[u8; 4]"
  - Vec<u8>
  - char
answer: 2
explain: A Vec owns heap memory, so it moves. Tuples and arrays of Copy types are Copy themselves.
```

```exercise
goal: Make `Point` Copy, so `p` is still usable after `let q = p;`.
code: |
  #[derive(Debug)]
  struct Point { x: i32, y: i32 }

  let p = Point { x: 1, y: 2 };
  let q = p;
  println!("{p:?} {q:?}");
checks:
  - match: '#\[derive\([^)]*\bCopy\b'
    message: Add Copy to the derive list.
  - match: '#\[derive\([^)]*\bClone\b'
    message: Copy requires Clone as well, so derive both.
output: "Point { x: 1, y: 2 } Point { x: 1, y: 2 }"
```
