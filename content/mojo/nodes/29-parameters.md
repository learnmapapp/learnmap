---
title: Compile-time parameters
icon: 🚦
branch: comptime
requires:
  - comptime
  - functions
summary: Square brackets supply compile-time parameters; parentheses supply runtime arguments.
---

Square brackets supply compile-time parameters; parentheses supply runtime arguments. Specialization can remove decisions from hot loops.

```mojo
def scale[factor: Int](value: Int) -> Int:
    return value * factor

def main() raises:
    print(scale[3](4))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile-time parameters.
lang: mojo
code: |-
  def scale[factor: Int](value: Int) -> Int:
      return value + factor

  def main() raises:
      print(scale[3](4))
checks:
  - match: value\s+\*\s+factor
    message: Use value * factor for this step.
  - notMatch: value\s+\+\s+factor
    message: Replace value + factor in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: In `scale[3](4)`, which value is the compile-time parameter?
options:
  - "`4`"
  - The returned product only.
  - "`3`"
answer: 2
explain: Square brackets supply parameters; parentheses supply runtime arguments.
```
