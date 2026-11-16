---
title: Sets of values
icon: 🛠️
branch: data
requires:
  - enums
summary: Built-in sets efficiently represent membership over small ordinal types, including enums.
---

Built-in sets efficiently represent membership over small ordinal types, including enums. Repeated elements do not add duplicates.

```nim
type Permission = enum
  read, write, execute
let permissions = {read, write}
echo write in permissions
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about sets of values.
lang: nim
code: |-
  type Permission = enum
    read, write, execute
  let permissions = {read, write}
  echo execute in permissions
checks:
  - match: write\s+in\s+permissions
    message: Use write in permissions for this step.
  - notMatch: execute\s+in\s+permissions
    message: Replace execute in permissions in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about sets of values is correct?
options:
  - Sets preserve duplicate counts.
  - Built-in sets accept arbitrary object values.
  - Built-in sets efficiently represent membership over small ordinal types, including enums.
    Repeated elements do not add duplicates.
answer: 2
explain: Built-in sets efficiently represent membership over small ordinal types, including enums.
  Repeated elements do not add duplicates.
```
