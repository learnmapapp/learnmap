---
title: Read-only inputs
icon: 📋
branch: functions
requires:
  - functions
  - strings
summary: Ordinary input parameters provide read access without requiring callers to request a copy.
---

Ordinary input parameters provide read access without requiring callers to request a copy. Prefer read-only interfaces when mutation is unnecessary.

```mojo
def show(text: String):
    print(text)

def main() raises:
    var text = String("Mojo")
    show(text)
    print(text)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about read-only inputs.
lang: mojo
code: |-
  def show(text: String):
      print("hidden")

  def main() raises:
      var text = String("Mojo")
      show(text)
      print(text)
checks:
  - match: print\(text\)
    message: Use print(text) for this step.
  - notMatch: print\("hidden"\)
    message: Replace print("hidden") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which function interface best expresses that it only needs to read a string?
options:
  - "A `var text: String` input requiring ownership unnecessarily."
  - "An ordinary `text: String` input."
  - "A `mut text: String` input used for no mutation."
answer: 1
explain: Request only the access needed by the operation.
```
