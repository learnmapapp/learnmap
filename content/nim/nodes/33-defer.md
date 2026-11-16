---
title: Scope cleanup
icon: 🧩
branch: tools
requires:
  - procedures
summary: defer schedules work for the current scope’s exit.
---

defer schedules work for the current scope’s exit. Use it near resource acquisition so cleanup remains visible.

```nim
proc demonstrate() =
  defer: echo "cleanup"
  echo "work"
demonstrate()
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about scope cleanup.
lang: nim
code: |-
  proc demonstrate() =
    defer: echo "start"
    echo "work"
  demonstrate()
checks:
  - match: defer:\s+echo\s+"cleanup"
    message: 'Use defer: echo "cleanup" for this step.'
  - notMatch: defer:\s+echo\s+"start"
    message: 'Replace defer: echo "start" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about scope cleanup is correct?
options:
  - defer schedules work for the current scope’s exit. Use it near resource acquisition so cleanup
    remains visible.
  - defer runs immediately before the next statement.
  - defer is ignored on normal returns.
answer: 0
explain: defer schedules work for the current scope’s exit. Use it near resource acquisition so
  cleanup remains visible.
```
