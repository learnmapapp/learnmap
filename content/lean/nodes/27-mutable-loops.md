---
title: Loops and mut
icon: "🔄"
branch: programs
requires: [do-notation]
summary: Imperative-style for loops and mutable variables, inside do.
---
Recursion is always available, but sometimes a loop is simply clearer. Inside a `do` block, Lean lets you write imperative-looking code: `for` loops and `let mut` variables.

```lean title=Main.lean
def main : IO Unit := do
  let mut total := 0
  for n in [1, 2, 3, 4, 5] do
    total := total + n
    IO.println s!"added {n}, total is {total}"
  IO.println s!"final: {total}"
```

- `let mut total := 0` makes a variable you can reassign.
- `total := total + n` gives it a new value.
- `for x in collection do` loops over a list, an array, or a range.

Ranges are written `[start:stop]`, with `stop` not included:

```lean
for i in [0:3] do
  IO.println i   -- 0, 1, 2
```

## In pure functions

You don't need `IO` to use this style. `Id.run do` gives a `do` block with no effects at all, so the function stays pure:

```lean
def sumOfSquares (xs : List Nat) : Nat := Id.run do
  let mut acc := 0
  for x in xs do
    acc := acc + x * x
  return acc

#eval sumOfSquares [1, 2, 3]  -- 14
```

Behind the scenes, Lean turns this into ordinary functional code, so nothing really changes. It's just a nicer way to write some functions.

## Other loop tools

```lean
def firstNegative (xs : List Int) : Option Int := Id.run do
  for x in xs do
    if x < 0 then
      return some x   -- leave the whole function
  return none

def countdown : IO Unit := do
  let mut n := 3
  while n > 0 do
    IO.println n
    n := n - 1
```

`break` and `continue` work too.

```compare python
total = 0
for n in [1, 2, 3, 4, 5]:
    total += n
```

```compare typescript
let total = 0;
for (const n of [1, 2, 3, 4, 5]) total += n;
```

```compare kotlin
var total = 0
for (n in listOf(1, 2, 3, 4, 5)) total += n
```

```compare rust
let mut total = 0;
for n in [1, 2, 3, 4, 5] { total += n; }
```

```exercise
goal: "`count` is reassigned in the loop, so it must be declared with `let mut`."
code: |
  def countEven (xs : List Nat) : Nat := Id.run do
    let count := 0
    for x in xs do
      if x % 2 == 0 then
        count := count + 1
    return count
checks:
  - match: 'let\s+mut\s+count\s*:=\s*0'
    message: "Write let mut count := 0"
solution: |
  def countEven (xs : List Nat) : Nat := Id.run do
    let mut count := 0
    for x in xs do
      if x % 2 == 0 then
        count := count + 1
    return count
```

```quiz
question: "What does `Id.run do` let you do?"
options:
  - "Use for loops and mut in a pure function, without IO."
  - "Run a function in a separate thread."
  - "Print from a pure function."
answer: 0
explain: "Id is the monad with no effects. The function stays pure, but you can write it in do style."
```
