---
title: "Mutability"
icon: "🔗"
branch: "collections"
requires: ["slicing", "dictionaries", "none"]
summary: "Distinguish rebinding, shared objects, and shallow copies."
---
Here's a puzzle. Read it and predict the last line before you read on:

```python
team = ["Ada", "Grace"]
backup = team
backup.append("Linus")
print(team)
```

If you said `['Ada', 'Grace']`, welcome to the club. It prints `['Ada', 'Grace', 'Linus']`.

## What actually happened

Remember that [variables](node:variables) are labels, not boxes? `backup = team` doesn't copy the list. It sticks a **second label on the same list**:

```text
team ───┐
        ├──▶ ["Ada", "Grace", "Linus"]
backup ─┘
```

Changing the list through either label changes the one list both labels point at. You can confirm it with `is`, which checks whether two names refer to the same object:

```repl
> backup is team
True
```

## Why numbers and strings never surprise you

Strings, numbers and tuples are [[immutable]]: nothing can change them in place. `+=` on a string builds a **new** string and moves only that one label. Lists, dictionaries and sets are [[mutable]], so changes in place are visible through every label.

## Making a real copy

When you want an independent list, ask for one:

```python
backup = team.copy()     # or list(team), or team[:]
backup.append("Linus")
print(team)              # ['Ada', 'Grace']: untouched
```

Dictionaries have `.copy()` too. These are **shallow** copies: a list of lists gets a new outer list, but the inner lists are still shared. For nested data, use `copy.deepcopy(...)` from the `copy` module.

## Same thing, inside functions

Passing a list to a function passes the same list, not a copy. So a function can change your data:

```python
def add_guest(guests):
    guests.append("Mystery guest")

party = ["Ada"]
add_guest(party)
print(party)   # ['Ada', 'Mystery guest']
```

Sometimes that's what you want. When it isn't, have the function return a new list instead.

```compare javascript
const backup = team;          // same sharing as Python
const copy = [...team];       // a shallow copy
```

```compare java
List<String> backup = team;                  // shared
List<String> copy = new ArrayList<>(team);   // copied
```

```exercise
goal: "Appending to `copy` also changes `original`. Make `copy` a real copy."
lang: python
code: |
  original = ["Ada"]
  copy = original
  copy.append("Grace")
  print(original)
checks:
  - match: 'copy\s*=\s*original\.copy\(\s*\)'
    message: Assign original.copy() to copy.
hint: Lists have a .copy() method.
solution: |
  original = ["Ada"]
  copy = original.copy()
  copy.append("Grace")
  print(original)
```

```quiz
question: "After `a = [1]`, `b = a`, `b = b + [2]`, what is `a`?"
options:
  - "`[1]`"
  - "`[1, 2]`"
  - "`[2]`"
answer: 0
explain: b + [2] builds a brand-new list, and only the b label moves to it. Compare with b.append(2), which would change the shared list.
```
