---
title: Apply and exact
icon: "🎯"
branch: tactics
requires: [tactics, implication]
summary: Work backwards from the goal using known theorems.
---
`exact e` closes the goal when `e` proves it **completely**. `apply e` is for when `e` gets you there **if** you supply some more proofs: it works backwards.

```lean title=Apply.lean
theorem rain (Rain Wet : Prop) (h : Rain → Wet) (hr : Rain) : Wet := by
  apply h      -- to prove Wet, it's enough to prove Rain
  exact hr     -- goal is now Rain
```

`h : Rain → Wet` concludes `Wet`, which matches the goal. So `apply h` replaces the goal `Wet` with what `h` needs: `Rain`.

## With library theorems

This is how you use Lean's library. `Nat.le_trans : a ≤ b → b ≤ c → a ≤ c`:

```lean
example (x y z : Nat) (h1 : x ≤ y) (h2 : y ≤ z) : x ≤ z := by
  apply Nat.le_trans h1
  exact h2
```

`apply Nat.le_trans h1` fills in the first hypothesis and leaves `y ≤ z` to prove. Or, all in one: `exact Nat.le_trans h1 h2`.

## Finding theorems

Library theorems follow naming patterns, so you can often guess: `Nat.add_comm`, `Nat.mul_le_mul`, `List.length_append`. When you can't, ask:

| Tool | What it does |
| --- | --- |
| `exact?` | searches the library for a term that closes the goal |
| `apply?` | searches for theorems that `apply` to the goal |
| `#check Nat.le_trans` | shows a theorem's statement |
| [Loogle](https://loogle.lean-lang.org) | search by pattern, like `List.length (_ ++ _)` |

```lean
example (a b : Nat) : a + b = b + a := by
  exact?   -- Try this: exact Nat.add_comm a b
```

```compare python
# working backwards: "to show X, it's enough to show Y"
```

```compare typescript
// like calling a function and passing what it needs
```

```compare kotlin
// no equivalent
```

```compare rust
// no equivalent
```

```exercise
goal: "Work backwards: `apply h`, then close the remaining goal with `exact hp`."
code: |
  theorem back (P Q : Prop) (h : P → Q) (hp : P) : Q := by
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: 'apply\s+h\b'
    message: "Start with apply h"
  - match: 'exact\s+hp'
    message: "Finish with exact hp"
solution: |
  theorem back (P Q : Prop) (h : P → Q) (hp : P) : Q := by
    apply h
    exact hp
```

```quiz
question: "The goal is `Q` and `h : P → Q`. What is the goal after `apply h`?"
options:
  - "`Q`"
  - "`P`"
  - "There are no goals left."
answer: 1
explain: "h proves Q as long as you give it P, so P is what remains."
```
