---
title: Basic types
icon: "🔢"
branch: basics
requires: [variables]
summary: Numbers, booleans and strings, and converting between them.
---
The types you'll use most:

| Type | Holds | Example |
| --- | --- | --- |
| `int` | whole numbers | `42`, `-7` |
| `float64` | decimal numbers | `3.14` |
| `bool` | true or false | `true` |
| `string` | text | `"hello"` |

There are sized versions too, like `int8`, `uint32` or `float32`, for when the exact size matters. Most of the time, `int` and `float64` are what you want.

## No automatic conversions

Go never converts between number types for you. Mixing them is an error:

```go
count := 3
price := 2.5
total := count * price // error: mismatched types int and float64
```

You convert by writing the type name like a function:

```go title=main.go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    count := 3
    price := 2.5
    total := float64(count) * price
    fmt.Println(total) // 7.5

    whole := int(9.99)
    fmt.Println(whole) // 9: the decimals are cut off

    n, _ := strconv.Atoi("42") // text to number
    s := strconv.Itoa(42)      // number to text
    fmt.Println(n+1, s+"!")    // 43 42!
}
```

```warn
`string(65)` does **not** give `"65"`. It gives `"A"`, the character with code 65. Use `strconv.Itoa` for numbers.
```

```compare python
total = count * price   # Python mixes int and float freely
```

```compare javascript
const total = count * price; // all numbers are floats
```

```compare java
double total = count * price; // Java widens int to double
```

```compare rust
let total = count as f64 * price;
```

```exercise
goal: "Convert `minutes` to `float64` so the division keeps the decimals."
code: |
  minutes := 90
  hours := minutes / 60.0
checks:
  - match: 'float64\(\s*minutes\s*\)\s*/\s*60'
    message: Write float64(minutes) / 60.
solution: |
  minutes := 90
  hours := float64(minutes) / 60
```

```quiz
question: "What is `int(7.8)`?"
options:
  - "8"
  - "7"
  - A compile error.
answer: 1
explain: Converting a float to an int drops everything after the decimal point.
```
