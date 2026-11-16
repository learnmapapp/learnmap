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
question: Which statement about independent value copies is correct?
options:
  - String assignment produces independent value behavior. Updating the second string leaves the
    first string’s visible contents unchanged.
  - String assignment requires all later mutations to affect both bindings.
  - Value semantics means every variable is immutable.
answer: 0
explain: String assignment produces independent value behavior. Updating the second string leaves
  the first string’s visible contents unchanged.
```
