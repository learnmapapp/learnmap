---
title: Stringer
icon: "🏷️"
branch: interfaces
requires: [interfaces, printing]
summary: Control how your types print with a String method.
---
The `fmt` package defines a one-method interface:

```go
type Stringer interface {
    String() string
}
```

When you print a value whose type has a `String() string` method, `fmt` calls it for you:

```go title=main.go
package main

import "fmt"

type Money struct {
    Cents int
}

func (m Money) String() string {
    return fmt.Sprintf("€%d.%02d", m.Cents/100, m.Cents%100)
}

func main() {
    price := Money{Cents: 1999}
    fmt.Println(price)                 // €19.99
    fmt.Printf("Total: %v\n", price)   // Total: €19.99
    label := fmt.Sprint("Price ", price) // works with Sprint too
    fmt.Println(label)
}
```

Without the method, `fmt.Println(price)` prints `{1999}`.

This is a small but good example of how Go interfaces work: `Money` never mentions `fmt.Stringer`, but because it has the right method, `fmt` treats it as one.

## Enums with names

Go has no `enum` keyword. The usual pattern is a named integer type with constants, plus a `String` method:

```go
type Level int

const (
    Low Level = iota
    Medium
    High
)

func (l Level) String() string {
    switch l {
    case Low:
        return "low"
    case Medium:
        return "medium"
    default:
        return "high"
    }
}

fmt.Println(Medium) // medium
```

```warn
Don't call fmt.Sprint(m) or use %v on the value itself inside String: that calls String again, forever. Format the fields instead.
```

```compare python
def __str__(self): return f"€{self.cents / 100:.2f}"
```

```compare javascript
toString() { return `€${(this.cents / 100).toFixed(2)}`; }
```

```compare java
@Override public String toString() { return "€" + cents / 100.0; }
```

```compare kotlin
override fun toString() = "€${cents / 100.0}"
```

```compare rust
impl fmt::Display for Money { /* ... */ }
```

```exercise
goal: "Add a `String() string` method to `Temp` that returns the degrees followed by `°C`, using `fmt.Sprintf`."
code: |
  type Temp float64
checks:
  - match: 'func\s*\(\s*\w+\s+Temp\s*\)\s*String\s*\(\s*\)\s*string'
    message: "Write func (t Temp) String() string"
  - match: 'fmt\.Sprintf\(.*°C'
    message: Use fmt.Sprintf with °C in the format.
solution: |
  type Temp float64

  func (t Temp) String() string {
      return fmt.Sprintf("%.1f°C", float64(t))
  }
```

```quiz
question: What does fmt.Println do with a value that has a String() string method?
options:
  - Prints its fields as usual.
  - Calls String and prints the result.
  - Refuses to compile.
answer: 1
explain: The value satisfies fmt.Stringer, and fmt uses String for %v and Println.
```
