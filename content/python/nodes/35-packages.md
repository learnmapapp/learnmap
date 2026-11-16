---
title: "Packages"
icon: "📦"
branch: "tooling"
requires: ["modules"]
summary: "Group related modules under a shared import namespace."
---
When one folder fills up with modules, group them into a [[package]]: a folder of modules you import together. Here's a small project, and a walk through it:

```text
project/
  studytools/
    __init__.py
    __main__.py
    cards.py
    helpers.py
  README.md
```

**`studytools/`** is the package. Its modules are imported with a dot: `import studytools.cards`, or `from studytools.cards import shuffle`.

**`__init__.py`** marks the folder as a regular package, and it runs when the package is first imported. It's often empty. Sometimes it re-exports the most useful names, so users can write the shorter `from studytools import shuffle`:

```python title=studytools/__init__.py
from .cards import shuffle
```

**`helpers.py` and `cards.py`** are ordinary modules. Inside the package, they import each other with a **leading dot**, which means "from this package":

```python title=studytools/cards.py
from .helpers import double
```

**`__main__.py`** makes the package runnable. From the `project/` folder:

```shell
$ python3 -m studytools
```

`-m` means "run this module or package", and for a package it runs `__main__.py`.

## The gotcha: running a file inside a package

This looks like it should work, but doesn't:

```shell
$ python3 studytools/__main__.py
Traceback (most recent call last):
  ...
ImportError: attempted relative import with no known parent package
```

Running a file by its path treats it as a loose script, so Python doesn't know it belongs to `studytools`, and `from .helpers import ...` has nothing to be relative to. Run packages with `python3 -m`, from the folder that **contains** the package.

```compare javascript
// A package is a folder with package.json; "main" or "exports"
// says what gets imported.
```

```compare java
package studytools;   // Java: packages match folder names too
```

```exercise
goal: "This is `studytools/__main__.py`. Import `double` from the sibling module `helpers.py` in the same package."
lang: python
code: |
  from helpers import double

  print(double(21))
checks:
  - match: '^from\s+\.helpers\s+import\s+double\s*$'
    message: Use from .helpers import double.
hint: A leading dot means "this package".
solution: |
  from .helpers import double

  print(double(21))
```

```quiz
question: Which file is run by `python3 -m studytools`?
options:
  - "`studytools/helpers.py`"
  - "`studytools/__main__.py`"
  - "`studytools/__init__.py`, and nothing else"
answer: 1
explain: A package's entry point is __main__.py. (__init__.py runs too, first, because the package gets imported.)
```
