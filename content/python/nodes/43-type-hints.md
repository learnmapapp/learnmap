---
title: "Type hints"
icon: "🏷️"
branch: "objects"
requires: ["dataclasses", "none"]
summary: "Describe expected values without pretending annotations are runtime checks."
---
**Python, before:**

```python
def total_price(items, discount):
    ...
```

What's `items`? A list of numbers? A list of dictionaries? Is `discount` 0.1 or 10? You'd have to read the body, or the callers.

**Python, after:**

```python
def total_price(items: list[float], discount: float = 0.0) -> float:
    ...
```

Now the signature answers those questions. These are [[type hint]]s: annotations that say what a name is expected to hold. `-> float` describes the return value.

## The important part: Python ignores them

At runtime, hints are just notes. This runs without complaint:

```python
total_price("oops", "also oops")   # no error from the hints
```

Their value comes from **tools**: your editor uses them for autocompletion and red squiggles, and a type checker such as mypy or pyright reads your whole project and reports mismatches before you run anything:

```shell
$ python -m pip install mypy
$ mypy shop.py
shop.py:12: error: Argument 1 to "total_price" has incompatible type "str"; expected "list[float]"
```

## The vocabulary

| Hint | Means |
| --- | --- |
| `int`, `str`, `float`, `bool` | the basic types |
| `list[str]` | a list of strings |
| `dict[str, int]` | a dict from strings to ints |
| `tuple[int, int]` | a pair of ints |
| `str \| None` | a string, or `None` |

That `| None` one is the hint you'll write most. Anything that might return `None` should say so, so the type checker can remind callers to check for it:

```python
def find_user(name: str) -> dict | None:
    ...
```

```tip
You don't need to annotate everything. Start with function signatures, especially public ones. Local variables are usually inferred: `count = 0` is already known to be an int.
```

```compare javascript
// TypeScript adds the same kind of annotations to JavaScript,
// and also erases them before the code runs.
```

```compare kotlin
fun findUser(name: String): User?   // enforced by the compiler
```

```exercise
goal: "`first_name` can return `None`, but the hint says it always returns a `str`. Make the return hint honest."
lang: python
code: |
  def first_name(names: list[str]) -> str:
      if not names:
          return None
      return names[0]

  print(first_name([]))
checks:
  - match: '\)\s*->\s*str\s*\|\s*None\s*:'
    message: Change the return annotation to str | None.
hint: Use the | operator to allow either type.
solution: |
  def first_name(names: list[str]) -> str | None:
      if not names:
          return None
      return names[0]

  print(first_name([]))
```

```quiz
question: "`def f(n: int): ...` is called as `f(\"5\")`. What does Python do when it runs this?"
options:
  - Raises a TypeError because of the hint.
  - Converts "5" to 5 automatically.
  - Runs it; hints aren't checked at runtime.
answer: 2
explain: Hints are for editors and type checkers. The interpreter doesn't enforce them.
```
