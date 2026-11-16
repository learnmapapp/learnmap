---
title: Reference objects
icon: 🏷️
branch: data
requires:
  - objects
summary: A ref object is accessed through a managed reference.
---

A ref object is accessed through a managed reference. Copying that reference makes both bindings refer to the same object.

```nim
type Counter = ref object
  value: int
let first = Counter(value: 1)
let second = first
second.value = 9
echo first.value
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about reference objects.
lang: nim
code: |-
  type Counter = ref object
    value: int
  let first = Counter(value: 1)
  let second = first
  second.value = 0
  echo first.value
checks:
  - match: second\.value\s+=\s+9
    message: Use second.value = 9 for this step.
  - notMatch: second\.value\s+=\s+0
    message: Replace second.value = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Two bindings refer to the same `ref object`. Who sees a field mutation through one?
options:
  - Only the binding used for the assignment.
  - Neither until the reference is copied again.
  - Both bindings see the updated object.
answer: 2
explain: Copying a reference preserves shared object identity.
```
