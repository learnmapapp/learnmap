---
title: Read and update elements
icon: 🌐
branch: data
requires:
  - lists
summary: List indices are zero-based and must be in bounds.
---

List indices are zero-based and must be in bounds. Validate externally supplied indices before reading or writing an element.

```mojo
def main() raises:
    var values: List[Int] = [2, 4, 6]
    values[1] = 9
    print(values[1])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about read and update elements.
lang: mojo
code: |-
  def main() raises:
      var values: List[Int] = [2, 4, 6]
      values[1] = 0
      print(values[1])
checks:
  - match: values\[1\]\s+=\s+9
    message: Use values[1] = 9 for this step.
  - notMatch: values\[1\]\s+=\s+0
    message: Replace values[1] = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about read and update elements is correct?
options:
  - List indices are zero-based and must be in bounds. Validate externally supplied indices before
    reading or writing an element.
  - The first List element is at index 1.
  - Any out-of-bounds write automatically extends a List.
answer: 0
explain: List indices are zero-based and must be in bounds. Validate externally supplied indices
  before reading or writing an element.
```
