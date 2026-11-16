---
title: Independent value copies
icon: "👯"
branch: types
requires: [structs]
summary: Assigning a struct makes a copy. Spot the bug that this rule prevents.
---
**A bug hunt, in JavaScript.** This code is supposed to make a copy of the default settings and tweak it for one user:

```javascript
const defaults = { theme: "light", fontSize: 14 };
const mine = defaults;
mine.theme = "dark";
console.log(defaults.theme);   // "dark" 😱
```

`mine` and `defaults` are two names for the *same* object, so changing one changes "both". Now the same thing in Swift, with a struct:

```swift title=settings.swift
struct Settings {
    var theme = "light"
    var fontSize = 14
}

let defaults = Settings()
var mine = defaults
mine.theme = "dark"

print(defaults.theme)  // light
print(mine.theme)      // dark
```

No bug. Assigning a struct **copies the value**, just like assigning an `Int`. After `var mine = defaults` there are two independent settings, and nothing you do to one can affect the other. This is called **[[value semantics]]**.

Copies happen every time a value is assigned, passed to a function, or returned from one. That's also why a function can't change your struct unless you hand it over with [`inout`](node:inout).

"Isn't copying expensive?" Usually not:

- Small structs are just a few bytes, and copying them is extremely cheap.
- Arrays, dictionaries and strings use **copy-on-write**: the copy shares storage with the original until one of them is actually changed. Passing a 10,000-element array around costs nothing until someone modifies it.

```swift
var a = [1, 2, 3]
var b = a       // no real copy yet
b.append(4)     // now b gets its own storage
print(a)        // [1, 2, 3]
```

The practical upshot: with structs, you can reason about a piece of code **locally**. If you have a value, you own it, and no other part of the program can change it from under you. That makes value types a great fit for concurrent code, as you'll see with [actors](node:actors).

```compare python
import copy
mine = copy.copy(defaults)   # Python needs an explicit copy
```

```compare kotlin
val mine = defaults.copy(theme = "dark")  // data classes have copy(), but assignment shares
```

```exercise
goal: "`tweaked` should be an independent copy of `base` with a fontSize of 18. Make `tweaked` a var copy of base, then change its fontSize."
code: |-
  let base = Settings()
  let tweaked = Settings(theme: "light", fontSize: 18)
checks:
  - match: 'var\s+tweaked\s*=\s*base\b'
    message: Copy it with var tweaked = base
  - match: 'tweaked\.fontSize\s*=\s*18'
    message: Then set tweaked.fontSize = 18
solution: |-
  let base = Settings()
  var tweaked = base
  tweaked.fontSize = 18
```

```quiz
question: "`var a = Point(x: 1); var b = a; b.x = 9`. What's `a.x`, if Point is a struct?"
options:
  - "1"
  - "9"
  - It depends on the compiler.
answer: 0
explain: b is a separate copy, so changing it leaves a untouched.
```
