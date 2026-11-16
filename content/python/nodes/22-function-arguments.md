---
title: "Function arguments"
icon: "🎛️"
branch: "functions"
requires: ["mutability", "unpacking"]
summary: "Defaults, keyword-only parameters, and the mutable-default trap."
---

Parameters can have defaults, and callers can use keywords to make intent explicit:

```python
def greet(name, punctuation="!"):
    return f"Hello, {name}{punctuation}"

print(greet("Ada"))
print(greet(name="Grace", punctuation="."))
```

A `*` in a parameter list makes subsequent parameters keyword-only. For example, `def connect(host, *, timeout=5): ...` requires `connect("localhost", timeout=2)` for a custom timeout.

`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dictionary. Use them when a function genuinely supports a variable interface, not just to avoid choosing parameter names.

## Defaults are evaluated once

A default list is shared across calls. Use `None` and create a fresh list inside the function instead:

```python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['b']
```

The `is None` check also preserves an explicitly supplied empty list. A truthiness check would replace it, changing the caller-visible behavior.

```exercise
goal: Replace the shared default list with `None`; the body already handles it.
lang: python
code: |
  def add_item(item, items=[]):
      if items is None:
          items = []
      items.append(item)
      return items

  print(add_item("a"))
  print(add_item("b"))
checks:
  - match: def\s+add_item\(\s*item\s*,\s*items\s*=\s*None\s*\)
    message: Use items=None in the signature.
hint: Use items=`None` in the signature.
```

```quiz
question: "When is a default argument expression evaluated?"
options:
  - "Every time the function is called."
  - "When the def statement executes."
  - "Only if the argument is a list."
answer: 1
explain: "Defaults are created once when the function is defined, so mutable defaults can retain state."
```
