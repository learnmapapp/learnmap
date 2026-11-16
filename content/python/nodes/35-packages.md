---
title: "Packages"
icon: "📦"
branch: "tooling"
requires: ["modules"]
summary: "Group related modules under a shared import namespace."
---

A regular [[package]] groups modules in a directory containing `__init__.py`. For a small project, start with this layout:

```text
project/
  studytools/
    __init__.py
    __main__.py
    helpers.py
```

`__init__.py` may be empty. Inside `helpers.py`, define reusable functions. Inside `__main__.py`, use an explicit relative import:

```python title=studytools/__main__.py
from .helpers import double

print(double(21))
```

From `project/`, run `python3 -m studytools`. The `-m` option runs the package's `__main__.py` with its package context intact. Running `python3 studytools/__main__.py` directly does not establish that same context for the relative import.

## Keep imports predictable

Outside the package, use `from studytools.helpers import double`. A leading dot in an import refers to the current package, not the current working directory.

Namespace packages can omit `__init__.py`, but a regular package is a simple starting point for your own application. An import package and a published distribution are related concepts, not identical names: a distribution installed with pip may supply a differently named import package.

```exercise
goal: Import helpers relative to the current package.
lang: python
code: |
  from helpers import double

  print(double(21))
checks:
  - match: ^from\s+\.helpers\s+import\s+double\s*$
    message: Use from .helpers import double inside studytools/__main__.py.
hint: Use from .helpers import double inside `studytools/__main__.py`.
```

```quiz
question: Which file is run by `python3 -m studytools`?
options:
  - "`studytools/helpers.py`"
  - "`studytools/__main__.py`"
  - Every file alphabetically.
answer: 1
explain: A package entry point lives in `__main__.py`.
```
