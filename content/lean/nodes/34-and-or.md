---
title: And, or
icon: "🔀"
branch: proofs
requires: [implication]
summary: Combine statements with ∧ and ∨, and build or use their proofs.
---
`P ∧ Q` (typed `\and`) means "P and Q". A proof of it is a **pair**: a proof of `P` together with a proof of `Q`.

```lean title=AndOr.lean
theorem both : 1 < 2 ∧ 2 < 3 :=
  ⟨by decide, by decide⟩

theorem and_swap (P Q : Prop) (h : P ∧ Q) : Q ∧ P :=
  ⟨h.right, h.left⟩
```

- Build: `⟨hp, hq⟩` (or `And.intro hp hq`).
- Use: `h.left` (or `h.1`) is the proof of `P`, and `h.right` (`h.2`) the proof of `Q`.

## Or

`P ∨ Q` (typed `\or`) means "P or Q, or both". A proof says **which one** holds, and proves it:

```lean
theorem left_one : 1 = 1 ∨ 1 = 2 :=
  Or.inl rfl        -- "the left side is true, and here's why"

theorem right_one : 1 = 2 ∨ 2 = 2 :=
  Or.inr rfl
```

To **use** a proof of `P ∨ Q`, you don't know which side is true, so you must handle both. That's a `match`, like on any inductive type:

```lean
theorem or_swap (P Q : Prop) (h : P ∨ Q) : Q ∨ P :=
  match h with
  | Or.inl hp => Or.inr hp
  | Or.inr hq => Or.inl hq
```

`And` and `Or` really are inductive types: `And` is a structure with two fields, and `Or` has two constructors. It's the same idea as `Point` and `Shape`, applied to proofs.

| | Build it with | Use it with |
| --- | --- | --- |
| `P ∧ Q` | `⟨hp, hq⟩` | `h.left`, `h.right` |
| `P ∨ Q` | `Or.inl hp` or `Or.inr hq` | `match` with two cases |

```compare typescript
type And<P, Q> = [P, Q];                              // a pair
type Or<P, Q> = { tag: "inl"; p: P } | { tag: "inr"; q: Q }; // a tagged union
```

```compare kotlin
data class And<P, Q>(val left: P, val right: Q)
```

```compare rust
struct And<P, Q>(P, Q);
enum Or<P, Q> { Inl(P), Inr(Q) }
```

```compare python
# and/or on bools only say true or false; Lean's carry the evidence
```

```exercise
goal: "Prove `P ∧ Q` from `hp` and `hq` with the anonymous constructor `⟨hp, hq⟩`."
code: |
  theorem pair_up (P Q : Prop) (hp : P) (hq : Q) : P ∧ Q :=
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: '⟨\s*hp\s*,\s*hq\s*⟩|And\.intro\s+hp\s+hq'
    message: "Write ⟨hp, hq⟩"
solution: |
  theorem pair_up (P Q : Prop) (hp : P) (hq : Q) : P ∧ Q :=
    ⟨hp, hq⟩
```

```quiz
question: "You have `h : P ∨ Q`. How do you use it?"
options:
  - "Take h.left."
  - "Handle both cases: one where P holds and one where Q holds."
  - "You can't use it."
answer: 1
explain: "An or-proof only tells you one side is true, so you must cover both possibilities."
```
