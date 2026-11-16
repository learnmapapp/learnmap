---
title: "Raising errors"
icon: "🚨"
branch: "files"
requires: ["exceptions"]
summary: "Reject invalid inputs and preserve the cause of a failure."
---

Use `raise` when a function cannot fulfill its contract:

```python
def divide(total, count):
    if count <= 0:
        raise ValueError("count must be positive")
    return total / count

print(divide(12, 3))  # 4.0
```

Choose a built-in exception when it communicates the problem clearly. `ValueError` suits an unacceptable value; `TypeError` suits an unsupported type. Do not return a fake successful value that forces callers to guess whether something failed.

## Add context without losing the cause

```python
def parse_count(text):
    try:
        return int(text)
    except ValueError as error:
        raise ValueError(f"Invalid count: {text!r}") from error
```

`raise ... from error` records the underlying cause in the traceback. A bare `raise` inside a handler re-raises the current exception unchanged.

For a domain-specific failure, define a subclass of `Exception`, such as `class ConfigError(Exception): pass`. Callers can then catch that category without catching every possible failure. Use ordinary validation for external input; `assert` is intended for internal assumptions and can be disabled with Python's optimization option.

```exercise
goal: Reject a nonpositive count with ValueError instead of returning zero.
lang: python
code: |
  def divide(total, count):
      if count <= 0:
          return 0
      return total / count

  print(divide(12, 3))
checks:
  - match: ^\s+raise\s+ValueError\(\s*["']count must be positive["']\s*\)
    message: Replace return 0 with raise ValueError("count must be positive").
hint: Replace return 0 with raise `ValueError("count must be positive")`.
```

```quiz
question: Why use raise `NewError(...)` from error?
options:
  - To preserve the original exception as the cause.
  - To suppress all tracebacks.
  - To convert every error into a return value.
answer: 0
explain: Explicit chaining adds useful context while retaining the lower-level failure.
```
