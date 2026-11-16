---
title: Mutable arguments
icon: 🔁
branch: functions
requires:
  - functions
  - variables
summary: mut grants a function mutable access to the caller’s storage.
---

mut grants a function mutable access to the caller’s storage. This makes intentional changes part of the interface.

A useful term here is [[mutable argument]]: A mut parameter through which a function can change the caller’s value.

```mojo
def advance(mut value: Int):
    value += 1

def main() raises:
    var value = 3
    advance(value)
    print(value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about mutable arguments.
lang: mojo
code: |-
  def advance(mut value: Int):
      value -= 1

  def main() raises:
      var value = 3
      advance(value)
      print(value)
checks:
  - match: value\s+\+=\s+1
    message: Use value += 1 for this step.
  - notMatch: value\s+\-=\s+1
    message: Replace value -= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about mutable arguments is correct?
options:
  - mut grants a function mutable access to the caller’s storage. This makes intentional changes
    part of the interface.
  - mut always creates an unrelated private copy.
  - Every read-only parameter can be changed without restriction.
answer: 0
explain: mut grants a function mutable access to the caller’s storage. This makes intentional
  changes part of the interface.
```
