---
title: Independent value copies
icon: 🧩
branch: functions
requires:
  - strings
  - variables
summary: String assignment produces independent value behavior.
---

String assignment produces independent value behavior. Updating the second string leaves the first string’s visible contents unchanged.

```mojo
def main() raises:
    var first = String("Mojo")
    var second = first
    second += "!"
    print(first, second)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about independent value copies.
lang: mojo
code: |-
  def main() raises:
      var first = String("Mojo")
      var second = first
      second += "?"
      print(first, second)
checks:
  - match: second\s+\+=\s+"!"
    message: Use second += "!" for this step.
  - notMatch: second\s+\+=\s+"\?"
    message: Replace second += "?" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: After `var second = first` for a `String`, what does appending to `second` visibly change?
options:
  - Only `second`'s contents.
  - Both strings' contents.
  - Only `first`'s contents.
answer: 0
explain: String assignment preserves independent value behavior.
```
