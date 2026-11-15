---
title: "Conditionals"
icon: "🚦"
branch: "basics"
requires: ["booleans"]
summary: "Indentation groups code; if, elif, and else choose a branch."
---

Python uses a colon and indentation to mark a block. Four spaces per indentation level is the usual convention:

```python
score = 75
if score >= 90:
    grade = "excellent"
elif score >= 60:
    grade = "passed"
else:
    grade = "try again"
print(grade)  # passed
```

Only the first matching branch runs. `elif` means "otherwise, if"; `else` handles what remains. The unindented `print` runs after the whole conditional.

## Keep blocks consistent

Mixing tabs and spaces can produce an indentation error. Configure your editor to insert four spaces when editing Python. Unlike braces in many other languages, indentation is part of the syntax, not decoration.

For a small choice between two values, use a conditional expression:

```python
age = 20
label = "adult" if age >= 18 else "child"
```

Use the full `if` statement when each branch performs several steps. A readable block is easier to change than a deeply nested expression.

```exercise
goal: "Make the discount apply when age is under 18."
lang: python
code: |
  age = 16
  if age > 18:
      print("discount")
  else:
      print("full price")
checks:
  - match: "^if\\s+age\\s*<\\s*18\\s*:"
    message: "Use age < 18 in the if condition."
hint: "Use age < 18 in the if condition."
```

```quiz
question: "How many branches run in a single if/elif/else statement?"
options:
  - "All branches whose conditions are true."
  - "At most one."
  - "Exactly two."
answer: 1
explain: "Python executes the first matching branch, or else when no condition matches."
```
