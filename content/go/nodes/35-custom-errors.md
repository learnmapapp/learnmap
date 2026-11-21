---
title: Custom errors
icon: "🧾"
branch: errors
requires: [error-wrapping, interfaces]
summary: Error types that carry data, found with errors.As.
---
Sometimes the caller needs more than a message, such as which field was invalid. Make your own error type: any type with an `Error() string` method is an [[error]].

```go title=main.go
package main

import (
    "errors"
    "fmt"
)

type ValidationError struct {
    Field  string
    Reason string
}

func (e *ValidationError) Error() string {
    return e.Field + ": " + e.Reason
}

func checkAge(age int) error {
    if age < 0 {
        return &ValidationError{Field: "age", Reason: "must not be negative"}
    }
    return nil
}

func main() {
    err := fmt.Errorf("signup: %w", checkAge(-3))
    fmt.Println(err) // signup: age: must not be negative

    var ve *ValidationError
    if errors.As(err, &ve) {
        fmt.Println("bad field:", ve.Field) // bad field: age
    }
}
```

## errors.As

`errors.Is` asks "is this **that** error?". `errors.As` asks "is there an error of **this type** in the chain?", and if so, puts it in your variable so you can read its fields.

You pass a **pointer** to your variable (`&ve`), because `errors.As` needs to fill it in.

## Is, As, or a message?

- Callers only need to print it: `fmt.Errorf` is enough.
- Callers need to detect one specific case: a sentinel and `errors.Is`.
- Callers need details: a custom type and `errors.As`.

```warn
Return a plain nil, not a nil *ValidationError stored in an error. An interface holding a nil pointer is not itself nil, so err != nil would be true.
```

```compare python
class ValidationError(Exception):
    def __init__(self, field): self.field = field
```

```compare java
class ValidationException extends Exception { final String field; }
```

```compare kotlin
class ValidationException(val field: String) : Exception(field)
```

```compare rust
#[derive(Debug, thiserror::Error)]
#[error("{field}: {reason}")]
struct ValidationError { field: String, reason: String }
```

```exercise
goal: "Make `NotFoundError` an error by adding an `Error() string` method with a pointer receiver."
code: |
  type NotFoundError struct {
      Name string
  }
checks:
  - match: 'func\s*\(\s*\w+\s+\*NotFoundError\s*\)\s*Error\s*\(\s*\)\s*string'
    message: "Write func (e *NotFoundError) Error() string"
solution: |
  type NotFoundError struct {
      Name string
  }

  func (e *NotFoundError) Error() string {
      return e.Name + " not found"
  }
```

```quiz
question: Which function finds an error of a specific type in a wrapped chain and gives you its fields?
options:
  - "`errors.Is`"
  - "`errors.As`"
  - "`errors.New`"
answer: 1
explain: errors.As walks the chain looking for a matching type and assigns it to your variable.
```
