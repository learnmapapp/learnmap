---
title: Constants and iota
icon: "📌"
branch: basics
requires: [variables]
summary: Fixed values, and counting them up automatically.
---
A **constant** is a value fixed when the program compiles. Declare it with `const`:

```go
const Pi = 3.14159
const Greeting = "Hello"
```

Trying to change one is a compile error. Constants can be numbers, strings or booleans, and their value must be known up front (no function calls).

## Groups and iota

Go has no `enum` keyword. Instead, you write a group of constants and let `iota` number them. `iota` starts at 0 and goes up by one on every line:

```go title=main.go
package main

import "fmt"

type Weekday int

const (
    Monday Weekday = iota // 0
    Tuesday               // 1
    Wednesday             // 2
)

func main() {
    fmt.Println(Tuesday) // 1
}
```

Lines without a value repeat the one before, so `Tuesday` is also `Weekday = iota`, just with `iota` now at 1.

`type Weekday int` creates a new type based on `int`. That keeps weekdays from being mixed up with ordinary numbers by accident.

You can also do sums with `iota`:

```go
const (
    _  = iota             // skip 0
    KB = 1 << (10 * iota) // 1024
    MB                    // 1048576
)
```

```compare java
enum Weekday { MONDAY, TUESDAY, WEDNESDAY }
```

```compare kotlin
enum class Weekday { MONDAY, TUESDAY, WEDNESDAY }
```

```compare python
class Weekday(IntEnum):
    MONDAY = 0
```

```compare rust
enum Weekday { Monday, Tuesday, Wednesday }
```

```exercise
goal: "Number the sizes with `iota`, so `Small` is 0, `Medium` 1 and `Large` 2."
code: |
  const (
      Small = 0
      Medium = 1
      Large = 2
  )
checks:
  - match: 'Small\s*=\s*iota'
    message: "Write Small = iota on the first line."
  - match: 'Medium\s*\n\s*Large\s*\n'
    message: "Leave Medium and Large without a value, so they repeat iota."
solution: |
  const (
      Small = iota
      Medium
      Large
  )
```

```quiz
question: "In `const ( A = iota; B; C )`, what is `C`?"
options:
  - "0"
  - "2"
  - "3"
answer: 1
explain: iota is 0 on the first line, 1 on the second and 2 on the third.
```
