---
title: Ordered arrays
icon: "📚"
branch: data
requires: [for]
summary: Create, read, change and search arrays, and what let means for a collection.
---
Arrays are ordered lists of values of one type. `[String]` is "an array of Strings".

```swift title=playlist.swift
var playlist = ["Intro", "Lift off", "Moonwalk"]

playlist.append("Outro")
playlist.insert("Warm-up", at: 0)
playlist.remove(at: 2)                  // removes "Lift off"

print(playlist)        // ["Warm-up", "Intro", "Moonwalk", "Outro"]
print(playlist.count)  // 4
print(playlist[1])     // Intro
```

The essentials, in one place:

| You want to... | Write |
| --- | --- |
| make an empty one | `var names: [String] = []` |
| add to the end | `names.append("Bo")` |
| read by position | `names[0]` |
| check emptiness | `names.isEmpty` |
| check membership | `names.contains("Bo")` |
| get first/last safely | `names.first`, `names.last` (optionals) |
| sort | `names.sort()` in place, or `names.sorted()` for a copy |

**`let` arrays are fully frozen.** In some languages, a constant list can still have items added. In Swift, `let` means the *whole value* can't change, contents included:

```swift
let fixed = [1, 2, 3]
fixed.append(4)  // error: cannot use mutating member on immutable value
```

That's because arrays are **values**, not references, which the [copies lesson](node:copies) explores further.

**Out-of-range access crashes.** `playlist[10]` on a four-item array stops the program with *Index out of range*. That's on purpose: crashing is better than reading garbage. When an index might be invalid, check `indices.contains(i)` first, or use `first`/`last`, which return `nil` for an empty array instead of crashing.

```compare python
playlist = ["Intro", "Lift off"]
playlist.append("Outro")
playlist.insert(0, "Warm-up")
```

```compare javascript
const playlist = ["Intro", "Lift off"];
playlist.push("Outro");      // const arrays can still change in JS!
playlist.unshift("Warm-up");
```

```compare kotlin
val playlist = mutableListOf("Intro", "Lift off")
playlist.add("Outro")
```

```exercise
goal: "The shopping list needs to grow, but it doesn't compile. Fix the declaration, then add \"milk\" to the end."
code: |-
  let shopping = ["bread", "eggs"]
checks:
  - match: 'var\s+shopping\s*='
    message: An array you change must be a var.
  - match: 'shopping\.append\("milk"\)'
    message: Add milk with append.
solution: |-
  var shopping = ["bread", "eggs"]
  shopping.append("milk")
```

```quiz
question: "`let names: [String] = []` — what does `names.first` give?"
options:
  - It crashes.
  - "`nil`"
  - An empty string.
answer: 1
explain: first returns an optional, which is nil for an empty array. names[0] would crash instead.
```
