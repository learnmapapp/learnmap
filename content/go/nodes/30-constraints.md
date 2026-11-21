---
title: Constraints
icon: "📏"
branch: interfaces
requires: [generics]
summary: Write your own type sets with interfaces and ~.
---
A constraint is just an interface. Besides methods, a constraint interface can list **types**, joined with `|`:

```go title=main.go
package main

import "fmt"

type Number interface {
    ~int | ~int64 | ~float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}

type Cents int

func main() {
    fmt.Println(Sum([]int{1, 2, 3}))        // 6
    fmt.Println(Sum([]float64{0.5, 0.25}))  // 0.75
    fmt.Println(Sum([]Cents{199, 250}))     // 449
}
```

`+` works inside `Sum` because every type in `Number` supports it.

## What ~ means

`~int` means "`int`, or any type whose underlying type is `int`". That's why `Cents` (defined as `type Cents int`) is accepted. Without the `~`, only `int` itself would be allowed.

## Methods in constraints

A constraint can also require methods, like a normal interface:

```go
type Labeled interface {
    Label() string
}

func Labels[T Labeled](items []T) []string {
    out := make([]string, 0, len(items))
    for _, it := range items {
        out = append(out, it.Label())
    }
    return out
}
```

Interfaces that list types, like `Number`, can **only** be used as constraints. You can't declare a variable of type `Number`.

```tip
Before writing your own, check the standard library: cmp.Ordered covers numbers and strings, and comparable covers anything usable with ==.
```

```compare kotlin
fun <T> sum(nums: List<T>): T where T : Number
```

```compare java
static <T extends Number> double sum(List<T> nums) { }
```

```compare rust
fn sum<T: std::iter::Sum + Copy>(nums: &[T]) -> T { }
```

```exercise
goal: "Allow `Celsius` (defined as `type Celsius float64`) in the constraint by adding `~` before `float64`."
code: |
  type Reading interface {
      int | float64
  }
checks:
  - match: '~float64'
    message: Write ~float64 so types based on float64 are allowed.
solution: |
  type Reading interface {
      int | ~float64
  }
```

```quiz
question: "Which types satisfy the constraint `~string`?"
options:
  - Only string.
  - string and any type whose underlying type is string.
  - Any type with a String method.
answer: 1
explain: The tilde includes every type defined on top of string, like type Name string.
```
