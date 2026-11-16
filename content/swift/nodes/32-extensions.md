---
title: Extend existing types
icon: "🔌"
branch: types
requires: [protocols]
summary: Add methods to any type, even String and Int, and give protocols default behaviour.
---
Wouldn't it be nice if every `String` could tell you whether it's a palindrome? You can't edit Apple's `String` source code, but you don't have to. An **extension** adds new members to an existing type:

```swift title=palindrome.swift
extension String {
    var isPalindrome: Bool {
        let letters = lowercased().filter(\.isLetter)
        return letters == String(letters.reversed())
    }
}

print("Never odd or even".isPalindrome)  // true
print("Swift".isPalindrome)              // false
```

From now on, *every* String in your module has `isPalindrome`, and call sites read like it was always there.

Extensions can add **methods, computed properties, initializers, nested types and protocol conformances**. What they can't add is stored properties, because that would change the size of existing values.

Three ways you'll see extensions used:

**1. Little helpers on standard types**, as above. Keep them small and obvious, because every reader of your code sees them as part of the type.

**2. Organising your own code.** Swift developers often put each protocol conformance in its own extension, so the type's main body stays short:

```swift
struct Track { let title: String; let seconds: Int }

extension Track: CustomStringConvertible {
    var description: String { "\(title) (\(seconds) seconds)" }
}
```

**3. Default implementations for protocols.** This is the big one. A **protocol extension** gives every conforming type some behaviour for free:

```swift
protocol Greeter {
    var name: String { get }
}

extension Greeter {
    func greet() -> String { "Hello from \(name)!" }
}

struct Bot: Greeter { let name = "R2" }
print(Bot().greet())   // Hello from R2!
```

`Bot` only provides `name`, and gets `greet()` thrown in. Much of Swift's standard library works like this: `map`, `filter`, `contains` and friends are written once, in extensions on the `Sequence` protocol, and every collection type gets them.

```compare kotlin
// Kotlin has extension functions too:
val String.isPalindrome: Boolean get() = TODO()
```

```compare javascript
// JS can patch prototypes, but it's global and risky:
String.prototype.isPalindrome = function () { /* ... */ };
```

```compare rust
// Rust uses a trait plus an impl for an existing type:
trait Palindrome { fn is_palindrome(&self) -> bool; }
impl Palindrome for str { /* ... */ }
```

```exercise
goal: "Add a computed property `isEven` to every Int, using an extension."
code: |-
  func isEven(_ n: Int) -> Bool {
      n % 2 == 0
  }
checks:
  - match: 'extension\s+Int\s*\{'
    message: Start with extension Int {
  - match: 'var\s+isEven\s*:\s*Bool\s*\{[^}]*(self\s*%\s*2\s*==\s*0|isMultiple\(of:\s*2\))'
    message: 'Add var isEven: Bool { self % 2 == 0 }'
solution: |-
  extension Int {
      var isEven: Bool { self % 2 == 0 }
  }
```

```quiz
question: Which of these can an extension NOT add to a type?
options:
  - A computed property
  - A stored property
  - A protocol conformance
answer: 1
explain: Extensions can't change the memory layout of a type, so stored properties are off limits.
```
