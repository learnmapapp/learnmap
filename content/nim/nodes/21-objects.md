---
title: Object types
icon: "🧰"
branch: data
requires: [types]
summary: Declare your own types with named fields, construct them, and attach procs to them.
---
**Design walkthrough: a library book.** We'll go from loose variables to a proper type in four steps.

**Step 1: the mess.** Three variables that belong together, but nothing says so:

```nim
let title = "Dune"
let author = "Frank Herbert"
var onLoan = false
```

**Step 2: declare an object type.** A `type` section names the shape once:

```nim title=library.nim
type
  Book = object
    title: string
    author: string
    pages: int
    onLoan: bool
```

Types are written in `PascalCase` by convention. Fields with the same type can share a line: `title, author: string`.

**Step 3: construct one.** Name the fields you're setting; the rest get their default (`0`, `""`, `false`):

```nim
var dune = Book(title: "Dune", author: "Frank Herbert", pages: 412)
echo dune.title          # Dune
echo dune.onLoan         # false
dune.onLoan = true       # allowed, because dune is a var
echo dune                # (title: "Dune", author: "Frank Herbert", pages: 412, onLoan: true)
```

**Step 4: give it behavior.** There's no `class` and no methods inside the type. You write ordinary procs whose first parameter is the object, and the [dot call syntax](node:procedures) makes them read like methods:

```nim
func summary(b: Book): string =
  b.title & " by " & b.author

proc lend(b: var Book) =
  b.onLoan = true

echo dune.summary()      # Dune by Frank Herbert
dune.lend()
```

`summary` only reads, so it takes a plain `Book`. `lend` changes the book, so it takes `var Book`, and you can tell from the signature alone.

**Objects are values.** `var copy = dune` copies every field. Changing `copy.pages` leaves `dune` alone. When you want several variables to share one object, you'll need a [ref object](node:references).

**Checklist for a new [[object]] type:**

- Fields every value needs? Set them in the constructor call.
- Fields with sensible defaults? Leave them out.
- Logic about the object? A `func` that takes it.
- Changes to the object? A `proc` with a `var` parameter.

```compare python
@dataclass
class Book:
    title: str
    author: str
    pages: int = 0
    on_loan: bool = False
```

```compare javascript
const dune = { title: "Dune", author: "Frank Herbert", pages: 412, onLoan: false };
```

```compare rust
struct Book { title: String, author: String, pages: u32, on_loan: bool }
impl Book {
    fn summary(&self) -> String { format!("{} by {}", self.title, self.author) }
}
```

```exercise
goal: "Declare a `Point` object type with two `float` fields, `x` and `y`, so the last two lines compile."
code: |-
  type
    Point = object

  let p = Point(x: 1.5, y: -2.0)
  echo p.x + p.y
checks:
  - match: 'Point\s*=\s*object\s*\n\s+(x\s*,\s*y\s*:\s*float|x\s*:\s*float\s*\n\s+y\s*:\s*float)'
    message: 'Add the fields below object: x, y: float'
solution: |-
  type
    Point = object
      x, y: float

  let p = Point(x: 1.5, y: -2.0)
  echo p.x + p.y
```

```quiz
question: "After `var a = Book(pages: 100)` and `var b = a` and `b.pages = 5`, what is `a.pages`?"
options:
  - "100"
  - "5"
  - "0"
answer: 0
explain: Objects are values. b is a full copy, so changing it doesn't affect a.
```
