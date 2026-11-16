---
title: Default arguments
icon: 💬
branch: functions
requires:
  - functions
summary: Default arguments let callers omit common choices.
---

Default arguments let callers omit common choices. Keep the default visible in the signature rather than hiding it inside the function.

```mojo
def power(base: Int, exponent: Int = 2) -> Int:
    var result = 1
    for _ in range(exponent):
        result *= base
    return result

def main() raises:
    print(power(3))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about default arguments.
lang: mojo
code: |-
  def power(base: Int, exponent: Int = 1) -> Int:
      var result = 1
      for _ in range(exponent):
          result *= base
      return result

  def main() raises:
      print(power(3))
checks:
  - match: exponent:\s+Int\s+=\s+2
    message: "Use exponent: Int = 2 for this step."
  - notMatch: exponent:\s+Int\s+=\s+1
    message: "Replace exponent: Int = 1 in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "For `power(base: Int, exponent: Int = 2)`, which exponent does `power(3)` use?"
options:
  - The preceding call's exponent.
  - "`2`"
  - "`3`"
answer: 1
explain: An omitted argument uses the signature's default value.
```
