---
title: Block scope
icon: 🧪
branch: functions
requires:
  - functions
  - conditionals
summary: A local declared in an inner block shadows an outer name without modifying the outer binding.
---

A local declared in an inner block shadows an outer name without modifying the outer binding.

```lua
local count = 1
do
  local count = 7
  print(count)
end
print(count)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about block scope.
lang: lua
code: |-
  local count = 1
  do
    local count = 9
    print(count)
  end
  print(count)
checks:
  - match: local\s+count\s+=\s+7
    message: Use local count = 7 for this step.
  - notMatch: local\s+count\s+=\s+9
    message: Replace local count = 9 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about block scope is correct?
options:
  - do blocks cannot contain locals.
  - A local declared in an inner block shadows an outer name without modifying the outer binding.
  - The inner declaration overwrites the outer local.
answer: 1
explain: A local declared in an inner block shadows an outer name without modifying the outer binding.
```
