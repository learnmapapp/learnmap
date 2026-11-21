---
title: Switch
icon: "🔀"
branch: basics
requires: [if]
summary: A cleaner if-else chain, with no fallthrough by default.
---
`switch` compares a value against several cases:

```go title=main.go
package main

import "fmt"

func main() {
    day := "sat"

    switch day {
    case "sat", "sun":
        fmt.Println("weekend")
    case "fri":
        fmt.Println("almost weekend")
    default:
        fmt.Println("weekday")
    }
}
```

Two differences from C, Java or JavaScript:

- **No `break` needed.** Only the matching case runs. Go never falls through to the next case unless you write `fallthrough`.
- A case can list **several values**, separated by commas.

## Switch without a value

Leave the value out and each case becomes a condition. It's the tidy way to write a long `if`/`else if` chain:

```go
switch {
case score >= 90:
    grade = "A"
case score >= 75:
    grade = "B"
default:
    grade = "C"
}
```

Cases are checked from top to bottom, and the first true one wins.

Like `if`, `switch` can start with a short statement:

```go
switch n := len(items); {
case n == 0:
    fmt.Println("empty")
case n > 100:
    fmt.Println("huge")
}
```

```compare javascript
switch (day) { case "sat": case "sun": console.log("weekend"); break; }
```

```compare java
switch (day) { case "sat", "sun" -> System.out.println("weekend"); }
```

```compare kotlin
when (day) { "sat", "sun" -> println("weekend") }
```

```compare python
match day:
    case "sat" | "sun": print("weekend")
```

```compare rust
match day { "sat" | "sun" => println!("weekend"), _ => {} }
```

```exercise
goal: "Replace the if/else chain with a `switch` on `size`, using `case` and `default`."
code: |
  if size == "S" {
      price = 3
  } else if size == "M" {
      price = 4
  } else {
      price = 5
  }
checks:
  - match: 'switch\s+size\s*\{'
    message: "Start with switch size {"
  - match: 'case\s+"S"\s*:\s*price\s*=\s*3'
    message: "Add case \"S\": price = 3"
  - match: 'case\s+"M"\s*:\s*price\s*=\s*4'
    message: "Add case \"M\": price = 4"
  - match: 'default\s*:\s*price\s*=\s*5'
    message: "Add default: price = 5"
solution: |
  switch size {
  case "S":
      price = 3
  case "M":
      price = 4
  default:
      price = 5
  }
```

```quiz
question: After a matching case runs, what happens?
options:
  - The next case runs too, unless you write break.
  - The switch ends; Go doesn't fall through by default.
  - The default case runs.
answer: 1
explain: Go cases end on their own. Use fallthrough if you really want the next one.
```
