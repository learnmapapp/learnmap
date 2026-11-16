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
question: When is `#values` reliable as a sequence length?
options:
  - When arbitrary missing indices should count as elements.
  - When the integer keys run contiguously from 1.
  - When the table contains only string keys.
answer: 1
explain: Holes can make the sequence boundary ambiguous.
```
