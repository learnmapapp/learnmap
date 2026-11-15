---
title: Laziness
icon: "🦥"
branch: language
requires: [let-in]
summary: Nothing is computed until it's needed.
---
Nix is [[lazy]]. A value is only evaluated when something actually needs it.

```repl
> let broken = throw "boom"; ok = 1; in ok
1
> { a = 1; b = throw "boom"; }.a
1
```

The `throw` never runs, because nobody looked at it.

This is what makes nixpkgs possible. It's one gigantic attribute set with over 100,000 packages, but `pkgs.hello` only evaluates `hello` and what it depends on. The rest is never touched.

It also means a bug can hide until someone uses the broken value:

```repl
> let pkg = { name = "x"; version = 1 + "a"; }; in pkg.name
"x"
> let pkg = { name = "x"; version = 1 + "a"; }; in pkg.version
error: cannot add a string to an integer
```

```tip
In the REPL, `:p` prints a value fully (deeply) instead of showing `«thunk»` or `{ … }` for parts that haven't been evaluated yet.
```

Laziness is also why the order of bindings in `let` and `rec` doesn't matter: nothing runs top to bottom; values are worked out when asked for.

```compare python
# Like a generator, but for every value.
gen = (expensive(x) for x in items)  # nothing runs yet
```

```compare javascript
const lazy = () => expensive(); // only runs when called
```

```compare java
Supplier<Pkg> lazy = () -> build(); // only runs on get()
```

```compare kotlin
val pkg by lazy { build() }
```

```quiz
question: "What does  let x = throw \"no\"; in [ 1 2 ]  return?"
options:
  - An error, "no".
  - "[ 1 2 ]"
  - "null"
answer: 1
explain: x is never used, so the throw is never evaluated.
```
