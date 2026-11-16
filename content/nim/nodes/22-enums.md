---
title: Enumerated states
icon: 📦
branch: data
requires:
  - objects
  - case
summary: An enum names a finite set of states.
---

An enum names a finite set of states. Exhaustive case branches let the compiler help when states are added.

A useful term here is [[enum]]: A type defining a finite collection of named values.

```nim
type Status = enum
  todo, doing, done
let state = doing
case state
of todo: echo "start"
of doing: echo "continue"
of done: echo "finished"
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about enumerated states.
lang: nim
code: |-
  type Status = enum
    todo, doing, done
  let state = todo
  case state
  of todo: echo "start"
  of doing: echo "continue"
  of done: echo "finished"
checks:
  - match: let\s+state\s+=\s+doing
    message: Use let state = doing for this step.
  - notMatch: let\s+state\s+=\s+todo
    message: Replace let state = todo in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about enumerated states is correct?
options:
  - An enum case must always include else.
  - An enum names a finite set of states. Exhaustive case branches let the compiler help when states
    are added.
  - Enum values are arbitrary strings.
answer: 1
explain: An enum names a finite set of states. Exhaustive case branches let the compiler help when
  states are added.
```
