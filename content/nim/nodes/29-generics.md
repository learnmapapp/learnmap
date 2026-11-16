---
title: Generic procedures
icon: 🚦
branch: design
requires:
  - procedures
summary: Generic parameters preserve type information while sharing an algorithm.
---

Generic parameters preserve type information while sharing an algorithm. The first operation still needs a nonempty-input contract.

A useful term here is [[generic]]: Code parameterized by types or compile-time values so it can work with multiple concrete types.

```nim
proc first[T](values: openArray[T]): T =
  doAssert values.len > 0
  values[0]
echo first(["Nim", "Lua"])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about generic procedures.
lang: nim
code: |-
  proc first[T](values: openArray[T]): T =
    doAssert values.len > 0
    values[1]
  echo first(["Nim", "Lua"])
checks:
  - match: values\[0\]
    message: Use values[0] for this step.
  - notMatch: values\[1\]
    message: Replace values[1] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What type does `first(["Nim", "Lua"])` return in `first[T]`?
options:
  - "`int`"
  - "`seq[string]`"
  - "`string`"
answer: 2
explain: The type parameter preserves the input element type in the result.
```
