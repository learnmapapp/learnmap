---
title: If, then, else
icon: "🚦"
branch: basics
requires: [functions]
summary: Conditions are expressions that always produce a value.
---
In Lean, `if` is an **expression**: it produces a value, like `?:` in other languages. That's why the `else` part is required: there must be a value in every case.

```lean title=Grades.lean
def grade (score : Nat) : String :=
  if score >= 90 then "A"
  else if score >= 75 then "B"
  else "C"

#eval grade 95  -- "A"
#eval grade 80  -- "B"
#eval grade 12  -- "C"
```

Both branches must have the same type. This doesn't compile, because one branch is a `String` and the other a `Nat`:

```lean
def broken (n : Nat) := if n > 0 then "positive" else 0
-- error: failed to synthesize OfNat String 0
```

## Using the result

Because `if` gives a value, you can use it anywhere a value fits:

```lean
def shipping (total : Nat) : Nat :=
  total + (if total >= 50 then 0 else 5)

#eval shipping 30  -- 35
#eval shipping 60  -- 60
```

## Conditions

A condition can use `&&` (and), `||` (or) and `!` (not):

```lean
def canVote (age : Nat) (citizen : Bool) : Bool :=
  age >= 18 && citizen
```

Lean is also fine with conditions that are logical statements, like `n = 0` or `a < b`, as long as it can decide whether they're true. You'll see why that matters in the proofs part of the course.

```compare python
grade = "A" if score >= 90 else "B"
```

```compare typescript
const grade = score >= 90 ? "A" : "B";
```

```compare kotlin
val grade = if (score >= 90) "A" else "B"
```

```compare rust
let grade = if score >= 90 { "A" } else { "B" };
```

```exercise
goal: "Finish `sign`: return `\"zero\"` when `n = 0`, and `\"positive\"` otherwise."
code: |
  def sign (n : Nat) : String :=
    if n = 0 then "zero"
checks:
  - match: 'if\s+n\s*=\s*0\s+then\s+"zero"\s+else\s+"positive"'
    message: "Add else \"positive\"."
solution: |
  def sign (n : Nat) : String :=
    if n = 0 then "zero" else "positive"
```

```quiz
question: "Why must every `if` in Lean have an `else`?"
options:
  - "It's an expression, so it needs a value in every case."
  - "It's a style rule; Lean warns but still compiles."
  - "Lean has no other way to end a block."
answer: 0
explain: "An if produces a value, so Lean needs to know the value when the condition is false too."
```
