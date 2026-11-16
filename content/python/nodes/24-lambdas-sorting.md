---
title: "Sorting and lambdas"
icon: "📊"
branch: "functions"
requires: ["function-arguments", "tuples"]
summary: "Choose sort keys and keep small anonymous functions readable."
---

`sorted(iterable)` returns a new list. `list.sort()` mutates an existing list and returns `None`. Both accept a `key` function that computes what each element should be compared by.

```python
names = ["Grace", "Ada", "Linus"]
print(sorted(names, key=len))  # ['Ada', 'Grace', 'Linus']
print(names)                  # unchanged
```

A [[lambda]] is a small anonymous function containing one expression. It is useful when a sort key is simple enough to read inline:

```python
players = [("Ada", 10), ("Grace", 12), ("Linus", 8)]
ranked = sorted(players, key=lambda player: player[1], reverse=True)
print(ranked[0])  # ('Grace', 12)
```

The key receives a whole item and returns its comparison value. It does not return a comparison between two items.

Python sorting is stable: items with equal keys keep their original relative order. Tuple keys express multiple criteria, such as `key=lambda player: (-player[1], player[0])` for descending scores and ascending names.

Use a named `def` when a transformation needs multiple steps or an explanation. Anonymous does not have to mean cryptic.

```compare javascript
const ranked = [...players].sort((a, b) => a[1] - b[1]);
```

```compare kotlin
val ranked = players.sortedBy { it.second }
```

```exercise
goal: "Sort players by score rather than by their names."
lang: python
code: |
  players = [("Ada", 10), ("Grace", 12), ("Linus", 8)]
  ranked = sorted(players, key=lambda player: player[0])
  print(ranked)
checks:
  - match: "lambda\\s+player\\s*:\\s*player\\[\\s*1\\s*\\]"
    message: "Return player[1] from the key function."
hint: "Return player[1] from the key function."
```

```quiz
question: What does `sorted(values)` return?
options:
  - A new sorted list.
  - "`None`, after modifying values."
  - A sorting function.
answer: 0
explain: sorted builds a new list; list.sort modifies a list in place.
```
