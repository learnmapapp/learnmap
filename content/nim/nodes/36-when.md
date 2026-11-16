---
title: Compile-time branches
icon: 🌐
branch: design
requires:
  - constants
  - if
summary: when chooses a branch during compilation.
---

when chooses a branch during compilation. Use platform symbols for compile-time differences rather than runtime OS guesses.

```nim
when defined(windows):
  const platform = "Windows"
else:
  const platform = "Unix-like"
echo platform
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about compile-time branches.
lang: nim
code: |-
  when defined(unknownPlatform):
    const platform = "Windows"
  else:
    const platform = "Unix-like"
  echo platform
checks:
  - match: defined\(windows\)
    message: Use defined(windows) for this step.
  - notMatch: defined\(unknownPlatform\)
    message: Replace defined(unknownPlatform) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about compile-time branches is correct?
options:
  - when chooses a branch during compilation. Use platform symbols for compile-time differences
    rather than runtime OS guesses.
  - when evaluates both branches at runtime.
  - defined reads operating-system environment variables.
answer: 0
explain: when chooses a branch during compilation. Use platform symbols for compile-time differences
  rather than runtime OS guesses.
```
