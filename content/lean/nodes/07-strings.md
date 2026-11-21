---
title: Strings
icon: "🔤"
branch: basics
requires: [basic-types]
summary: Joining, interpolation, and useful string functions.
---
Strings are written in double quotes. You join them with `++`:

```lean title=Strings.lean
def first := "Ada"
def last := "Lovelace"

#eval first ++ " " ++ last   -- "Ada Lovelace"
```

## Interpolation

Put `s!` before a string and anything inside `{ }` is turned into text and inserted:

```lean
def age := 36

#eval s!"{first} is {age} years old"        -- "Ada is 36 years old"
#eval s!"Next year: {age + 1}"              -- "Next year: 37"
```

That's usually easier than `++` with `toString`.

## Useful functions

Functions about strings live in the `String` namespace. You can call them with **dot notation** on a value:

```lean
#eval "hello".length               -- 5
#eval "hello".toUpper              -- "HELLO"
#eval "a,b,c".splitOn ","          -- ["a", "b", "c"]
#eval "  padded ".trimAscii.toString  -- "padded"
#eval "lean".startsWith "le"       -- true
#eval "banana".replace "a" "o"     -- "bonono"
#eval String.join ["x", "y", "z"]  -- "xyz"
```

`"hello".length` is the same as `String.length "hello"`. Lean sees that the value is a `String`, so it looks for `length` in `String`.

`trimAscii` removes spaces from both ends. It returns a *slice*, a view into the original string, so `.toString` turns it back into a `String`.

## Characters

A `Char` is written in single quotes. `.toList` turns a string into its characters:

```lean
#eval "hey".toList              -- ['h', 'e', 'y']
#eval 'a'.isAlpha               -- true
#eval "R2D2".toList.filter Char.isDigit  -- ['2', '2']
```

```compare python
f"{first} is {age} years old"
```

```compare typescript
`${first} is ${age} years old`
```

```compare kotlin
"$first is $age years old"
```

```compare rust
format!("{first} is {age} years old")
```

```exercise
goal: "Replace the `++` chain with an interpolated string using `s!`."
code: |
  def label (item : String) (qty : Nat) : String :=
    item ++ " x" ++ toString qty
checks:
  - match: 's!"\{item\} x\{qty\}"'
    message: "Write s!\"{item} x{qty}\""
  - notMatch: '\+\+'
    message: "Remove the ++ operators."
solution: |
  def label (item : String) (qty : Nat) : String :=
    s!"{item} x{qty}"
```

```quiz
question: "What does `\"a-b\".splitOn \"-\"` return?"
options:
  - "`[\"a\", \"b\"]`"
  - "`\"ab\"`"
  - "`(\"a\", \"b\")`"
answer: 0
explain: "splitOn cuts the string at each separator and returns a List String."
```
