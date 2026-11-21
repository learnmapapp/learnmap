---
title: Iterators
icon: "🎞️"
branch: interfaces
requires: [range, closures, generics]
summary: Range over your own sequences with iter.Seq.
---
Since Go 1.23, `for ... range` also works with **functions**. A function that produces values one at a time is called an iterator, and the `iter` package gives the type a name:

```go
type Seq[V any] func(yield func(V) bool)
```

That looks dense, so here's one in action:

```go title=main.go
package main

import (
    "fmt"
    "iter"
)

func Countdown(from int) iter.Seq[int] {
    return func(yield func(int) bool) {
        for i := from; i > 0; i-- {
            if !yield(i) {
                return // the loop stopped early
            }
        }
    }
}

func main() {
    for n := range Countdown(3) {
        fmt.Println(n) // 3, 2, 1
    }
}
```

How it works:

1. The iterator calls `yield(i)` for every value.
2. Each `yield` runs one round of your `for` loop body.
3. If the loop exits early (with `break` or `return`), `yield` returns `false`, and the iterator should stop.

## Iterators in the standard library

Many functions now return iterators. They're lazy: values are made only when the loop asks for them.

```go
ages := map[string]int{"Ada": 36, "Gus": 7}

for name := range maps.Keys(ages) {
    fmt.Println(name)
}

sorted := slices.Sorted(maps.Keys(ages)) // collect into a sorted slice
```

`iter.Seq2[K, V]` is the two-value version, used for things like index-and-value or key-and-value pairs.

```compare python
def countdown(n):
    while n > 0:
        yield n
        n -= 1
```

```compare javascript
function* countdown(n) { while (n > 0) yield n--; }
```

```compare kotlin
fun countdown(n: Int) = sequence { for (i in n downTo 1) yield(i) }
```

```compare rust
(1..=3).rev()  // an Iterator
```

```exercise
goal: "Make the iterator stop when the loop breaks: return if `yield(i)` returns false."
code: |
  func Evens(limit int) iter.Seq[int] {
      return func(yield func(int) bool) {
          for i := 0; i < limit; i += 2 {
              yield(i)
          }
      }
  }
checks:
  - match: 'if\s+!yield\(\s*i\s*\)\s*\{\s*return\s*\}'
    message: "Write if !yield(i) { return }"
solution: |
  func Evens(limit int) iter.Seq[int] {
      return func(yield func(int) bool) {
          for i := 0; i < limit; i += 2 {
              if !yield(i) {
                  return
              }
          }
      }
  }
```

```quiz
question: "What does `yield` return after the `for` loop hits `break`?"
options:
  - "`true`"
  - "`false`"
  - It panics.
answer: 1
explain: A false result tells the iterator the loop is done, so it should stop producing values.
```
