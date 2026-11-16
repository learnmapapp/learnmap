---
title: Unit tests
icon: 🌐
branch: tools
requires:
  - functions
  - errors
summary: Name module-level tests with test_ and run a TestSuite from main.
---

Name module-level tests with `test_` and run a `TestSuite` from main. Save this as `test_square.mojo` and run `mojo run test_square.mojo`.

```mojo
from std.testing import assert_equal, TestSuite
def square(value: Int) -> Int:
    return value * value
def test_square() raises:
    assert_equal(square(0), 0)
    assert_equal(square(3), 9)
def main() raises:
    TestSuite.discover_tests[__functions_in_module()]().run()
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about unit tests.
lang: mojo
code: |-
  from std.testing import assert_equal, TestSuite
  def square(value: Int) -> Int:
      return value * value
  def test_square() raises:
      assert_equal(square(0), 0)
      assert_equal(square(3), 6)
  def main() raises:
      TestSuite.discover_tests[__functions_in_module()]().run()
checks:
  - match: square\(3\),\s+9
    message: Use square(3), 9 for this step.
  - notMatch: square\(3\),\s+6
    message: Replace square(3), 6 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which function name is eligible for automatic test discovery?
options:
  - "`test_square`"
  - "`check_square`"
  - "`square_example`"
answer: 0
explain: The test suite discovers suitable module-level functions with the `test_` prefix.
```
