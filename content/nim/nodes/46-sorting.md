---
title: Sorting sequences
icon: "🗃️"
branch: tools
requires: [sequences, procedures]
summary: sort and sorted from std/algorithm, by key with sortedByIt, and with your own comparison.
---
**A leaderboard, sorted four ways.** All of these need `import std/algorithm`.

```nim title=leaderboard.nim
import std/algorithm

type Player = object
  name: string
  score: int

var board = @[
  Player(name: "Mo", score: 70),
  Player(name: "Ada", score: 95),
  Player(name: "Lin", score: 70),
]
```

**Way 1: simple values, in place.** `sort` rearranges a `var` sequence; `sorted` returns a new, sorted copy and leaves the original alone:

```nim
var scores = @[70, 95, 70, 12]
scores.sort()                       # @[12, 70, 70, 95]
let names = @["mo", "ada", "lin"]
echo names.sorted()                 # @["ada", "lin", "mo"]
echo scores.sorted(Descending)      # @[95, 70, 70, 12]
```

**Way 2: objects, by one field.** Objects have no natural order, so say which field. `sortedByIt` takes an expression in which `it` stands for each item:

```nim
let byName = board.sortedByIt(it.name)
echo byName[0].name                 # Ada
```

**Way 3: by several fields.** Highest score first, and alphabetical on a tie. Return a tuple; tuples compare field by field. Negate a number to flip its direction:

```nim
let ranked = board.sortedByIt((-it.score, it.name))
for p in ranked:
  echo p.name, " ", p.score         # Ada 95, Lin 70, Mo 70
```

**Way 4: your own comparison proc.** For full control, pass a proc that returns a negative number, zero or a positive number, like `cmp` does:

```nim
board.sort(proc (a, b: Player): int =
  result = cmp(b.score, a.score)    # b before a: descending
  if result == 0:
    result = cmp(a.name, b.name))
```

**Good to know:**

- Nim's sort is **stable**: items that compare equal keep their original order. That's why sorting by name first and then by score also gives "by score, then by name".
- `isSorted(xs)` checks whether a sequence is already in order.
- `binarySearch(sortedXs, value)` finds an item quickly, but only in a sorted sequence.
- `reverse` and `reversed` flip a sequence, sorted or not.

```compare python
ranked = sorted(board, key=lambda p: (-p.score, p.name))
```

```compare javascript
board.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
```

```compare rust
board.sort_by(|a, b| b.score.cmp(&a.score).then(a.name.cmp(&b.name)));
```

```exercise
goal: "Sort the products from cheapest to most expensive: set `cheapestFirst` to `items.sortedByIt(it.price)`."
code: |-
  import std/algorithm

  type Product = object
    name: string
    price: float

  let items = @[Product(name: "pen", price: 1.5), Product(name: "ink", price: 0.8)]
  let cheapestFirst = items
  echo cheapestFirst[0].name
checks:
  - match: 'let\s+cheapestFirst\s*=\s*items\.sortedByIt\(\s*it\.price\s*\)'
    message: Write items.sortedByIt(it.price)
solution: |-
  import std/algorithm

  type Product = object
    name: string
    price: float

  let items = @[Product(name: "pen", price: 1.5), Product(name: "ink", price: 0.8)]
  let cheapestFirst = items.sortedByIt(it.price)
  echo cheapestFirst[0].name
```

```quiz
question: "What's the difference between `xs.sort()` and `xs.sorted()`?"
options:
  - sort is ascending; sorted is descending.
  - sort changes xs in place; sorted returns a new sorted copy.
  - There is none; they're aliases.
answer: 1
explain: That's why sort needs a var sequence, while sorted works on a let.
```
