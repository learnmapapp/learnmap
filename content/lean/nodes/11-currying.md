---
title: Currying
icon: "🍛"
branch: basics
requires: [lambdas]
summary: Every function takes one argument, so you can fill them in one at a time.
---
Earlier you saw that `add` has type `Nat → Nat → Nat`. The arrows group to the **right**, so that's really:

```lean
Nat → (Nat → Nat)
```

In words: `add` takes **one** `Nat` and returns a function that takes another `Nat`. This idea is called [[currying]], after the logician Haskell Curry.

```lean title=Curry.lean
def add (a b : Nat) : Nat := a + b

def addTen := add 10     -- give only the first argument
#check addTen            -- addTen : Nat → Nat
#eval addTen 5           -- 15
#eval add 10 5           -- 15, the same thing in one go
```

`add 10 5` is read as `(add 10) 5`: first `add 10` makes a function, then that function is applied to `5`.

## Why it's useful

Giving a function some of its arguments, called **partial application**, creates new functions for free. That fits perfectly with `map` and `filter`:

```lean
def multiply (factor n : Nat) : Nat := factor * n

#eval [1, 2, 3].map (multiply 100)  -- [100, 200, 300]

#eval ["Ada", "Bob", "Alan"].filter (·.startsWith "A")  -- ["Ada", "Alan"]
```

## Putting useful arguments first

Because of currying, Lean functions tend to put the "settings" first and the data last. `multiply factor n` rather than `multiply n factor`: then `multiply 100` is a handy function on its own.

```compare python
from functools import partial
add_ten = partial(add, 10)
```

```compare typescript
const add = (a: number) => (b: number) => a + b;
const addTen = add(10);
```

```compare kotlin
val add = { a: Int -> { b: Int -> a + b } }
```

```compare rust
let add_ten = |b| add(10, b);
```

```exercise
goal: "Use partial application: define `greetHi` as `greet \"Hi\"`, without writing `fun`."
code: |
  def greet (word name : String) : String := s!"{word}, {name}!"

  def greetHi := fun name => greet "Hi" name
checks:
  - match: 'def\s+greetHi\s*:=\s*greet\s+"Hi"\s*$'
    message: "Write def greetHi := greet \"Hi\""
solution: |
  def greet (word name : String) : String := s!"{word}, {name}!"

  def greetHi := greet "Hi"
```

```quiz
question: "`def f (a b c : Nat) : Nat`. What is the type of `f 1 2`?"
options:
  - "`Nat`"
  - "`Nat → Nat`"
  - "It's an error: f needs three arguments."
answer: 1
explain: "Two arguments are filled in, so one is left: the result is a function from Nat to Nat."
```
