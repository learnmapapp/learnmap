---
title: Multiple return values
icon: "✌️"
branch: basics
requires: [functions]
summary: Return two things at once, and ignore one with _.
---
A Go function can return more than one value. You list the types in brackets:

```go title=main.go
package main

import "fmt"

func divide(a, b int) (int, int) {
    return a / b, a % b
}

func main() {
    q, r := divide(17, 5)
    fmt.Println(q, r) // 3 2
}
```

This is used **everywhere** in Go, most often to return a result together with an error or a success flag:

```go
n, err := strconv.Atoi("42")
value, ok := ages["Ada"]
```

You'll see these two patterns constantly: `value, err` and `value, ok`.

## The blank identifier

If you don't need one of the values, assign it to `_`, the **blank identifier**. Since Go rejects unused variables, `_` is how you say "I'm ignoring this on purpose":

```go
q, _ := divide(17, 5) // only the quotient
```

## Named results

You can give the results names. They start at their zero value, and a bare `return` returns them:

```go
func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, n := range nums {
        if n < min { min = n }
        if n > max { max = n }
    }
    return
}
```

Named results are nice as documentation. Use bare `return` only in short functions, where it's still obvious what comes back.

```compare python
def divide(a, b):
    return a // b, a % b   # returns a tuple
```

```compare javascript
return [Math.floor(a / b), a % b]; // an array to destructure
```

```compare kotlin
fun divide(a: Int, b: Int) = Pair(a / b, a % b)
```

```compare rust
fn divide(a: i32, b: i32) -> (i32, i32) { (a / b, a % b) }
```

```exercise
goal: "Only the second value is needed. Replace `first` with the blank identifier."
code: |
  first, last := splitName("Ada Lovelace")
  fmt.Println(last)
checks:
  - match: '_\s*,\s*last\s*:=\s*splitName'
    message: "Write _, last := splitName(...)"
solution: |
  _, last := splitName("Ada Lovelace")
  fmt.Println(last)
```

```quiz
question: Why would you write `_, err := doThing()`?
options:
  - To ignore the first result on purpose, since unused variables don't compile.
  - To make the first result a constant.
  - To run doThing in the background.
answer: 0
explain: The blank identifier _ discards a value without triggering the unused-variable error.
```
