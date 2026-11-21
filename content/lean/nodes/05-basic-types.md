---
title: Basic types
icon: "🔢"
branch: basics
requires: [definitions]
summary: Nat, Int, Float, Bool, String and Char.
---
Every value in Lean has a [[type]]. These are the ones you'll use most:

| Type | Example values | Notes |
| --- | --- | --- |
| `Nat` | `0`, `7`, `1000000` | natural numbers, no limit on size |
| `Int` | `-3`, `0`, `12` | whole numbers, including negatives |
| `Float` | `3.14`, `0.5` | decimal numbers |
| `Bool` | `true`, `false` | yes or no |
| `String` | `"hello"` | text |
| `Char` | `'a'`, `'7'` | one character |

```lean title=Types.lean
def age : Nat := 36
def balance : Int := -250
def temperature : Float := 21.5
def isOpen : Bool := true
def initial : Char := 'L'

#eval age + 1               -- 37
#eval balance * 2           -- -500
#eval temperature * 2       -- 43.000000
#eval isOpen && !false      -- true
#eval 2 ^ 100               -- 1267650600228229401496703205376
```

`Nat` and `Int` never overflow: they grow as big as needed.

## No silent mixing

Lean won't quietly mix types. Adding an `Int` and a `Nat` needs a conversion:

```lean
def a : Int := -5
def b : Nat := 3

#eval a + b          -- -2: Lean converts b to an Int for you
def c : Nat := a     -- error: type mismatch, a is an Int
def d : Nat := a.toNat  -- fine: negative Ints become 0
#eval b.toFloat      -- 3.000000
```

Going from `Nat` to `Int` is always safe, so Lean does it automatically. The other way around might lose information, so you have to ask for it.

## Comparisons

`==`, `!=`, `<`, `<=`, `>` and `>=` give a `Bool`:

```lean
#eval 3 < 5       -- true
#eval "a" == "b"  -- false
```

```compare python
age: int = 36
is_open: bool = True
```

```compare typescript
const age: number = 36;
const isOpen: boolean = true;
```

```compare kotlin
val age: Int = 36
val isOpen: Boolean = true
```

```compare rust
let age: u32 = 36;
let is_open: bool = true;
```

```exercise
goal: "`debt` should be able to hold negative numbers. Change its type from `Nat` to `Int`."
code: |
  def debt : Nat := -40
checks:
  - match: 'def\s+debt\s*:\s*Int\s*:=\s*-40'
    message: "Write def debt : Int := -40"
solution: |
  def debt : Int := -40
```

```quiz
question: "Which type would you use for a temperature like 21.5?"
options:
  - "`Nat`"
  - "`Int`"
  - "`Float`"
answer: 2
explain: "Nat and Int are whole numbers. Float holds decimals."
```
