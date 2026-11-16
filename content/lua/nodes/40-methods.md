---
title: Colon methods
icon: 💬
branch: design
requires:
  - records
  - functions
summary: A colon call passes the receiver as the first argument.
---

A colon call passes the receiver as the first argument. counter:`add(3)` is equivalent to `counter.add(counter, 3)`.

```lua
local counter = {value = 0}
function counter:add(amount)
  self.value = self.value + amount
end
counter:add(3)
print(counter.value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about colon methods.
lang: lua
code: |-
  local counter = {value = 0}
  function counter:add(amount)
    self.value = self.value + amount
  end
  counter.add(3)
  print(counter.value)
checks:
  - match: counter:add\(3\)
    message: Use counter:add(3) for this step.
  - notMatch: counter\.add\(3\)
    message: Replace counter.add(3) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which dot call is equivalent to `counter:add(3)`?
options:
  - "`counter.add(3, counter)`"
  - "`counter.add(counter, 3)`"
  - "`counter.add(3)`"
answer: 1
explain: Colon syntax supplies the receiver as the first argument.
```
