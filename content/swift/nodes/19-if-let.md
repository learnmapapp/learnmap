---
title: Optional binding
icon: "🔓"
branch: data
requires: [optionals, if]
summary: if let opens an optional safely, and gives you the value under a plain, non-optional name.
---
**Predict the output** before reading on:

```swift title=coupon.swift
let codes = ["SPRING": 10, "VIP": 25]

func discount(for code: String) -> String {
    if let percent = codes[code] {
        return "\(percent)% off!"
    } else {
        return "Unknown code"
    }
}

print(discount(for: "VIP"))
print(discount(for: "FREEBIE"))
```

```repl shell
> swift coupon.swift
25% off!
Unknown code
```

`if let percent = codes[code]` reads as: "if the optional has a value, call it `percent` and run this block". Inside the braces, `percent` is a plain `Int`, not `Int?`. In the `else` branch it doesn't exist at all, because there's nothing to name.

**The shorthand.** Very often you want to unwrap a variable under its *own* name. Since Swift 5.7 you can write just:

```swift
let nickname: String? = "Ace"
if let nickname {
    print("Hey, \(nickname)")   // nickname is a String in here
}
```

That's the same as `if let nickname = nickname`, which you'll still see in older code.

**Several at once**, separated by commas. The block runs only if *all* of them succeed, and you can mix in ordinary conditions:

```swift
if let age = Int(ageText), let city = form["city"], age >= 18 {
    print("Adult from \(city)")
}
```

`if var` exists too, if you want a mutable copy of the unwrapped value.

One thing to keep in mind: the unwrapped name only lives **inside the braces**. If you need it for the rest of the function, the next lesson's [guard let](node:guard) is the better tool.

```compare kotlin
codes[code]?.let { percent -> "$percent% off!" } ?: "Unknown code"
```

```compare typescript
const percent = codes[code];
if (percent !== undefined) { /* narrowed to number here */ }
```

```compare rust
if let Some(percent) = codes.get(code) { }
```

```exercise
goal: Replace the force unwrap, which crashes when there's no saved name, with if let shorthand.
code: |-
  let savedName: String? = loadName()
  print("Welcome back, \(savedName!)")
checks:
  - match: 'if\s+let\s+savedName\s*\{'
    message: Write if let savedName {
  - notMatch: 'savedName!'
    message: Remove the force unwrap (!).
solution: |-
  let savedName: String? = loadName()
  if let savedName {
      print("Welcome back, \(savedName)")
  }
```

```quiz
question: "Inside `if let n = Int(text) { ... }`, what's the type of `n`?"
options:
  - "`Int?`"
  - "`Int`"
  - "`String`"
answer: 1
explain: if let unwraps the optional, so n is a plain Int inside the braces.
```
