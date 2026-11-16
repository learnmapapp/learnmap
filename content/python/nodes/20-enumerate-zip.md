---
title: "Enumerate and zip"
icon: "🤝"
branch: "collections"
requires: ["unpacking", "loops"]
summary: "Count items or pair sequences without managing indexes yourself."
---

`enumerate` yields a counter and a value together. The default counter begins at zero; set `start=1` for a human-facing list:

```python
names = ["Ada", "Grace"]
for position, name in enumerate(names, start=1):
    print(position, name)
# 1 Ada
# 2 Grace
```

`zip` pairs items from multiple iterables by position:

```python
scores = [10, 12]
for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

Both produce values lazily, rather than eagerly building every pair. You can turn their results into a list if you need to store or inspect them.

## Watch unequal lengths

Ordinary `zip` stops when the shortest input is exhausted. Extra values disappear from that traversal. When matching lengths are a requirement, use `zip(names, scores, strict=True)` so a mismatch raises `ValueError` during iteration.

Do not use a separate counter that you must increment by hand when `enumerate` already expresses the intent. Pairing and unpacking keep the relationship between values visible in the loop header.

```exercise
goal: Reject unequal lengths instead of silently dropping an extra score.
lang: python
code: |
  names = ["Ada", "Grace"]
  scores = [10, 12]
  for name, score in zip(names, scores):
      print(name, score)
checks:
  - match: zip\(\s*names\s*,\s*scores\s*,\s*strict\s*=\s*True\s*\)
    message: Add strict=True to zip(names, scores).
hint: Add strict=`True` to `zip(names, scores)`.
```

```quiz
question: What does zip do by default when input lengths differ?
options:
  - Pads with `None`.
  - Raises before iteration begins.
  - Stops at the shortest input.
answer: 2
explain: Use strict=`True` when unequal lengths should be an error.
```
