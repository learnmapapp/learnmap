---
title: "Exceptions"
icon: "🛟"
branch: "files"
requires: ["none"]
summary: "Catch expected failures near the operation that can fail."
---
Sooner or later every program meets bad input. Here's what Python does when it can't continue, using a deliberately broken script:

```python title=average.py
def average(numbers):
    return sum(numbers) / len(numbers)

print(average([]))
```

```text
Traceback (most recent call last):
  File "average.py", line 4, in <module>
    print(average([]))
  File "average.py", line 2, in average
    return sum(numbers) / len(numbers)
ZeroDivisionError: division by zero
```

## How to read a traceback

A [[traceback]] looks scary, but it's a map. Read it **from the bottom up**:

1. **The last line** is the [[exception]] type and message: `ZeroDivisionError: division by zero`. Start here.
2. **The lines above** are the chain of calls that got there, oldest first. The bottom one is where it blew up (line 2, inside `average`); the one above is who called it (line 4).

So: `average` was called with an empty list on line 4, and dividing by `len([])` failed on line 2.

## Catching exceptions

When you expect a failure and know what to do about it, wrap the risky code in `try` and handle it in `except`:

```python
text = input("How many tickets? ")
try:
    count = int(text)
except ValueError:
    print(f"{text!r} isn't a number, so I'll assume 1")
    count = 1
```

The common exception types you'll meet:

| Exception | Typical cause |
| --- | --- |
| `ValueError` | right type, bad value: `int("abc")` |
| `TypeError` | wrong type: `"3" + 4` |
| `KeyError` | missing dictionary key |
| `IndexError` | list position out of range |
| `FileNotFoundError` | opening a file that isn't there |
| `AttributeError` | `None.upper()` and friends |

`try` also has two optional extras: `else` runs only if nothing failed, and `finally` always runs, failure or not. It's handy for cleanup.

## Catch narrowly

Name the exception you expect. A bare `except:` (or `except Exception:`) also swallows typos and real bugs, and you'll spend an afternoon wondering why your program silently does nothing.

```warn
Keep the `try` block small. Put only the line that can fail inside it, so you don't accidentally catch the same error from somewhere unexpected.
```

```compare java
try { count = Integer.parseInt(text); }
catch (NumberFormatException e) { count = 1; }
```

```compare go
count, err := strconv.Atoi(text)   // errors are return values
if err != nil { count = 1 }
```

```exercise
goal: "`int(\"oops\")` doesn't raise a `KeyError`, so the fallback never runs. Catch the right exception."
lang: python
code: |
  try:
      count = int("oops")
  except KeyError:
      count = 0
  print(count)
checks:
  - match: '^except\s+ValueError\s*:'
    message: "Catch ValueError instead of KeyError."
hint: The value is the wrong kind of text; check the table.
solution: |
  try:
      count = int("oops")
  except ValueError:
      count = 0
  print(count)
```

```quiz
question: "A traceback is twenty lines long. Where do you look first?"
options:
  - The first line.
  - The last line, with the exception type and message.
  - The middle, where your own file name appears most.
answer: 1
explain: The last line says what went wrong. The lines above say how the program got there.
```
