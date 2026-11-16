---
title: Define a struct
icon: "🧱"
branch: types
requires: [variables]
summary: A struct groups named, typed fields into a type of your own.
---
**From loose variables to one value.** Say a program tracks books:

```mojo
var title = "Dune"
var author = "Frank Herbert"
var pages = 412
```

Three variables that belong together, but nothing says so. Pass a book to a function and you pass three arguments, in the right order, every time. A [[struct]] bundles them into a single type:

```mojo title=library.mojo
@fieldwise_init
struct Book(Copyable, Writable):
    var title: String
    var author: String
    var pages: Int

def main():
    var book = Book("Dune", "Frank Herbert", 412)
    print(book.title, "has", book.pages, "pages")
    book.pages += 2   # fields of a var can change
    print(book)
```

Reading it line by line:

- **`struct Book`** defines a new type, which you use like `Int` or `String`: as a variable type, a parameter type, an item type in a list.
- **`var title: String`** and friends are the **fields**. Every field has a type, and every `Book` has all three.
- **`@fieldwise_init`** is a *decorator* that writes the initializer for you: it takes one argument per field, in order. That's what makes `Book("Dune", "Frank Herbert", 412)` work.
- **`(Copyable, Writable)`** lists the [[trait|traits]] the struct conforms to. `Copyable` allows `.copy()`. `Writable` lets `print` show the struct; Mojo generates a sensible output from the fields.

**Mojo structs are not Python classes.** The fields are fixed when you compile: you can't add `book.rating = 5` at runtime, and there's no inheritance. In exchange, a struct is laid out in memory as tightly as a C struct, and field access costs nothing extra. Shared behavior comes from [traits](node:traits) instead of base classes.

**Value semantics, again.** `var other = book` doesn't make two names for the same book. A `Copyable` struct asks for an explicit `book.copy()`, which creates an independent book. Change one, and the other stays as it was.

Next: write your own [initializer](node:initializers), or add [methods](node:methods).

```compare python
from dataclasses import dataclass

@dataclass
class Book:
    title: str
    author: str
    pages: int
```

```compare rust
#[derive(Clone, Debug)]
struct Book { title: String, author: String, pages: i32 }
```

```exercise
goal: "Add a third field to `Point`: `z`, of type `Float64`."
code: |-
  @fieldwise_init
  struct Point(Copyable, Writable):
      var x: Float64
      var y: Float64
checks:
  - match: 'var\s+y\s*:\s*Float64\s*\n\s+var\s+z\s*:\s*Float64'
    message: 'Add var z: Float64 below y.'
solution: |-
  @fieldwise_init
  struct Point(Copyable, Writable):
      var x: Float64
      var y: Float64
      var z: Float64
```

```quiz
question: "What does `@fieldwise_init` add to a struct?"
options:
  - A print method.
  - An initializer that takes one argument per field, in order.
  - Default values for all fields.
answer: 1
explain: It generates __init__ from the field list, so Book("Dune", "Frank Herbert", 412) works.
```
