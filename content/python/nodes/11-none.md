---
title: "None"
icon: "🕳️"
branch: "basics"
requires: ["functions"]
summary: "Represent a missing result explicitly, and test it with is."
---
`None` is Python's way of saying "there's no value here". It's what a function returns when it has nothing to return, and what you use for "not set yet":

```python
winner = None          # no winner yet

def find_user(name):
    if name == "ada":
        return {"name": "ada", "admin": True}
    return None        # not found
```

There's exactly one `None` in a running program, so you check for it with `is`:

```python
user = find_user("bob")
if user is None:
    print("No such user")
```

## Why not just `if not user`?

Because **lots of real values are falsy too**. Here's a little lineup. All of these make `not value` true:

```text
None    0    0.0    ""    []    {}
```

Only the first one means "missing". The rest are perfectly good answers: zero items, an empty name, no tags. Consider a stock checker:

```python
stock = 0               # we checked: none left
if not stock:
    print("Unknown")    # wrong! we do know: it's zero
if stock is None:
    print("Unknown")    # right: only when truly missing
```

So the rule of thumb:

- Asking "is it missing?" → `x is None` or `x is not None`.
- Asking "is it empty?" → `if not items:` is fine.

## The error you'll meet

When something unexpectedly turns out to be `None`, you'll see a message like this:

```repl
> user = find_user("bob")
> user["name"]
error: TypeError: 'NoneType' object is not subscriptable
```

`NoneType` in an error almost always means "something returned `None` and I didn't check". Look at where the value came from.

```compare javascript
// JS has two "nothings": null and undefined.
if (user == null) { /* catches both */ }
```

```compare kotlin
val user: User? = findUser("bob")   // the compiler forces a check
println(user?.name ?: "no user")
```

```exercise
goal: "A count of 0 is a real answer. Only print `missing` when `count` is `None`."
lang: python
code: |
  count = 0
  if not count:
      print("missing")
  else:
      print(count)
checks:
  - match: '^if\s+count\s+is\s+None\s*:'
    message: Replace not count with count is None.
hint: not count is also true for 0.
solution: |
  count = 0
  if count is None:
      print("missing")
  else:
      print(count)
```

```quiz
question: "Which value makes `not value` true, but is **not** `None`?"
options:
  - "`\"None\"`"
  - "`[]`"
  - "`[None]`"
answer: 1
explain: An empty list is falsy. The string "None" and the list [None] both have content, so they're truthy.
```
