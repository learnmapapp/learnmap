---
title: Queues with VecDeque
icon: "🚶"
branch: collections
requires: [vectors]
summary: Add and remove at both ends, quickly.
---
A `Vec` is fast at the **end**: `push` and `pop` are cheap. Removing from the **front** with `remove(0)` is slow, because every other element has to shift over.

For a queue (first in, first out), use `VecDeque`, a "double-ended queue":

```rust title=src/main.rs
use std::collections::VecDeque;

fn main() {
    let mut line = VecDeque::new();
    line.push_back("Ann");
    line.push_back("Ben");
    line.push_back("Cleo");

    while let Some(person) = line.pop_front() {
        println!("serving {person}");
    }
    // serving Ann
    // serving Ben
    // serving Cleo
}
```

Both ends are cheap:

| Front | Back |
| --- | --- |
| `push_front(x)` | `push_back(x)` |
| `pop_front()` | `pop_back()` |
| `front()` | `back()` |

You can still index it (`line[0]`), loop over it, and check `len()`, just like a `Vec`.

A handy pattern is a "last N items" buffer, for example the five most recent log lines:

```rust
recent.push_back(line);
if recent.len() > 5 {
    recent.pop_front();
}
```

```compare python
from collections import deque
line = deque(); line.append("Ann"); line.popleft()
```

```compare java
Deque<String> line = new ArrayDeque<>(); line.offer("Ann"); line.poll();
```

```compare javascript
line.push("Ann"); line.shift(); // shift() is slow for large arrays
```

```compare go
// Go has container/list, or you slice: q = q[1:]
```

```exercise
goal: "Turn this into a proper queue: use a `VecDeque`, `push_back` to add and `pop_front` to take."
code: |
  let mut jobs = Vec::new();
  jobs.push("build");
  jobs.push("test");
  let next = jobs.remove(0);
checks:
  - match: 'VecDeque::new\(\)'
    message: Create jobs with VecDeque::new().
  - match: 'jobs\.push_back\("build"\)[\s\S]*jobs\.push_back\("test"\)'
    message: Add jobs with push_back.
  - match: 'jobs\.pop_front\(\)'
    message: Take the next job with pop_front().
solution: |
  let mut jobs = VecDeque::new();
  jobs.push_back("build");
  jobs.push_back("test");
  let next = jobs.pop_front();
```

```quiz
question: "Why is `vec.remove(0)` slow on a large Vec?"
options:
  - It has to shift every other element one place forward.
  - It allocates a new vector.
  - It sorts the vector first.
answer: 0
explain: A Vec keeps elements packed from the start, so removing the first one moves all the others.
```
