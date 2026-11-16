---
title: Generic constraints
icon: "🔒"
branch: types
requires: [generics]
summary: Ask for a type that can compare or hash, and use some and any to say how much you know.
---
Let's write a generic `largest` function. First try:

```swift title=largest.swift
func largest<T>(_ items: [T]) -> T? {
    var best = items.first
    for item in items where item > best! {   // error
        best = item
    }
    return best
}
```

```repl shell
> swift largest.swift
error: binary operator '>' cannot be applied to two 'T' operands
```

Fair enough. `T` could be anything, including types that have no idea what "greater than" means. We need to **constrain** `T` to types that can be compared. Here's the fixed version:

```swift
func largest<T: Comparable>(_ items: [T]) -> T? {
    guard var best = items.first else { return nil }
    for item in items where item > best {
        best = item
    }
    return best
}

print(largest([3, 9, 2]) ?? 0)          // 9
print(largest(["pear", "apple"]) ?? "")  // pear
```

`<T: Comparable>` reads "any type T, *as long as* it conforms to Comparable". Inside the function, you may now use `<` and `>` on T. Callers can only pass things that are actually comparable. Pass an array of a type that isn't, and they get a clear compile error.

Constraints you'll commonly need:

| Constraint | Unlocks |
| --- | --- |
| `T: Equatable` | `==`, `contains` |
| `T: Comparable` | `<`, `>`, `sorted()`, `max()` |
| `T: Hashable` | use in a `Set` or as a dictionary key |
| `T: CustomStringConvertible` | `.description` |

When there are several, use a **`where` clause** at the end, which keeps the signature readable:

```swift
func report<T>(_ items: [T]) -> String where T: Hashable, T: CustomStringConvertible { ... }
```

**`some` and `any`.** Two short keywords cover the most common generic situations without angle brackets:

- `some Comparable` means "one specific type that's Comparable, which the compiler knows". `func largest(_ items: [some Comparable])` is shorthand for the `<T: Comparable>` version, when you only need `T` once.
- `any Reporting` (from the [protocols lesson](node:protocols)) means "a box that can hold *different* conforming types". It's more flexible, but loses some type information and is slightly slower.

A good default: reach for `some` (or plain generics) first, and use `any` when you genuinely need a mixed collection.

```compare typescript
function largest<T extends number | string>(items: T[]): T | undefined { }
```

```compare kotlin
fun <T : Comparable<T>> largest(items: List<T>): T? = items.maxOrNull()
```

```compare rust
fn largest<T: PartialOrd + Copy>(items: &[T]) -> Option<T> { }
```

```exercise
goal: "`count(of:in:)` uses `==`, so T must be Equatable. Add the constraint."
code: |-
  func count<T>(of target: T, in items: [T]) -> Int {
      items.filter { $0 == target }.count
  }
checks:
  - match: 'func\s+count\s*<\s*T\s*:\s*Equatable\s*>|where\s+T\s*:\s*Equatable'
    message: "Write <T: Equatable> instead of <T>."
solution: |-
  func count<T: Equatable>(of target: T, in items: [T]) -> Int {
      items.filter { $0 == target }.count
  }
```

```quiz
question: "Which signature allows `<` on its arguments?"
options:
  - "`func f<T>(_ a: T, _ b: T)`"
  - "`func f<T: Comparable>(_ a: T, _ b: T)`"
  - "`func f(_ a: Any, _ b: Any)`"
answer: 1
explain: Only the Comparable constraint promises that < exists for T.
```
