---
title: Associated functions
icon: "🏗️"
branch: data
requires: [methods]
summary: "Functions on a type without self, like String::new."
---
Not every function in an `impl` block needs `self`. Ones without it are called **associated functions**, and you call them on the type with `::`:

```rust title=src/main.rs
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(width: u32, height: u32) -> Self {
        Self { width, height }
    }

    fn square(size: u32) -> Self {
        Self { width: size, height: size }
    }

    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let r = Rectangle::new(3, 4);
    let s = Rectangle::square(5);
    println!("{} {}", r.area(), s.area()); // 12 25
}
```

`Self` (capital S) is shorthand for "the type this impl is for", here `Rectangle`.

Rust has no special constructor syntax. By convention, the main way to build a value is an associated function called `new`. You've used plenty already: `String::new()`, `Vec::new()`, `String::from("hi")`.

So the rule of thumb is:

- `Type::function()` for associated functions (no `self`).
- `value.method()` for methods (with `self`).

```compare java
static Rectangle square(int size) { return new Rectangle(size, size); }
```

```compare kotlin
companion object { fun square(size: Int) = Rectangle(size, size) }
```

```compare python
@classmethod
def square(cls, size): return cls(size, size)
```

```compare go
func NewRectangle(w, h int) Rectangle { return Rectangle{w, h} }
```

```exercise
goal: "Add an associated function `new(name: String) -> Self` that sets `score` to 0."
code: |
  struct Player {
      name: String,
      score: u32,
  }

  impl Player {
  }
checks:
  - match: 'fn\s+new\s*\(\s*name\s*:\s*String\s*\)\s*->\s*Self'
    message: "Start with fn new(name: String) -> Self"
  - match: 'Self\s*\{\s*name\s*,\s*score\s*:\s*0\s*\}'
    message: "Return Self { name, score: 0 }"
solution: |
  struct Player {
      name: String,
      score: u32,
  }

  impl Player {
      fn new(name: String) -> Self {
          Self { name, score: 0 }
      }
  }
```

```quiz
question: "How do you call an associated function `origin` on `Point`?"
options:
  - "`Point.origin()`"
  - "`Point::origin()`"
  - "`new Point.origin()`"
answer: 1
explain: Associated functions belong to the type, so you reach them with ::.
```
