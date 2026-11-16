---
title: Unit test suites
icon: "🧪"
branch: tools
requires: [procedures, exceptions]
summary: Write tests with std/unittest, check exceptions, and run them with nim r or nimble test.
---
**Let's test a small module the way you would in a real project.** Here's the code under test:

```nim title=src/temperature.nim
import std/strutils

proc toFahrenheit*(c: float): float = c * 9 / 5 + 32

proc parseCelsius*(s: string): float =
  if s.len == 0 or s[^1] != 'C':
    raise newException(ValueError, "expected something like 21C")
  parseFloat(s[0..^2])
```

**The test file.** By convention tests go in a `tests/` folder, in files starting with `t`:

```nim title=tests/ttemperature.nim
import std/unittest
import ../src/temperature

suite "temperature":
  test "freezing and boiling points":
    check toFahrenheit(0) == 32
    check toFahrenheit(100) == 212

  test "parses a reading":
    check parseCelsius("21.5C") == 21.5

  test "rejects a reading without unit":
    expect ValueError:
      discard parseCelsius("21.5")
```

**Reading it:**

- `suite` groups related tests under a name.
- `test` is one named test.
- `check` asserts that an expression is true. When it isn't, it prints the values involved and marks the test as failed, but keeps going.
- `expect ValueError:` passes only if the block raises that exception.

**Run it** like any program:

```repl shell
> nim r tests/ttemperature.nim
[Suite] temperature
  [OK] freezing and boiling points
  [OK] parses a reading
  [OK] rejects a reading without unit
```

**When a check fails**, you see what went wrong, not just "false". Say a bug made `toFahrenheit(100)` return 211:

```repl shell
> nim r tests/ttemperature.nim
[Suite] temperature
    ttemperature.nim(7, 10): Check failed: toFahrenheit(100) == 212
    toFahrenheit(100) was 211.0
  [FAILED] freezing and boiling points
```

**In a Nimble project**, `nimble test` finds and runs every `tests/t*.nim` file for you. More on that in [packages](node:packages).

**Quick checks without a framework:** `doAssert toFahrenheit(0) == 32` stops the program on failure. It's handy at the bottom of a module inside `when isMainModule:`.

**Comparing floats:** decimals pick up tiny rounding errors (`0.1 + 0.2 == 0.3` is `false` in Nim, as in most languages). Use `almostEqual` from `std/math` to compare computed decimals.

```compare python
def test_freezing():
    assert to_fahrenheit(0) == 32

def test_rejects():
    with pytest.raises(ValueError):
        parse_celsius("21.5")
```

```compare javascript
test("freezing", () => {
  expect(toFahrenheit(0)).toBe(32);
});
```

```compare rust
#[test]
fn freezing() {
    assert_eq!(to_fahrenheit(0.0), 32.0);
}
```

```exercise
goal: "Add a second test, named `\"empty input\"`, that expects a `ValueError` from `parseCelsius(\"\")`."
code: |-
  import std/unittest
  import ../src/temperature

  suite "temperature":
    test "freezing":
      check toFahrenheit(0) == 32
checks:
  - match: 'test\s+"empty input"\s*:\s*\n\s+expect\s+ValueError\s*:\s*\n\s+discard\s+parseCelsius\(\s*""\s*\)'
    message: 'Add test "empty input": with expect ValueError: and discard parseCelsius("") inside.'
solution: |-
  import std/unittest
  import ../src/temperature

  suite "temperature":
    test "freezing":
      check toFahrenheit(0) == 32

    test "empty input":
      expect ValueError:
        discard parseCelsius("")
```

```quiz
question: "A `check` fails in the middle of a test. What happens next?"
options:
  - The whole test run stops immediately.
  - The test is marked as failed, and the remaining checks and tests still run.
  - The failure is ignored unless it's the last check.
answer: 1
explain: check records the failure with the values involved, then carries on, so you see every problem in one run.
```
