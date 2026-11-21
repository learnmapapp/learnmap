---
title: Variables
icon: "📝"
branch: basics
requires: [packages]
summary: "var, :=, and why Go complains about unused variables."
---
Go has two ways to create a variable. The long form uses `var`:

```go
var name string = "Ada"
var age = 36 // the type is worked out from the value
```

Inside functions, you'll mostly use the short form `:=`, which declares and assigns in one go:

```go title=main.go
package main

import "fmt"

func main() {
    name := "Ada"
    age := 36
    age = age + 1 // plain = changes an existing variable

    fmt.Println(name, age) // Ada 37
}
```

Remember the difference:

- `:=` **creates** a new variable.
- `=` **changes** one that already exists.

Use `:=` twice for the same name in the same block, and Go objects:

```repl shell
> go run .
./main.go:7:9: no new variables on left side of :=
```

## Several at once

```go
x, y := 10, 20
x, y = y, x // swap them
```

## Unused variables are errors

Declare a variable and never use it, and the program won't compile:

```repl shell
> go run .
./main.go:6:5: declared and not used: total
```

It feels strict at first, but it catches a lot of typos and leftover code.

```compare python
name = "Ada"   # no keyword at all
```

```compare javascript
let name = "Ada";
```

```compare kotlin
var name = "Ada"
```

```compare rust
let mut name = "Ada";
```

```exercise
goal: "Declare `city` with the short form `:=` and the value `\"Lisbon\"`."
code: |
  package main

  import "fmt"

  func main() {
      fmt.Println(city)
  }
checks:
  - match: 'city\s*:=\s*"Lisbon"'
    message: "Add city := \"Lisbon\" before the print."
solution: |
  package main

  import "fmt"

  func main() {
      city := "Lisbon"
      fmt.Println(city)
  }
```

```quiz
question: "What's the difference between `x := 5` and `x = 5`?"
options:
  - None, they're the same.
  - ":= creates a new variable; = assigns to an existing one."
  - "= creates a constant."
answer: 1
explain: Use := the first time, and = for every change afterwards.
```
