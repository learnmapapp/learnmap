---
title: Sequence boundaries
icon: 📋
branch: tables
requires:
  - lists
summary: "Use # for contiguous sequences."
---

Use # for contiguous sequences. Holes make the boundary ambiguous, so remove the final element here instead of introducing an interior gap.

```lua
local values = {4, 8, 12}
print(#values)
values[3] = nil
print(#values)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about sequence boundaries.
lang: lua
code: |-
  local values = {4, 8, 12}
  print(#values)
  values[2] = nil
  print(#values)
checks:
  - match: values\[3\]\s+=\s+nil
    message: Use values[3] = nil for this step.
  - notMatch: values\[2\]\s+=\s+nil
    message: Replace values[2] = nil in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about sequence boundaries is correct?
options:
  - A nil entry preserves a sequence slot.
  - "Use # for contiguous sequences. Holes make the boundary ambiguous, so remove the final element
    here instead of introducing an interior gap."
  - "# counts all keys in every table."
answer: 1
explain: "Use # for contiguous sequences. Holes make the boundary ambiguous, so remove the final
  element here instead of introducing an interior gap."
```
