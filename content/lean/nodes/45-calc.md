---
title: Calculations with calc
icon: "🧾"
branch: tactics
requires: [rw]
summary: Write a proof as a readable chain of steps.
---
On paper, you might prove an equation as a chain: `a = b = c = d`, each step with its reason. `calc` lets you write proofs exactly like that:

```lean title=Calc.lean
theorem chain (a b c : Nat) (h1 : a = b + 1) (h2 : b = c * 2) :
    a = c * 2 + 1 := by
  calc a = b + 1 := h1
    _ = c * 2 + 1 := by rw [h2]
```

Each line is `_ = next := proof`, where `_` means "the right side of the previous line". Lean checks every step, then chains them together.

## Mixing relations

Steps can use `<`, `≤` and `=`, and `calc` combines them into the right conclusion:

```lean
example (x y : Nat) (h1 : x ≤ 5) (h2 : y = x + 2) : y < 10 := by
  calc y = x + 2 := h2
    _ ≤ 5 + 2 := by omega
    _ < 10 := by decide
```

`=`, then `≤`, then `<` gives `y < 10`.

## Why bother?

A one-line `omega` could prove both examples above. `calc` is about **readability**: a long proof becomes a list of steps a person can follow, which is how textbook proofs look. It's also useful for guiding automation through a proof it can't find alone: each small step is easy, even when the whole thing isn't.

```lean
example (a b c : Nat) (hab : a < b) (hbc : b ≤ c) : a + 1 ≤ c := by
  calc a + 1 ≤ b := Nat.succ_le_of_lt hab
    _ ≤ c := hbc
```

```compare python
# like showing your working in a maths exam
```

```compare typescript
// no equivalent
```

```compare kotlin
// no equivalent
```

```compare rust
// no equivalent
```

```exercise
goal: "Add the second step of the calc: `_ = 2 * (k + 1) := by omega`."
code: |
  example (n k : Nat) (h : n = 2 * k) : n + 2 = 2 * (k + 1) := by
    calc n + 2 = 2 * k + 2 := by rw [h]
checks:
  - match: '_\s*=\s*2\s*\*\s*\(\s*k\s*\+\s*1\s*\)\s*:=\s*by\s+omega'
    message: "Add the line _ = 2 * (k + 1) := by omega"
solution: |
  example (n k : Nat) (h : n = 2 * k) : n + 2 = 2 * (k + 1) := by
    calc n + 2 = 2 * k + 2 := by rw [h]
      _ = 2 * (k + 1) := by omega
```

```quiz
question: "In a calc step `_ = x + 1 := proof`, what does `_` stand for?"
options:
  - "Any value."
  - "The right-hand side of the previous step."
  - "The final goal."
answer: 1
explain: "Each step continues from where the last one ended."
```
