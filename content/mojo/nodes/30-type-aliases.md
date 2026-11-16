---
title: Compile-time type names
icon: 🔁
branch: comptime
requires:
  - comptime
summary: A comptime name can refer to a type.
---

A `comptime` name can refer to a type. Use a meaningful alias to express a consistent numeric policy across a module.

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
question: What does `comptime Number = Float64` let the program do?
options:
  - Use `Number` as a compile-time name for `Float64`.
  - Convert every existing variable into a float automatically.
  - Store a runtime string containing the type's name.
answer: 0
explain: The alias names a type; it does not perform conversions by itself.
```
