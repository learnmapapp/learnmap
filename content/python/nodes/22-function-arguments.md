---
title: "Function arguments"
icon: "🎛️"
branch: "functions"
requires: ["mutability", "unpacking"]
summary: "Defaults, keyword-only parameters, and the mutable-default trap."
---
Python's argument passing is flexible enough to make most call sites read like sentences. Here's a function that uses every feature, followed by a tour of it:

```python
def send_email(to, subject, *attachments,
               cc=None, urgent=False, **headers):
    ...

send_email(
    "ada@example.com", "Report",
    "q1.pdf", "q2.pdf",
    urgent=True,
    reply_to="boss@example.com",
)
```

**Stop 1: positional parameters.** `to` and `subject` are filled in order. You can also name them: `send_email(subject="Hi", to="ada@example.com")`.

**Stop 2: `*attachments`.** A starred parameter collects any extra positional arguments into a tuple. Here it gets `("q1.pdf", "q2.pdf")`.

**Stop 3: keyword-only parameters.** Everything after the `*` parameter **must** be passed by name. Nobody can write `send_email(..., True)` and leave readers guessing what `True` means. If you want keyword-only parameters without collecting extras, use a bare `*`:

```python
def resize(image, *, width, height):
    ...

resize(photo, width=800, height=600)   # resize(photo, 800, 600) fails
```

**Stop 4: `**headers`.** Two stars collect any extra **named** arguments into a dictionary. Here it gets `{"reply_to": "boss@example.com"}`.

## The default-value trap

This is one of Python's most famous gotchas. Guess what the second call prints:

```python
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("a"))   # ['a']
print(add_item("b"))   # ['a', 'b']  ...wait, what?
```

The default list is created **once**, when Python reads the `def`, and then shared by every call that uses it. Since lists are [mutable](node:mutability), it keeps growing.

The fix is a pattern you'll see everywhere: default to `None`, and make a fresh list inside:

```python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

Immutable defaults such as numbers, strings, `None` and `True` are always safe.

```compare kotlin
fun resize(image: Image, width: Int, height: Int) = ...
resize(photo, width = 800, height = 600)   // named args, opt-in
```

```compare javascript
function send(to, subject, ...attachments) { }   // rest params
send({ to, subject, urgent: true });   // or an options object
```

```exercise
goal: "The default list is shared between calls, so the second call prints `['a', 'b']`. Default to `None` instead. The body already handles it."
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
  - match: 'def\s+add_item\(\s*item\s*,\s*items\s*=\s*None\s*\)'
    message: Use items=None in the signature.
hint: Only the signature needs to change.
solution: |
  def add_item(item, items=None):
      if items is None:
          items = []
      items.append(item)
      return items

  print(add_item("a"))
  print(add_item("b"))
```

```quiz
question: "Given `def f(a, *, b):`, which call works?"
options:
  - "`f(1, 2)`"
  - "`f(1, b=2)`"
  - "`f(a=1, 2)`"
answer: 1
explain: Everything after the bare * is keyword-only, so b must be named. And f(a=1, 2) is a syntax error, because positional arguments can't follow named ones.
```
