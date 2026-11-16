---
title: Side-effect-free functions
icon: 🔢
branch: functions
requires:
  - procedures
summary: func declares a procedure checked for side effects.
---

func declares a procedure checked for side effects. Keep computation separate from echo, file access, or other external effects.

```nim
func square(n: int): int = n * n
echo square(5)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about side-effect-free functions.
lang: nim
code: |-
  func square(n: int): int = n + n
  echo square(5)
checks:
  - match: n\s+\*\s+n
    message: Use n * n for this step.
  - notMatch: n\s+\+\s+n
    message: Replace n + n in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about side-effect-free functions is correct?
options:
  - func declares a procedure checked for side effects. Keep computation separate from echo, file
    access, or other external effects.
  - func freely writes global state.
  - func forces evaluation at compile time in every call.
answer: 0
explain: func declares a procedure checked for side effects. Keep computation separate from echo,
  file access, or other external effects.
```
