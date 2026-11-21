---
title: Pointer receivers
icon: "🎯"
branch: data
requires: [methods, pointers]
summary: Methods that change their value use *T receivers.
---
A method with a value receiver gets a copy. To change the original, use a **pointer receiver**: `(c *Counter)` instead of `(c Counter)`.

```go title=main.go
package main

import "fmt"

type Counter struct {
    n int
}

func (c *Counter) Increment() {
    c.n++
}

func (c Counter) Value() int {
    return c.n
}

func main() {
    var c Counter
    c.Increment()
    c.Increment()
    fmt.Println(c.Value()) // 2
}
```

Notice you write `c.Increment()`, not `(&c).Increment()`. Go takes the address for you when the method needs a pointer.

## Which one to pick

Use a pointer receiver when:

- the method **changes** the value, or
- the struct is **large**, so copying it on every call would be wasteful.

Use a value receiver for small values that the method only reads, like a `Point` or a `Celsius`.

```tip
If any method on a type needs a pointer receiver, the Go convention is to give **all** its methods pointer receivers. It keeps the type consistent.
```

Here's the bug a value receiver causes:

```go
func (c Counter) Broken() { c.n++ } // changes a copy

c.Broken()
fmt.Println(c.Value()) // unchanged
```

```compare python
def increment(self): self.n += 1   # self is always shared
```

```compare javascript
increment() { this.n++; }
```

```compare kotlin
fun increment() { n++ }
```

```compare rust
fn increment(&mut self) { self.n += 1; }
```

```exercise
goal: "`Deposit` doesn't update the balance. Give it a pointer receiver."
code: |
  func (a Account) Deposit(amount int) {
      a.Balance += amount
  }
checks:
  - match: 'func\s*\(\s*a\s+\*Account\s*\)\s*Deposit'
    message: "Write func (a *Account) Deposit(...)"
solution: |
  func (a *Account) Deposit(amount int) {
      a.Balance += amount
  }
```

```quiz
question: "`c` is a `Counter` variable and `Increment` has a `*Counter` receiver. Can you write `c.Increment()`?"
options:
  - Yes, Go takes the address of c for you.
  - No, you must write (&c).Increment().
answer: 0
explain: For addressable values, Go automatically uses &c when the method needs a pointer.
```
