---
title: Transform collections
icon: 🌐
branch: functions
requires:
  - closures
summary: filter selects elements and map transforms each selected element.
---

filter selects elements and map transforms each selected element. These operations return new arrays and leave scores unchanged.

```swift
let scores = [1, 2, 3, 4]
let doubledEvens = scores.filter { $0.isMultiple(of: 2) }.map { $0 * 2 }
print(doubledEvens)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about transform collections.
lang: swift
code: |-
  let scores = [1, 2, 3, 4]
  let doubledEvens = scores.filter { $0.isMultiple(of: 2) }.map { $0 + 2 }
  print(doubledEvens)
checks:
  - match: \.map\s+\{\s+\$0\s+\*\s+2\s+\}
    message: Use .map { $0 * 2 } for this step.
  - notMatch: \.map\s+\{\s+\$0\s+\+\s+2\s+\}
    message: Replace .map { $0 + 2 } in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about transform collections is correct?
options:
  - filter selects elements and map transforms each selected element. These operations return new
    arrays and leave scores unchanged.
  - filter always changes element types.
  - map drops all falsey results.
answer: 0
explain: filter selects elements and map transforms each selected element. These operations return
  new arrays and leave scores unchanged.
```
