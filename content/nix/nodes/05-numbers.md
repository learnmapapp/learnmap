---
title: Numbers
icon: "🔢"
branch: language
requires: [expressions]
summary: Integers, floats and one sneaky surprise.
---
Nix has integers and floating-point numbers, with the operators you'd expect:

```repl
> 2 + 3 * 4
14
> 7 / 2
3
> 7.0 / 2
3.5
```

Dividing two integers gives an integer. Add a `.0` if you want the fraction.

Now the surprise. Look what happens without spaces:

```repl
> 7/2
/home/you/7/2
```

Nix saw a **path**, not a division! Paths are a built-in type, and anything with a `/` in the middle looks like one. So always put spaces around `/`.

```exercise
goal: Make this evaluate to `3.5` instead of a path.
code: |
  7/2
checks:
  - match: '7(\.0)?\s+/\s+2(\.0)?'
    message: Put spaces around the slash, so Nix sees a division.
  - match: '\d\.\d'
    message: "It's a division now, but integer division gives 3. Make one side a float."
output: "3.5"
hint: "Two fixes: spaces around /, and 7.0 instead of 7."
```

## Number helpers

Arithmetic is all there is in the language itself. A few useful builtins fill the gaps:

```repl
> builtins.div 7 2
3
> builtins.floor 3.7
3
> builtins.ceil 3.2
4
> builtins.toString 42
"42"
> builtins.fromJSON "3.5"
3.5
> builtins.bitAnd 6 3
2
```

There is no `%` operator. `lib.mod 7 2` from nixpkgs gives you the remainder.

In configs, numbers mostly show up as ports, sizes and timeouts, and NixOS options check their type, so `port = "80";` is caught as an error.

```quiz
question: "What does  5 / 2  give in Nix?"
options:
  - "2.5"
  - "2"
  - A path.
answer: 1
explain: With spaces it's division, and dividing two integers gives an integer.
```
