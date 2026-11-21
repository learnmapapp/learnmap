---
title: Propositions
icon: "💡"
kind: hub
branch: proofs
requires: [functions]
summary: Statements are types, and proofs are values of those types.
---
Welcome to the second half of Lean. A [[proposition]] is a statement that could be true or false. In Lean, a proposition is a **type**, and its type is [[Prop]]:

```lean title=Props.lean
#check 2 + 2 = 4         -- 2 + 2 = 4 : Prop
#check 2 + 2 = 5         -- 2 + 2 = 5 : Prop
#check 3 < 7             -- 3 < 7 : Prop
#check ∀ n : Nat, n ≥ 0  -- ∀ (n : Nat), n ≥ 0 : Prop
```

Notice `2 + 2 = 5` is a perfectly good proposition. It's just false. Writing a statement down doesn't claim it's true.

## Proofs are values

So what is a **proof**? Here's the big idea of Lean, called *propositions as types*:

> A proof of a proposition `P` is a value whose type is `P`.

You already know how to say "`x` has type `Nat`": `x : Nat`. In the same way, `h : 2 + 2 = 4` says "`h` is a proof that 2 + 2 = 4".

```lean
def h : 2 + 2 = 4 := rfl
```

`rfl` ("reflexivity") is the proof that something equals itself. Lean computes both sides, sees `4 = 4`, and accepts it. For `2 + 2 = 5` there's no such value, and nothing you write will type-check.

## Why this matters

Because proofs are values, everything you've learned carries over:

| Programming | Proving |
| --- | --- |
| a type | a proposition |
| a value of that type | a proof |
| a function `A → B` | "if A, then B" |
| a pair of values | "A and B" |
| type checking | proof checking |

Checking a proof is exactly the same as checking that a program has the right type. That's why Lean can be both a programming language and a proof assistant.

```compare python
assert 2 + 2 == 4   # checked by running, for this one case
```

```compare typescript
const x: 4 = 4;   // TypeScript literal types are a tiny glimpse of this idea
```

```compare kotlin
check(2 + 2 == 4)  // a runtime check, not a proof
```

```compare rust
const _: () = assert!(2 + 2 == 4); // checked at compile time, for one case
```

```exercise
goal: "Ask Lean for the type of the statement `10 > 3` with `#check`. (It should be `Prop`.)"
code: |
  -- what kind of thing is 10 > 3?
checks:
  - match: '^#check\s+10\s*>\s*3'
    message: "Write #check 10 > 3"
solution: |
  -- what kind of thing is 10 > 3?
  #check 10 > 3
```

```quiz
question: "In Lean, what is a proof of `P`?"
options:
  - "A comment explaining why P holds."
  - "A value whose type is P."
  - "A test that P is true for some inputs."
answer: 1
explain: "Propositions are types, and proofs are values of those types."
```
