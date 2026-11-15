---
title: Printing and formatting
icon: "🖨️"
branch: basics
requires: [cargo]
summary: println!, format! and the {} and {:?} placeholders.
---
You've seen `println!`. Its first argument is a format string, and `{}` marks where values go. You can name variables right inside the braces:

```rust
let crab = "Ferris";
let legs = 10;
println!("{crab} has {legs} legs");
println!("{} has {} legs", crab, legs); // same thing
```

`{}` uses the `Display` trait: the friendly, user-facing version. Many types (like lists) don't have one. For those there's `{:?}`, the `Debug` version meant for developers:

```rust
let claws = vec![1, 2];
println!("{claws:?}");   // [1, 2]
println!("{claws:#?}");  // the same, pretty-printed over several lines
```

Formatting options go after the colon:

```repl
> format!("{:.2}", 3.14159)
"3.14"
> format!("{:>6}|", "crab")
"  crab|"
> format!("{:08.3}", -1.5)
"-001.500"
```

The family:

| Macro | Does |
| --- | --- |
| `println!` / `print!` | write to stdout, with or without a newline |
| `eprintln!` | write to stderr |
| `format!` | build a `String` instead of printing |
| `dbg!` | print an expression *and* its file and line, then return it |

```tip
`dbg!(x * 2)` is the fastest debugging tool there is: it prints `[src/main.rs:4:5] x * 2 = 42` and passes the value through.
```

```compare python
print(f"{crab} has {legs} legs")
print(f"{3.14159:.2f}")
```

```compare javascript
console.log(`${crab} has ${legs} legs`);
console.log((3.14159).toFixed(2));
```

```compare java
System.out.printf("%s has %d legs%n", crab, legs);
String.format("%.2f", 3.14159);
```

```compare kotlin
println("$crab has $legs legs")
"%.2f".format(3.14159)
```

```compare go
fmt.Printf("%s has %d legs\n", crab, legs)
fmt.Sprintf("%.2f", 3.14159)
```

```exercise
goal: "Print the price with exactly two decimals, like `price: 4.50`."
code: |
  let price = 4.5;
  println!("price: {price}");
checks:
  - match: 'println!\s*\(\s*"price: \{(price)?:\.2\}"'
    message: "Add a precision after a colon: {price:.2}"
output: "price: 4.50"
```
