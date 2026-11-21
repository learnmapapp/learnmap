---
title: Panic and recover
icon: "🧯"
branch: errors
requires: [defer, errors]
summary: For bugs that should stop the program, not for normal errors.
---
A **panic** stops normal execution. Go panics on its own for programming mistakes, like indexing past the end of a slice or using a nil map, and you can call `panic` yourself:

```go
func mustPositive(n int) int {
    if n <= 0 {
        panic(fmt.Sprintf("expected a positive number, got %d", n))
    }
    return n
}
```

```repl shell
> go run .
panic: expected a positive number, got -1

goroutine 1 [running]:
main.mustPositive(...)
exit status 2
```

When a panic happens, Go runs the deferred calls of each function on the way up, then crashes with a stack trace.

## Errors or panics?

Use **errors** for things that can reasonably go wrong: a missing file, bad user input, a network timeout. Use **panic** only for situations that mean the program itself is broken, where carrying on makes no sense.

A common convention is `Must...` functions that panic on failure, used at start-up when a failure is a bug:

```go
var validID = regexp.MustCompile(`^[a-z]+$`)
```

## recover

`recover`, called inside a deferred function, stops a panic and returns its value. Servers use it so one bad request doesn't crash everything:

```go title=main.go
package main

import "fmt"

func safely(work func()) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("recovered:", r)
        }
    }()
    work()
}

func main() {
    safely(func() {
        var m map[string]int
        m["x"] = 1 // panics: nil map
    })
    fmt.Println("still running")
}
```

```repl shell
> go run .
recovered: assignment to entry in nil map
still running
```

```compare python
raise RuntimeError("bug")   # Python uses exceptions for both
```

```compare java
throw new IllegalStateException("bug");
```

```compare kotlin
error("bug")
```

```compare rust
panic!("bug");   // catch_unwind is the rough equivalent of recover
```

```exercise
goal: "A missing file isn't a bug. Return an error with `fmt.Errorf` instead of panicking."
code: |
  func load(name string) (string, error) {
      data, err := os.ReadFile(name)
      if err != nil {
          panic(err)
      }
      return string(data), nil
  }
checks:
  - notMatch: 'panic\('
    message: Remove the panic.
  - match: 'return\s+"",\s*fmt\.Errorf\('
    message: Return "" and an error made with fmt.Errorf.
solution: |
  func load(name string) (string, error) {
      data, err := os.ReadFile(name)
      if err != nil {
          return "", fmt.Errorf("load %s: %w", name, err)
      }
      return string(data), nil
  }
```

```quiz
question: Where does recover work?
options:
  - Anywhere in the function that panicked.
  - Only inside a deferred function.
  - Only in main.
answer: 1
explain: Deferred functions are the only code that still runs during a panic, so recover must live there.
```
