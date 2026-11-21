---
title: Implication
icon: "➡️"
branch: proofs
requires: [theorems]
summary: "\"If P then Q\" is a function from proofs of P to proofs of Q."
---
"If it rains, the street is wet" is written `Rain → Wet`. Yes, that's the same arrow as in function types. And that's no accident:

> A proof of `P → Q` is a **function** that turns any proof of `P` into a proof of `Q`.

```lean title=Implication.lean
variable (Rain Wet Slippery : Prop)

theorem street (rain_wet : Rain → Wet) (wet_slip : Wet → Slippery) :
    Rain → Slippery :=
  fun h => wet_slip (rain_wet h)
```

`variable` declares names that the following theorems can use, so we don't repeat `(Rain Wet Slippery : Prop)` every time.

Read the proof like a program: "given a proof `h` that it rains, apply `rain_wet` to get a proof that it's wet, then `wet_slip` to get a proof that it's slippery."

## Hypotheses

The parameters `rain_wet` and `wet_slip` are [[hypothesis|hypotheses]]: facts the theorem may assume. Calling the theorem means supplying proofs of them.

Using a hypothesis `h : P → Q` on a proof `hp : P` is just function application, `h hp`. Logicians call that *modus ponens*:

```lean
theorem modus_ponens (P Q : Prop) (hp : P) (h : P → Q) : Q :=
  h hp
```

## Several assumptions

`P → Q → R` means `P → (Q → R)`, exactly like curried functions. It's read "if P and Q, then R":

```lean
theorem first (P Q : Prop) : P → Q → P :=
  fun hp _ => hp
```

## With numbers

Hypotheses often state facts about values:

```lean
theorem bigger (n : Nat) (h : n = 5) : n + 1 = 6 := by
  subst h
  rfl
```

(That `by` starts a tactic proof. You'll meet [tactics](node:tactics) soon.)

```compare typescript
// a function from evidence to evidence
const street = (rainWet: (r: Rain) => Wet, wetSlip: (w: Wet) => Slip) =>
  (h: Rain) => wetSlip(rainWet(h));
```

```compare kotlin
fun street(rainWet: (Rain) -> Wet, wetSlip: (Wet) -> Slip): (Rain) -> Slip = { wetSlip(rainWet(it)) }
```

```compare python
# Python can't express proofs, but it's the same shape as function composition
```

```compare rust
fn street(rain_wet: impl Fn(Rain) -> Wet, wet_slip: impl Fn(Wet) -> Slip) -> impl Fn(Rain) -> Slip { move |h| wet_slip(rain_wet(h)) }
```

```exercise
goal: "Prove `Q` by applying the hypothesis `h` to `hp`."
code: |
  theorem use_it (P Q : Prop) (hp : P) (h : P → Q) : Q :=
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: ':=\s*h\s+hp\s*$'
    message: "The proof is h hp."
solution: |
  theorem use_it (P Q : Prop) (hp : P) (h : P → Q) : Q :=
    h hp
```

```quiz
question: "What is a proof of `P → Q`?"
options:
  - "A proof of P and a proof of Q."
  - "A function that turns a proof of P into a proof of Q."
  - "A proof that P and Q are equal."
answer: 1
explain: "Implication is the function type. Proving it means writing such a function."
```
