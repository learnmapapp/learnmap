---
title: "Dictionaries"
icon: "📖"
branch: "collections"
requires: ["lists", "loops"]
summary: "Map unique keys to values and handle missing entries deliberately."
---
A [[dictionary]] maps keys to values. Think phone book: you look up a name, you get a number.

```python
phone = {"Ada": "555-0101", "Grace": "555-0199"}
print(phone["Ada"])          # 555-0101
phone["Linus"] = "555-0123"  # add or overwrite
del phone["Grace"]           # remove
```

Keys are usually strings, but any [[hashable]] value works: numbers, tuples, even `True`. Values can be anything at all.

## Three ways to ask for a missing key

Here's what happens when the key isn't there, and the three ways to deal with it:

```repl
> scores = {"Ada": 10}
> scores["Grace"]
error: KeyError: 'Grace'
> scores.get("Grace")
> scores.get("Grace", 0)
0
> "Grace" in scores
False
```

- `scores[key]` when the key **must** be there. A `KeyError` is the right outcome if it isn't.
- `scores.get(key, default)` when missing is normal. Without a default you get `None`, which is why that line shows nothing.
- `key in scores` when you just want to know.

## Counting things

The classic dictionary job: counting. Here's a word counter:

```python
counts = {}
for word in "the cat and the hat".split():
    counts[word] = counts.get(word, 0) + 1
print(counts)   # {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}
```

`get(word, 0)` means "the current count, or 0 if this is the first time".

## Looping over a dictionary

A plain `for` gives you the keys. Use `.items()` to get each key and value together:

```python
for word, n in counts.items():
    print(f"{word}: {n}")
```

Dictionaries remember the order you inserted things in, so this prints them in the order they were first seen.

```compare javascript
const scores = new Map([["Ada", 10]]);
scores.get("Grace") ?? 0;
```

```compare java
Map<String, Integer> scores = new HashMap<>();
scores.getOrDefault("Grace", 0);
```

```exercise
goal: "Grace has no score yet, and this crashes with a `KeyError`. Print `0` for her instead, without adding her to the dictionary."
lang: python
code: |
  scores = {"Ada": 10}
  print(scores["Grace"])
checks:
  - match: 'scores\.get\(\s*["'']Grace["'']\s*,\s*0\s*\)'
    message: Use scores.get("Grace", 0).
hint: get takes a second argument, the default.
solution: |
  scores = {"Ada": 10}
  print(scores.get("Grace", 0))
```

```quiz
question: "What does `{\"a\": 1}.get(\"b\")` return?"
options:
  - "`0`"
  - "`None`"
  - It raises a KeyError.
answer: 1
explain: get never raises. Without a default, a missing key gives None.
```
