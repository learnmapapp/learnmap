---
title: Fold a collection
icon: "🧺"
branch: functions
requires: [map-filter]
summary: reduce boils a whole collection down to one value, and when a simpler method does it better.
---
`map` and `filter` give you a new collection. Sometimes you want **one value** out of a whole collection: a total, a maximum, a combined string. That's what `reduce` does.

Think of a snowball rolling down a hill. It starts small, and each element it passes gets added to it:

```swift title=receipt.swift
let prices = [4.50, 12.00, 3.25]

let total = prices.reduce(0) { sum, price in
    sum + price
}

print(total)   // 19.75
```

`reduce` takes two things:

1. **A starting value**, here `0`. It's also the answer for an empty array.
2. **A closure** that takes the running result and the next element, and returns the new running result.

Step by step: `0 + 4.50 = 4.50`, then `4.50 + 12.00 = 16.50`, then `16.50 + 3.25 = 19.75`.

Because `+` is itself a function that takes two values and returns one, you can pass it directly:

```swift
let total = prices.reduce(0, +)
```

The running value doesn't have to be the same type as the elements. Here we build a dictionary of word lengths:

```swift
let lengths: [String: Int] = ["hi", "hello", "hey"].reduce(into: [:]) { result, word in
    result[word] = word.count
}
// ["hi": 2, "hello": 5, "hey": 3]
```

`reduce(into:)` gives you a mutable running value (`result` is `inout`), which is faster and clearer when you're building up a collection.

**Before writing a reduce, check whether there's a ready-made method.** These are shorter and say what they mean:

| Instead of a reduce that... | Use |
| --- | --- |
| finds the biggest | `max()` |
| checks every element | `allSatisfy { ... }` |
| checks any element | `contains { ... }` |
| joins strings | `joined(separator: ", ")` |
| counts matches | `filter { ... }.count` |

```compare python
from functools import reduce
total = reduce(lambda s, p: s + p, prices, 0)   # or just sum(prices)
```

```compare javascript
const total = prices.reduce((sum, p) => sum + p, 0);
```

```compare kotlin
val total = prices.fold(0.0) { sum, p -> sum + p }   // or prices.sum()
```

```exercise
goal: "Replace the loop with a single `reduce`, starting from 0 and using `+`."
code: |-
  var totalMinutes = 0
  for minutes in sessions {
      totalMinutes += minutes
  }
checks:
  - match: 'let\s+totalMinutes\s*=\s*sessions\.reduce\(\s*0\s*,\s*\+\s*\)'
    message: "Write let totalMinutes = sessions.reduce(0, +)"
solution: |-
  let totalMinutes = sessions.reduce(0, +)
```

```quiz
question: "What does `[Int]().reduce(10, +)` return?"
options:
  - "0"
  - "10"
  - It crashes on an empty array.
answer: 1
explain: With no elements, reduce returns the starting value unchanged.
```
