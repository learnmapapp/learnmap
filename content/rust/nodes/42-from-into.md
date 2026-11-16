---
title: From and Into
icon: "🔀"
branch: traits
requires: [generics]
summary: Standard conversions between types.
---
Rust has no implicit conversions. Instead, conversions are traits. The most important pair is `From` and `Into`:

```rust
let s = String::from("crab");
let n = i64::from(42_i32);
```

Implement `From` for your own type:

```rust
struct Celsius(f64);
struct Fahrenheit(f64);

impl From<Celsius> for Fahrenheit {
    fn from(c: Celsius) -> Self {
        Fahrenheit(c.0 * 9.0 / 5.0 + 32.0)
    }
}
```

…and you get `Into` for free, in the other direction:

```rust
let boiling: Fahrenheit = Celsius(100.0).into();
let same = Fahrenheit::from(Celsius(100.0));
```

`Into` shines in function parameters. Accept anything that can become a `String`:

```rust
fn greet(name: impl Into<String>) -> String {
    let name: String = name.into();
    format!("Hi, {name}")
}

greet("Ferris");               // &str
greet(String::from("Corro")); // String
```

For conversions that can fail, there's `TryFrom` / `TryInto`, returning a `Result`:

```repl
> u8::try_from(300_i32)
Err(TryFromIntError(()))
> u8::try_from(42_i32)
Ok(42)
```

And `as` is only for simple number casts, where truncation is OK.

```compare java
// a static factory, by convention
Fahrenheit f = Fahrenheit.from(celsius);
```

```compare kotlin
fun Celsius.toFahrenheit() = Fahrenheit(value * 9 / 5 + 32)
```

```compare go
func FromCelsius(c Celsius) Fahrenheit {
    return Fahrenheit(c*9/5 + 32)
}
```

```compare python
Fahrenheit.from_celsius(c)  # a classmethod, by convention
```

```compare javascript
Fahrenheit.fromCelsius(c);
```

```exercise
goal: "Implement `From<u32>` for Legs, so `let l: Legs = 10.into();` works."
code: |
  struct Legs(u32);
checks:
  - match: impl\s+From<\s*u32\s*>\s+for\s+Legs
    message: Start with  impl From<u32> for Legs {
  - match: fn\s+from\s*\(\s*\w+\s*:\s*u32\s*\)\s*->\s*(Self|Legs)
    message: "Add  fn from(n: u32) -> Self { Legs(n) }"
output: Legs(10)
```
