---
title: Booleans
icon: "🔘"
branch: language
requires: [expressions]
summary: true, false, and the operators that combine them.
---
A boolean is a yes or a no. Nix writes them as `true` and `false`, always lowercase:

```repl
> true
true
> True
error: undefined variable 'True'
```

You'll see them everywhere in configs: almost every feature can be switched on with `enable = true;`.

Combine them with `&&` (and), `||` (or) and `!` (not):

```repl
> true && !false
true
> 1 == 1 || false
true
```

```compare python
True and not False
```

```compare java
true && !false
```

```exercise
goal: Switch this `false` to the other boolean.
code: |
  false
checks:
  - notMatch: 'True'
    message: Nix booleans are lowercase.
  - match: '^\s*true\s*$'
    message: Replace the whole thing with the other boolean.
output: "true"
hint: There are only two booleans, and they are both lowercase.
```

## Comparisons and implication

Comparisons return booleans: `==`, `!=`, `<`, `<=`, `>`, `>=`. Equality works on any type, including lists and attribute sets:

```repl
> [ 1 2 ] == [ 1 2 ]
true
> { a = 1; } == { a = 1; }
true
> "abc" < "abd"
true
```

Nix also has a rare operator: `->`, logical implication. `a -> b` means "if a, then b must hold", which reads nicely in assertions:

```nix
assert enableTLS -> certificate != null;
```

If TLS is off, the assertion passes no matter what. If it's on, there must be a certificate.

```quiz
question: What is  `false -> false` ?
options:
  - "`true`"
  - "`false`"
  - An error.
answer: 0
explain: Implication only fails when the left is `true` and the right is `false`.
```
