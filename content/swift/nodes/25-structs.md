---
title: Value structs
icon: "🧱"
branch: types
requires: [types]
summary: Group related data into your own type, with a free initializer and methods.
---
**From tuple to struct, in three steps.** Say you're tracking books you've read. A tuple works at first:

```swift
let book = (title: "Dune", author: "Frank Herbert", pages: 412)
```

But now you want the same shape in five functions, plus a method that says whether it's a long read. Time for a **struct**:

```swift title=books.swift
struct Book {
    let title: String
    let author: String
    var pages: Int
    var rating: Int = 0

    func isLongRead() -> Bool {
        pages > 400
    }
}

let dune = Book(title: "Dune", author: "Frank Herbert", pages: 412)
print("\(dune.title): long read? \(dune.isLongRead())")  // Dune: long read? true
```

What you get for free:

- **A memberwise initializer.** Swift writes `Book(title:author:pages:rating:)` for you, using the property names as labels. Properties with a default, like `rating`, can be left out of the call.
- **Dot access** to properties: `dune.author`.
- **Methods**, which are just functions inside the type. They can read the properties directly.

`let` properties can never change after creation. `var` properties can, but only if the struct value itself is in a `var`:

```swift
var book = Book(title: "Emma", author: "Jane Austen", pages: 474)
book.rating = 5     // fine
let fixed = book
fixed.rating = 4    // error: 'fixed' is a 'let' constant
```

That second rule surprises people coming from classes. A struct is a **value**, like an `Int`: a `let` struct is frozen as a whole. More on that in [value copies](node:copies).

In Swift, structs are the default choice for your own types. `String`, `Array`, `Int` and `Dictionary` are all structs themselves. You reach for a [class](node:classes) only when you specifically need shared identity.

```compare kotlin
data class Book(val title: String, val author: String, var pages: Int, var rating: Int = 0)
```

```compare python
@dataclass
class Book:
    title: str
    author: str
    pages: int
    rating: int = 0
```

```compare rust
struct Book { title: String, author: String, pages: u32, rating: u8 }
```

```exercise
goal: "Turn this tuple into a struct `Point` with two Double properties, `x` and `y`, then create `origin` with the memberwise initializer."
code: |-
  let origin = (x: 0.0, y: 0.0)
checks:
  - match: 'struct\s+Point\s*\{[^}]*(let|var)\s+x\s*:\s*Double[^}]*(let|var)\s+y\s*:\s*Double'
    message: "Declare struct Point { let x: Double; let y: Double }"
  - match: 'let\s+origin\s*=\s*Point\(\s*x:\s*0(\.0)?\s*,\s*y:\s*0(\.0)?\s*\)'
    message: "Create it with Point(x: 0, y: 0)."
solution: |-
  struct Point {
      let x: Double
      let y: Double
  }

  let origin = Point(x: 0, y: 0)
```

```quiz
question: "`struct Dog { var name: String }` and `let rex = Dog(name: \"Rex\")`. What happens with `rex.name = \"Max\"`?"
options:
  - It works, because name is a var.
  - It's a compile error, because rex is a let.
  - It changes the name of every Dog.
answer: 1
explain: A struct in a let is completely immutable, even its var properties.
```
