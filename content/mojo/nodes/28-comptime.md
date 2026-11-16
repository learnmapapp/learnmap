---
title: Compile-time constants
icon: 💬
branch: comptime
requires:
  - integers
summary: comptime binds information evaluated during compilation.
---

comptime binds information evaluated during compilation. It can name values, types, or other compile-time expressions.

A useful term here is [[comptime]]: Information evaluated and available during compilation.

```mojo
def main() raises:
    comptime width = 4
    print(width * 2)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile-time constants.
lang: mojo
code: |-
  def main() raises:
      comptime width = 2
      print(width * 2)
checks:
  - match: comptime\s+width\s+=\s+4
    message: Use comptime width = 4 for this step.
  - notMatch: comptime\s+width\s+=\s+2
    message: Replace comptime width = 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about compile-time constants is correct?
options:
  - comptime is only another spelling of mutable var.
  - comptime binds information evaluated during compilation. It can name values, types, or other
    compile-time expressions.
  - comptime values must come from a runtime input prompt.
answer: 1
explain: comptime binds information evaluated during compilation. It can name values, types, or
  other compile-time expressions.
```
