---
title: Define functions
icon: "🧩"
branch: functions
requires: [types]
summary: func, parameter types, an arrow for the return type, and implicit returns.
---
Here's a function that works out a tip:

```swift title=tip.swift
func tip(for bill: Double, percent: Double) -> Double {
    return bill * percent / 100
}

let amount = tip(for: 80, percent: 15)
print("Tip: $\(amount)")  // Tip: $12.0
```

The shape is `func name(parameters) -> ReturnType { body }`. Every parameter has a type, and the arrow `->` gives the return type. A function that returns nothing simply leaves out the arrow.

You may be wondering about `for bill`. That's an **argument label**: callers write `for:`, and the function body uses `bill`. It makes call sites read like English, `tip(for: 80, percent: 15)`. The [next lesson](node:labels) is all about labels; for now, just notice that **arguments are named at the call site** by default.

**Implicit return.** When the body is a single expression, `return` is optional:

```swift
func square(_ n: Int) -> Int {
    n * n
}
```

**Parameters are constants.** Inside the function you can't assign to `bill` or `percent`. Copy the value into a `var` if you need to change it.

**Unused results get a warning.** Calling `tip(for: 80, percent: 15)` and ignoring the result produces *result of call to 'tip(for:percent:)' is unused*. Discard it deliberately with `_ = tip(...)`.

Functions are values too, so you can store them in variables and pass them around. That becomes important when you reach [closures](node:closures).

```compare python
def tip(bill: float, percent: float) -> float:
    return bill * percent / 100
```

```compare kotlin
fun tip(bill: Double, percent: Double): Double = bill * percent / 100
```

```compare javascript
function tip(bill, percent) {
  return bill * percent / 100;
}
```

```exercise
goal: "Write `isAdult(age:)`: it takes an Int and returns a Bool that's true from 18 upwards."
code: |-
  func isAdult(age) {
  }
checks:
  - match: 'func\s+isAdult\(\s*age\s*:\s*Int\s*\)\s*->\s*Bool'
    message: 'The signature should be: func isAdult(age: Int) -> Bool'
  - match: 'age\s*>=\s*18'
    message: Return age >= 18.
solution: |-
  func isAdult(age: Int) -> Bool {
      age >= 18
  }
```

```quiz
question: "What does `func greet(name: String)` return?"
options:
  - A String.
  - Nothing (Void), because there's no arrow.
  - It doesn't compile without a return type.
answer: 1
explain: Leaving out -> means the function returns Void, Swift's name for "nothing".
```
