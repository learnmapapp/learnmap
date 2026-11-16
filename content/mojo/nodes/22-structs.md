---
title: Define a struct
icon: 📦
branch: types
requires:
  - variables
summary: A struct declares named typed fields.
---

A struct declares named typed fields. @fieldwise_init generates an initializer assigning one input to each field.

A useful term here is [[struct]]: A user-defined type grouping fields, methods, and compile-time members.

```mojo
@fieldwise_init
struct Point:
    var x: Int
    var y: Int

def main() raises:
    var point = Point(3, 4)
    print(point.x, point.y)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about define a struct.
lang: mojo
code: |-
  @fieldwise_init
  struct Point:
      var x: Int
      var y: Int

  def main() raises:
      var point = Point(0, 0)
      print(point.x, point.y)
checks:
  - match: Point\(3,\s+4\)
    message: Use Point(3, 4) for this step.
  - notMatch: Point\(0,\s+0\)
    message: Replace Point(0, 0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `@fieldwise_init` generate for the point struct?
options:
  - A global mutable instance of the struct.
  - An initializer with inputs for its fields.
  - A JSON serializer for every field.
answer: 1
explain: It removes boilerplate for initializing each field from a corresponding input.
```
