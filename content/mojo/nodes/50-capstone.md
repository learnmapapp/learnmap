---
title: Validated numeric pipeline
icon: 🏷️
branch: tools
requires:
  - iteration
  - errors
  - testing
  - conversion
summary: Separate input validation from the numeric loop.
---

Separate input validation from the numeric loop. Add tests for an empty list, a single value, and a known average before trying `SIMD` optimization.

```mojo
def average(values: List[Float64]) raises -> Float64:
    if len(values) == 0:
        raise Error("at least one value required")
    var total = 0.0
    for value in values:
        total += value
    return total / Float64(len(values))

def main() raises:
    var values: List[Float64] = [2.0, 4.0, 6.0]
    print(average(values))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about validated numeric pipeline.
lang: mojo
code: |-
  def average(values: List[Float64]) raises -> Float64:
      if len(values) == 0:
          raise Error("at least one value required")
      var total = 0.0
      for value in values:
          total += value
      return total

  def main() raises:
      var values: List[Float64] = [2.0, 4.0, 6.0]
      print(average(values))
checks:
  - match: return\s+total\s+/\s+Float64\(len\(values\)\)
    message: Use return total / Float64(len(values)) for this step.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Why should the average function reject an empty list first?
options:
  - An empty list cannot be passed as a typed value.
  - Every empty list contains a hidden zero element.
  - There is no element count by which to divide a meaningful total.
answer: 2
explain: Validate the numeric operation's domain before performing the calculation.
```
