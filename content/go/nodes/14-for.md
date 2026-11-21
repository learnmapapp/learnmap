---
title: For, the only loop
icon: "🔁"
branch: basics
requires: [if]
summary: One keyword for counting loops, while loops and endless loops.
---
Go has exactly one loop keyword: `for`. It covers every kind of loop.

**Counting**, the classic three-part form:

```go
for i := 0; i < 3; i++ {
    fmt.Println(i) // 0, 1, 2
}
```

**Counting, shorter**, ranging over a number:

```go
for i := range 3 {
    fmt.Println(i) // 0, 1, 2
}
```

**"While"**, with only a condition:

```go title=main.go
package main

import "fmt"

func main() {
    n := 1
    for n < 100 {
        n *= 2
    }
    fmt.Println(n) // 128
}
```

**Forever**, with nothing at all. Leave it with `break` (or `return`):

```go
for {
    line := readLine()
    if line == "quit" {
        break
    }
    fmt.Println("you said", line)
}
```

`continue` skips to the next round:

```go
for i := range 10 {
    if i%2 == 0 {
        continue
    }
    fmt.Println(i) // 1, 3, 5, 7, 9
}
```

Looping over slices, maps and strings uses `for ... range` too, which you'll meet in [Range](node:range).

```compare python
while n < 100:
    n *= 2
```

```compare javascript
while (n < 100) { n *= 2; }
```

```compare java
for (int i = 0; i < 3; i++) { }
```

```compare kotlin
for (i in 0 until 3) { }
```

```compare rust
while n < 100 { n *= 2; }
```

```exercise
goal: "Go has no `while` keyword. Rewrite this loop with `for`."
code: |
  while balance < goal {
      balance += 10
  }
checks:
  - match: 'for\s+balance\s*<\s*goal\s*\{'
    message: "Write for balance < goal {"
  - notMatch: 'while'
    message: Remove while; it doesn't exist in Go.
solution: |
  for balance < goal {
      balance += 10
  }
```

```quiz
question: How do you write an endless loop in Go?
options:
  - "`while true { }`"
  - "`for { }`"
  - "`loop { }`"
answer: 1
explain: A for with no condition runs until a break or return.
```
