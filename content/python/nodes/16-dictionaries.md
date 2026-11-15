---
title: "Dictionaries"
icon: "📖"
branch: "collections"
requires: ["lists", "loops"]
summary: "Map unique keys to values and handle missing entries deliberately."
---

A [[dictionary]] maps keys to values. Keys are unique and must be [[hashable]], such as strings, numbers, or tuples whose elements are all hashable.

```python
scores = {"Ada": 10, "Grace": 12}
scores["Ada"] += 5
scores["Linus"] = 8
print(scores["Ada"])             # 15
print(scores.get("Missing", 0))   # 0
```

Indexing with a missing key raises `KeyError`. `get(key, default)` returns a fallback without inserting it. `key in scores` checks keys, not values.

## Walk through entries

```python
for name, score in scores.items():
    print(name, score)
```

`items()` supplies key-value pairs. `keys()` and `values()` provide views of each side. Dictionaries preserve insertion order; updating an existing key does not move it to the end.

Use a dictionary when you need a lookup by name or identifier, rather than repeatedly searching a list. Do not add or delete keys while iterating over the same dictionary; gather changes first or iterate over a copy. Lists cannot be dictionary keys because their contents can change.

```compare javascript
const scores = new Map([["Ada", 10]]);
console.log(scores.get("Grace") ?? 0);
```

```compare rust
let score = scores.get("Grace").copied().unwrap_or(0);
```

```exercise
goal: "Return zero for a missing player without inserting a key."
lang: python
code: |
  scores = {"Ada": 10}
  print(scores["Grace"])
checks:
  - match: "scores\\.get\\(\\s*[\"']Grace[\"']\\s*,\\s*0\\s*\\)"
    message: "Use scores.get(\"Grace\", 0)."
hint: "Use scores.get(\"Grace\", 0)."
```

```quiz
question: "What happens when scores.get(\"Missing\", 0) finds no entry?"
options:
  - "It inserts Missing with value 0."
  - "It returns 0 without inserting a key."
  - "It raises KeyError."
answer: 1
explain: "get returns the fallback but leaves the dictionary unchanged."
```
