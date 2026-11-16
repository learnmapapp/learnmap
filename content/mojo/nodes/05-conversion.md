---
title: Explicit numeric conversions
icon: 🚦
branch: basics
requires:
  - floats
summary: Type constructors express numeric conversion.
---

Type constructors express numeric conversion. Convert deliberately at boundaries rather than relying on accidental mixed-type arithmetic.

```mojo
def main() raises:
    var count: Int = 4
    var average = Float64(10) / Float64(count)
    print(average)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about explicit numeric conversions.
lang: mojo
code: |-
  def main() raises:
      var count: Int = 4
      var average = Float64(10) * Float64(count)
      print(average)
checks:
  - match: Float64\(10\)\s+/\s+Float64\(count\)
    message: Use Float64(10) / Float64(count) for this step.
  - notMatch: Float64\(10\)\s+\*\s+Float64\(count\)
    message: Replace Float64(10) * Float64(count) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "Which expression explicitly converts `count: Int` to `Float64`?"
options:
  - "`String(count)`"
  - "`count: Float64` as a runtime expression."
  - "`Float64(count)`"
answer: 2
explain: A numeric type constructor expresses conversion to that type.
```
