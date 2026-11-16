---
title: Floating-point computation
icon: 💬
branch: basics
requires:
  - integers
summary: Float32 and Float64 trade storage and precision.
---

`Float32` and `Float64` trade storage and precision. Binary floating-point approximates many decimal values; compare computed results with a suitable tolerance.

```mojo
def main() raises:
    var distance: Float64 = 12.5
    var time: Float64 = 2.0
    print(distance / time)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about floating-point computation.
lang: mojo
code: |-
  def main() raises:
      var distance: Float64 = 12.5
      var time: Float64 = 2.0
      print(distance * time)
checks:
  - match: distance\s+/\s+time
    message: Use distance / time for this step.
  - notMatch: distance\s+\*\s+time
    message: Replace distance * time in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why use a tolerance when checking a floating-point calculation?
options:
  - "`Float64` can represent only whole numbers."
  - Binary floating-point approximates many decimal values.
  - Every floating-point operation returns a random value.
answer: 1
explain: Exact equality can be inappropriate for results affected by rounding.
```
