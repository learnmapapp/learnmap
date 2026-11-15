---
title: "Debugging"
icon: "🐞"
branch: "quality"
requires: ["unittest"]
summary: "Read tracebacks, reproduce a failure, and inspect state with breakpoint."
---

Debugging starts by making the failure repeatable. Capture a small input, read the last traceback line for the error, and follow the relevant frames back into your code.

```python
def average(values):
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)

print(average([2, 4, 6]))  # 4.0
```

The empty-input case deserves a test. Decide its intended behavior before patching the symptom; returning a fabricated zero would change the function's meaning.

## Stop at the interesting point

Insert `breakpoint()` before the failure and run the script locally. Python's default debugger lets you inspect and step:

```text
p values     # inspect an expression
n            # run the next line in this frame
s            # step into a call
c            # continue
q            # quit
```

Use `repr(value)` or an f-string's `!r` conversion to reveal hidden spaces and escapes. A few focused prints can be useful too, but remove temporary probes after finding the cause.

Turn the reproducing example into a regression test. Fixing the underlying assumption and keeping that test makes the next failure easier to prevent.

```exercise
goal: "Reject an empty input explicitly instead of returning a misleading average."
lang: python
code: |
  def average(values):
      if not values:
          return 0
      return sum(values) / len(values)

  print(average([2, 4, 6]))
checks:
  - match: "^\\s+raise\\s+ValueError\\(\\s*[\"']values must not be empty[\"']\\s*\\)"
    message: "Raise ValueError(\"values must not be empty\") for the empty input."
hint: "Raise ValueError(\"values must not be empty\") for the empty input."
```

```quiz
question: "What is the best first step when diagnosing an intermittent failure?"
options:
  - "Change several unrelated lines at once."
  - "Create a small reproducible case and inspect the traceback."
  - "Catch every exception and ignore it."
answer: 1
explain: "A repeatable case and traceback let you check a hypothesis and preserve the fix in a test."
```
