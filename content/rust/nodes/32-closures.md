---
title: Closures
icon: "🎣"
branch: collections
requires: [functions, borrowing]
summary: Small anonymous functions that capture their surroundings.
---
A [[closure]] is a function without a name, written with pipes around the parameters:

```rust
let double = |x| x * 2;
let add = |a: i32, b: i32| -> i32 { a + b };

println!("{}", double(21)); // 42
```

Types are usually inferred. The big difference with `fn`: closures can **capture** variables from where they're defined:

```rust
let bonus = 10;
let with_bonus = |score| score + bonus;
println!("{}", with_bonus(5)); // 15
```

A closure captures in the gentlest way that works: by reference if it only reads, by mutable reference if it changes something, and by value if it needs to own it. `move` forces ownership, which you need when the closure outlives the current scope (like in a thread):

```rust
let name = String::from("Ferris");
let greet = move || println!("hi {name}");
greet();
// name was moved into the closure
```

Functions that accept closures use one of three traits:

| Trait | The closure… |
| --- | --- |
| `Fn` | only reads what it captured, can be called many times |
| `FnMut` | changes what it captured |
| `FnOnce` | consumes what it captured, can be called once |

```rust
fn twice(f: impl Fn(i32) -> i32, x: i32) -> i32 {
    f(f(x))
}
twice(|n| n + 3, 1); // 7
```

```compare python
double = lambda x: x * 2
```

```compare javascript
const double = (x) => x * 2;
```

```compare java
Function<Integer, Integer> doubler = x -> x * 2;
```

```compare kotlin
val double = { x: Int -> x * 2 }
```

```compare go
double := func(x int) int { return x * 2 }
```

```exercise
goal: Write a closure `is_even` that returns `true` for even numbers.
code: |
  let is_even = ;
  println!("{}", is_even(4));
checks:
  - match: let\s+is_even\s*=\s*\|\s*\w+(\s*:\s*\w+)?\s*\|
    message: "A closure starts with its parameter between pipes: |n| ..."
  - match: "%\\s*2\\s*==\\s*0"
    message: Even means n % 2 == 0.
output: "true"
```
