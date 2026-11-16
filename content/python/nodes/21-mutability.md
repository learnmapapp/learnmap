---
title: "Mutability"
icon: "🔗"
branch: "collections"
requires: ["slicing", "dictionaries", "none"]
summary: "Distinguish rebinding, shared objects, and shallow copies."
---

Assignment does not copy an object. Two names can refer to the same mutable list:

```python
original = ["Ada"]
alias = original
alias.append("Grace")
print(original)  # ['Ada', 'Grace']
```

Rebinding `alias = []` would point that name somewhere else without changing `original`. Mutating the shared list changes what both names see. The same distinction applies when passing objects into functions.

## Copy only what you need

```python
original = ["Ada"]
copy = original.copy()
copy.append("Grace")
print(original)  # ['Ada']
print(copy)      # ['Ada', 'Grace']
```

`list.copy()`, slicing, and `dict.copy()` create shallow copies: the outer container is new, but nested objects remain shared. `copy.deepcopy` can copy a nested object graph when independent nested state is actually required.

Immutable values such as strings and integers cannot be changed in place. A tuple is immutable as a container but can hold mutable items. Avoid the repeated-inner-list trap: repetition reuses one inner list, while a comprehension can create separate rows:

```python
shared_rows = [[0] * 2] * 3
separate_rows = [[0] * 2 for _ in range(3)]
shared_rows[0][0] = 9
print(shared_rows)    # [[9, 0], [9, 0], [9, 0]]
print(separate_rows)  # [[0, 0], [0, 0], [0, 0]]
```

```compare javascript
const original = ["Ada"];
const copy = [...original]; // also a shallow copy
```

```compare rust
let original = vec![String::from("Ada")];
let copy = original.clone(); // cloning behavior depends on the element type
```

```exercise
goal: Copy the list before appending so original stays unchanged.
lang: python
code: |
  original = ["Ada"]
  copy = original
  copy.append("Grace")
  print(original)
checks:
  - match: copy\s*=\s*original\.copy\(\s*\)
    message: Assign original.copy() to copy.
hint: Assign `original.copy()` to copy.
```

```quiz
question: "What does a shallow list copy share with its original?"
options:
  - "The outer list itself."
  - "References to nested objects."
  - "Nothing at any depth."
answer: 1
explain: "The outer lists are distinct, but their elements still refer to the same objects."
```
