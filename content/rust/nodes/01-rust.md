---
title: Rust
icon: "🦀"
kind: hub
branch: core
summary: Why people put up with the learning curve (and then love it).
---
Rust is a language for building fast software: command-line tools, web servers, game engines, even parts of Linux and Windows. It's as fast as C or C++, but it **won't let you** write the bugs those languages are famous for: crashes from dangling pointers, data races, use-after-free.

How? The compiler checks a few extra rules before your program ever runs. When something's off, it doesn't just say "no". It tells you why, and often how to fix it:

```repl shell
> cargo build
error[E0384]: cannot assign twice to immutable variable `x`
  help: consider making this binding mutable: `mut x`
```

Learning Rust mostly means learning to read those messages. Think of the compiler as a very picky, very patient pair programmer.

```quiz
question: When does Rust catch memory bugs like dangling pointers?
options:
  - At runtime, by crashing safely.
  - At compile time, before the program runs.
  - Only when you run the tests.
answer: 1
explain: The rules are checked by the compiler, so a whole class of bugs never makes it into your program.
```

## What you'll find on this map

Rust is a small set of ideas stacked on top of each other:

- **Basics**: variables, types, functions and loops. Familiar territory, with a few twists.
- **Data**: structs and enums, plus `match`, Rust's superpower for working with them.
- **Ownership**: the one genuinely new idea. Every value has one owner, and the compiler tracks who.
- **Errors**: no exceptions and no null. Failure is a value you can't forget to check.
- **Traits and generics**: shared behaviour without inheritance.
- **Collections, concurrency and tooling**: the everyday toolbox.

Start at the top and follow the lines, or pick a goal and let the guide build a route.

```quiz
question: Which of these does Rust NOT have?
options:
  - A garbage collector
  - Generics
  - Pattern matching
answer: 0
explain: Memory is freed when its owner goes out of scope, decided at compile time. No GC pauses.
```
