---
title: Key-value dictionaries
icon: 💬
branch: data
requires:
  - arrays
summary: Dictionary lookup usually returns an optional because a key can be absent.
---

Dictionary lookup usually returns an optional because a key can be absent. A default subscript supplies an explicit fallback.

```swift
var scores = ["Ada": 8]
scores["Lin"] = 9
print(scores["Ada", default: 0])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about key-value dictionaries.
lang: swift
code: |-
  var scores = ["Ada": 8]
  scores["Lin"] = 9
  print(scores["Ada", default: 1])
checks:
  - match: scores\["Ada",\s+default:\s+0\]
    message: 'Use scores["Ada", default: 0] for this step.'
  - notMatch: scores\["Ada",\s+default:\s+1\]
    message: 'Replace scores["Ada", default: 1] in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about key-value dictionaries is correct?
options:
  - Dictionary iteration is always sorted by key.
  - Dictionary lookup usually returns an optional because a key can be absent. A default subscript
    supplies an explicit fallback.
  - Every lookup is guaranteed to find a value.
answer: 1
explain: Dictionary lookup usually returns an optional because a key can be absent. A default
  subscript supplies an explicit fallback.
```
