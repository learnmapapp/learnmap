---
title: "Exceptions"
icon: "🛟"
branch: "files"
requires: ["none"]
summary: "Catch expected failures near the operation that can fail."
---

An [[exception]] interrupts normal execution and searches outward for a matching handler. Converting invalid text is a common example:

```python
text = "not a number"
try:
    count = int(text)
except ValueError:
    count = 0
print(count)  # 0
```

Catch the exception type you can meaningfully handle. A broad `except Exception` around a large program can hide unrelated bugs; a bare `except` also catches interruptions such as `KeyboardInterrupt`.

## Keep the protected block small

Put just the risky operation in `try`. An optional `else` runs if the `try` block completes normally. `finally` runs when leaving the statement, whether it succeeded or raised, and is useful for cleanup.

```python
try:
    result = int("42")
except ValueError as error:
    print(f"Invalid count: {error}")
else:
    print(result + 1)  # 43
```

A [[traceback]] shows the path through calls to the failure. Read the last line for the exception type and message, then find the relevant application frame above it. Use [raising errors](node:raising-errors) to give callers a deliberate failure contract.

```compare javascript
try {
  JSON.parse("not json");
} catch (error) {
  console.log(error.message);
}
```

```exercise
goal: "Catch the conversion error so invalid text uses the fallback."
lang: python
code: |
  try:
      count = int("oops")
  except KeyError:
      count = 0
  print(count)
checks:
  - match: "^except\\s+ValueError\\s*:"
    message: "Catch ValueError instead of KeyError."
hint: "Catch ValueError instead of KeyError."
```

```quiz
question: "Which error should you catch for int(\"hello\")?"
options:
  - "KeyError"
  - "ValueError"
  - "IndexError"
answer: 1
explain: "The input has the right broad type, but its value cannot be converted to an integer."
```
