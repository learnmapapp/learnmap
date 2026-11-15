---
title: "Unit tests"
icon: "🧪"
branch: "quality"
requires: ["type-hints", "raising-errors", "modules"]
summary: "Check observable behavior with the built-in unittest framework."
---

A unit test checks a small piece of behavior using known inputs and expected results. The standard library includes `unittest`:

```python title=test_math.py
import unittest


def double(number):
    return number * 2


class DoubleTests(unittest.TestCase):
    def test_positive(self):
        self.assertEqual(double(3), 6)

    def test_zero(self):
        self.assertEqual(double(0), 0)
```

Save this file and run `python3 -m unittest test_math -v`. Test methods begin with `test`; subclasses of `TestCase` supply helpful assertions and failure reports. In a real project, import the function from its application module instead of copying it into the test.

## Test the contract

Include an ordinary case, boundary cases, and intended failures. Use `with self.assertRaises(ValueError): ...` when rejection is part of the contract. Do not test incidental implementation details that would make an equivalent refactor fail.

`setUp` runs before each test method and can prepare fresh state. Keep tests independent; one test should not depend on another having run first. Use a temporary directory rather than real personal files when testing file operations.

```exercise
goal: "Correct the expected result when doubling three."
lang: python
code: |
  import unittest

  def double(number):
      return number * 2

  class DoubleTests(unittest.TestCase):
      def test_positive(self):
          self.assertEqual(double(3), 5)
checks:
  - match: "self\\.assertEqual\\(\\s*double\\(\\s*3\\s*\\)\\s*,\\s*6\\s*\\)"
    message: "Three doubled is six; use self.assertEqual(double(3), 6)."
hint: "Three doubled is six; use self.assertEqual(double(3), 6)."
```

```quiz
question: "Which method name will unittest recognize as a test by default?"
options:
  - "check_positive"
  - "positive_case"
  - "test_positive"
answer: 2
explain: "Test methods use the test prefix; a conventional descriptive name is test_positive."
```
