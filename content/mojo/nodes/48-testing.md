---
title: Unit tests
icon: "🧪"
branch: tools
requires: [functions]
summary: Write test_ functions with std.testing asserts, and let TestSuite find and run them.
---
**A recipe for your first test file.**

**You'll need:** some code to test. Here's a module with one function:

```mojo title=grades.mojo
def letter(score: Int) raises -> String:
    if score < 0 or score > 100:
        raise Error("score out of range")
    if score >= 90:
        return "A"
    if score >= 70:
        return "B"
    return "C"
```

**Step 1.** Create a file next to it whose name starts with `test_`. Import the code under test, and the asserts you need from `std.testing`:

```mojo title=test_grades.mojo
from grades import letter
from std.testing import assert_equal, assert_raises, TestSuite

def test_top_grade() raises:
    assert_equal(letter(95), "A")
    assert_equal(letter(90), "A")   # the boundary counts

def test_middle_grade() raises:
    assert_equal(letter(89), "B")

def test_rejects_impossible_scores() raises:
    with assert_raises():
        _ = letter(101)

def main() raises:
    TestSuite.discover_tests[__functions_in_module()]().run()
```

**Step 2.** Run it like any other program:

```repl shell
> mojo run test_grades.mojo
```

TestSuite prints a line per test, saying whether it passed, and a summary at the end. A failing assert shows the expected and actual values.

**What's going on:**

- **Every test is a function whose name starts with `test_`**, takes no arguments, and is marked `raises`, because a failing assert raises an error.
- **The `main` line** is boilerplate: `__functions_in_module()` lists every function in this file, and `discover_tests` keeps those starting with `test_`. Copy it as is.
- **`assert_raises`** checks that the code inside the `with` block *does* raise. The `_ =` throws away the result, which we don't need.

**The asserts you'll use most:**

| Assert | Passes when |
| --- | --- |
| `assert_equal(a, b)` | `a == b` |
| `assert_true(x)` / `assert_false(x)` | `x` is true / false |
| `with assert_raises():` | the block raises an error |

Each takes an optional `msg="..."` explaining what went wrong, which helps a lot when a test fails months later.

**What to test:** the normal case, the boundaries (90 is an A, 89 isn't), and the errors. Boundaries are where off-by-one bugs live.

```compare python
# pytest
def test_top_grade():
    assert letter(95) == "A"
```

```compare rust
#[test]
fn top_grade() {
    assert_eq!(letter(95), "A");
}
```

```exercise
goal: "Complete the test: assert that `double(4)` equals 8 with `assert_equal`."
code: |-
  from std.testing import assert_equal, TestSuite

  def double(n: Int) -> Int:
      return n * 2

  def test_double() raises:
      pass

  def main() raises:
      TestSuite.discover_tests[__functions_in_module()]().run()
checks:
  - match: 'def\s+test_double\(\)\s+raises\s*:\s*\n\s+assert_equal\(\s*double\(4\)\s*,\s*8\s*\)'
    message: Replace pass with assert_equal(double(4), 8).
solution: |-
  from std.testing import assert_equal, TestSuite

  def double(n: Int) -> Int:
      return n * 2

  def test_double() raises:
      assert_equal(double(4), 8)

  def main() raises:
      TestSuite.discover_tests[__functions_in_module()]().run()
```

```quiz
question: "How does TestSuite know which functions are tests?"
options:
  - They have a @test decorator.
  - Their names start with test_.
  - They're listed in main by hand.
answer: 1
explain: discover_tests keeps the functions whose names start with test_.
```
