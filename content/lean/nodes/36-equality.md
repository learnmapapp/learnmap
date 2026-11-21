---
title: Equality
icon: "⚖️"
branch: proofs
requires: [theorems]
summary: Flip, chain and substitute equations.
---
`a = b` is a proposition. You've proved equalities with `rfl`. When you have equalities as **hypotheses**, there are standard ways to use them.

```lean title=Equality.lean
variable (a b c : Nat)

-- flip it around
theorem eq_flip (h : a = b) : b = a :=
  h.symm

-- chain two of them
theorem chain (h1 : a = b) (h2 : b = c) : a = c :=
  h1.trans h2

-- apply the same function to both sides
theorem both_sides (h : a = b) : a + 10 = b + 10 :=
  congrArg (· + 10) h
```

| You have | You get | Using |
| --- | --- | --- |
| `h : a = b` | `b = a` | `h.symm` |
| `h1 : a = b`, `h2 : b = c` | `a = c` | `h1.trans h2` |
| `h : a = b` | `f a = f b` | `congrArg f h` |
| `h : a = b`, `p : P a` | `P b` | `h ▸ p` |

## Substitution

The last row is the most powerful idea: if `a = b`, then anything true about `a` is true about `b`. The `▸` operator (typed `\t`) rewrites a proof along an equation:

```lean
theorem subst_example (h : a = b) (ha : a > 3) : b > 3 :=
  h ▸ ha
```

In tactic proofs, this is what [rw](node:rw) does, and that's the form you'll use most.

## Equal by definition

`rfl` works whenever both sides **compute** to the same thing:

```lean
example : [1, 2] ++ [3] = [1, 2, 3] := rfl
example : (fun x => x + 1) 4 = 5 := rfl
example (n : Nat) : n + 1 = Nat.succ n := rfl
```

```warn
In Lean, = is a proposition you prove, while == is a Bool you compute. Use = in theorems.
```

```compare python
a == b   # a bool, computed at runtime
```

```compare typescript
a === b  // a boolean
```

```compare kotlin
a == b   // a Boolean
```

```compare rust
a == b   // a bool, via PartialEq
```

```exercise
goal: "Prove `c = a` by chaining: `h2.symm` gives `c = b`, then `.trans h1.symm` gives `c = a`."
code: |
  theorem back (a b c : Nat) (h1 : a = b) (h2 : b = c) : c = a :=
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: '\(?h1\.trans\s+h2\)?\.symm|h2\.symm\.trans\s+h1\.symm|Eq\.symm'
    message: "Try h2.symm.trans h1.symm"
solution: |
  theorem back (a b c : Nat) (h1 : a = b) (h2 : b = c) : c = a :=
    h2.symm.trans h1.symm
```

```quiz
question: "What's the difference between `=` and `==` in Lean?"
options:
  - "None; they're the same."
  - "`=` is a proposition you prove; `==` is a Bool you compute."
  - "`==` is for numbers, `=` for strings."
answer: 1
explain: "a = b is a Prop, which may need a proof. a == b runs a comparison and gives true or false."
```
