---
title: Errors
icon: "🚧"
kind: hub
branch: errors
requires: [multiple-returns]
summary: Errors are values you return and check, not exceptions.
---
Go has no exceptions for everyday failures. A function that can fail returns an [[error]] as its **last** result, and the caller checks it:

```go title=main.go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    n, err := strconv.Atoi("42x")
    if err != nil {
        fmt.Println("could not parse:", err)
        return
    }
    fmt.Println("got", n)
}
```

```repl shell
> go run .
could not parse: strconv.Atoi: parsing "42x": invalid syntax
```

`err != nil` means "something went wrong". If `err` is `nil`, the other results are valid. You'll write this `if err != nil` check a lot. It's verbose, but every failure point is visible in the code.

## Making your own errors

`errors.New` makes a simple error, and `fmt.Errorf` makes one with formatting:

```go
func withdraw(balance, amount int) (int, error) {
    if amount > balance {
        return balance, fmt.Errorf("cannot withdraw %d, balance is %d", amount, balance)
    }
    return balance - amount, nil
}
```

Return `nil` for the error when everything went fine.

## What error is

`error` is a built-in interface with one method:

```go
type error interface {
    Error() string
}
```

So any type with an `Error() string` method is an error. That's the basis for [custom errors](node:custom-errors).

```tip
Error messages are lowercase and don't end with punctuation, because they often get joined into longer messages like "load config: open file: permission denied".
```

```compare python
try:
    n = int("42x")
except ValueError as e:
    print("could not parse:", e)
```

```compare java
try { Integer.parseInt("42x"); } catch (NumberFormatException e) { }
```

```compare kotlin
val n = "42x".toIntOrNull() ?: return
```

```compare rust
let n: i32 = "42x".parse()?;
```

```exercise
goal: "Check the error before using `f`: if `err != nil`, return it."
code: |
  func load(path string) error {
      f, err := os.Open(path)
      defer f.Close()
      return nil
  }
checks:
  - match: 'if\s+err\s*!=\s*nil\s*\{\s*return\s+err\s*\}'
    message: "Add if err != nil { return err } right after os.Open."
solution: |
  func load(path string) error {
      f, err := os.Open(path)
      if err != nil {
          return err
      }
      defer f.Close()
      return nil
  }
```

```quiz
question: A function returns (int, error) and the error is nil. What does that mean?
options:
  - Something went wrong.
  - It succeeded, and the int is valid.
  - The int is also nil.
answer: 1
explain: A nil error means success. Always check it before trusting the other results.
```
