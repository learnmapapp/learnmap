---
title: Induction
icon: "🪜"
branch: tactics
requires: [cases, recursion]
summary: Prove something for every number, or every list.
---
Remember `0 + n = n`? It's true for every `n`, but not by `rfl`. To prove things about **all** natural numbers, use [[induction]]:

1. Prove it for `0` (the *base case*).
2. Prove that **if** it holds for `n`, it also holds for `n + 1` (the *step*).

Together, that covers every number: 0, then 1, then 2, and so on forever.

```lean title=Induction.lean
theorem zero_add' (n : Nat) : 0 + n = n := by
  induction n with
  | zero => rfl
  | succ n ih => rw [← Nat.add_assoc, ih]
```

In the `succ` case, the goal is `0 + (n + 1) = n + 1`, and you get the **induction hypothesis** `ih : 0 + n = n`. `← Nat.add_assoc` regroups `0 + (n + 1)` into `0 + n + 1`, and `ih` turns that into `n + 1`.

## Induction is recursion

An induction proof is a recursive function: the base case is where recursion stops, and `ih` is the recursive call. That's why proofs about recursive functions use induction with the **same shape**:

```lean
def double : Nat → Nat
  | 0 => 0
  | n + 1 => double n + 2

theorem double_eq (n : Nat) : double n = 2 * n := by
  induction n with
  | zero => rfl
  | succ n ih =>
    simp only [double]   -- goal: double n + 2 = 2 * (n + 1)
    omega                -- uses ih : double n = 2 * n
```

## On lists

Lists work the same way, with cases `nil` and `cons x xs`:

```lean
def len : List α → Nat
  | [] => 0
  | _ :: xs => 1 + len xs

theorem len_append (xs ys : List α) : len (xs ++ ys) = len xs + len ys := by
  induction xs with
  | nil => simp [len]
  | cons x xs ih => simp [len, ih, Nat.add_assoc]
```

```compare python
# a loop checks finitely many cases; induction covers them all
```

```compare typescript
// like a recursive function whose result is a guarantee, not a value
```

```compare kotlin
// no equivalent
```

```compare rust
// no equivalent
```

```exercise
goal: "Fill in the step case: use the induction hypothesis with `simp [len, ih]`."
code: |
  def len : List Nat → Nat
    | [] => 0
    | _ :: xs => 1 + len xs

  theorem len_map (xs : List Nat) : len (xs.map (· + 1)) = len xs := by
    induction xs with
    | nil => rfl
    | cons x xs ih => sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: 'cons\s+x\s+xs\s+ih\s*=>\s*simp\s*\[\s*len\s*,\s*ih\s*\]'
    message: "Write simp [len, ih] in the cons case."
solution: |
  def len : List Nat → Nat
    | [] => 0
    | _ :: xs => 1 + len xs

  theorem len_map (xs : List Nat) : len (xs.map (· + 1)) = len xs := by
    induction xs with
    | nil => rfl
    | cons x xs ih => simp [len, ih]
```

```quiz
question: "In the `succ n ih` case of a proof about `P n`, what is `ih`?"
options:
  - "A proof of P (n + 1)."
  - "A proof of P n, which you can use."
  - "A proof of P 0."
answer: 1
explain: "The induction hypothesis says the statement holds for n. You use it to prove it for n + 1."
```
