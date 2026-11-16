---
title: Environment access
icon: 🌐
branch: runtime
requires:
  - truth
summary: os.getenv reads an environment variable and returns nil if it is absent.
---

os.getenv reads an environment variable and returns nil if it is absent. Keep deployment-specific paths outside reusable logic.

```lua
local home = os.getenv("HOME")
print(home or "HOME is unavailable")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about environment access.
lang: lua
code: |-
  local home = os.getenv("UNKNOWN_LEARNMAP_HOME")
  print(home or "HOME is unavailable")
checks:
  - match: os\.getenv\("HOME"\)
    message: Use os.getenv("HOME") for this step.
  - notMatch: os\.getenv\("UNKNOWN_LEARNMAP_HOME"\)
    message: Replace os.getenv("UNKNOWN_LEARNMAP_HOME") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about environment access is correct?
options:
  - os.getenv reads an environment variable and returns nil if it is absent. Keep
    deployment-specific paths outside reusable logic.
  - Missing environment variables always return an empty string.
  - os.getenv modifies the environment.
answer: 0
explain: os.getenv reads an environment variable and returns nil if it is absent. Keep
  deployment-specific paths outside reusable logic.
```
