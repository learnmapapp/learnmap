---
title: Weak references
icon: "🕸️"
branch: memory
requires: [refcell]
summary: Break Rc cycles so memory can still be freed.
---
`Rc` frees a value when its count of owners drops to zero. But if two values point at **each other** with `Rc`, neither count ever reaches zero. That's a memory leak, called a **reference cycle**.

The fix is `Weak<T>`: a pointer that doesn't count as an owner. A typical shape is a tree, where parents own their children and children only peek at their parent:

```rust title=src/main.rs
use std::cell::RefCell;
use std::rc::{Rc, Weak};

struct Node {
    name: String,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    let root = Rc::new(Node {
        name: "root".into(),
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });
    let leaf = Rc::new(Node {
        name: "leaf".into(),
        parent: RefCell::new(Rc::downgrade(&root)),
        children: RefCell::new(vec![]),
    });
    root.children.borrow_mut().push(Rc::clone(&leaf));

    if let Some(p) = leaf.parent.borrow().upgrade() {
        println!("{}'s parent is {}", leaf.name, p.name);
    }
}
```

- `Rc::downgrade(&rc)` makes a `Weak` from an `Rc`.
- `weak.upgrade()` gives back an `Option<Rc<T>>`: `Some` if the value still exists, `None` if it's already gone.

That `Option` is the point. A weak pointer never keeps a value alive, so you always have to check.

```compare java
WeakReference<Node> parent = new WeakReference<>(root);
```

```compare python
import weakref
leaf.parent = weakref.ref(root)
```

```compare javascript
const parent = new WeakRef(root);
```

```exercise
goal: "Store a weak pointer to `owner` instead of a strong one."
code: |
  let backlink: Rc<Team> = Rc::clone(&owner);
checks:
  - match: 'Weak<\s*Team\s*>'
    message: "Change the type to Weak<Team>."
  - match: 'Rc::downgrade\(\s*&owner\s*\)'
    message: Use Rc::downgrade(&owner).
solution: |
  let backlink: Weak<Team> = Rc::downgrade(&owner);
```

```quiz
question: "Why does `upgrade()` return an `Option`?"
options:
  - Because the value may already have been dropped.
  - Because Weak pointers can be null in C.
  - It doesn't; it returns Rc directly.
answer: 0
explain: A Weak doesn't keep the value alive, so by the time you upgrade it the value may be gone.
```
