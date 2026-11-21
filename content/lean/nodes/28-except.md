---
title: Errors with Except
icon: "🚧"
branch: programs
requires: [do-notation, option]
summary: Results that are either a value or an error message.
---
`Option` says "there might be no answer", but not **why**. `Except ε α` is either an error of type `ε` or a value of type `α`:

```lean title=Withdraw.lean
def withdraw (balance amount : Nat) : Except String Nat :=
  if amount > balance then
    .error s!"cannot withdraw {amount}, balance is {balance}"
  else
    .ok (balance - amount)

#eval withdraw 100 30   -- Except.ok 70
#eval withdraw 100 300  -- Except.error "cannot withdraw 300, balance is 100"
```

The constructors are `.ok value` and `.error e`. Inside a `do` block, you can also write `throw e` and `return value`.

## Chaining steps

`Except` works with `do` notation. A `←` that hits an error **stops** the whole block and returns that error, like an exception:

```lean
def parseAge (s : String) : Except String Nat :=
  match s.toNat? with
  | some n => .ok n
  | none => .error s!"'{s}' is not a number"

def checkAdult (s : String) : Except String String := do
  let age ← parseAge s
  if age < 18 then
    throw s!"{age} is too young"
  return s!"welcome, age {age}"

#eval checkAdult "30"   -- Except.ok "welcome, age 30"
#eval checkAdult "abc"  -- Except.error "'abc' is not a number"
#eval checkAdult "12"   -- Except.error "12 is too young"
```

No `if error then ...` after every step: `←` takes care of it.

## Handling the result

At the end, match on it:

```lean
def report (s : String) : String :=
  match checkAdult s with
  | .ok msg => msg
  | .error e => s!"error: {e}"
```

## In IO

`IO` has errors built in, so `throw` and `try ... catch` work there directly:

```lean
def main : IO Unit := do
  try
    let text ← IO.FS.readFile "missing.txt"
    IO.println text
  catch e =>
    IO.println s!"could not read: {e}"
```

```compare python
try:
    age = int(s)
except ValueError:
    print("not a number")
```

```compare typescript
type Result = { ok: true; value: number } | { ok: false; error: string };
```

```compare kotlin
val result: Result<Int> = runCatching { s.toInt() }
```

```compare rust
fn withdraw(balance: u32, amount: u32) -> Result<u32, String> { }
```

```exercise
goal: "Inside the `do` block, stop with an error when `n = 0`, using `throw \"division by zero\"`."
code: |
  def safeDiv (m n : Nat) : Except String Nat := do
    if n = 0 then
      sorry
    return m / n
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: 'throw\s+"division by zero"'
    message: "Write throw \"division by zero\""
solution: |
  def safeDiv (m n : Nat) : Except String Nat := do
    if n = 0 then
      throw "division by zero"
    return m / n
```

```quiz
question: "In an Except do block, what happens when `let x ← step` gets an error?"
options:
  - "x becomes a default value."
  - "The block stops and returns that error."
  - "Lean crashes."
answer: 1
explain: "Except's do notation short-circuits, like an exception, but it's an ordinary value."
```
