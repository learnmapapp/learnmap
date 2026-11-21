---
title: Functions
icon: "🔧"
branch: basics
requires: [basic-types]
summary: Parameters, return types, and Go's types-after-names order.
---
A function is declared with `func`. In Go, types come **after** names, both for parameters and for the result:

```go title=main.go
package main

import "fmt"

func greet(name string) string {
    return "Hello, " + name + "!"
}

func add(a, b int) int {
    return a + b
}

func main() {
    fmt.Println(greet("Gus")) // Hello, Gus!
    fmt.Println(add(2, 3))    // 5
}
```

Reading `func add(a, b int) int` out loud: "function `add` takes `a` and `b`, both `int`, and returns an `int`." When neighbouring parameters share a type, you write it once.

A function without a result type returns nothing:

```go
func log(message string) {
    fmt.Println("[log]", message)
}
```

## Functions are values

You can store a function in a variable and pass it to another function:

```go
func apply(n int, f func(int) int) int {
    return f(n)
}

double := func(x int) int { return x * 2 }
fmt.Println(apply(5, double)) // 10
```

`func(int) int` is a type: "a function that takes an int and returns an int".

```compare python
def add(a: int, b: int) -> int:
    return a + b
```

```compare javascript
function add(a, b) { return a + b; }
```

```compare java
int add(int a, int b) { return a + b; }
```

```compare kotlin
fun add(a: Int, b: Int): Int = a + b
```

```compare rust
fn add(a: i32, b: i32) -> i32 { a + b }
```

```exercise
goal: "Write a function `square` that takes an `int` called `n` and returns `n * n`."
code: |
  package main

  func main() {
      println(square(4))
  }
checks:
  - match: 'func\s+square\s*\(\s*n\s+int\s*\)\s+int\s*\{'
    message: "Start with func square(n int) int {"
  - match: 'return\s+n\s*\*\s*n'
    message: Return n * n.
solution: |
  package main

  func square(n int) int {
      return n * n
  }

  func main() {
      println(square(4))
  }
```

```quiz
question: "In `func f(x, y float64) bool`, what is the type of `x`?"
options:
  - "`bool`"
  - "`float64`"
  - It has no type.
answer: 1
explain: x and y share the type written after them, float64. bool is the return type.
```
