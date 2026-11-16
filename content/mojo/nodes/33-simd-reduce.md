---
title: Reduce vector lanes
icon: 🧩
branch: comptime
requires:
  - simd-index
summary: A horizontal reduction combines lanes into an aggregate.
---

A horizontal reduction combines lanes into an aggregate. reduce_add sums them, while element-wise addition retains the vector shape.

```mojo
def main() raises:
    var values = SIMD[DType.float32, 4](1, 2, 3, 4)
    print(values.reduce_add())
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reduce vector lanes.
lang: mojo
code: |-
  def main() raises:
      var values = SIMD[DType.float32, 4](1, 2, 3, 4)
      print(values.reduce_max())
checks:
  - match: values\.reduce_add\(\)
    message: Use values.reduce_add() for this step.
  - notMatch: values\.reduce_max\(\)
    message: Replace values.reduce_max() in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `reduce_add()` produce for lanes `1, 2, 3, 4`?
options:
  - Their sum, `10`.
  - A vector containing the same four lanes.
  - Only the final lane, `4`.
answer: 0
explain: A horizontal reduction combines all lanes into an aggregate.
```
