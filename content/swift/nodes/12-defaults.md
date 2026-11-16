---
title: Default parameters
icon: "🎚️"
branch: functions
requires: [functions]
summary: Give parameters default values, so callers only pass what they care about.
---
Imagine a function for making coffee. Most people want a medium cup with milk, but some are particular. Without defaults, everyone has to spell out everything:

```swift
makeCoffee(size: "medium", milk: true, sugar: 0, extraShot: false)
```

With **default values**, callers only mention what's different:

```swift title=coffee.swift
func makeCoffee(size: String = "medium", milk: Bool = true, sugar: Int = 0, extraShot: Bool = false) {
    print("☕ \(size), milk: \(milk), sugar: \(sugar), extra shot: \(extraShot)")
}

makeCoffee()                              // the usual
makeCoffee(sugar: 2)                      // sweet tooth
makeCoffee(size: "large", extraShot: true) // long night
```

The arguments you *do* pass must stay in the declared order. `makeCoffee(extraShot: true, size: "large")` doesn't compile. Labels make the call readable; they don't make the order flexible.

You use defaults all the time in Swift's own libraries, often without noticing. For example, `print` has two of them:

```swift
print("a", "b", "c")                         // a b c
print("a", "b", "c", separator: "-")          // a-b-c
print("loading", terminator: "")             // no newline at the end
```

A few guidelines for designing your own:

- Put parameters with defaults **after** the ones without, so the common call stays short.
- A default should be the answer for the majority, not an arbitrary value.
- Defaults are evaluated at **each call**, so `date: Date = Date()` really gives the current time on every call (unlike Python's mutable-default trap).

```compare python
def make_coffee(size="medium", milk=True, sugar=0, extra_shot=False):
    ...
```

```compare kotlin
fun makeCoffee(size: String = "medium", milk: Boolean = true, sugar: Int = 0) { }
```

```exercise
goal: "Most greetings start with \"Hello\". Give `greeting` a default, so `greet(name: \"Ana\")` works."
code: |-
  func greet(name: String, greeting: String) -> String {
      "\(greeting), \(name)!"
  }
checks:
  - match: 'greeting\s*:\s*String\s*=\s*"Hello"'
    message: 'Add = "Hello" after the type of greeting.'
solution: |-
  func greet(name: String, greeting: String = "Hello") -> String {
      "\(greeting), \(name)!"
  }
```

```quiz
question: "With `func box(width: Int = 1, height: Int = 1)`, which call does NOT compile?"
options:
  - "`box()`"
  - "`box(height: 3)`"
  - "`box(height: 3, width: 2)`"
answer: 2
explain: Arguments must keep their declared order, even when some are left out.
```
