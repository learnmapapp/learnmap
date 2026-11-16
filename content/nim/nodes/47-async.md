---
title: Async procedures
icon: 🛠️
branch: tools
requires:
  - procedures
  - modules
summary: An async procedure returns a Future, and await suspends until another future completes.
---

An async procedure returns a Future, and await suspends until another future completes. waitFor drives the event loop at the program boundary.

```nim
import std/asyncdispatch
proc message(): Future[string] {.async.} =
  await sleepAsync(10)
  return "ready"
echo waitFor message()
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about async procedures.
lang: nim
code: |-
  import std/asyncdispatch
  proc message(): Future[string] {.async.} =
    await sleepAsync(10)
    return "waiting"
  echo waitFor message()
checks:
  - match: return\s+"ready"
    message: Use return "ready" for this step.
  - notMatch: return\s+"waiting"
    message: Replace return "waiting" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about async procedures is correct?
options:
  - await creates a separate OS thread for every call.
  - waitFor is required inside every async procedure.
  - An async procedure returns a Future, and await suspends until another future completes. waitFor
    drives the event loop at the program boundary.
answer: 2
explain: An async procedure returns a Future, and await suspends until another future completes.
  waitFor drives the event loop at the program boundary.
```
