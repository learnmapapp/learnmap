---
title: Inspect vector lanes
icon: 🔧
branch: comptime
requires:
  - simd
summary: SIMD lane indices are zero-based.
---

`SIMD` lane indices are zero-based. Distinguish reading one lane from reducing all lanes to a single aggregate.

```mojo
def main() raises:
    var values = SIMD[DType.int32, 4](2, 4, 6, 8)
    print(values[2])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about inspect vector lanes.
lang: mojo
code: |-
  def main() raises:
      var values = SIMD[DType.int32, 4](2, 4, 6, 8)
      print(values[1])
checks:
  - match: values\[2\]
    message: Use values[2] for this step.
  - notMatch: values\[1\]
    message: Replace values[1] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: For the vector lanes `2, 4, 6, 8`, what does index `2` read?
options:
  - "`4`"
  - "`8`"
  - "`6`"
answer: 2
explain: Lane indexing is zero-based.
```
