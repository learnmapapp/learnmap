---
title: "Raising errors"
icon: "🚨"
branch: "files"
requires: ["exceptions"]
summary: "Reject invalid inputs and preserve the cause of a failure."
---
**Design question:** your function gets input it can't sensibly handle. What should it do?

```python
def average(numbers):
    if not numbers:
        return 0          # option A: pretend
    return sum(numbers) / len(numbers)
```

Option A is tempting, but `0` is a lie. The average of no numbers isn't zero, and a caller now can't tell "no data" apart from "the scores really averaged zero". The bug just moves somewhere harder to find.

**Option B: refuse loudly.** `raise` stops the function and sends an exception up to whoever called it:

```python
def average(numbers):
    if not numbers:
        raise ValueError("average() needs at least one number")
    return sum(numbers) / len(numbers)
```

Now the caller decides what "no data" means for them, using the `try`/`except` you know from [Exceptions](node:exceptions). This is "fail fast": stop at the first sign of trouble, with a message that says what was wrong.

## Picking the exception

Reuse the built-in types when they fit:

- `ValueError`: right type, unacceptable value (a negative age, an empty list).
- `TypeError`: wrong kind of thing altogether.
- `KeyError` / `LookupError`: something wasn't found.

For errors specific to your app, define your own. It's just a class that inherits from `Exception`, and it can be empty:

```python
class PaymentDeclined(Exception):
    pass

raise PaymentDeclined("card ending 4242 was declined")
```

Callers can now `except PaymentDeclined:` without catching every `ValueError` in the program.

## Translating errors with `from`

When you catch a low-level error and raise a clearer one, chain them with `from`, so the original isn't lost:

```python
def load_config(path):
    try:
        return path.read_text()
    except FileNotFoundError as error:
        raise RuntimeError(f"No config file at {path}") from error
```

The traceback then shows both: the friendly error, and "The above exception was the direct cause of...", followed by the original one.

```tip
Write messages for the person who'll read the traceback. "count must be positive, got -3" beats "invalid input".
```

```compare java
throw new IllegalArgumentException("count must be positive");
```

```compare go
// returned, not thrown:
return 0, errors.New("count must be positive")
```

```exercise
goal: "Returning 0 for a bad `count` hides the problem. Raise `ValueError(\"count must be positive\")` instead."
lang: python
code: |
  def divide(total, count):
      if count <= 0:
          return 0
      return total / count

  print(divide(12, 3))
checks:
  - match: '^\s+raise\s+ValueError\(\s*["'']count must be positive["'']\s*\)'
    message: Replace return 0 with raise ValueError("count must be positive").
hint: raise works like return, but it sends an exception.
solution: |
  def divide(total, count):
      if count <= 0:
          raise ValueError("count must be positive")
      return total / count

  print(divide(12, 3))
```

```quiz
question: "Why write `raise NewError(...) from error` inside an `except` block?"
options:
  - It makes the new error catchable as the old type.
  - The traceback keeps the original error as the cause.
  - It suppresses the original error completely.
answer: 1
explain: from links the two, so whoever debugs it sees both the clear message and the underlying failure.
```
