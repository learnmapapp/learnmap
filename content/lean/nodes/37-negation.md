---
title: Negation and False
icon: "🚫"
branch: proofs
requires: [and-or]
summary: "\"Not P\" means \"P leads to something impossible\"."
---
`False` is the proposition with **no proofs at all**. It's an inductive type with zero constructors, so there's no way to build a value of it.

`¬P` (typed `\not`) is defined as `P → False`: "if P were true, we'd get something impossible".

```lean title=Negation.lean
theorem not_both (P : Prop) (hp : P) (hnp : ¬P) : False :=
  hnp hp
```

Since `hnp : P → False` is a function, giving it `hp` produces a proof of `False`. Two contradicting facts produce the impossible.

## From False, anything

If you ever get a proof of `False`, you can prove **anything**. Logicians call this *ex falso*. In Lean, it's `absurd` or `False.elim`:

```lean
theorem anything (P Q : Prop) (hp : P) (hnp : ¬P) : Q :=
  absurd hp hnp
```

That sounds strange, but it's very useful: it lets you dismiss cases that can't happen. If a case has contradicting hypotheses, it's done.

## Proving a negation

To prove `¬P`, write a function that takes a proof of `P` and returns `False`:

```lean
theorem not_false_and (P : Prop) : ¬(P ∧ False) :=
  fun h => h.right
```

For concrete facts, `decide` works it out:

```lean
theorem not_equal : ¬ (2 + 2 = 5) := by decide
theorem ne_example : 3 ≠ 4 := by decide
```

`a ≠ b` (typed `\ne`) is short for `¬ (a = b)`.

```tip
To prove ¬P, assume P and derive a contradiction. To use ¬P, find a proof of P and combine them into False.
```

```compare python
not (2 + 2 == 5)   # a bool, not a proof
```

```compare typescript
// never is TypeScript's empty type, like Lean's False
function impossible(x: never): never { return x; }
```

```compare kotlin
// Nothing is Kotlin's empty type, like Lean's False
fun impossible(): Nothing = throw IllegalStateException()
```

```compare rust
// ! (never) and empty enums play the role of False
enum False {}
```

```exercise
goal: "Prove `¬ (5 < 3)` with the `decide` tactic: `by decide`."
code: |
  theorem not_smaller : ¬ (5 < 3) := sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: ':=\s*by\s+decide'
    message: "Write := by decide"
solution: |
  theorem not_smaller : ¬ (5 < 3) := by decide
```

```quiz
question: "How is `¬P` defined in Lean?"
options:
  - "As `P → False`."
  - "As `P = false`."
  - "As a Bool."
answer: 0
explain: "Not P means that a proof of P could be turned into a proof of False, which has no proofs."
```
