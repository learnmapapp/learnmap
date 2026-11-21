---
title: Blanket implementations
icon: "🛏️"
branch: traits
requires: [trait-bounds]
summary: Implement a trait for every type that meets a condition.
---
You can implement a trait for a whole group of types at once, by implementing it for a generic `T` with a bound. That's called a **blanket implementation**:

```rust title=src/main.rs
use std::fmt::Display;

trait Shout {
    fn shout(&self) -> String;
}

impl<T: Display> Shout for T {
    fn shout(&self) -> String {
        format!("{}!", self.to_string().to_uppercase())
    }
}

fn main() {
    println!("{}", "hello".shout()); // HELLO!
    println!("{}", 42.shout());      // 42!
}
```

`impl<T: Display> Shout for T` means: "every type that implements `Display` now also implements `Shout`." Strings, numbers and your own `Display` types all get `.shout()` for free.

The standard library uses this all the time:

- Every type with `Display` gets `.to_string()`, through `impl<T: Display> ToString for T`.
- Every `From<A> for B` gives you `Into<B> for A` automatically. That's why you implement `From` and get `.into()` for free.

## The orphan rule

You can implement a trait for a type only if **you own the trait or the type** (at least one is defined in your crate). So you can't implement `Display` for `Vec<T>`, because neither is yours. This rule stops two crates from writing conflicting impls.

```compare kotlin
fun <T> T.shout() = toString().uppercase() + "!" // an extension on every type
```

```compare typescript
// No equivalent: TypeScript can't add methods to every type at once
```

```compare go
// No equivalent: methods can only be declared on your own types
```

```exercise
goal: "Write a blanket impl so every type that implements `Debug` gets `Describe`."
code: |
  trait Describe {
      fn describe(&self) -> String;
  }
checks:
  - match: 'impl\s*<\s*T\s*:\s*(std::fmt::|fmt::)?Debug\s*>\s*Describe\s+for\s+T'
    message: "Start with impl<T: Debug> Describe for T {"
  - match: 'fn\s+describe\s*\(\s*&self\s*\)\s*->\s*String'
    message: Implement fn describe(&self) -> String inside it.
solution: |
  trait Describe {
      fn describe(&self) -> String;
  }

  impl<T: Debug> Describe for T {
      fn describe(&self) -> String {
          format!("{self:?}")
      }
  }
```

```quiz
question: Why do you implement From and not Into?
options:
  - Into doesn't exist.
  - A blanket impl in the standard library derives Into from every From.
  - Into is deprecated.
answer: 1
explain: "The standard library has impl<T, U: From<T>> Into<U> for T, so implementing From gives you both."
```
