---
title: Generic functions
icon: "🧬"
branch: types
requires: [functions, protocols]
summary: Write a function once, for any type, without losing type safety.
---
Here are two functions. Spot the difference:

```swift
func firstAndLast(_ items: [Int]) -> (Int, Int)? {
    guard let first = items.first, let last = items.last else { return nil }
    return (first, last)
}

func firstAndLast(_ items: [String]) -> (String, String)? {
    guard let first = items.first, let last = items.last else { return nil }
    return (first, last)
}
```

Only the type differs. And you'd need a third copy for Doubles, a fourth for Dates... A **generic** function has a placeholder for the type instead:

```swift title=ends.swift
func firstAndLast<T>(_ items: [T]) -> (T, T)? {
    guard let first = items.first, let last = items.last else { return nil }
    return (first, last)
}

print(firstAndLast([3, 1, 4]) ?? (0, 0))                 // (3, 4)
if let ends = firstAndLast(["start", "middle", "end"]) {
    print(ends)                                          // ("start", "end")
}
```

`<T>` declares a **type parameter**. You can read the signature as: "for some type `T`, take an array of `T`s and maybe return a pair of `T`s". When you call it with `[Int]`, Swift works out that `T` is `Int`, and the result is `(Int, Int)?`. No casting, no `Any`, and the compiler checks everything as usual.

`T` is just a convention. Descriptive names are fine and often better: `<Element>`, `<Key, Value>`.

You've been using generic types all along:

- `[Int]` is shorthand for `Array<Int>`.
- `[String: Int]` is `Dictionary<String, Int>`.
- `Int?` is `Optional<Int>`.

Your own structs can be generic too:

```swift
struct Stack<Element> {
    private var items: [Element] = []
    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element? { items.popLast() }
}

var undo = Stack<String>()
undo.push("type 'hello'")
```

There's a catch, though. Inside `firstAndLast`, you can't *do* much with a `T`: you don't know whether it can be compared, added or printed nicely. To get those abilities you add **constraints**, which is exactly what the [next lesson](node:constraints) is about.

```compare typescript
function firstAndLast<T>(items: T[]): [T, T] | undefined { }
```

```compare kotlin
fun <T> firstAndLast(items: List<T>): Pair<T, T>? { }
```

```compare rust
fn first_and_last<T: Clone>(items: &[T]) -> Option<(T, T)> { }
```

```exercise
goal: "`repeatValue` only works for Strings. Make it generic, so it works for any type `T`."
code: |-
  func repeatValue(_ value: String, times: Int) -> [String] {
      Array(repeating: value, count: times)
  }
checks:
  - match: 'func\s+repeatValue<\s*T\s*>\(\s*_\s+value\s*:\s*T\s*,\s*times\s*:\s*Int\s*\)\s*->\s*\[\s*T\s*\]'
    message: "Use func repeatValue<T>(_ value: T, times: Int) -> [T]"
solution: |-
  func repeatValue<T>(_ value: T, times: Int) -> [T] {
      Array(repeating: value, count: times)
  }
```

```quiz
question: "What's another way to write the type `[Double]`?"
options:
  - "`Array<Double>`"
  - "`Generic<Double>`"
  - "`List[Double]`"
answer: 0
explain: The square-bracket syntax is shorthand for the generic Array type.
```
