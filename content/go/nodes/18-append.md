---
title: Append
icon: "➕"
branch: data
requires: [slices]
summary: Grow a slice, and why you always assign the result.
---
`append` adds elements to the end of a slice and **returns the new slice**:

```go title=main.go
package main

import "fmt"

func main() {
    var todo []string
    todo = append(todo, "shop")
    todo = append(todo, "cook", "eat")

    fmt.Println(todo, len(todo)) // [shop cook eat] 3

    more := []string{"wash", "sleep"}
    todo = append(todo, more...) // ... spreads a slice into separate items
    fmt.Println(todo)            // [shop cook eat wash sleep]
}
```

## Always assign the result

Writing `append(todo, "x")` on its own line does nothing useful, and Go will complain that the result isn't used. You always write `todo = append(todo, ...)`.

Why? A slice is a window onto an array. If the array still has room (`cap`), `append` writes into it. If not, it allocates a **new, bigger array**, copies everything over, and returns a slice pointing at the new one. Either way, the returned slice is the one that's up to date.

```go
s := make([]int, 0, 2)
fmt.Println(len(s), cap(s)) // 0 2
s = append(s, 1, 2, 3)
fmt.Println(len(s), cap(s)) // 3 4 (a new array, roughly doubled)
```

If you know how many items you'll add, give `make` a capacity up front to save the copying: `make([]int, 0, 1000)`.

## Other common operations

The `slices` package has helpers for the rest:

```go
slices.Contains(todo, "cook")  // true
slices.Index(todo, "eat")      // 2
todo = slices.Delete(todo, 0, 1) // remove the first item
```

```compare python
todo.append("shop")   # changes the list in place
```

```compare javascript
todo.push("shop");
```

```compare java
todo.add("shop");
```

```compare rust
todo.push("shop");
```

```exercise
goal: "The result of `append` is thrown away. Assign it back to `cart`."
code: |
  append(cart, "milk")
checks:
  - match: 'cart\s*=\s*append\(\s*cart\s*,\s*"milk"\s*\)'
    message: "Write cart = append(cart, \"milk\")"
solution: |
  cart = append(cart, "milk")
```

```quiz
question: Why must you write `s = append(s, x)`?
options:
  - append may create a new underlying array and return a slice pointing to it.
  - append only works inside an assignment for style reasons.
  - It makes the append faster.
answer: 0
explain: When there's no room left, append allocates a bigger array. Only the returned slice sees it.
```
