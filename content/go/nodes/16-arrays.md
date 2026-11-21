---
title: Arrays
icon: "🧱"
branch: data
requires: [for]
summary: A fixed number of values of one type. Rarely used directly.
---
An array has a fixed length, and the length is part of its type. `[3]int` is "exactly three ints":

```go title=main.go
package main

import "fmt"

func main() {
    var scores [3]int           // [0 0 0]
    scores[0] = 90
    days := [3]string{"Mon", "Tue", "Wed"}
    primes := [...]int{2, 3, 5, 7} // ... counts for you

    fmt.Println(scores, days[1], len(primes)) // [90 0 0] Tue 4
}
```

Positions start at 0. Going past the end stops the program:

```repl shell
> go run .
panic: runtime error: index out of range [5] with length 3
```

## Arrays are values

Assigning an array, or passing it to a function, **copies the whole thing**:

```go
a := [2]int{1, 2}
b := a
b[0] = 99
fmt.Println(a, b) // [1 2] [99 2]
```

That, plus the fixed size, is why you'll rarely use arrays directly. In everyday Go you use [slices](node:slices), which are built on top of arrays and can grow. Arrays still show up for things with a natural fixed size, like a 3×3 board or an RGB colour.

```compare python
days = ["Mon", "Tue", "Wed"]  # a list, which can grow
```

```compare javascript
const days = ["Mon", "Tue", "Wed"]; // can grow
```

```compare java
String[] days = {"Mon", "Tue", "Wed"}; // fixed size, but copied by reference
```

```compare rust
let days: [&str; 3] = ["Mon", "Tue", "Wed"];
```

```exercise
goal: "Declare `rgb`, an array of three `int`s holding 255, 128 and 0."
code: |
  rgb :=
checks:
  - match: 'rgb\s*:=\s*\[\s*(3|\.\.\.)\s*\]int\s*\{\s*255\s*,\s*128\s*,\s*0\s*\}'
    message: "Write rgb := [3]int{255, 128, 0}"
solution: |
  rgb := [3]int{255, 128, 0}
```

```quiz
question: "You assign array `a` to `b`, then change `b[0]`. What happens to `a`?"
options:
  - It changes too.
  - Nothing; b is a full copy.
answer: 1
explain: Arrays are values in Go, so assignment copies every element.
```
