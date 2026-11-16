---
title: Tuple results
icon: "🎁"
branch: functions
requires: [functions]
summary: Return several values at once, with names, and unpack them in one line.
---
Sometimes a function naturally produces more than one answer. Finding the lowest and highest temperature of the week, say. You could make a struct for that, but for a quick pair, a **tuple** is lighter:

```swift title=weather.swift
func range(of temps: [Int]) -> (min: Int, max: Int) {
    var low = temps[0]
    var high = temps[0]
    for t in temps {
        low = Swift.min(low, t)
        high = Swift.max(high, t)
    }
    return (low, high)
}

let week = range(of: [12, 17, 9, 21, 15])
print("Low \(week.min)°, high \(week.max)°")  // Low 9°, high 21°
```

`(min: Int, max: Int)` is a tuple type with **named elements**. Callers use `week.min` and `week.max`, which reads much better than the unnamed `week.0` and `week.1` (those work too).

(`Swift.min` just means the standard `min` function. Inside this function, `min` alone would be ambiguous because of the tuple label with the same name.)

You can **destructure** a tuple straight into separate constants:

```swift
let (low, high) = range(of: [3, 8, 1])
```

Don't need one of them? Use `_`: `let (_, high) = ...`.

Tuples also make a classic puzzle a one-liner. Swapping two variables:

```swift
var a = "left"
var b = "right"
(a, b) = (b, a)
```

**When should a tuple become a struct?** Tuples are great for returning a couple of related values from one function. If the same group of values shows up in several places, gets passed around, or grows past three elements, give it a proper [struct](node:structs) with a name.

```compare python
def temp_range(temps):
    return min(temps), max(temps)

low, high = temp_range([12, 17, 9])
```

```compare kotlin
// Kotlin has Pair, or a data class:
fun range(temps: List<Int>) = Pair(temps.min(), temps.max())
val (low, high) = range(listOf(12, 17, 9))
```

```exercise
goal: "Return the quotient and remainder together, as a tuple with the names `quotient` and `remainder`."
code: |-
  func divide(_ a: Int, by b: Int) -> Int {
      return a / b
  }
checks:
  - match: '->\s*\(\s*quotient\s*:\s*Int\s*,\s*remainder\s*:\s*Int\s*\)'
    message: "The return type should be (quotient: Int, remainder: Int)."
  - match: 'return\s*\(\s*(quotient:\s*)?a\s*/\s*b\s*,\s*(remainder:\s*)?a\s*%\s*b\s*\)'
    message: Return (a / b, a % b).
solution: |-
  func divide(_ a: Int, by b: Int) -> (quotient: Int, remainder: Int) {
      return (a / b, a % b)
  }
```

```quiz
question: "`let result = divide(17, by: 5)`. How do you get the remainder?"
options:
  - "`result[1]`"
  - "`result.remainder`"
  - "`result(remainder)`"
answer: 1
explain: Named tuple elements are reached with a dot, like properties. result.1 would also work.
```
