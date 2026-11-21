---
title: Defer
icon: "⏳"
branch: errors
requires: [functions]
summary: Schedule cleanup to run when the function returns.
---
`defer` schedules a function call to run **when the surrounding function returns**, however it returns. It's Go's way of making sure cleanup happens.

```go title=main.go
package main

import (
    "fmt"
    "os"
)

func firstLine(path string) (string, error) {
    f, err := os.Open(path)
    if err != nil {
        return "", err
    }
    defer f.Close() // runs when firstLine returns

    buf := make([]byte, 80)
    n, err := f.Read(buf)
    if err != nil {
        return "", err // f is still closed
    }
    return string(buf[:n]), nil
}

func main() {
    line, err := firstLine("notes.txt")
    fmt.Println(line, err)
}
```

The habit is: open something, check the error, then **immediately** `defer` the close. The cleanup sits right next to the setup, and you can't forget it on any return path.

## Order

Deferred calls run in **reverse** order, last in first out, like a stack of plates:

```go
func main() {
    defer fmt.Println("one")
    defer fmt.Println("two")
    defer fmt.Println("three")
    fmt.Println("go!")
}
```

```repl shell
> go run .
go!
three
two
one
```

## Arguments are evaluated straight away

The deferred function runs later, but its **arguments** are worked out when you write `defer`:

```go
x := 1
defer fmt.Println("x was", x) // prints "x was 1"
x = 2
```

Other common uses: `defer mu.Unlock()` after `mu.Lock()`, and `defer wg.Done()` in a goroutine.

```compare python
with open("notes.txt") as f:
    line = f.readline()
```

```compare java
try (var f = new FileReader("notes.txt")) { }
```

```compare kotlin
File("notes.txt").bufferedReader().use { it.readLine() }
```

```compare rust
// files close when they go out of scope (Drop)
```

```exercise
goal: "Close the file automatically: add `defer f.Close()` after the error check, and remove the close at the end."
code: |
  f, err := os.Create("out.txt")
  if err != nil {
      return err
  }
  fmt.Fprintln(f, "hello")
  f.Close()
  return nil
checks:
  - match: 'defer\s+f\.Close\(\)'
    message: Add defer f.Close().
  - notMatch: '^\s*f\.Close\(\)'
    message: Remove the plain f.Close() at the end.
solution: |
  f, err := os.Create("out.txt")
  if err != nil {
      return err
  }
  defer f.Close()
  fmt.Fprintln(f, "hello")
  return nil
```

```quiz
question: You defer A, then B, then C. In what order do they run?
options:
  - A, B, C
  - C, B, A
  - In random order.
answer: 1
explain: Deferred calls run last in, first out.
```
