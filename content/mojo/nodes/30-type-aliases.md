---
title: Compile-time type names
icon: 🔁
branch: comptime
requires:
  - comptime
summary: A comptime name can refer to a type.
---

A comptime name can refer to a type. Use a meaningful alias to express a consistent numeric policy across a module.

```mojo
def main() raises:
    comptime Number = Float64
    var value: Number = 1.5
    print(value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile-time type names.
lang: mojo
code: |-
  def main() raises:
      comptime Number = Float32
      var value: Number = 1.5
      print(value)
checks:
  - match: Number\s+=\s+Float64
    message: Use Number = Float64 for this step.
  - notMatch: Number\s+=\s+Float32
    message: Replace Number = Float32 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about compile-time type names is correct?
options:
  - A comptime name can refer to a type. Use a meaningful alias to express a consistent numeric
    policy across a module.
  - Type names are always runtime strings.
  - A type alias makes existing values change their representation automatically.
answer: 0
explain: A comptime name can refer to a type. Use a meaningful alias to express a consistent numeric
  policy across a module.
```
