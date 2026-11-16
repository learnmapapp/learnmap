---
title: "Unit tests"
icon: "🧪"
branch: "quality"
requires: ["type-hints", "raising-errors", "modules"]
summary: "Check observable behavior with the built-in unittest framework."
---
Let's write a test **first**, watch it fail, then make it pass. The thing under test is a function that turns titles into URL slugs. It doesn't exist yet.

**Red: write the test.**

```python title=test_slugs.py
import unittest
from slugs import slugify

class SlugifyTests(unittest.TestCase):
    def test_lowercases_and_joins_words(self):
        self.assertEqual(slugify("Hello World"), "hello-world")

    def test_strips_surrounding_space(self):
        self.assertEqual(slugify("  Hi  "), "hi")

if __name__ == "__main__":
    unittest.main()
```

The structure: a class that inherits from `unittest.TestCase`, with methods whose names **start with `test`**. Each one checks one behaviour.

**Run it, and watch it fail.** Python can't even import `slugify` yet:

```shell
$ python3 -m unittest test_slugs
...
ModuleNotFoundError: No module named 'slugs'
```

**Green: the simplest code that passes.**

```python title=slugs.py
def slugify(title):
    return "-".join(title.lower().split())
```

```shell
$ python3 -m unittest test_slugs
..
----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

Each dot is a passing test. Add `-v` to see their names instead.

**Refactor**, if needed, with the tests as your safety net.

## The assertion toolbox

| Assertion | Checks |
| --- | --- |
| `assertEqual(a, b)` | `a == b`, with a helpful diff when it fails |
| `assertTrue(x)` / `assertFalse(x)` | truthiness |
| `assertIn(item, collection)` | membership |
| `assertIsNone(x)` | `x is None` |
| `assertRaises(SomeError)` | that a block raises |

`assertRaises` is used as a context manager:

```python
def test_rejects_empty_title(self):
    with self.assertRaises(ValueError):
        slugify("")
```

```tip
Many projects use **pytest** instead (`python -m pip install pytest`). It runs these unittest tests as-is, and also lets you write tests as plain functions with plain `assert` statements.
```

```compare java
@Test void lowercases() {
    assertEquals("hello-world", slugify("Hello World"));
}
```

```compare go
func TestSlugify(t *testing.T) {
    if got := Slugify("Hello World"); got != "hello-world" {
        t.Errorf("got %q", got)
    }
}
```

```exercise
goal: "This test is wrong, not the code: three doubled is six. Fix the expected value."
lang: python
code: |
  import unittest

  def double(number):
      return number * 2

  class DoubleTests(unittest.TestCase):
      def test_positive(self):
          self.assertEqual(double(3), 5)
checks:
  - match: 'self\.assertEqual\(\s*double\(\s*3\s*\)\s*,\s*6\s*\)'
    message: Three doubled is six; use self.assertEqual(double(3), 6).
hint: Change only the expected value.
solution: |
  import unittest

  def double(number):
      return number * 2

  class DoubleTests(unittest.TestCase):
      def test_positive(self):
          self.assertEqual(double(3), 6)
```

```quiz
question: "A `TestCase` has a method called `check_empty_input`. Does unittest run it?"
options:
  - Yes, every method in a TestCase runs.
  - No, only methods whose names start with test are run.
  - Only if it has an assertion in it.
answer: 1
explain: The test runner looks for methods starting with test. Rename it to test_empty_input.
```
