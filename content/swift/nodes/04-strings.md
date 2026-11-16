---
title: String interpolation
icon: 💬
branch: basics
requires:
  - types
summary: Interpolation embeds expressions using a backslash followed by parentheses.
---

Interpolation embeds expressions using a backslash followed by parentheses. Swift String counts extended grapheme clusters through count.

```swift
let name = "Ada"
let lessons = 3
print("\(name) completed \(lessons) lessons")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about string interpolation.
lang: swift
code: |-
  let name = "Ada"
  let lessons = 3
  print("\(name) completed \(lessons + 1) lessons")
checks:
  - match: completed\s+\\\(lessons\)
    message: Use completed \(lessons) for this step.
  - notMatch: completed\s+\\\(lessons\s+\+\s+1\)
    message: Replace completed \(lessons + 1) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: With `name = "Ada"`, what does `"Hello, \(name)"` produce?
options:
  - '`"Hello, (Ada)"`'
  - '`"Hello, Ada"`'
  - '`"Hello, name"`'
answer: 1
explain: A backslash followed by parentheses interpolates an expression.
```
