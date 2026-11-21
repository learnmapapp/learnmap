---
title: Structs
icon: "📦"
branch: data
requires: [functions]
summary: Group related fields into your own type.
---
A **struct** bundles named fields into one value. You define it with `type ... struct`:

```go title=main.go
package main

import "fmt"

type Book struct {
    Title  string
    Author string
    Pages  int
}

func main() {
    b := Book{Title: "Dune", Author: "Frank Herbert", Pages: 412}
    fmt.Println(b.Title) // Dune

    b.Pages = 600
    fmt.Println(b)        // {Dune Frank Herbert 600}
    fmt.Printf("%+v\n", b) // {Title:Dune Author:Frank Herbert Pages:600}
}
```

Fields you leave out get their [[zero value]]:

```go
draft := Book{Title: "Untitled"} // Author is "", Pages is 0
```

You can also list the values in order without names, `Book{"Dune", "Frank Herbert", 412}`, but naming them is clearer and doesn't break when someone adds a field.

## Structs are values

Like arrays, structs are **copied** when you assign them or pass them to a function:

```go
a := Book{Title: "Dune"}
b := a
b.Title = "Emma"
fmt.Println(a.Title) // Dune
```

To let a function change the original, you pass a [pointer](node:pointers).

## Capital letters matter

Fields starting with a capital letter (`Title`) are [[exported]]: other packages can see them. Lowercase fields (`title`) are private to the package. The same rule applies to the type name itself.

```compare python
@dataclass
class Book:
    title: str
    pages: int
```

```compare javascript
const b = { title: "Dune", pages: 412 };
```

```compare java
record Book(String title, int pages) {}
```

```compare kotlin
data class Book(val title: String, val pages: Int)
```

```compare rust
struct Book { title: String, pages: u32 }
```

```exercise
goal: "Define a struct type `Point` with two `int` fields, `X` and `Y`."
code: |
  type Point
checks:
  - match: 'type\s+Point\s+struct\s*\{'
    message: "Write type Point struct {"
  - match: 'X\s*,\s*Y\s+int|X\s+int\s*\n\s*Y\s+int'
    message: Add the fields X and Y, both int.
solution: |
  type Point struct {
      X int
      Y int
  }
```

```quiz
question: "`p := Point{X: 1}`. What is `p.Y`?"
options:
  - "`nil`"
  - "`0`"
  - It doesn't compile.
answer: 1
explain: Fields left out of a struct literal get their zero value, which is 0 for int.
```
