---
title: Argument labels
icon: "🏷️"
branch: functions
requires: [functions, strings]
summary: One name for the caller, another for the body, and _ when no name reads better.
---
Read these two calls out loud:

```swift
move(3, 5)
move(from: 3, to: 5)
```

The second one explains itself. That's the idea behind Swift's **[[argument label|argument labels]]**: every parameter can have *two* names, one for the caller and one for inside the function.

```swift title=transfer.swift
func transfer(_ amount: Int, from source: String, to destination: String) {
    print("Moving \(amount) from \(source) to \(destination)")
}

transfer(50, from: "savings", to: "checking")
```

Reading the parameter list:

| Written | Caller writes | Body uses |
| --- | --- | --- |
| `_ amount: Int` | nothing (just the value) | `amount` |
| `from source: String` | `from:` | `source` |
| `to destination: String` | `to:` | `destination` |
| `count: Int` (one name) | `count:` | `count` |

With a single name, it's used for both. A `_` means "no label at the call site".

So when do you use which? Apple's API guidelines boil down to: **make the call site read like a phrase**.

- Leave out the label when the function name already says what the first argument is: `print("hi")`, `contains(item)`, `square(4)`.
- Use prepositions for the rest: `insert(item, at: 0)`, `distance(from: a, to: b)`.

The labels are part of the function's name. `transfer(_:from:to:)` is the full name, and you can have another function `transfer(_:between:and:)` alongside it.

```compare python
# Python has keyword arguments, but the caller decides whether to use them:
transfer(50, source="savings", destination="checking")
```

```compare kotlin
// Kotlin uses named arguments optionally, with one name per parameter:
transfer(50, source = "savings", destination = "checking")
```

```exercise
goal: "Make the call read `send(\"Hi\", to: \"Sam\")`: no label for the message, and an external label `to` for the recipient (named `recipient` inside)."
code: |-
  func send(message: String, recipient: String) {
      print("\(recipient) ← \(message)")
  }
checks:
  - match: 'func\s+send\(\s*_\s+message\s*:\s*String\s*,\s*to\s+recipient\s*:\s*String\s*\)'
    message: "The signature should be: send(_ message: String, to recipient: String)"
solution: |-
  func send(_ message: String, to recipient: String) {
      print("\(recipient) ← \(message)")
  }
```

```quiz
question: "Given `func greet(person name: String)`, how do you call it?"
options:
  - "`greet(name: \"Ana\")`"
  - "`greet(person: \"Ana\")`"
  - "`greet(\"Ana\")`"
answer: 1
explain: Callers use the label (person); the body uses the parameter name (name).
```
