---
title: Slices
icon: "🍰"
kind: hub
branch: data
requires: [arrays]
summary: The everyday list type, a flexible window onto an array.
---
A **slice** is Go's go-to list. Its type is written without a length: `[]int` instead of `[3]int`.

```go title=main.go
package main

import "fmt"

func main() {
    fruits := []string{"apple", "banana", "cherry", "date"}

    fmt.Println(len(fruits))  // 4
    fmt.Println(fruits[0])    // apple
    fmt.Println(fruits[1:3])  // [banana cherry]
    fmt.Println(fruits[:2])   // [apple banana]
    fmt.Println(fruits[2:])   // [cherry date]
}
```

`s[a:b]` takes the elements from position `a` up to, but **not including**, `b`. Leave out `a` to start at the beginning, or `b` to go to the end.

## A slice is a window

Under the hood, a slice doesn't hold its elements. It points into an array, and remembers where it starts, how many elements it shows (`len`), and how much room there is after that (`cap`).

That means slicing **doesn't copy**. Two slices can share the same elements:

```go
nums := []int{1, 2, 3, 4}
firstTwo := nums[:2]
firstTwo[0] = 99
fmt.Println(nums) // [99 2 3 4]
```

It also makes slices cheap to pass to functions: only the small "window" is copied, never the data.

## Making an empty slice

```go
var names []string          // nil slice: len 0, ready to append to
scores := make([]int, 5)    // [0 0 0 0 0]
```

`make([]T, n)` creates a slice of `n` zero values. You'll learn to grow slices in [Append](node:append).

```compare python
fruits[1:3]   # but Python copies the elements
```

```compare javascript
fruits.slice(1, 3) // copies too
```

```compare java
List<String> sub = fruits.subList(1, 3); // a view, like Go
```

```compare rust
let sub = &fruits[1..3]; // a borrowed view
```

```exercise
goal: "Take the first three items of `queue` with a slice expression."
code: |
  queue := []string{"a", "b", "c", "d", "e"}
  next := queue
checks:
  - match: 'next\s*:=\s*queue\[\s*0?\s*:\s*3\s*\]'
    message: "Write next := queue[:3]"
solution: |
  queue := []string{"a", "b", "c", "d", "e"}
  next := queue[:3]
```

```quiz
question: "`b := a[1:3]`, then `b[0] = 7`. Does `a` change?"
options:
  - Yes, a[1] becomes 7, because both share the same elements.
  - No, slicing makes a copy.
answer: 0
explain: A slice is a window onto an array. Slicing again gives another window onto the same data.
```
