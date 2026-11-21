---
title: Recursion
icon: "🔁"
branch: data
requires: [pattern-matching]
summary: Functions that call themselves, the functional way to loop.
---
Functional code doesn't loop with a changing counter. Instead, a function calls **itself** on a smaller input, until it reaches a case it can answer directly.

```lean title=Recursion.lean
def factorial : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * factorial n

#eval factorial 5   -- 120
#eval factorial 20  -- 2432902008176640000
```

Read it as two rules:

1. The factorial of 0 is 1. That's the **base case**.
2. The factorial of `n + 1` is `n + 1` times the factorial of `n`. That's the **recursive case**.

The pattern `n + 1` matches any number that isn't 0, and names the number one smaller `n`. Remember that `Nat` is built from `zero` and `succ`: `n + 1` is `succ n`.

## How it runs

```lean
-- factorial 3
-- = 3 * factorial 2
-- = 3 * (2 * factorial 1)
-- = 3 * (2 * (1 * factorial 0))
-- = 3 * (2 * (1 * 1))
-- = 6
```

## Recursion on your own types

Recursive types go naturally with recursive functions. Each recursive constructor gets a recursive call:

```lean
inductive Tree where
  | leaf
  | node (left : Tree) (value : Nat) (right : Tree)

def Tree.sum : Tree → Nat
  | .leaf => 0
  | .node l v r => l.sum + v + r.sum

#eval (Tree.node .leaf 5 (.node .leaf 8 .leaf)).sum  -- 13
```

## Lean checks that it ends

Lean only accepts a recursive function if it can see that it always **finishes**. Here, each call is on a smaller number or a smaller tree, so that's clear. More in [Termination](node:termination).

```compare python
def factorial(n):
    return 1 if n == 0 else n * factorial(n - 1)
```

```compare typescript
const factorial = (n: number): number => (n === 0 ? 1 : n * factorial(n - 1));
```

```compare kotlin
fun factorial(n: Long): Long = if (n == 0L) 1 else n * factorial(n - 1)
```

```compare rust
fn factorial(n: u64) -> u64 { if n == 0 { 1 } else { n * factorial(n - 1) } }
```

```exercise
goal: "Finish `sumTo`, which adds 0 + 1 + ... + n. Fill in the recursive case: `(n + 1) + sumTo n`."
code: |
  def sumTo : Nat → Nat
    | 0 => 0
    | n + 1 => sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry with the recursive case."
  - match: '\|\s*n\s*\+\s*1\s*=>\s*\(\s*n\s*\+\s*1\s*\)\s*\+\s*sumTo\s+n'
    message: "Write | n + 1 => (n + 1) + sumTo n"
solution: |
  def sumTo : Nat → Nat
    | 0 => 0
    | n + 1 => (n + 1) + sumTo n
```

```quiz
question: "In `| n + 1 => ...`, what is `n` when the input is 7?"
options:
  - "7"
  - "6"
  - "8"
answer: 1
explain: "The pattern n + 1 matches 7 with n = 6."
```
