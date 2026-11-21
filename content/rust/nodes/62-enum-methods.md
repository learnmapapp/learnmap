---
title: Methods on enums
icon: "🎛️"
branch: data
requires: [match, methods]
summary: Give enums behaviour with impl and match self.
---
Enums can have `impl` blocks too. Inside a method, `match self` handles each variant:

```rust title=src/main.rs
enum Light {
    Red,
    Yellow,
    Green,
}

impl Light {
    fn seconds(&self) -> u32 {
        match self {
            Light::Red => 30,
            Light::Yellow => 3,
            Light::Green => 25,
        }
    }

    fn next(&self) -> Light {
        match self {
            Light::Red => Light::Green,
            Light::Green => Light::Yellow,
            Light::Yellow => Light::Red,
        }
    }
}

fn main() {
    let light = Light::Red;
    println!("{}", light.seconds());        // 30
    println!("{}", light.next().seconds()); // 25
}
```

Because `match` must cover every variant, adding a `Blinking` light later makes the compiler point at every method you need to update. That's one of the nicest parts of Rust: the compiler keeps a to-do list for you.

Inside the impl you can write `Self::Red` instead of `Light::Red`, which is shorter and survives renaming the enum.

```compare java
enum Light { RED(30), YELLOW(3), GREEN(25); final int seconds; }
```

```compare kotlin
enum class Light(val seconds: Int) { RED(30), YELLOW(3), GREEN(25) }
```

```compare python
class Light(Enum):
    RED = 30
```

```compare typescript
function seconds(l: Light) { switch (l) { case "red": return 30; } }
```

```exercise
goal: "Finish `is_weekend`: return `true` for `Sat` and `Sun`, `false` otherwise. Use `match self`."
code: |
  enum Day { Mon, Tue, Wed, Thu, Fri, Sat, Sun }

  impl Day {
      fn is_weekend(&self) -> bool {
          todo!()
      }
  }
checks:
  - match: 'match\s+self'
    message: Use match self inside the method.
  - match: 'Sat\s*\|\s*(Day|Self)::Sun\s*=>\s*true|Sun\s*\|\s*(Day|Self)::Sat\s*=>\s*true'
    message: "Combine the two weekend days with |, like Day::Sat | Day::Sun => true"
  - match: '_\s*=>\s*false'
    message: "Use _ => false for the other days."
  - notMatch: 'todo!'
    message: Replace todo!() with your match.
solution: |
  enum Day { Mon, Tue, Wed, Thu, Fri, Sat, Sun }

  impl Day {
      fn is_weekend(&self) -> bool {
          match self {
              Day::Sat | Day::Sun => true,
              _ => false,
          }
      }
  }
```

```quiz
question: You add a new variant to an enum. What happens to methods that match on it without a _ arm?
options:
  - They silently ignore the new variant.
  - They fail to compile until you handle it.
  - They panic at runtime.
answer: 1
explain: A match must be exhaustive, so the compiler lists every place that needs a new arm.
```
