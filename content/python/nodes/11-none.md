---
title: "None"
icon: "🕳️"
branch: "basics"
requires: ["functions"]
summary: "Represent a missing result explicitly, and test it with is."
---

`None` is Python's single "no value" object. A function that only prints, or falls off its end, returns `None`:

```python
def announce(message):
    print(message)

result = announce("ready")
print(result is None)  # True
```

Use `is None` or `is not None` to check specifically for absence. This is an identity check against a [[sentinel]], rather than a general truthiness test.

## Missing is different from empty

A lookup may return an empty string or zero as a valid answer. `if not value` groups those together with `None`, which can lose information:

```python
count = 0
if count is None:
    print("missing")
else:
    print(f"Count: {count}")  # Count: 0
```

Be consistent about whether a function returns `None` for a missing result or raises an exception. Document that choice so callers can handle it. [Type hints](node:type-hints) can express that a return value may be absent, using a type such as `str | None`.

```compare javascript
const count = 0;
if (count === null) console.log("missing");
```

```compare rust
let count: Option<i32> = Some(0);
if count.is_none() { println!("missing"); }
```

```exercise
goal: "Keep zero as a real value; check specifically for None."
lang: python
code: |
  count = 0
  if not count:
      print("missing")
  else:
      print(count)
checks:
  - match: "^if\\s+count\\s+is\\s+None\\s*:"
    message: "Replace not count with count is None."
hint: "Replace not count with count is None."
```

```quiz
question: "Which check distinguishes None from a valid zero?"
options:
  - "if not value"
  - "if value is None"
  - "if value == False"
answer: 1
explain: "is None checks only the absence sentinel; zero is false but is not None."
```
