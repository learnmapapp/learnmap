---
title: String values
icon: 📋
branch: basics
requires:
  - variables
summary: String stores text as a value.
---

String stores text as a value. Concatenation builds a combined string; use typed values when passing text through function interfaces.

```mojo
def main() raises:
    var first = String("Hello")
    var message = first + ", Mojo"
    print(message)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about string values.
lang: mojo
code: |-
  def main() raises:
      var first = String("Hello")
      var message = first + ", world"
      print(message)
checks:
  - match: first\s+\+\s+",\s+Mojo"
    message: Use first + ", Mojo" for this step.
  - notMatch: first\s+\+\s+",\s+world"
    message: Replace first + ", world" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does adding two `String` values with `+` produce?
options:
  - A tuple holding both original strings.
  - A string containing their concatenated text.
  - The sum of their byte lengths as an `Int`.
answer: 1
explain: String addition combines text into a string value.
```
