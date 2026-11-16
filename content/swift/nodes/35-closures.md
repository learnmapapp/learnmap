---
title: Closure expressions
icon: "🎈"
branch: functions
requires: [functions, arrays]
summary: Functions without a name, and the shorthand that shrinks them to a few characters.
---
**Watch a closure shrink.** We want to sort some names by length. `sorted(by:)` takes a function that answers "should `a` come before `b`?". Here's the long way, spelled out:

```swift
let names = ["Charlotte", "Al", "Ben", "Josephine"]

let byLength = names.sorted(by: { (a: String, b: String) -> Bool in
    return a.count < b.count
})
```

The part in braces is a **[[closure]]**: an unnamed function you write inline. Parameters and return type come first, then `in`, then the body.

Now let Swift's type inference do the work, one step at a time:

```swift title=shrink.swift
// 1. Types are known from sorted(by:), so drop them:
names.sorted(by: { a, b in return a.count < b.count })

// 2. A single expression returns itself:
names.sorted(by: { a, b in a.count < b.count })

// 3. Use the automatic names $0, $1 for the parameters:
names.sorted(by: { $0.count < $1.count })

// 4. Trailing closure: when the last argument is a closure, move it outside the parentheses:
names.sorted { $0.count < $1.count }
```

All four lines do exactly the same thing. Step 4 is how most Swift code looks.

When to stop shrinking? `$0` and `$1` are great for one-liners. Once the body gets longer or the meaning is less obvious, named parameters (`{ order, other in ... }`) are kinder to the reader.

**Closures capture.** A closure can use variables from the surrounding code, and it keeps them alive:

```swift
func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}

let next = makeCounter()
print(next(), next(), next())   // 1 2 3
```

`() -> Int` is a **function type**: "takes nothing, returns an Int". The closure holds on to `count` even after `makeCounter` has returned, so each call continues where the last one left off.

In classes, capturing `self` can create reference cycles, which is why you'll sometimes see `[weak self]` at the start of a closure in app code. For now, just know that it's a thing.

```compare javascript
names.sort((a, b) => a.length - b.length);
```

```compare kotlin
names.sortedBy { it.length }
```

```compare python
sorted(names, key=lambda n: len(n))
```

```exercise
goal: "Shrink this closure to the trailing-closure form using `$0` and `$1`."
code: |-
  let sorted = prices.sorted(by: { (a: Double, b: Double) -> Bool in
      return a > b
  })
checks:
  - match: 'let\s+sorted\s*=\s*prices\.sorted\s*\{\s*\$0\s*>\s*\$1\s*\}'
    message: "Write prices.sorted { $0 > $1 }"
solution: |-
  let sorted = prices.sorted { $0 > $1 }
```

```quiz
question: "What does `$0` mean inside a closure?"
options:
  - The closure's return value.
  - The first parameter.
  - The number zero.
answer: 1
explain: "$0, $1, $2 are automatic names for the closure's parameters, in order."
```
