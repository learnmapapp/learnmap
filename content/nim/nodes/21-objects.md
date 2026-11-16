---
title: Object types
icon: 🧩
branch: data
requires:
  - types
summary: An object groups named fields into a distinct type.
---

An object groups named fields into a distinct type. A value object is copied by value rather than automatically sharing one reference.

```nim
type Task = object
  title: string
  done: bool
var task = Task(title: "Practice", done: false)
task.done = true
echo task
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about object types.
lang: nim
code: |-
  type Task = object
    title: string
    done: bool
  var task = Task(title: "Practice", done: false)
  task.done = false
  echo task
checks:
  - match: task\.done\s+=\s+true
    message: Use task.done = true for this step.
  - notMatch: task\.done\s+=\s+false
    message: Replace task.done = false in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: After copying a value object, what does changing a scalar field in the copy do?
options:
  - Changes that copy's field.
  - Changes the original object's scalar field too.
  - Converts both objects into references.
answer: 0
explain: Ordinary value objects have value semantics; reference objects are a separate choice.
```
