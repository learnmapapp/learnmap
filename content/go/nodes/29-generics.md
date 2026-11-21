---
title: Generics
icon: "🧬"
branch: interfaces
requires: [interfaces, slices]
summary: Write one function that works for many types.
---
Say you want the largest number in a slice. Without generics you'd need `MaxInt`, `MaxFloat`, and so on. With a [[type parameter]] you write it once:

```go title=main.go
package main

import (
    "cmp"
    "fmt"
)

func Max[T cmp.Ordered](items []T) T {
    best := items[0]
    for _, item := range items[1:] {
        if item > best {
            best = item
        }
    }
    return best
}

func main() {
    fmt.Println(Max([]int{3, 9, 2}))         // 9
    fmt.Println(Max([]float64{1.5, 0.2}))    // 1.5
    fmt.Println(Max([]string{"pear", "fig"})) // pear
}
```

`[T cmp.Ordered]` says: "`T` is a placeholder for some type, and that type must be ordered, so `>` works on it." When you call `Max([]int{...})`, Go works out that `T` is `int`.

The part after `T` is a **constraint**. A few you'll use often:

| Constraint | Allows |
| --- | --- |
| `any` | every type, but you can only move values around |
| `comparable` | types that support `==` and `!=` (needed for map keys) |
| `cmp.Ordered` | numbers and strings, which support `<` and `>` |

## Generic types

Types can have type parameters too:

```go
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }

func (s *Stack[T]) Pop() T {
    last := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return last
}

var s Stack[string]
s.Push("a")
```

The standard `slices` and `maps` packages are generic: `slices.Contains`, `slices.Max` and `maps.Keys` work for any element type.

```compare java
static <T extends Comparable<T>> T max(List<T> items) { }
```

```compare kotlin
fun <T : Comparable<T>> max(items: List<T>): T
```

```compare python
def max_of[T](items: list[T]) -> T: ...
```

```compare rust
fn max<T: PartialOrd + Copy>(items: &[T]) -> T { }
```

```exercise
goal: "Make `First` generic: add a type parameter `T any` and use `[]T` and `T` instead of `int`."
code: |
  func First(items []int) int {
      return items[0]
  }
checks:
  - match: 'func\s+First\s*\[\s*T\s+any\s*\]\s*\(\s*items\s+\[\]T\s*\)\s*T'
    message: "Write func First[T any](items []T) T"
solution: |
  func First[T any](items []T) T {
      return items[0]
  }
```

```quiz
question: "Why does `Max` use `cmp.Ordered` instead of `any`?"
options:
  - Because the function uses >, which only ordered types support.
  - Because any is slower.
  - Because any can't be used with slices.
answer: 0
explain: A constraint lists what the function needs from T. Comparing with > needs an ordered type.
```
