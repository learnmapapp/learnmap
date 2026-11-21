---
title: Arithmetic with omega
icon: "🧮"
branch: tactics
requires: [tactics]
summary: Linear arithmetic over Nat and Int, solved automatically.
---
Proving `a + b < c` from a few inequalities by hand is tedious. `omega` does it for you. It solves any goal made of `+`, `-`, comparisons, and multiplication **by constants**, over `Nat` and `Int`:

```lean title=Omega.lean
example (x y : Nat) (h1 : x < 5) (h2 : y < 3) : x + y < 8 := by
  omega

example (n : Nat) (h : n > 0) : n - 1 + 1 = n := by
  omega

example (a : Int) (h : 2 * a + 1 = 7) : a = 3 := by
  omega

example (n : Nat) : n % 2 = 0 ∨ n % 2 = 1 := by
  omega
```

It uses every hypothesis in context, so you rarely need to point it at anything.

## Natural subtraction

`omega` knows that `Nat` subtraction stops at zero, which is easy to forget:

```lean
example (a b : Nat) (h : a ≤ b) : a - b = 0 := by omega
example (a b : Nat) : a - b ≤ a := by omega
```

## What it can't do

`omega` gives up on multiplying two variables together:

```lean
example (x y : Nat) (h : x > 0) (h2 : y > 0) : x * y > 0 := by
  omega   -- error: omega could not prove the goal
```

For that, use `Nat.mul_pos h h2`, or Mathlib's `positivity` and `nlinarith`.

| Tactic | Good for |
| --- | --- |
| `decide` | closed facts, like `7 * 8 = 56` |
| `omega` | linear facts with variables, over `Nat` and `Int` |
| `simp` | simplifying with known equations |
| `ring` (Mathlib) | polynomial identities |
| `linarith` (Mathlib) | linear facts over ordered fields, like `ℝ` |

```compare python
# z3 is an SMT solver that can do this kind of reasoning
```

```compare typescript
// no equivalent
```

```compare kotlin
// no equivalent
```

```compare rust
// no equivalent; formal verification tools like Kani or Prusti come closest
```

```exercise
goal: "This follows from the two hypotheses by linear arithmetic. Prove it with `omega`."
code: |
  example (a b : Nat) (h1 : a + b = 10) (h2 : a = 3) : b = 7 := by
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: '\bomega\b'
    message: "Use omega."
solution: |
  example (a b : Nat) (h1 : a + b = 10) (h2 : a = 3) : b = 7 := by
    omega
```

```quiz
question: "Which goal is outside what omega can do?"
options:
  - "`x + 2 * y ≤ 10`, given `x ≤ 4` and `y ≤ 3`."
  - "`x * y ≥ 0`, for variables x and y."
  - "`n - 5 ≤ n`."
answer: 1
explain: "x * y multiplies two variables, which is not linear arithmetic."
```
