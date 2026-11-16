---
title: "String methods"
icon: "🧹"
branch: "collections"
requires: ["strings", "functions"]
summary: "Clean text, split it into fields, and join it again."
---

Strings come with methods that return new strings. Cleaning a line of text often takes just a few calls:

```python
line = "  Ada,Grace,Linus\n"
names = line.strip().split(",")
print(names)               # ['Ada', 'Grace', 'Linus']
print(" / ".join(names))   # Ada / Grace / Linus
```

`strip()` removes surrounding whitespace, not whitespace in the middle. `split(",")` divides on a specific separator; `split()` without arguments splits on runs of whitespace.

`join` is called on the separator, and its input items must be strings. It is a useful way to assemble text without repeatedly concatenating inside a loop.

## Transform without changing the original

```python
name = "python"
print(name.upper())                 # PYTHON
print(name.startswith("py"))        # True
print(name.replace("py", "my"))     # mython
print(name)                         # python
```

For case-insensitive text matching, `casefold()` is designed for Unicode caseless comparison. `strip("ab")` removes any `a` or `b` characters at either end; it does not remove an exact prefix. Use `removeprefix("ab")` when that is what you mean.

```exercise
goal: Strip the surrounding whitespace before splitting names.
lang: python
code: |
  line = "  Ada,Grace\n"
  names = line.split(",")
  print(names)
checks:
  - match: line\.strip\(\s*\)\.split\(
    message: Call line.strip().split(",").
hint: Call `line.strip()`.`split(",")`.
```

```quiz
question: What does `text.strip()` return?
options:
  - The value `None` after mutating text.
  - A string without leading and trailing whitespace.
  - The original string with all interior spaces removed.
answer: 1
explain: Strings are immutable; strip returns a result without changing the original binding's string.
```
