---
title: Early exits with guard
icon: "🛡️"
branch: data
requires: [if-let, functions]
summary: Check what you need at the top, leave early otherwise, and keep the happy path flat.
---
Here's some code that grew one `if let` at a time. Spot the problem:

```swift
func checkout(cart: Cart?) {
    if let cart {
        if let address = cart.address {
            if let card = cart.card {
                ship(cart, to: address, paidWith: card)
            } else {
                print("No card")
            }
        } else {
            print("No address")
        }
    } else {
        print("No cart")
    }
}
```

It works, but the actual work is buried three levels deep, and each error message sits far away from the check it belongs to. Developers call this the **pyramid of doom**.

**`guard`** flips it around. You state what must be true, and handle the failure right there:

```swift title=checkout.swift
func checkout(cart: Cart?) {
    guard let cart else { print("No cart"); return }
    guard let address = cart.address else { print("No address"); return }
    guard let card = cart.card else { print("No card"); return }

    ship(cart, to: address, paidWith: card)
}
```

Same behaviour, but the happy path now runs straight down the left edge. Two things make `guard` special:

1. **The `else` must leave the scope.** `return`, `throw`, `break`, `continue`, or a call that never returns, like `fatalError()`. The compiler checks this, so you can't accidentally fall through.
2. **Unwrapped names stay available afterwards.** Unlike `if let`, where `cart` only exists inside the braces, `guard let cart` makes `cart` usable for the rest of the function.

`guard` works with plain conditions too, which is a neat way to validate input:

```swift
guard quantity > 0 else { return }
```

Rule of thumb: **`if let` when the value is optional in a normal way; `guard` when the function can't do its job without it.**

```compare kotlin
val cart = cart ?: run { println("No cart"); return }
```

```compare python
if cart is None:
    print("No cart")
    return
```

```compare rust
let Some(cart) = cart else { println!("No cart"); return; };
```

```exercise
goal: "Flatten this function: use `guard let user else { return \"Guest\" }` at the top, then return the greeting."
code: |-
  func greeting(for user: String?) -> String {
      if let user {
          return "Hi, \(user)!"
      } else {
          return "Guest"
      }
  }
checks:
  - match: 'guard\s+let\s+user\s+else\s*\{\s*return\s+"Guest"\s*\}'
    message: 'Start with: guard let user else { return "Guest" }'
  - notMatch: 'if\s+let'
    message: The if let isn't needed any more.
solution: |-
  func greeting(for user: String?) -> String {
      guard let user else { return "Guest" }
      return "Hi, \(user)!"
  }
```

```quiz
question: What must the else block of a guard statement do?
options:
  - Print an error message.
  - Exit the current scope, for example with return or throw.
  - Assign a default value to the variable.
answer: 1
explain: The compiler requires guard's else to leave the scope, so code after the guard can rely on the condition.
```
