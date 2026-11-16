---
title: SIMD lanes
icon: 📋
branch: comptime
requires:
  - parameters
  - floats
summary: SIMD groups fixed-width numeric lanes for element-wise operations.
---

SIMD groups fixed-width numeric lanes for element-wise operations. A vector’s dtype and width are compile-time parameters.

A useful term here is [[SIMD]]: Single instruction, multiple data: operating on several numeric lanes together.

```mojo
def main() raises:
    var values = SIMD[DType.float32, 4](1, 2, 3, 4)
    var doubled = values * 2
    print(doubled)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about simd lanes.
lang: mojo
code: |-
  def main() raises:
      var values = SIMD[DType.float32, 4](1, 2, 3, 4)
      var doubled = values + 2
      print(doubled)
checks:
  - match: values\s+\*\s+2
    message: Use values * 2 for this step.
  - notMatch: values\s+\+\s+2
    message: Replace values + 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about simd lanes is correct?
options:
  - Vector width can change freely at runtime.
  - SIMD groups fixed-width numeric lanes for element-wise operations. A vector’s dtype and width
    are compile-time parameters.
  - SIMD multiplication always computes a scalar dot product.
answer: 1
explain: SIMD groups fixed-width numeric lanes for element-wise operations. A vector’s dtype and
  width are compile-time parameters.
```
