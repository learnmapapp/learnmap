---
title: Zero values
icon: "0️⃣"
branch: basics
requires: [variables]
summary: Every variable starts with a sensible value, never garbage.
---
In Go, a variable you declare without a value still has one: its type's **zero value**.

```go title=main.go
package main

import "fmt"

func main() {
    var count int
    var price float64
    var ready bool
    var name string

    fmt.Println(count, price, ready) // 0 0 false
    fmt.Printf("%q\n", name)         // ""
}
```

| Type | Zero value |
| --- | --- |
| numbers | `0` |
| `bool` | `false` |
| `string` | `""` (empty) |
| pointers, slices, maps, channels, functions, interfaces | `nil` |
| structs | every field set to its own zero value |

There's no "undefined" and no random leftover memory. That makes a lot of code simpler, because a fresh value is often ready to use:

```go
var total int
for _, p := range prices {
    total += p // no need for total := 0 first
}
```

Go's own types are designed with this in mind. An empty `strings.Builder` or `sync.Mutex` works right away, without any setup. It's a good habit to make your own types work that way too.

```warn
The one to watch out for is a `nil` map: reading from it is fine, but writing to it panics. You'll see how to create maps properly in [Maps](node:maps).
```

```compare javascript
let count; // undefined, not 0
```

```compare python
count = None  # you must give a value; there's no default
```

```compare java
int count; // fields default to 0, but local variables must be set first
```

```compare rust
let count: i32; // must be assigned before use
```

```exercise
goal: "`total` starts at its zero value. Remove the unnecessary `= 0`."
code: |
  var total int = 0
  for _, n := range numbers {
      total += n
  }
checks:
  - match: 'var\s+total\s+int\s*$'
    message: Write just var total int.
solution: |
  var total int
  for _, n := range numbers {
      total += n
  }
```

```quiz
question: "What does `var s string` contain?"
options:
  - "`nil`"
  - An empty string, `\"\"`.
  - Random memory.
answer: 1
explain: The zero value of a string is the empty string. Strings are never nil in Go.
```
