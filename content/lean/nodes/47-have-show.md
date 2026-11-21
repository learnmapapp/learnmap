---
title: Have and show
icon: "🧩"
branch: tactics
requires: [apply]
summary: Prove intermediate facts and make proofs readable.
---
Long proofs are easier with stepping stones. `have` proves a fact in the middle of a proof and adds it as a hypothesis:

```lean title=Have.lean
example (a b : Nat) (h1 : a = 3) (h2 : b = a + 2) : b * 2 = 10 := by
  have hb : b = 5 := by omega
  simp [hb]
```

After the `have`, `hb : b = 5` is available, just like a hypothesis you started with.

## Structuring a proof

`have` lets you lay out a proof like an argument on paper: first establish this, then that, then conclude.

```lean
theorem even_sum (m n : Nat) (hm : m % 2 = 0) (hn : n % 2 = 0) :
    (m + n) % 2 = 0 := by
  have h1 : ∃ a, m = 2 * a := ⟨m / 2, by omega⟩
  have h2 : ∃ b, n = 2 * b := ⟨n / 2, by omega⟩
  obtain ⟨a, rfl⟩ := h1
  obtain ⟨b, rfl⟩ := h2
  omega
```

Writing `rfl` as a pattern substitutes the equation right away: `m` is replaced by `2 * a` everywhere.

## show

`show` states what the current goal is. It doesn't change anything (as long as it matches), but tells the reader where you are:

```lean
example (P Q : Prop) (hp : P) (hq : Q) : P ∧ Q := by
  constructor
  · show P
    exact hp
  · show Q
    exact hq
```

`show` can also restate the goal in an equivalent form, for example with a definition unfolded.

## suffices

`suffices` works the other way: "it's enough to prove this":

```lean
example (n : Nat) (h : n + 1 = 5) : n * n = 16 := by
  suffices hn : n = 4 by simp [hn]
  omega
```

```compare python
# like naming intermediate results in a calculation
step1 = ...
step2 = ...
```

```compare typescript
const hb = /* proven fact */ 5; // a named intermediate step
```

```compare kotlin
// no equivalent
```

```compare rust
// no equivalent
```

```exercise
goal: "Add a stepping stone before the `simp`: `have hx : x = 4 := by omega`."
code: |
  example (x : Nat) (h : x + 6 = 10) : x * x = 16 := by
    simp [hx]
checks:
  - match: 'have\s+hx\s*:\s*x\s*=\s*4\s*:=\s*by\s+omega'
    message: "Write have hx : x = 4 := by omega"
solution: |
  example (x : Nat) (h : x + 6 = 10) : x * x = 16 := by
    have hx : x = 4 := by omega
    simp [hx]
```

```quiz
question: "What does `have h : P := proof` do in a tactic proof?"
options:
  - "Changes the goal to P."
  - "Proves P and adds it as a hypothesis named h."
  - "Assumes P without proof."
answer: 1
explain: "have is a stepping stone: once proved, h can be used in the rest of the proof."
```
