---
title: "Enumerate and zip"
icon: "🤝"
branch: "collections"
requires: ["unpacking", "loops"]
summary: "Count items or pair sequences without managing indexes yourself."
---
If you're coming from C-style loops, your fingers will want to write this:

```python
names = ["Ada", "Grace", "Linus"]
for i in range(len(names)):
    print(i + 1, names[i])
```

It works, but Python has two small helpers that make index juggling unnecessary.

## enumerate: "I need the position too"

`enumerate` hands you the position and the item together:

```python
for place, name in enumerate(names, start=1):
    print(f"{place}. {name}")
```

```text
1. Ada
2. Grace
3. Linus
```

Without `start=1`, counting begins at 0.

## zip: "walk two lists together"

`zip` pairs up items from several lists, like the teeth of a zipper:

```python
names = ["Ada", "Grace", "Linus"]
scores = [92, 88, 75]

for name, score in zip(names, scores):
    print(f"{name} scored {score}")
```

It also makes building a dictionary from two lists a one-liner: `dict(zip(names, scores))`.

## The silent zip bug

What if the lists have different lengths? `zip` stops at the shortest one, **without telling you**:

```repl
> list(zip(["Ada", "Grace"], [92, 88, 75]))
[('Ada', 92), ('Grace', 88)]
```

That 75 just disappeared. If the lengths should always match, say so with `strict=True`. Then a mismatch raises a `ValueError` instead of quietly losing data.

```compare javascript
names.forEach((name, i) => console.log(i + 1, name));
// JS has no built-in zip
```

```compare kotlin
names.forEachIndexed { i, name -> println("${i + 1} $name") }
names.zip(scores)
```

```exercise
goal: "If `names` and `scores` ever get out of sync, this should fail loudly instead of dropping data. Make the `zip` strict."
lang: python
code: |
  names = ["Ada", "Grace"]
  scores = [10, 12]
  for name, score in zip(names, scores):
      print(name, score)
checks:
  - match: 'zip\(\s*names\s*,\s*scores\s*,\s*strict\s*=\s*True\s*\)'
    message: Add strict=True to zip(names, scores).
hint: zip takes a keyword argument called strict.
solution: |
  names = ["Ada", "Grace"]
  scores = [10, 12]
  for name, score in zip(names, scores, strict=True):
      print(name, score)
```

```quiz
question: "What does `list(enumerate(\"ab\"))` give?"
options:
  - "`[(0, 'a'), (1, 'b')]`"
  - "`[(1, 'a'), (2, 'b')]`"
  - "`['a', 'b']`"
answer: 0
explain: enumerate counts from 0 unless you pass start, and gives (position, item) pairs.
```
