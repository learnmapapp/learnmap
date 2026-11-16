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
question: You write code that uses a value after it has been freed. When do you find out?
options:
  - When a test happens to hit it.
  - When you compile. The compiler refuses to build it and explains why.
  - When it crashes in production.
answer: 1
explain: Rust checks these rules before the program runs, so that whole class of bug never makes it into a build.
```

## What you'll find on this map

Rust is a small set of ideas stacked on top of each other:

- **Basics**: variables, types, functions and loops. Familiar territory, with a few twists.
- **Data**: structs and enums, plus `match`, Rust's superpower for working with them.
- **Ownership**: the one genuinely new idea. Every value has one owner, and the compiler tracks who.
- **Errors**: no exceptions and no `null`. Failure is a value you can't forget to check.
- **Traits and generics**: shared behaviour without inheritance.
- **Collections, concurrency and tooling**: the everyday toolbox.

Start at the top and follow the lines, or pick a goal and let the guide build a route.

```quiz
question: Coming from Java or Go, which familiar piece is missing in Rust?
options:
  - A garbage collector.
  - Functions.
  - A package manager.
answer: 0
explain: Rust frees memory through ownership instead. The Ownership branch shows how, and Cargo is a very good package manager.
```
