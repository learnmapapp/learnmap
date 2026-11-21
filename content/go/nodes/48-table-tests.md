---
title: Table-driven tests
icon: "🗂️"
branch: tools
requires: [testing, structs]
summary: Many cases, one loop, and subtests with t.Run.
---
Instead of writing a test function per case, Go code usually lists the cases in a **table**, a slice of structs, and loops over it:

```go title=mathx/mathx_test.go
package mathx

import "testing"

func TestAbs(t *testing.T) {
    tests := []struct {
        name string
        in   int
        want int
    }{
        {"positive", 5, 5},
        {"negative", -5, 5},
        {"zero", 0, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Abs(tt.in)
            if got != tt.want {
                t.Errorf("Abs(%d) = %d, want %d", tt.in, got, tt.want)
            }
        })
    }
}
```

The struct type has no name: `[]struct{ ... }` defines it right there, since it's only used once.

## Subtests

`t.Run(name, func)` makes each row its own **subtest**. You get:

- a name for every case in the output,
- the rest of the cases still running when one fails,
- the ability to run just one case.

```repl shell
> go test -v -run 'TestAbs/negative' ./...
=== RUN   TestAbs
=== RUN   TestAbs/negative
--- PASS: TestAbs (0.00s)
    --- PASS: TestAbs/negative (0.00s)
PASS
```

Adding a case is now one line. That's why this style is so popular: tests become cheap to extend, so people actually cover the edge cases.

```tip
Name the fields want and got, and put the input first in the error message. Anyone reading a failure sees immediately what went in, what came out, and what was expected.
```

```compare python
@pytest.mark.parametrize("n,want", [(5, 5), (-5, 5), (0, 0)])
def test_abs(n, want): assert abs_(n) == want
```

```compare javascript
test.each([[5, 5], [-5, 5]])("abs(%i)", (n, want) => expect(abs(n)).toBe(want));
```

```compare java
@ParameterizedTest @CsvSource({"5,5", "-5,5"}) void abs(int n, int want) { }
```

```compare rust
for (n, want) in [(5, 5), (-5, 5)] { assert_eq!(abs(n), want); }
```

```exercise
goal: "Run each case as a subtest: wrap the check in `t.Run(tt.name, func(t *testing.T) { ... })`."
code: |
  for _, tt := range tests {
      if got := Upper(tt.in); got != tt.want {
          t.Errorf("Upper(%q) = %q, want %q", tt.in, got, tt.want)
      }
  }
checks:
  - match: 't\.Run\(\s*tt\.name\s*,\s*func\s*\(\s*t\s+\*testing\.T\s*\)\s*\{'
    message: "Add t.Run(tt.name, func(t *testing.T) { around the check."
solution: |
  for _, tt := range tests {
      t.Run(tt.name, func(t *testing.T) {
          if got := Upper(tt.in); got != tt.want {
              t.Errorf("Upper(%q) = %q, want %q", tt.in, got, tt.want)
          }
      })
  }
```

```quiz
question: What does t.Run give you over a plain loop?
options:
  - Each case gets a name, runs separately, and can be selected with -run.
  - The cases run faster.
  - Failures stop the remaining cases.
answer: 0
explain: Subtests report and run individually, and the other cases still run when one fails.
```
