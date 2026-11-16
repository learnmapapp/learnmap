---
title: Transform collections
icon: "🏭"
branch: functions
requires: [closures]
summary: map, filter and compactMap replace most of the loops you'd otherwise write.
---
**A translation exercise.** Here's a typical loop that builds a list of labels for the in-stock products:

```swift
var labels: [String] = []
for product in products {
    if product.stock > 0 {
        labels.append(product.name.uppercased())
    }
}
```

It works, but you have to read all six lines to understand what it produces. Here's the same thing as a pipeline:

```swift title=shop.swift
struct Product { let name: String; let stock: Int }

let products = [
    Product(name: "Kettle", stock: 3),
    Product(name: "Toaster", stock: 0),
    Product(name: "Mug", stock: 12),
]

let labels = products
    .filter { $0.stock > 0 }
    .map { $0.name.uppercased() }

print(labels)   // ["KETTLE", "MUG"]
```

Read it top to bottom: *keep the ones in stock, then turn each into an uppercased name.* And `labels` is a `let`, because nothing needs to change.

The three workhorses:

| Method | Does | Result size |
| --- | --- | --- |
| `filter { condition }` | keeps elements where the closure returns true | same or smaller |
| `map { transform }` | turns each element into something else | same |
| `compactMap { maybe }` | transforms, then drops the nils | same or smaller |

`compactMap` deserves a closer look, because it's so handy with [optionals](node:optionals):

```swift
let input = ["4", "eight", "15", "16", "twenty"]
let numbers = input.compactMap { Int($0) }
print(numbers)   // [4, 15, 16]
```

`Int($0)` returns `Int?`, and `compactMap` quietly discards the ones that failed.

A neat shortcut: when you just want a property, use a **key path** instead of a closure. `products.map(\.name)` means the same as `products.map { $0.name }`.

**Should loops be banned now?** Not at all. A `for` loop is clearer when the body does several things, has side effects (printing, saving), or needs `break`. Use the pipeline when you're *computing a new collection from an old one*.

```compare python
labels = [p.name.upper() for p in products if p.stock > 0]
```

```compare javascript
const labels = products.filter(p => p.stock > 0).map(p => p.name.toUpperCase());
```

```compare kotlin
val labels = products.filter { it.stock > 0 }.map { it.name.uppercase() }
```

```exercise
goal: "Rewrite the loop as a single `compactMap`: turn each text into an Int, and drop the ones that don't parse."
code: |-
  var ages: [Int] = []
  for text in answers {
      if let age = Int(text) {
          ages.append(age)
      }
  }
checks:
  - match: 'let\s+ages\s*=\s*answers\.compactMap\s*(\{\s*Int\(\$0\)\s*\}|\(\s*\{\s*Int\(\$0\)\s*\}\s*\)|\(Int\.init\))'
    message: "Write let ages = answers.compactMap { Int($0) }"
solution: |-
  let ages = answers.compactMap { Int($0) }
```

```quiz
question: "`[1, 2, 3, 4].filter { $0 > 2 }.map { $0 * 10 }` — what's the result?"
options:
  - "[10, 20]"
  - "[30, 40]"
  - "[10, 20, 30, 40]"
answer: 1
explain: filter keeps 3 and 4, then map multiplies each by 10.
```
