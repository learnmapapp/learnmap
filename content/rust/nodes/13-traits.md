---
title: Traits
icon: "🧩"
branch: traits
requires: [structs, borrowing]
summary: Shared behaviour, like interfaces, without inheritance.
---
A [[trait]] describes something a type *can do*:

```rust
trait Describe {
    fn describe(&self) -> String;
}
```

Any type can implement it in its own `impl` block:

```rust
impl Describe for Crab {
    fn describe(&self) -> String {
        format!("{}, a crab with {} legs", self.name, self.legs)
    }
}
```

Then you can write functions that accept *anything* that implements the trait:

```rust
fn introduce(thing: &impl Describe) {
    println!("Meet {}", thing.describe());
}
```

Rust has no class inheritance. Traits (plus structs and enums) are how you share behaviour. You'll meet a lot of built-in ones: `Display` for printing, `Clone`, `PartialEq` for `==`, `Iterator`…

Many can be generated for you with `derive`:

```rust
#[derive(Debug, Clone, PartialEq)]
struct Crab { name: String, legs: u8 }
```

```compare java
interface Describe { String describe(); }
record Crab(String name, int legs) implements Describe {
    public String describe() {
        return name + ", a crab with " + legs + " legs";
    }
}
```

```compare kotlin
interface Describe { fun describe(): String }
data class Crab(val name: String, val legs: Int) : Describe {
    override fun describe() = "$name, a crab with $legs legs"
}
```

```compare go
// Go interfaces are implemented implicitly; Rust needs an explicit
// impl.
type Describer interface { Describe() string }
```

```compare python
class Describe(Protocol):
    def describe(self) -> str: ...
```

```compare javascript
// No built-in interfaces; TypeScript's `interface` is the closest
// relative.
```

```exercise
goal: Implement `Describe` for `Crab`, returning `"a crab"`.
code: |
  trait Describe {
      fn describe(&self) -> String;
  }

  struct Crab;
checks:
  - match: 'impl\s+Describe\s+for\s+Crab'
    message: Start with  impl Describe for Crab { … }
  - match: 'fn\s+describe\s*\(\s*&self\s*\)\s*->\s*String'
    message: Copy the method signature from the trait.
  - match: '"a crab"'
    message: Return "a crab" (e.g. "a crab".to_string()).
output: '"a crab"'
```

## Default methods

A trait can provide a default implementation that types get for free, and may override:

```rust
trait Greet {
    fn name(&self) -> String;

    fn greet(&self) -> String {
        format!("Hello, {}!", self.name())
    }
}
```

Implement only `name`, and `greet` comes along. That's how `Iterator` gives you dozens of methods for implementing one.

You can implement your traits for types you didn't write, even built-ins:

```rust
impl Greet for i32 {
    fn name(&self) -> String { format!("number {self}") }
}
5.greet(); // "Hello, number 5!"
```

The one rule (the *orphan rule*): either the trait or the type must be yours.

```quiz
question: "Can you implement the standard Display trait for the standard Vec type?"
options:
  - Yes, any trait for any type.
  - No, at least one of them has to be defined in your crate.
answer: 1
explain: That's the orphan rule. Wrap the Vec in a newtype of your own to get around it.
```
