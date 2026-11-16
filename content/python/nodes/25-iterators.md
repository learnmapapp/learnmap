---
title: "Iterators"
icon: "➡️"
branch: "functions"
requires: ["enumerate-zip", "functions"]
summary: "Separate reusable iterables from one-way streams of values."
---

An [[iterable]] can supply an iterator. An [[iterator]] tracks a position and hands out values through `next()`:

```python
names = ["Ada", "Grace"]
stream = iter(names)
print(next(stream))  # Ada
print(next(stream))  # Grace
print(next(stream, "done"))  # done
```

Without a default argument, `next()` raises `StopIteration` when the stream is exhausted. A `for` loop handles that signal for you.

## A stream is consumed

```python
stream = iter([1, 2, 3])
print(list(stream))  # [1, 2, 3]
print(list(stream))  # []
```

A list can create a fresh iterator for each loop, while an iterator typically returns itself from `iter()` and cannot rewind. Store values in a list if you need to traverse a one-shot stream several times, keeping memory costs in mind.

`map`, `filter`, `zip`, and `enumerate` all return iterators. Lazy processing can avoid unnecessary intermediate collections, but errors in a transformation may appear only when someone consumes the iterator. [Generators](node:generators) let you write your own lazy producers with ordinary function syntax.

```exercise
goal: Give next a fallback so an empty stream does not raise StopIteration.
lang: python
code: |
  stream = iter([])
  print(next(stream))
checks:
  - match: next\(\s*stream\s*,\s*["']done["']\s*\)
    message: Use next(stream, "done").
hint: Use `next(stream, "done")`.
```

```quiz
question: "What happens when you convert the same exhausted iterator to a list again?"
options:
  - "It starts over."
  - "It produces an empty list."
  - "It recreates the original iterable."
answer: 1
explain: "An iterator is consumed as it advances; it does not automatically rewind."
```
