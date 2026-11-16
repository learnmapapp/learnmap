---
title: "Test discovery"
icon: "🔎"
branch: "quality"
requires: ["unittest", "packages", "dependencies"]
summary: "Organize a project and run all matching test modules together."
---

Keep tests next to your application package in a dedicated directory:

```text
project/
  studytools/
    __init__.py
    helpers.py
  tests/
    test_helpers.py
```

From `project/`, run:

```shell
python3 -m unittest discover -s tests -p 'test_*.py' -v
```

Discovery starts at `tests`, imports matching modules, and runs their test cases. In Python 3.11, subdirectories containing test modules need `__init__.py` for recursive discovery. Keep imports resolvable from the project root, and avoid import-time side effects.

## The test imports the real function

```python title=tests/test_helpers.py
import unittest
from studytools.helpers import double

class DoubleTests(unittest.TestCase):
    def test_negative(self):
        self.assertEqual(double(-2), -4)
```

An import error is a test-run failure, not a reason to duplicate the function inside the test. Keep dependencies in the same selected environment, and run discovery from a known working directory.

A useful project check is: recreate the environment, install declared dependencies, run discovery, and try the command-line entry point. These steps can later run in continuous integration with the same commands.

```exercise
goal: Run discovery in the tests directory with the `test_`*`.py` pattern.
lang: shell
code: |
  python3 -m unittest discover -s src -p "test_*.py" -v
checks:
  - match: ^python3\s+-m\s+unittest\s+discover\s+-s\s+tests\s+-p\s+["']test_\*\.py["']\s+-v\s*$
    message: Set the discovery start directory with -s tests.
hint: Set the discovery start directory with -s tests.
```

```quiz
question: "Why import the application function instead of copying it into the test?"
options:
  - "To test the actual implementation that users run."
  - "Because tests cannot define functions."
  - "To make discovery skip the test."
answer: 0
explain: "A copied implementation can pass while the real application remains broken."
```
