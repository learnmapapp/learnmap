---
title: The simplifier
icon: "🧹"
branch: tactics
requires: [rw]
summary: Let simp apply hundreds of rewrite rules for you.
---
`rw` makes one precise change. `simp` is the opposite: it repeatedly rewrites the goal using a big library of simplification rules until it can't simplify further. If the goal becomes `True`, it's proved.

```lean title=Simp.lean
example (n : Nat) : n + 0 = n := by simp
example (xs : List Nat) : (xs ++ []).length = xs.length := by simp
example (a b : Nat) (h : a = b) : a + 0 = b := by simp [h]
example (P : Prop) (hp : P) : P ∧ True := by simp [hp]
```

## Giving simp more rules

`simp [h1, h2, f]` adds hypotheses, theorems and definitions to the rules. Adding a definition's name **unfolds** it:

```lean
def double (n : Nat) : Nat := n + n

example (n : Nat) : double n = n + n := by simp [double]
```

## Where simp gets its rules

Theorems tagged `@[simp]` are used automatically. You can add your own:

```lean
@[simp] theorem double_zero : double 0 = 0 := rfl

example : double 0 + 5 = 5 := by simp
```

Good simp rules make the right side **simpler** than the left, so simp always makes progress.

## Variations

| Form | Effect |
| --- | --- |
| `simp` | simplify the goal |
| `simp [h, f]` | also use `h` and unfold `f` |
| `simp at h` | simplify the hypothesis `h` |
| `simp_all` | simplify everything using everything |
| `simp?` | simplify, and suggest an exact `simp only [...]` |

```tip
simp is great at the end of a proof. In the middle, prefer rw or simp only [...], so later Lean versions don't change what your proof does.
```

```compare python
# like sympy.simplify, but every step is checked
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
goal: "Prove the goal with `simp`, giving it the definition `triple` so it can unfold it."
code: |
  def triple (n : Nat) : Nat := 3 * n

  example : triple 0 = 0 := by
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: 'simp\s*\[\s*triple\s*\]'
    message: "Write simp [triple]"
solution: |
  def triple (n : Nat) : Nat := 3 * n

  example : triple 0 = 0 := by
    simp [triple]
```

```quiz
question: "What does `simp [f]` do with the definition f?"
options:
  - "Proves f is correct."
  - "Unfolds f while simplifying."
  - "Removes f from the file."
answer: 1
explain: "Passing a definition's name lets simp replace calls to it with its body."
```
