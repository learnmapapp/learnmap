---
title: Structs
icon: "🧱"
branch: data
requires: [functions]
summary: Group fields together, and give them methods.
---
A [[struct]] bundles named fields into your own type:

```rust
struct Crab {
    name: String,
    legs: u8,
}

let ferris = Crab { name: String::from("Ferris"), legs: 10 };
println!("{} has {} legs", ferris.name, ferris.legs);
```

Methods go into a separate `impl` block. A method takes `&self` as its first parameter, which is the value it's called on:

```rust
impl Crab {
    fn new(name: &str) -> Crab {
        Crab { name: name.to_string(), legs: 10 }
    }

    fn greet(&self) -> String {
        format!("Hi, I'm {}!", self.name)
    }
}

let c = Crab::new("Ferris");
c.greet(); // "Hi, I'm Ferris!"
```

`new` has no `self`, so it's called with `::`. That's Rust's version of a constructor: just a normal function, by convention called `new`.

```compare java
record Crab(String name, int legs) {
    String greet() { return "Hi, I'm " + name + "!"; }
}
```

```compare kotlin
data class Crab(val name: String, val legs: Int = 10) {
    fun greet() = "Hi, I'm $name!"
}
```

```compare python
@dataclass
class Crab:
    name: str
    legs: int = 10
    def greet(self): return f"Hi, I'm {self.name}!"
```

```compare javascript
class Crab {
  constructor(name) { this.name = name; this.legs = 10; }
  greet() { return `Hi, I'm ${this.name}!`; }
}
```

```compare go
type Crab struct { Name string; Legs uint8 }
func (c Crab) Greet() string { return "Hi, I'm " + c.Name + "!" }
```

```exercise
goal: Add a `claws` field of type `u8` to the struct.
code: |
  struct Crab {
      name: String,
      legs: u8,
  }
checks:
  - match: 'claws\s*:\s*u8'
    message: "Fields are written like  claws: u8,"
output: "struct Crab { name, legs, claws }"
```

## Shortcuts when creating structs

When a variable has the same name as a field, you can skip the repetition:

```rust
fn make(name: String, legs: u8) -> Crab {
    Crab { name, legs } // same as name: name, legs: legs
}
```

And to build one struct from another, change only some fields with `..`:

```rust
let ferris = Crab { name: "Ferris".into(), legs: 10 };
let injured = Crab { legs: 9, ..ferris };
```

A whole struct is mutable or not; you can't mark single fields as `mut`. Print one while debugging with `#[derive(Debug)]` and `{:?}`.

```quiz
question: How do you call an associated function without self, like new?
options:
  - '`Crab.new("Ferris")`'
  - Crab::`new("Ferris")`
  - new `Crab("Ferris")`
answer: 1
explain: Associated functions are called on the type with ::, methods on a value with a dot.
```
