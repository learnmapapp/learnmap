---
title: Box
icon: "📦"
branch: memory
requires: [ownership, enums]
summary: Put a value on the heap, and build recursive types.
---
Most values live on the **stack**, which is fast but needs to know every size at compile time. `Box<T>` puts a value on the **heap** and keeps a small pointer to it:

```rust
let b = Box::new(5);
println!("{}", b + 1); // a Box acts like the value inside
```

A Box owns its value. When the Box goes out of scope, the heap memory is freed. No GC, no `free()`.

Why bother? The classic case is a recursive type. This doesn't compile:

```rust
enum List {
    Node(i32, List),
    Empty,
}
```

```repl shell
> cargo build
error[E0072]: recursive type `List` has infinite size
  help: insert some indirection (e.g., a `Box`, `Rc`, or `&`) to break the cycle
```

A `List` would contain a `List` which contains a `List`… The size is infinite. A Box has a fixed size (one pointer), which breaks the loop:

```rust
enum List {
    Node(i32, Box<List>),
    Empty,
}

let tail = List::Node(2, Box::new(List::Empty));
let list = List::Node(1, Box::new(tail));
```

Other reasons to box:

- A huge value you want to move around cheaply.
- A value whose type is only known at runtime: `Box<dyn Trait>`, see [Trait objects](node:trait-objects).

```compare java
// Every object already lives on the heap behind a reference.
class Node { int value; Node next; }
```

```compare kotlin
// references, like Box (or Option<Box>)
class Node(val value: Int, val next: Node?)
```

```compare go
type Node struct { value int; next *Node }
```

```compare python
# Every object is on the heap; recursive classes just work.
```

```compare javascript
const list = { value: 1, next: { value: 2, next: null } };
```

```exercise
goal: Fix the recursive type by boxing the inner Tree values.
code: |
  enum Tree {
      Leaf(i32),
      Branch(Tree, Tree),
  }
checks:
  - match: 'Branch\s*\(\s*Box<\s*Tree\s*>\s*,\s*Box<\s*Tree\s*>\s*\)'
    message: "Wrap both: Branch(Box<Tree>, Box<Tree>)"
output: enum Tree compiles
```
