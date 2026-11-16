---
title: Handle errors
icon: 📋
branch: tools
requires:
  - errors
summary: try and except handle errors locally.
---

try and except handle errors locally. Keep the protected block narrow so unrelated failures are not accidentally treated as the expected case.

```mojo
def main() raises:
    try:
        raise Error("invalid input")
    except error:
        print("Recovered:", error)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about handle errors.
lang: mojo
code: |-
  def main() raises:
      try:
          raise Error("ignored")
      except error:
          print("Recovered:", error)
checks:
  - match: '"invalid\s+input"'
    message: Use "invalid input" for this step.
  - notMatch: '"ignored"'
    message: Replace "ignored" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: When does the `except` body execute in a `try`/`except` block?
options:
  - Before the protected work starts.
  - When the protected work raises an error.
  - After every successful protected operation.
answer: 1
explain: An error diverts control to the handler instead of the remaining protected statements.
```
