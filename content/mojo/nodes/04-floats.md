---
title: Floating-point computation
icon: 💬
branch: basics
requires:
  - integers
summary: Float32 and Float64 trade storage and precision.
---

Float32 and Float64 trade storage and precision. Binary floating-point approximates many decimal values; compare computed results with a suitable tolerance.

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
question: Which statement about floating-point computation is correct?
options:
  - Float32 always has greater precision than Float64.
  - Float32 and Float64 trade storage and precision. Binary floating-point approximates many decimal
    values; compare computed results with a suitable tolerance.
  - Every decimal is exactly representable in Float64.
answer: 1
explain: Float32 and Float64 trade storage and precision. Binary floating-point approximates many
  decimal values; compare computed results with a suitable tolerance.
```
