---
title: Decide
icon: "🤖"
branch: proofs
requires: [theorems]
summary: Let Lean check finite facts by computing them.
---
Many statements can be settled by just **computing**: `17 * 3 = 51`, `7 ≠ 8`, "21 is divisible by 7". For those, the `decide` tactic runs a check and turns the result into a proof:

```lean title=Decide.lean
example : 17 * 3 = 51 := by decide
example : 7 ≠ 8 := by decide
example : 21 % 7 = 0 ∧ 22 % 7 = 1 := by decide
example : [1, 2, 3].length < 10 := by decide
example : [1, 2, 3].contains 2 = true := by decide
```

It even handles statements about all numbers **below a bound**, because there are only finitely many to check:

```lean
example : ∀ n, n < 10 → n * n < 100 := by decide
```

## Decidable

`decide` works for propositions that have a `Decidable` instance: a way to compute whether they're true. Equality and comparisons of numbers, `∧`, `∨`, `¬`, and bounded `∀` are all decidable.

It's also why `if` accepts propositions:

```lean
def isSmall (n : Nat) : Bool := if n < 10 then true else false
```

`n < 10` is a `Prop`, but because it's decidable, Lean knows how to compute it.

## Where decide stops

`decide` can't prove statements about **all** natural numbers, because it would have to check infinitely many:

```lean
example : ∀ n : Nat, n + 0 = n := by decide
-- error: failed to synthesize Decidable (∀ (n : Nat), n + 0 = n)
```

It's also slow for big computations. For arithmetic with variables, use [omega](node:omega); for general facts, the other tactics.

```compare python
assert all(n * n < 100 for n in range(10))   # also checks every case
```

```compare typescript
console.assert([...Array(10).keys()].every((n) => n * n < 100));
```

```compare kotlin
check((0 until 10).all { it * it < 100 })
```

```compare rust
assert!((0..10).all(|n| n * n < 100));
```

```exercise
goal: "Prove that 91 is divisible by 7, `91 % 7 = 0`, using `by decide`."
code: |
  theorem divisible : 91 % 7 = 0 := sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: ':=\s*by\s+decide'
    message: "Write := by decide"
solution: |
  theorem divisible : 91 % 7 = 0 := by decide
```

```quiz
question: "Why can't `decide` prove `∀ n : Nat, n + 0 = n`?"
options:
  - "Because it's false."
  - "Because it would have to check infinitely many numbers."
  - "Because decide only works on strings."
answer: 1
explain: "decide computes the answer, which is only possible for finitely many cases."
```
