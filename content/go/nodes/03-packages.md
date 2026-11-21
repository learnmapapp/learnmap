---
title: Packages and imports
icon: "📦"
branch: basics
requires: [setup]
summary: How code is grouped, imported, and made public with a capital letter.
---
Go code lives in **packages**. Every file starts by saying which package it belongs to, and then imports the packages it uses:

```go title=main.go
package main

import (
    "fmt"
    "math"
    "strings"
)

func main() {
    fmt.Println(math.Sqrt(16))           // 4
    fmt.Println(strings.ToUpper("quiet")) // QUIET
}
```

You use an imported package through its name: `math.Sqrt`, `strings.ToUpper`.

## Capital letters mean public

Here's a rule you'll see everywhere. A name that starts with a **capital letter** is [[exported]]: other packages can use it. A lowercase name is private to its package.

```go
package shop

func Total(prices []float64) float64 { ... } // usable as shop.Total
func round(x float64) float64 { ... }        // only inside package shop
```

That's why it's `fmt.Println` and `strings.ToUpper`, with capitals. No `public` or `private` keywords needed.

## Go is strict about imports

An import you don't use is a compile error, not a warning:

```repl shell
> go run .
./main.go:5:5: "os" imported and not used
```

Same for unused variables. It keeps code tidy. Your editor can add and remove imports for you automatically.

```compare python
import math
from shop import total   # _private by convention only
```

```compare javascript
import { total } from "./shop.js"; // export keyword decides
```

```compare java
import java.util.List; // public/private keywords decide
```

```compare rust
use std::collections::HashMap; // pub keyword decides
```

```exercise
goal: "The `strings` package isn't imported yet. Add it to the import list."
code: |
  package main

  import (
      "fmt"
  )

  func main() {
      fmt.Println(strings.Repeat("ha", 3))
  }
checks:
  - match: 'import\s*\(\s*[\s\S]*"strings"[\s\S]*\)'
    message: Add "strings" on its own line inside import ( ).
solution: |
  package main

  import (
      "fmt"
      "strings"
  )

  func main() {
      fmt.Println(strings.Repeat("ha", 3))
  }
```

```quiz
question: In package `geo`, which function can other packages call?
options:
  - "`func distance()`"
  - "`func Distance()`"
  - "`func _distance()`"
answer: 1
explain: Only names starting with a capital letter are exported.
```
