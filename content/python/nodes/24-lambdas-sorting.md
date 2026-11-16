---
title: "Sorting and lambdas"
icon: "📊"
branch: "functions"
requires: ["function-arguments", "tuples"]
summary: "Choose sort keys and keep small anonymous functions readable."
---
**The leaderboard problem.** You have players as `(name, score)` tuples and want them ranked:

```python
players = [("Ada", 92), ("Linus", 75), ("Grace", 88)]
print(sorted(players))
```

```text
[('Ada', 92), ('Grace', 88), ('Linus', 75)]
```

Alphabetical. Python sorts tuples by their first item, so that's names. We want scores.

**Attempt 1: a key function.** `sorted` takes a `key`: a function that turns each item into the thing to sort by.

```python
def by_score(player):
    return player[1]

print(sorted(players, key=by_score))
```

Now it's sorted by score, but lowest first.

**Attempt 2: highest first, with a lambda.** A whole `def` for a one-liner feels heavy. A [[lambda]] is a small, nameless function written inline:

```python
ranked = sorted(players, key=lambda p: p[1], reverse=True)
```

`lambda p: p[1]` means exactly the same as `by_score`: take `p`, return `p[1]`. A lambda can only hold a single expression, which is exactly right for a key.

**Attempt 3: break ties.** Two players on 88? Return a tuple from the key, and Python compares item by item. The minus sign sorts scores high to low while names stay A to Z:

```python
ranked = sorted(players, key=lambda p: (-p[1], p[0]))
```

## sorted or .sort?

- `sorted(items)` returns a **new** list and works on anything iterable.
- `items.sort()` sorts a list **in place** and returns `None`.

Both take `key` and `reverse`. And `min` and `max` take `key` too:

```python
best = max(players, key=lambda p: p[1])   # ('Ada', 92)
```

```tip
If a lambda grows past "pick a field" or "compute one thing", give it a name with `def`. Named functions show up in error messages and can have docstrings.
```

```compare javascript
players.sort((a, b) => b[1] - a[1]);   // a comparator, in place
```

```compare kotlin
players.sortedByDescending { it.second }
```

```exercise
goal: "The leaderboard is sorted by name. Sort the players by their score instead."
lang: python
code: |
  players = [("Ada", 10), ("Grace", 12), ("Linus", 8)]
  ranked = sorted(players, key=lambda player: player[0])
  print(ranked)
checks:
  - match: 'lambda\s+player\s*:\s*player\[\s*1\s*\]'
    message: "Return player[1] from the key function."
hint: The score is at position 1 of each tuple.
solution: |
  players = [("Ada", 10), ("Grace", 12), ("Linus", 8)]
  ranked = sorted(players, key=lambda player: player[1])
  print(ranked)
```

```quiz
question: "What does `sorted([\"bb\", \"a\", \"ccc\"], key=len)` return?"
options:
  - "`['a', 'bb', 'ccc']`"
  - "`[1, 2, 3]`"
  - "`['ccc', 'bb', 'a']`"
answer: 0
explain: The key decides the order, but the original items are what you get back.
```
