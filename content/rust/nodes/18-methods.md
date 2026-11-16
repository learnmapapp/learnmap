---
title: Methods
icon: "🛠️"
branch: data
requires: [structs]
summary: "&self, &mut self, self, and associated functions."
---
A method's first parameter says how it uses the value it's called on:

| Signature | Meaning |
| --- | --- |
| `&self` | just looks |
| `&mut self` | changes it |
| `self` | takes it, the caller can't use it afterwards |
| (no self) | an *associated function*, called with `Type::name()` |

```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Self {
        Self { count: 0 }
    }

    fn get(&self) -> u32 {
        self.count
    }

    fn bump(&mut self) {
        self.count += 1;
    }

    fn finish(self) -> u32 {
        self.count
    }
}
```

`Self` is a shortcut for "the type this impl is for".

Calling `bump` needs a mutable variable, because it changes the value:

```rust
let mut c = Counter::new();
c.bump();
c.bump();
println!("{}", c.get()); // 2
let total = c.finish();  // c is gone after this
```

```repl shell
> cargo build
error[E0596]: cannot borrow `c` as mutable, as it is not declared as mutable
```

You can have as many `impl` blocks for a type as you like. Methods also make the "dot" work: `c.bump()` is really `Counter::bump(&mut c)`.

```compare python
class Counter:
    def bump(self): self.count += 1
```

```compare javascript
class Counter { bump() { this.count++; } }
```

```compare java
class Counter { void bump() { count++; } }
```

```compare kotlin
class Counter { fun bump() { count++ } }
```

```compare go
// pointer receiver, like &mut self
func (c *Counter) bump() { c.count++ }
```

```exercise
goal: Add a `reset` method that sets `count` back to 0.
code: |
  impl Counter {
      fn bump(&mut self) {
          self.count += 1;
      }
  }
checks:
  - match: 'fn\s+reset\s*\('
    message: Add a method called reset inside the impl block.
  - match: 'fn\s+reset\s*\(\s*&mut\s+self\s*\)'
    message: reset changes the counter, so it needs &mut self.
  - match: 'self\.count\s*=\s*0'
    message: Set self.count = 0 inside it.
output: c.reset(); c.get() == 0
```
