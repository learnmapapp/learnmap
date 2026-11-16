---
title: Test blocks
icon: "🧪"
branch: tools
requires: [functions, try]
summary: Tests live next to your code, and zig test runs them.
---
In Zig, tests sit in the same file as the code they test. No test framework to install, no separate folder required:

```zig title=temperature.zig
const std = @import("std");

pub fn toFahrenheit(celsius: i32) i32 {
    return @divTrunc(celsius * 9, 5) + 32;
}

test "water freezes at 32°F" {
    try std.testing.expectEqual(32, toFahrenheit(0));
}

test "water boils at 212°F" {
    try std.testing.expectEqual(212, toFahrenheit(100));
}

test "-40 is the same in both" {
    try std.testing.expectEqual(-40, toFahrenheit(-40));
}
```

```repl shell
> zig test temperature.zig
All 3 tests passed.
```

How it fits together:

- **`test "name" { ... }`** declares a test. Tests are left out of normal builds, so they cost nothing.
- **`std.testing.expect...`** functions return an error when the check fails, so each one needs `try`. A test fails when it returns an error.
- **`expectEqual(expected, actual)`**: expected value first.
- `@divTrunc` is integer division that rounds toward zero. Zig makes you pick a rounding mode when dividing signed integers.

The most useful helpers:

| Helper | Checks |
| --- | --- |
| `expect(ok)` | a condition is true |
| `expectEqual(a, b)` | two values are equal |
| `expectEqualStrings(a, b)` | two strings are equal, with a readable diff |
| `expectError(error.X, result)` | a call failed with that error |

**Bonus: leak detection.** Use `std.testing.allocator` in a test, and the test fails if anything allocated isn't freed. Free leak checking in every test.

```compare python
def test_freezing():
    assert to_fahrenheit(0) == 32
```

```compare rust
#[test]
fn freezing() {
    assert_eq!(to_fahrenheit(0), 32);
}
```

```exercise
goal: "Finish the test: check that `toFahrenheit(37)` (body temperature) is 98."
code: |-
  test "body temperature" {
      std.testing.expectEqual(toFahrenheit(37));
  }
checks:
  - match: 'try\s+std\.testing\.expectEqual\(\s*98\s*,\s*toFahrenheit\(37\)\s*\)'
    message: "Use try, and give the expected value first: expectEqual(98, toFahrenheit(37))"
solution: |-
  test "body temperature" {
      try std.testing.expectEqual(98, toFahrenheit(37));
  }
```

```quiz
question: Why does every `std.testing.expect...` call need `try`?
options:
  - It's required by the test runner's syntax.
  - A failed check returns an error, and try passes it up to fail the test.
  - Without try, the check runs at compile time.
answer: 1
explain: The helpers report failure as an error. try returns it from the test block, which marks the test as failed.
```
