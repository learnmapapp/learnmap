---
title: "Formatting text"
icon: "📝"
branch: "collections"
requires: ["numbers", "strings", "functions"]
summary: "Embed values with f-strings and control their presentation."
---

An [[f-string]] starts with `f` and inserts expressions inside braces:

```python
name = "Ada"
completed = 7
print(f"{name} completed {completed} lessons")
```

The expressions are evaluated when the string is created. This is usually clearer than concatenating text with repeated `str(...)` conversions.

## Format the display

A colon introduces a format specification:

```python
price = 12.5
progress = 0.75
print(f"Price: {price:.2f}")      # Price: 12.50
print(f"Done: {progress:.0%}")    # Done: 75%
print(f"{'item':<8}{'qty':>4}")   # aligned columns
```

`.2f` displays two digits after the decimal point. It does not change the underlying float or make floating-point arithmetic exact. `<` aligns left and `>` aligns right within a field width.

Use doubled braces, `{{` and `}}`, to include literal braces. `f"{name!r}"` shows a representation useful for debugging, including quotes and escapes. Avoid constructing shell commands or database queries by inserting untrusted text; those tools have their own argument and parameter APIs.

```exercise
goal: "Display price with exactly two decimal places."
lang: python
code: |
  price = 12.5
  print(f"Price: {price}")
checks:
  - match: "\\{price:\\.2f\\}"
    message: "Add :.2f inside the braces: {price:.2f}."
hint: "Add :.2f inside the braces: {price:.2f}."
```

```quiz
question: "Does f\"{price:.2f}\" change the number stored in price?"
options:
  - "Yes, it rounds the stored value permanently."
  - "No, it creates formatted text."
  - "It converts price to an integer."
answer: 1
explain: "A format specification controls the resulting string, not the original value."
```
