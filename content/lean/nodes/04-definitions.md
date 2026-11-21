---
title: Definitions
icon: "✏️"
branch: basics
requires: [eval-check]
summary: Name values and functions with def.
---
A [[definition]] gives a name to a value. You write `def`, the name, the type, `:=` and the value:

```lean title=Shop.lean
def price : Nat := 12
def taxRate : Float := 0.21
def shopName : String := "Lean Bakery"

#eval price * 3   -- 36
#eval shopName    -- "Lean Bakery"
```

`:=` means "is defined as". The type is often optional, because Lean can work it out:

```lean
def answer := 42   -- Lean infers Nat
```

## Functions

A function definition lists its parameters in brackets, each with a type, before the result type:

```lean
def double (n : Nat) : Nat := n * 2

def total (count : Nat) (each : Nat) : Nat :=
  count * each

#eval double 21      -- 42
#eval total 3 price  -- 36
```

Notice: calling a function needs **no brackets or commas**. You write the function name and then the arguments, separated by spaces. `total 3 price` means `total(3, price)` in most other languages.

Brackets are only for grouping:

```lean
#eval double (double 5)  -- 20
#eval double double 5    -- error: double expects one Nat, not a function
```

## Definitions never change

Once defined, a name always means the same thing. There's no `price := 13` later on. That's part of being a **functional** language, and it's what makes proving things about definitions possible.

```compare python
PRICE = 12
def double(n: int) -> int:
    return n * 2
```

```compare typescript
const price: number = 12;
const double = (n: number): number => n * 2;
```

```compare kotlin
val price: Int = 12
fun double(n: Int): Int = n * 2
```

```compare rust
const PRICE: u32 = 12;
fn double(n: u32) -> u32 { n * 2 }
```

```exercise
goal: "Define a function `triple` that takes `n : Nat` and returns `n * 3`."
code: |
  def triple

  #eval triple 5
checks:
  - match: 'def\s+triple\s*\(\s*n\s*:\s*Nat\s*\)\s*:\s*Nat\s*:=\s*n\s*\*\s*3'
    message: "Write def triple (n : Nat) : Nat := n * 3"
solution: |
  def triple (n : Nat) : Nat := n * 3

  #eval triple 5
```

```quiz
question: "How do you call `total` with 3 and 4?"
options:
  - "`total(3, 4)`"
  - "`total 3 4`"
  - "`total [3, 4]`"
answer: 1
explain: "Arguments follow the function name, separated by spaces, without brackets or commas."
```
