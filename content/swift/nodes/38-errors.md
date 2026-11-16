---
title: Throwing functions
icon: "🧨"
branch: tools
requires: [functions, enums]
summary: throw, try and do/catch, where every call that can fail is marked in the code.
---
Optionals say "there might be no value". Sometimes that's not enough: you want to know *why* something failed. A withdrawal can fail because the balance is too low, *or* because the account is frozen, and the user deserves a different message for each.

That's what Swift's **errors** are for. Let's go through it as a quick Q&A.

**What is an error?** Any type that conforms to the `Error` protocol. An enum is the usual choice, with one case per failure:

```swift
enum WithdrawalError: Error {
    case insufficientFunds(missing: Double)
    case accountFrozen
}
```

**How does a function say it can fail?** With `throws` before the return arrow, and `throw` to fail:

```swift title=bank.swift
func withdraw(_ amount: Double, from balance: Double, frozen: Bool) throws -> Double {
    guard !frozen else { throw WithdrawalError.accountFrozen }
    guard amount <= balance else {
        throw WithdrawalError.insufficientFunds(missing: amount - balance)
    }
    return balance - amount
}
```

**How do I call it?** With `try` in front, inside a `do`/`catch`:

```swift
do {
    let left = try withdraw(80, from: 50, frozen: false)
    print("Left: \(left)")
} catch WithdrawalError.insufficientFunds(let missing) {
    print("You're \(missing) short")
} catch {
    print("Something else went wrong: \(error)")
}
// You're 30.0 short
```

Catch clauses match like `switch` patterns. The last plain `catch` handles anything left, and gives you the error under the automatic name `error`.

**Why do I have to write `try`?** So that anyone reading the code can see exactly which lines might jump to the `catch`. No invisible exceptions flying out of innocent-looking calls.

**What if I don't want to handle it here?** Mark your own function `throws` too, and the error passes up to your caller:

```swift
func payRent() throws {
    let left = try withdraw(950, from: 1_000, frozen: false)
    print("Rent paid, \(left) left")
}
```

**Is there a shortcut?** Two:

- `try?` turns the result into an optional, nil on any error: `let left = try? withdraw(...)`. Handy when you don't care *why* it failed.
- `try!` crashes if an error is thrown. Only for cases that truly can't fail.

**Swift 6 extra:** you can declare *which* error type a function throws with `throws(WithdrawalError)`. Then the `catch` knows the exact type of `error`. Plain `throws` is still the norm for most code.

```compare python
try:
    left = withdraw(80, 50, False)
except InsufficientFunds as e:
    print(f"You're {e.missing} short")
```

```compare kotlin
try { withdraw(80.0, 50.0, false) } catch (e: InsufficientFunds) { }
```

```compare rust
match withdraw(80.0, 50.0, false) {
    Err(WithdrawalError::InsufficientFunds { missing }) => println!("{missing} short"),
    _ => {}
}
```

```exercise
goal: "`parseAge` can fail, so mark it `throws`, and throw `AgeError.notANumber` instead of returning -1."
code: |-
  enum AgeError: Error { case notANumber }

  func parseAge(_ text: String) -> Int {
      guard let age = Int(text) else { return -1 }
      return age
  }
checks:
  - match: 'func\s+parseAge\(\s*_\s+text\s*:\s*String\s*\)\s*throws\s*->\s*Int'
    message: Add throws before the arrow.
  - match: 'else\s*\{\s*throw\s+AgeError\.notANumber\s*\}'
    message: "In the guard's else, throw AgeError.notANumber."
solution: |-
  enum AgeError: Error { case notANumber }

  func parseAge(_ text: String) throws -> Int {
      guard let age = Int(text) else { throw AgeError.notANumber }
      return age
  }
```

```quiz
question: "What does `let x = try? parse(\"oops\")` give when parse throws?"
options:
  - It crashes.
  - "`nil`"
  - The error itself.
answer: 1
explain: try? converts any thrown error into nil, so x is an optional.
```
