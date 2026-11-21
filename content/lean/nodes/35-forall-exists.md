---
title: For all, exists
icon: "🌍"
branch: proofs
requires: [implication]
summary: Statements about every value, or about some value.
---
`∀ n : Nat, P n` (typed `\forall`) means "for every natural number n, P n holds". A proof is a **function**: give it any `n`, and it returns a proof for that `n`.

```lean title=Quantifiers.lean
theorem all_add_zero : ∀ n : Nat, n + 0 = n :=
  fun n => rfl

#check all_add_zero 7   -- all_add_zero 7 : 7 + 0 = 7
```

Using a `∀` proof means applying it to a value, as above. You've actually been writing `∀` proofs already: a theorem with a parameter `(n : Nat)` is the same thing.

```lean
theorem add_zero' (n : Nat) : n + 0 = n := rfl   -- same statement as all_add_zero
```

## Exists

`∃ n : Nat, P n` (typed `\exists`) means "there is some n for which P n holds". A proof is a **pair**: the value, called the *witness*, and a proof that it works:

```lean
theorem has_square_49 : ∃ n : Nat, n * n = 49 :=
  ⟨7, rfl⟩

theorem has_even_prime : ∃ n : Nat, n % 2 = 0 ∧ n > 1 ∧ n < 3 :=
  ⟨2, by decide⟩
```

To prove something exists, you show it.

## Using an exists

When you have `h : ∃ n, P n`, you can't ask for the value directly, but you can take it apart to get a witness and its proof:

```lean
theorem exists_bigger (h : ∃ n : Nat, n > 10) : ∃ m : Nat, m > 5 :=
  match h with
  | ⟨n, hn⟩ => ⟨n, by omega⟩
```

"There's some `n` above 10; that same `n` is above 5."

| | Build it with | Use it with |
| --- | --- | --- |
| `∀ x, P x` | `fun x => ...` | apply it: `h 7` |
| `∃ x, P x` | `⟨witness, proof⟩` | take it apart: `⟨x, hx⟩` |

```compare python
all(n + 0 == n for n in range(1000))   # checks 1000 cases, not all of them
any(n * n == 49 for n in range(100))
```

```compare typescript
nums.every((n) => n + 0 === n);
nums.some((n) => n * n === 49);
```

```compare kotlin
nums.all { it + 0 == it }
nums.any { it * it == 49 }
```

```compare rust
nums.iter().all(|&n| n + 0 == n)
```

```exercise
goal: "Prove there's a number whose double is 10: give the witness `5` and the proof `rfl`."
code: |
  theorem half_of_ten : ∃ n : Nat, 2 * n = 10 :=
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: '⟨\s*5\s*,\s*rfl\s*⟩'
    message: "Write ⟨5, rfl⟩"
solution: |
  theorem half_of_ten : ∃ n : Nat, 2 * n = 10 :=
    ⟨5, rfl⟩
```

```quiz
question: "What do you need to prove `∃ x, P x`?"
options:
  - "A proof that P holds for every x."
  - "A specific value, and a proof that P holds for it."
  - "A proof that P is false for no x."
answer: 1
explain: "An existence proof is a pair: a witness and evidence about that witness."
```
