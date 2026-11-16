---
title: "Modules"
icon: "🧱"
branch: "tooling"
requires: ["function-arguments"]
summary: "Split code into importable files and protect script entry points."
---
Your script has grown to 400 lines and scrolling has become a sport. Time to split it up.

## Every file is a module

There's nothing to declare. Any `.py` file is a [[module]], and its file name (without `.py`) is the module name. Move some helpers out of the main script:

```python title=pricing.py
VAT = 0.21

def with_vat(amount):
    return round(amount * (1 + VAT), 2)
```

Then import them from a file **in the same folder**:

```python title=shop.py
import pricing

print(pricing.with_vat(100))   # 121.0
print(pricing.VAT)
```

## Three ways to import

```python
import pricing                  # use as pricing.with_vat(...)
from pricing import with_vat    # use as with_vat(...)
import pricing as p             # use as p.with_vat(...)
```

The first one keeps it obvious where each name came from, which is helpful in big files. The second is fine when you use a name a lot. Avoid `from pricing import *`: nobody can tell where names came from anymore.

## The `__name__` trick

Importing a module **runs it**, top to bottom. So if `pricing.py` had a `print("testing!")` at the bottom, every program that imports it would print that.

Python sets a special variable, `__name__`, to tell you how the file is being used: it's `"__main__"` when the file was run directly, and the module's name when it was imported. That gives you a place for code that should only run in the first case:

```python title=pricing.py
def with_vat(amount):
    return round(amount * 1.21, 2)

if __name__ == "__main__":
    print(with_vat(100))   # only when you run python3 pricing.py
```

You'll see this at the bottom of a lot of Python files.

## Don't name a file after a module you use

If you create `random.py` or `json.py` in your project, then `import random` finds **your** file first, and things break in confusing ways. Pick names that don't clash with the standard library.

```compare javascript
import { withVat } from "./pricing.js";   // explicit exports in JS
```

```compare go
import "example.com/shop/pricing"   // a package is a folder in Go
```

```exercise
goal: "`main()` never runs because the check compares against the wrong string. Fix it."
lang: python
code: |
  def main():
      print("ready")

  if __name__ == "main":
      main()
checks:
  - match: 'if\s+__name__\s*==\s*["'']__main__["'']\s*:'
    message: 'The value has two underscores on each side: "__main__".'
hint: Count the underscores in __name__ and use the same number on each side.
solution: |
  def main():
      print("ready")

  if __name__ == "__main__":
      main()
```

```quiz
question: "`helpers.py` ends with `print(\"loaded\")`, with no `__name__` check. Another script does `import helpers`. What happens?"
options:
  - Nothing is printed; imports only load definitions.
  - "\"loaded\" is printed, because importing runs the file."
  - An ImportError.
answer: 1
explain: Importing executes the module's top-level code once. That's why test or demo code goes under the __name__ check.
```
