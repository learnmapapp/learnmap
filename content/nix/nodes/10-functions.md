---
title: Functions
icon: "λ"
branch: language
requires: [let-in, lists]
summary: "x: x + 1, that's the whole syntax."
---
A [[function]] in Nix is a name, a colon, and a body:

```nix
x: x + 1
```

That's it. No `function` keyword, no parentheses, no `return`. To call a function, put the argument after it, separated by a space:

```repl
> let inc = x: x + 1; in inc 41
42
```

```compare python
inc = lambda x: x + 1
inc(41)
```

```compare javascript
const inc = x => x + 1;
inc(41)
```

```compare java
Function<Integer, Integer> inc = x -> x + 1;
inc.apply(41)
```

```compare kotlin
val inc = { x: Int -> x + 1 }
inc(41)
```

```compare go
inc := func(x int) int { return x + 1 }
inc(41)
```

Every Nix function takes **exactly one** argument. For more, return another function:

```repl
> let add = a: b: a + b; in add 2 3
5
> let add = a: b: a + b; addTwo = add 2; in addTwo 10
12
```

`add 2` returns a new function that's waiting for `b`. This is called *currying*, and it's why calls need no commas.

Functions really shine with `map`, which applies a function to every element of a list:

```repl
> map (x: x * 2) [ 1 2 3 ]
[ 2 4 6 ]
```

```exercise
goal: Write a function that greets someone, so the result is `"Hi, Ada!"`.
code: |
  let
    greet = name: "Hello";
  in
  greet "Ada"
checks:
  - match: 'greet\s*=\s*name\s*:'
    message: Keep greet as a function of name.
  - match: '"Hi, \$\{name\}!"|"Hi, "\s*\+\s*name\s*\+\s*"!"'
    message: 'Use the name argument in the string, e.g. with ${name}.'
output: '"Hi, Ada!"'
```

## Functions everywhere

Once you see it, you find functions all over Nix:

- A **package** is a function from its dependencies to a derivation.
- A **NixOS module** is a function from `{ config, pkgs, ... }` to options.
- A flake's **outputs** is a function from its inputs to a set.
- An **overlay** is a function of two arguments, `final: prev: { … }`.

A function can also return a function, or take one as an argument. That's how helpers like `map` and `lib.mapAttrs` work:

```nix
let
  twice = f: x: f (f x);
  inc = x: x + 1;
in
twice inc 5
# 7
```

```quiz
question: "What does  (a: b: a * b) 3  return?"
options:
  - "3"
  - A function waiting for b.
  - An error, because b is missing.
answer: 1
explain: Passing one argument to a curried function returns a new function waiting for the next one.
```
