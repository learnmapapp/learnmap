---
title: Named and default arguments
icon: 🧪
branch: functions
requires:
  - procedures
  - strings
summary: Default arguments make an omitted value explicit.
---

Default arguments make an omitted value explicit. Named arguments improve clarity when several parameters have the same type.

```nim
proc greet(name: string; prefix = "Hello"): string =
  prefix & ", " & name
echo greet(name = "Ada")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about named and default arguments.
lang: nim
code: |-
  proc greet(name: string; prefix = "Bye"): string =
    prefix & ", " & name
  echo greet(name = "Ada")
checks:
  - match: prefix\s+=\s+"Hello"
    message: Use prefix = "Hello" for this step.
  - notMatch: prefix\s+=\s+"Bye"
    message: Replace prefix = "Bye" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about named and default arguments is correct?
options:
  - Default parameters are mutable globals.
  - Default arguments make an omitted value explicit. Named arguments improve clarity when several
    parameters have the same type.
  - Named arguments must be in declaration order.
answer: 1
explain: Default arguments make an omitted value explicit. Named arguments improve clarity when
  several parameters have the same type.
```
