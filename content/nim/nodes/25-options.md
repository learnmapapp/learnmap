---
title: Optional values
icon: 🧪
branch: data
requires:
  - procedures
summary: Option[T] models a possibly absent value.
---

`Option`[T] models a possibly absent value. Check isSome before get, or use a suitable explicit fallback.

A useful term here is [[option]]: A container that explicitly represents either a present value or absence.

```nim
import std/options
proc findScore(name: string): Option[int] =
  if name == "Ada": some(8) else: none(int)
let score = findScore("Ada")
if score.isSome:
  echo score.get()
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about optional values.
lang: nim
code: |-
  import std/options
  proc findScore(name: string): Option[int] =
    if name == "Ada": some(0) else: none(int)
  let score = findScore("Ada")
  if score.isSome:
    echo score.get()
checks:
  - match: some\(8\)
    message: Use some(8) for this step.
  - notMatch: some\(0\)
    message: Replace some(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What should you establish before calling `score.get()`?
options:
  - That the option is stored in a `var`.
  - That the `Option` contains a value.
  - That the contained number is positive.
answer: 1
explain: "`isSome` checks presence; it does not constrain the stored value's range."
```
