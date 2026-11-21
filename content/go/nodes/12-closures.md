---
title: Closures
icon: "🎁"
branch: basics
requires: [functions]
summary: Functions without names that remember the variables around them.
---
You can write a function right where you need it, without a name. That's an **anonymous function**, or function literal:

```go
square := func(n int) int { return n * n }
fmt.Println(square(4)) // 16
```

When it uses variables from the surrounding code, it becomes a **closure**: it keeps those variables alive and can change them.

```go title=main.go
package main

import "fmt"

func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    next := counter()
    fmt.Println(next()) // 1
    fmt.Println(next()) // 2
    fmt.Println(next()) // 3

    other := counter()
    fmt.Println(other()) // 1: its own count
}
```

`count` would normally vanish when `counter` returns. Because the inner function still uses it, Go keeps it around. Each call to `counter()` makes a fresh `count`.

Closures are everywhere in Go code:

- as callbacks, like `slices.SortFunc(items, func(a, b Item) int { ... })`
- to start goroutines: `go func() { ... }()`
- with `defer`, for cleanup

The `()` at the end of `go func() { ... }()` calls the function immediately.

```compare javascript
function counter() { let count = 0; return () => ++count; }
```

```compare python
def counter():
    count = 0
    def next():
        nonlocal count
        count += 1
        return count
    return next
```

```compare kotlin
fun counter(): () -> Int { var count = 0; return { ++count } }
```

```compare rust
let mut count = 0;
let mut next = move || { count += 1; count };
```

```exercise
goal: "Store an anonymous function in `isEven` that takes an `int` `n` and returns `n%2 == 0`."
code: |
  isEven :=
  fmt.Println(isEven(4))
checks:
  - match: 'isEven\s*:=\s*func\s*\(\s*n\s+int\s*\)\s+bool\s*\{\s*return\s+n\s*%\s*2\s*==\s*0\s*\}'
    message: "Write isEven := func(n int) bool { return n%2 == 0 }"
solution: |
  isEven := func(n int) bool { return n%2 == 0 }
  fmt.Println(isEven(4))
```

```quiz
question: You call `counter()` twice to make `a` and `b`. Do they share one count?
options:
  - Yes, there's only one count variable.
  - No, each call creates its own count.
answer: 1
explain: Every call to counter runs count := 0 again, so each closure gets its own variable.
```
