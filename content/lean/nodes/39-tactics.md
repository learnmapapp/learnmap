---
title: Tactic proofs
icon: "🛠️"
kind: hub
branch: tactics
requires: [theorems]
summary: Build proofs step by step, watching the goal change.
---
Writing proofs as terms, like `⟨h.right, h.left⟩`, gets hard quickly. Most Lean proofs are written with **tactics** instead: commands that build the proof for you, one step at a time.

A tactic proof starts with `by`:

```lean title=Tactics.lean
theorem and_swap (P Q : Prop) (h : P ∧ Q) : Q ∧ P := by
  obtain ⟨hp, hq⟩ := h
  constructor
  · exact hq
  · exact hp
```

## The goal

The key to tactics is the **goal**: what you still have to prove, together with the hypotheses you have. Put your cursor in the proof, and the editor's *infoview* shows it. Before the first line:

```text
P Q : Prop
h : P ∧ Q
⊢ Q ∧ P
```

Everything above `⊢` (typed `\|-`) is what you have; below it is what you need. Each tactic changes the goal:

1. `obtain ⟨hp, hq⟩ := h` splits `h` into `hp : P` and `hq : Q`.
2. `constructor` says "I'll prove `Q ∧ P` by proving each side", leaving **two** goals: `⊢ Q` and `⊢ P`.
3. `·` focuses on one goal. `exact hq` closes the first, `exact hp` the second.

When no goals are left, the proof is done.

## Basic tactics

| Tactic | What it does |
| --- | --- |
| `intro h` | goal `P → Q`: assume `h : P`, now prove `Q` |
| `exact e` | close the goal with exactly the term `e` |
| `constructor` | split `∧`, `↔` or a structure into parts |
| `left` / `right` | prove `P ∨ Q` by proving one side |
| `obtain ⟨a, b⟩ := h` | take apart `∧` or `∃` |
| `rfl` | close `a = a` |
| `sorry` | give up on this goal (for now) |

```lean
theorem p_imp_p (P : Prop) : P → P := by
  intro hp
  exact hp

theorem or_left (P Q : Prop) (hp : P) : P ∨ Q := by
  left
  exact hp
```

```tip
Write sorry first, then replace it a step at a time, checking the goal after each tactic.
```

```compare python
# no equivalent: Python checks programs by running them
```

```compare typescript
// Like narrowing: each check refines what you know about a value
```

```compare kotlin
// Smart casts are a tiny version of using hypotheses
```

```compare rust
// The borrow checker proves one fixed property; tactics prove anything you state
```

```exercise
goal: "Finish the proof: after `intro hp`, close the goal with `exact hp`."
code: |
  theorem same (P : Prop) : P → P := by
    intro hp
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: 'exact\s+hp'
    message: "Write exact hp"
solution: |
  theorem same (P : Prop) : P → P := by
    intro hp
    exact hp
```

```quiz
question: "Your goal is `⊢ P → Q`. Which tactic should usually come first?"
options:
  - "`exact`"
  - "`intro`"
  - "`left`"
answer: 1
explain: "intro assumes P as a hypothesis, leaving Q to prove."
```
