---
title: Formatted output
icon: 🧪
branch: text
requires:
  - strings
  - numbers
summary: string.format uses conversion directives such as %s, %d, and %.2f.
---

`string.format` uses conversion directives such as %s, %d, and %.2f. Precision controls the displayed decimal digits.

```lua
local price = 12.5
print(string.format("Total: %.2f", price))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about formatted output.
lang: lua
code: |-
  local price = 12.5
  print(string.format("Total: %.0f", price))
checks:
  - match: Total:\s+%\.2f
    message: "Use Total: %.2f for this step."
  - notMatch: Total:\s+%\.0f
    message: "Replace Total: %.0f in the starting code."
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `string.format("%.2f", 12.5)` produce?
options:
  - '`"12"`'
  - '`"12.50"`'
  - '`"12.5"`'
answer: 1
explain: The precision requests two digits after the decimal point.
```
