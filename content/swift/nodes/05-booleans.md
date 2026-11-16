---
title: Boolean conditions
icon: "⚖️"
branch: basics
requires: [types]
summary: true, false, &&, || and !, and the one thing Swift won't treat as a Bool.
---
Quick quiz before we start. Which of these lines compile in Swift?

```swift
let count = 3
if count { print("A") }
if count > 0 { print("B") }
if !count.isMultiple(of: 2) { print("C") }
```

Only B and C. Swift's `if` needs a real `Bool`, and a number is not a Bool. There's no "truthy" `3` or "falsy" `0`, `""` or `nil`. That rules out a whole family of bugs, at the cost of writing `> 0` now and then.

The operators are the familiar C-style ones:

| Operator | Meaning | Example |
| --- | --- | --- |
| `&&` | and | `isMember && hasTicket` |
| `\|\|` | or | `isAdmin \|\| isOwner` |
| `!` | not | `!isEmpty` |
| `==`, `!=` | equal, not equal | `answer == 42` |
| `<`, `<=`, `>`, `>=` | comparisons | `age >= 18` |

`&&` and `||` short-circuit: when the left side settles the answer, the right side never runs. That makes guards like this safe:

```swift
let names: [String] = []
if !names.isEmpty && names[0] == "Ada" {
    print("Ada is first")
}
```

If `names` is empty, `names[0]` is never evaluated, so it doesn't crash.

Swift likes Bool-returning properties and methods that read as questions: `isEmpty`, `hasPrefix(_:)`, `contains(_:)`, `isMultiple(of:)`. Name your own the same way and your conditions will read like sentences.

One nice extra: `toggle()` flips a Bool variable in place.

```swift
var lightsOn = false
lightsOn.toggle()   // true
```

```compare python
if names and names[0] == "Ada":   # Python treats [] as false
    ...
```

```compare javascript
if (count) { }   // fine in JS: 0 is falsy
```

```exercise
goal: This check was written by someone fresh from JavaScript. Make the condition an explicit Bool.
code: |-
  let unread = inbox.count
  if unread {
      print("You have mail")
  }
checks:
  - match: 'if\s+unread\s*>\s*0\s*\{'
    message: "Compare explicitly: if unread > 0 {"
solution: |-
  let unread = inbox.count
  if unread > 0 {
      print("You have mail")
  }
```

```quiz
question: "`if !list.isEmpty && list[0] > 10` — what happens when `list` is empty?"
options:
  - It crashes on list[0].
  - The condition is false, and list[0] is never evaluated.
  - It's a compile error.
answer: 1
explain: "&& stops as soon as the left side is false, so the index is never touched."
```
