---
title: String interpolation
icon: "💬"
branch: basics
requires: [types]
summary: Build strings with \( ), write multi-line text, and meet Swift's Unicode-correct strings.
---
You met `\( )` in the first lesson. It takes any expression, not just a variable name:

```swift
let apples = 3
let price = 0.5
print("\(apples) apples cost $\(Double(apples) * price)")
// 3 apples cost $1.5
```

For longer text, use **triple quotes**. The indentation of the closing `"""` sets the left margin, so the text can be indented to match your code:

```swift title=email.swift
let user = "Kim"
let email = """
    Hi \(user),

    Your order has shipped! 📦
    """
print(email)
```

```repl shell
> swift email.swift
Hi Kim,

Your order has shipped! 📦
```

Some everyday string tools:

```swift
let city = "Amsterdam"
city.count              // 9
city.uppercased()       // "AMSTERDAM"
city.hasPrefix("Am")    // true
city.contains("dam")    // true
city + "!"              // "Amsterdam!"
```

Swift strings are **Unicode-correct**, which is rare. `count` counts characters as a human would see them, even when one character is made of several code points:

```swift
"café".count    // 4
"👨‍👩‍👧".count   // 1: one family emoji, built from five code points
```

The price is that you can't index a string with a number: `city[0]` is a compile error. Because characters can be different sizes, finding the *n*th one means walking the string from the start, and Swift wants that cost to be visible. Use `city.first`, `city.prefix(3)` or `Array(city)` instead.

```compare python
f"{apples} apples cost ${apples * price}"
```

```compare javascript
`${apples} apples cost $${apples * price}`
```

```compare kotlin
"$apples apples cost $${apples * price}"
```

```exercise
goal: 'Use interpolation to make the label read "Level 3: 120 XP", using the two constants rather than typed-in numbers.'
code: |-
  let level = 3
  let xp = 120
  let label = "Level " + level + ": " + xp + " XP"
checks:
  - notMatch: '\+'
    message: Swift won't add Ints to Strings. Use interpolation instead of +.
  - match: '"Level \\\(level\): \\\(xp\) XP"'
    message: "The label should be \"Level \\(level): \\(xp) XP\""
solution: |-
  let level = 3
  let xp = 120
  let label = "Level \(level): \(xp) XP"
```

```quiz
question: "Why doesn't `name[0]` compile for a Swift String?"
options:
  - Strings are immutable.
  - Characters can take different amounts of memory, so finding the nth one isn't a cheap lookup.
  - You have to write name[1] because Swift counts from one.
answer: 1
explain: Swift won't hide an expensive walk behind cheap-looking syntax. Use first, prefix, or convert to an Array.
```
