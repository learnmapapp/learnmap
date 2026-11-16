---
title: Types and conversions
icon: "🔢"
branch: basics
requires: [bindings]
summary: Swift infers types, never converts between them silently, and Int("42") might fail.
---
Every value in Swift has a type, but you rarely have to write it. Swift works it out from the value:

```swift
let age = 36            // Int
let height = 1.82       // Double
let name = "Sam"        // String
let isMember = true     // Bool
```

When you want a different type than the one Swift would guess, add an annotation after a colon:

```swift
let price: Double = 10  // 10.0, not the Int 10
```

So far, so friendly. Here's the part that surprises people: **Swift never converts between number types on its own**. Not even `Int` to `Double`, which can't lose information:

```swift title=average.swift
let total = 17
let count = 4.0
let average = total / count
```

```repl shell
> swift average.swift
error: binary operator '/' cannot be applied to operands of type 'Int' and 'Double'
```

You convert explicitly, by using the target type like a function:

```swift
let average = Double(total) / count   // 4.25
let rounded = Int(average)            // 4: Int() cuts off the fraction
```

Strings are a special case. `Int("42")` gives you 42, but what would `Int("forty-two")` give? It can't make a number from that, so it returns `nil`. Its type is `Int?`, an **[[optional]]**. You'll learn how to deal with that [soon](node:optionals). For now, remember: converting *from text* can fail, and Swift won't let you forget it.

```compare python
average = total / 4.0    # Python mixes int and float freely
```

```compare javascript
const average = total / count; // every number is a double
```

```compare kotlin
val average = total.toDouble() / count   // also explicit
```

```exercise
goal: Work out the price per slice as a Double. Convert `slices` before dividing.
code: |-
  let pizzaPrice = 12.0
  let slices = 8
  let perSlice = pizzaPrice / slices
checks:
  - match: 'pizzaPrice\s*/\s*Double\(slices\)'
    message: Divide by Double(slices).
solution: |-
  let pizzaPrice = 12.0
  let slices = 8
  let perSlice = pizzaPrice / Double(slices)
```

```quiz
question: What is the type of `Int("12")`?
options:
  - "`Int`"
  - "`Int?`"
  - "`String`"
answer: 1
explain: Converting text to a number can fail, so the result is an optional Int.
```
