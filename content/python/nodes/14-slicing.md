---
title: "Slicing"
icon: "✂️"
branch: "collections"
requires: ["lists"]
summary: "Select a range with start:stop:step; the stop stays excluded."
---

A [[slice]] takes part of a sequence. The basic shape is `sequence[start:stop]`, including the start index and excluding the stop:

```python
letters = ["a", "b", "c", "d", "e"]
print(letters[1:4])   # ['b', 'c', 'd']
print(letters[:2])    # ['a', 'b']
print(letters[-2:])   # ['d', 'e']
print(letters[::2])   # ['a', 'c', 'e']
```

Omit a boundary to use the corresponding end. The optional step changes the stride; `letters[::-1]` reverses the sequence into a new list. A zero step raises `ValueError`.

Slicing also works on strings and tuples. An out-of-range slice boundary is clipped, while a single out-of-range index raises an error.

## Copies are shallow

`letters[:]` creates a new outer list. Its elements are still references to the same objects, which matters for nested lists. Replacing an element in the copy will not replace an element in the original, but changing a shared nested list is visible through both.

Prefer a clear slice over a loop when selecting a simple contiguous section. Use a comprehension when selecting items by a condition instead of by position.

```exercise
goal: "Select the first three numbers with a slice."
lang: python
code: |
  numbers = [10, 20, 30, 40, 50]
  first_three = numbers[:2]
  print(first_three)
checks:
  - match: "numbers\\[\\s*:\\s*3\\s*\\]"
    message: "Use numbers[:3]; the stop index is excluded."
hint: "Use numbers[:3]; the stop index is excluded."
```

```quiz
question: "What does [0, 1, 2, 3][1:3] return?"
options:
  - "[1, 2]"
  - "[1, 2, 3]"
  - "[0, 1, 2]"
answer: 0
explain: "The start index 1 is included; the stop index 3 is excluded."
```
