---
title: "Unpacking"
icon: "🎁"
branch: "collections"
requires: ["tuples", "dictionaries"]
summary: "Bind related values, collect a remainder, and expand call arguments."
---

Unpacking assigns the elements of an iterable to separate names:

```python
first, second = [10, 20]
first, second = second, first
print(first, second)  # 20 10
```

Python evaluates the right-hand side before assigning the left-hand names, which makes the swap work without a temporary variable. A length mismatch normally raises `ValueError`.

Use one starred target to collect the remaining items into a list:

```python
head, *middle, tail = [1, 2, 3, 4]
print(head, middle, tail)  # 1 [2, 3] 4
```

The starred target can collect zero items, but the unstarred targets still need values.

## Expand a call

`*` in a call expands positional arguments; `**` expands keyword arguments from a mapping with string keys:

```python
def greet(name, punctuation="!"):
    return f"Hello, {name}{punctuation}"

args = ("Ada",)
options = {"punctuation": "."}
print(greet(*args, **options))  # Hello, Ada.
```

Do not supply the same parameter twice: combining a positional value with a keyword for that parameter raises `TypeError`. Unpacking reduces glue code, but explicit arguments are often clearer for a small fixed call.

```exercise
goal: "Collect every item after the first in rest."
lang: python
code: |
  first, rest = [1, 2, 3]
  print(first, rest)
checks:
  - match: "^first\\s*,\\s*\\*rest\\s*="
    message: "Put a star before rest: first, *rest = ..."
hint: "Put a star before rest: first, *rest = ..."
```

```quiz
question: What type does a starred assignment target receive?
options:
  - A tuple.
  - A list.
  - A dictionary.
answer: 1
explain: In `head, *rest = values`, rest is a list of the remaining items.
```
