---
title: Testing
icon: "✅"
branch: tools
requires: [functions, modules]
summary: Built-in tests with go test and the testing package.
---
Go has testing built in. No framework to install, no config.

- Tests live in files ending in `_test.go`, next to the code.
- A test is a function named `TestXxx` that takes `t *testing.T`.
- `go test` finds and runs them.

```go title=mathx/mathx.go
package mathx

func Abs(n int) int {
    if n < 0 {
        return -n
    }
    return n
}
```

```go title=mathx/mathx_test.go
package mathx

import "testing"

func TestAbs(t *testing.T) {
    got := Abs(-5)
    if got != 5 {
        t.Errorf("Abs(-5) = %d, want 5", got)
    }
}
```

```repl shell
> go test ./...
ok      github.com/gus/mathx    0.002s
```

When a test fails, you see your message:

```repl shell
> go test ./...
--- FAIL: TestAbs (0.00s)
    mathx_test.go:8: Abs(-5) = -5, want 5
FAIL
```

There are no `assert` functions. You write a normal `if` and report with:

- `t.Errorf(...)`: mark the test failed and **keep going**.
- `t.Fatalf(...)`: mark it failed and **stop** this test now. Use it when continuing makes no sense, like after a failed set-up.

The convention for messages is "got X, want Y", so failures are easy to read.

## Useful flags

```text
go test -v ./...           show every test, not just failures
go test -run Abs ./...     only tests whose name matches "Abs"
go test -race ./...        also check for data races
go test -cover ./...       show how much code the tests cover
```

```compare python
def test_abs():
    assert abs_(-5) == 5
```

```compare javascript
test("abs", () => expect(abs(-5)).toBe(5));
```

```compare java
@Test void abs() { assertEquals(5, MathX.abs(-5)); }
```

```compare kotlin
@Test fun abs() = assertEquals(5, abs(-5))
```

```compare rust
#[test] fn abs_works() { assert_eq!(abs(-5), 5); }
```

```exercise
goal: "Turn this into a test Go will find: name it `TestDouble` and give it a `t *testing.T` parameter."
code: |
  func checkDouble() {
      if Double(4) != 8 {
          t.Errorf("Double(4) = %d, want 8", Double(4))
      }
  }
checks:
  - match: 'func\s+TestDouble\s*\(\s*t\s+\*testing\.T\s*\)'
    message: "Write func TestDouble(t *testing.T)"
solution: |
  func TestDouble(t *testing.T) {
      if Double(4) != 8 {
          t.Errorf("Double(4) = %d, want 8", Double(4))
      }
  }
```

```quiz
question: What's the difference between t.Errorf and t.Fatalf?
options:
  - Errorf continues the test after reporting; Fatalf stops it.
  - Fatalf stops all tests in the package.
  - There's no difference.
answer: 0
explain: Both mark the test as failed. Fatalf also ends the current test function immediately.
```
