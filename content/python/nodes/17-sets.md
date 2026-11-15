---
title: "Sets"
icon: "🎯"
branch: "collections"
requires: ["dictionaries"]
summary: "Keep unique values and express membership, union, and intersection."
---

A [[set]] stores unique, hashable elements. Sets are useful for removing duplicates and asking whether a value has already appeared:

```python
seen = {"Ada", "Grace", "Ada"}
print(len(seen))          # 2
seen.add("Linus")
print("Ada" in seen)     # True
```

`set()` creates an empty set. `{}` creates an empty dictionary, an easy mix-up. Sets have no positional indexing and no guaranteed iteration order; use `sorted(seen)` when you need predictable display order.

## Combine groups

```python
readers = {"Ada", "Grace"}
writers = {"Grace", "Linus"}
print(sorted(readers & writers))  # ['Grace']: intersection
print(sorted(readers | writers))  # ['Ada', 'Grace', 'Linus']: union
print(sorted(readers - writers))  # ['Ada']: difference
```

`discard(value)` removes an element if present. `remove(value)` raises `KeyError` if it is absent. Choose the operation that matches whether absence is acceptable.

Like dictionary keys, set elements must be hashable. A mutable list cannot be a set element; an immutable tuple of suitable elements can. `frozenset` provides an immutable set when you need one.

```exercise
goal: "Find the names that are in both groups."
lang: python
code: |
  readers = {"Ada", "Grace"}
  writers = {"Grace", "Linus"}
  both = readers | writers
  print(sorted(both))
checks:
  - match: "both\\s*=\\s*readers\\s*&\\s*writers"
    message: "Use & for intersection, rather than | for union."
hint: "Use & for intersection, rather than | for union."
```

```quiz
question: "How do you create an empty set?"
options:
  - "{}"
  - "[]"
  - "set()"
answer: 2
explain: "{} creates a dictionary; set() creates an empty set."
```
