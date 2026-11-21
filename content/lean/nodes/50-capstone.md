---
title: "Capstone: verified sum"
icon: "🏆"
branch: tactics
requires: [induction, simp]
summary: Write a function, and prove it correct.
---
Time to bring the two halves of Lean together: write a program, and **prove** something about it.

We'll write our own `sum` for lists, and prove that summing two lists joined together is the same as adding their sums.

```lean title=Sum.lean
def sum : List Nat → Nat
  | [] => 0
  | x :: xs => x + sum xs

#eval sum [1, 2, 3]  -- 6

theorem sum_append (xs ys : List Nat) :
    sum (xs ++ ys) = sum xs + sum ys := by
  induction xs with
  | nil => simp [sum]
  | cons x xs ih => simp [sum, ih, Nat.add_assoc]
```

No tests could check this for **every** pair of lists. The proof does.

## How the proof works

The proof follows the shape of `sum`, by [induction](node:induction) on `xs`.

**`nil` case.** The goal is `sum ([] ++ ys) = sum [] + sum ys`. `simp` knows `[] ++ ys = ys`, unfolds `sum []` to `0`, and `0 + sum ys = sum ys`. Done.

**`cons` case.** The goal is `sum (x :: xs ++ ys) = sum (x :: xs) + sum ys`. Unfolding `sum` on both sides:

```text
x + sum (xs ++ ys) = x + sum xs + sum ys
```

The induction hypothesis `ih : sum (xs ++ ys) = sum xs + sum ys` rewrites the left side to `x + (sum xs + sum ys)`. Then `Nat.add_assoc` regroups it to match the right.

## Faster, and still correct

A tail-recursive version is faster for long lists. Is it the same function? Prove it:

```lean
def sumAcc : List Nat → Nat → Nat
  | [], acc => acc
  | x :: xs, acc => sumAcc xs (acc + x)

theorem sumAcc_eq (xs : List Nat) (acc : Nat) :
    sumAcc xs acc = acc + sum xs := by
  induction xs generalizing acc with
  | nil => simp [sumAcc, sum]
  | cons x xs ih => simp [sumAcc, sum, ih, Nat.add_assoc]

theorem fast_sum_ok (xs : List Nat) : sumAcc xs 0 = sum xs := by
  simp [sumAcc_eq]
```

`generalizing acc` makes the induction hypothesis work for **any** accumulator, since it changes on each call.

## Where to go next

You've written programs, built types, and proved theorems. Some next steps:

- *Functional Programming in Lean*, for writing real programs.
- *Theorem Proving in Lean 4*, for the logic underneath.
- *Mathematics in Lean*, for doing maths with [Mathlib](node:mathlib).
- The Natural Number Game, a fun way to practise induction.

```compare python
# tests check examples; a proof checks every case
assert sum([1, 2] + [3]) == sum([1, 2]) + sum([3])
```

```compare typescript
expect(sum([...a, ...b])).toBe(sum(a) + sum(b)); // one example
```

```compare kotlin
check((a + b).sum() == a.sum() + b.sum())
```

```compare rust
// property testing (proptest) tries many random cases; a proof covers all of them
```

```exercise
goal: "Finish the `cons` case with `simp [sum, ih, Nat.add_assoc]`."
code: |
  def sum : List Nat → Nat
    | [] => 0
    | x :: xs => x + sum xs

  theorem sum_append (xs ys : List Nat) :
      sum (xs ++ ys) = sum xs + sum ys := by
    induction xs with
    | nil => simp [sum]
    | cons x xs ih => sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: 'cons\s+x\s+xs\s+ih\s*=>\s*simp\s*\[[^\]]*\bih\b[^\]]*\]'
    message: "Use simp with sum, ih and Nat.add_assoc."
solution: |
  def sum : List Nat → Nat
    | [] => 0
    | x :: xs => x + sum xs

  theorem sum_append (xs ys : List Nat) :
      sum (xs ++ ys) = sum xs + sum ys := by
    induction xs with
    | nil => simp [sum]
    | cons x xs ih => simp [sum, ih, Nat.add_assoc]
```

```quiz
question: "Why can a proof give more confidence than tests?"
options:
  - "Proofs run faster than tests."
  - "A proof covers every possible input, while tests check some examples."
  - "Proofs can't contain mistakes in the statement."
answer: 1
explain: "Tests sample inputs. A checked proof holds for all of them, though you still need the right statement."
```
