---
title: Termination
icon: "🏁"
branch: data
requires: [recursion]
summary: Why Lean insists recursive functions finish, and how to help it.
---
Lean requires every function to **finish** for every input. A function that could loop forever would break proofs: you could "prove" anything with it. So Lean checks [[termination]] before accepting a recursive definition.

Usually it's automatic. In `factorial (n + 1) = ... factorial n`, the argument gets smaller each time, and a `Nat` can't shrink forever. That's **structural recursion**: calls on a smaller piece of the input.

## When Lean needs a hint

Lean is good at spotting why recursion ends, even when the argument isn't a piece of the input. Both of these are accepted with no help:

```lean
def digits (n : Nat) : List Nat :=
  if n < 10 then [n]
  else digits (n / 10) ++ [n % 10]

def countUp (i n : Nat) : List Nat :=
  if i < n then i :: countUp (i + 1) n else []

#eval digits 2025   -- [2, 0, 2, 5]
#eval countUp 3 7   -- [3, 4, 5, 6]
```

For `digits`, Lean uses the `else` branch to see that `n / 10 < n`. For `countUp`, it notices that `n - i` gets smaller each time.

Sometimes it can't work it out. Here, each call drops **two** elements, but `rest.drop 1` isn't a piece of the list that Lean recognizes:

```lean title=EveryOther.lean
def everyOther : List Nat → List Nat
  | [] => []
  | x :: rest => x :: everyOther (rest.drop 1)
-- error: fail to show termination for everyOther
```

`termination_by` tells Lean **which** value gets smaller. Here it's the list's length:

```lean
def everyOther : List Nat → List Nat
  | [] => []
  | x :: rest => x :: everyOther (rest.drop 1)
termination_by xs => xs.length

#eval everyOther [1, 2, 3, 4, 5]  -- [1, 3, 5]
```

Lean now has to show that `(rest.drop 1).length < (x :: rest).length`, and its automatic tactics manage that. When they don't, you write the argument yourself with `decreasing_by`, using the tactics from later in the course.

## partial

Some functions genuinely might not finish, like a game loop or a search that might run forever. Mark them `partial`:

```lean
partial def collatz (n : Nat) (steps : Nat := 0) : Nat :=
  if n ≤ 1 then steps
  else if n % 2 == 0 then collatz (n / 2) (steps + 1)
  else collatz (3 * n + 1) (steps + 1)

#eval collatz 27  -- 111
```

A `partial` function runs fine, but Lean won't let you prove things about how it behaves. Nobody knows if this one always ends!

```compare python
# Python never checks; an infinite recursion hits RecursionError
```

```compare typescript
// no check; deep recursion throws RangeError
```

```compare kotlin
tailrec fun loop(n: Int): Int = loop(n) // compiles, loops forever
```

```compare rust
// Rust doesn't check termination either
```

```exercise
goal: "Lean can't prove this search ends. Mark it `partial`."
code: |
  def findFixpoint (f : Nat → Nat) (x : Nat) : Nat :=
    if f x == x then x else findFixpoint f (f x)
checks:
  - match: '^partial\s+def\s+findFixpoint'
    message: "Write partial def findFixpoint"
solution: |
  partial def findFixpoint (f : Nat → Nat) (x : Nat) : Nat :=
    if f x == x then x else findFixpoint f (f x)
```

```quiz
question: "Why does Lean insist that functions terminate?"
options:
  - "To make programs run faster."
  - "Because a function that never finishes could be used to prove false statements."
  - "It's a limit of the compiler."
answer: 1
explain: "Lean is also a logic. Non-terminating definitions would make it inconsistent, so they need partial."
```
