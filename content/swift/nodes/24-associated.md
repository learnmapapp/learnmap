---
title: Associated values
icon: "🎒"
branch: types
requires: [enums]
summary: Enum cases that carry their own data, and switch patterns that unpack it.
---
A payment can be made by card, by bank transfer, or in cash. But each one comes with *different* details: a card has a last-four, a transfer has an IBAN, and cash has... nothing. In many languages you'd make a class with three optional fields and hope they're filled in consistently.

Swift enums let each case carry its own **associated values**:

```swift title=payment.swift
enum Payment {
    case card(lastFour: String)
    case transfer(iban: String, reference: String)
    case cash
}

func receipt(for payment: Payment) -> String {
    switch payment {
    case .card(let lastFour):
        return "Card ending \(lastFour)"
    case .transfer(let iban, _):
        return "Transfer from \(iban)"
    case .cash:
        return "Paid in cash 💵"
    }
}

print(receipt(for: .card(lastFour: "4242")))
print(receipt(for: .transfer(iban: "NL91ABNA0417164300", reference: "INV-7")))
print(receipt(for: .cash))
```

Now **impossible states can't be built**. There's no way to make a cash payment with an IBAN, or a card payment without the last four digits. The type simply doesn't allow it.

Getting the data out happens in `switch` patterns:

- `case .card(let lastFour):` binds the value to a name.
- `case .transfer(let iban, _):` binds one value and ignores the other with `_`.
- `case let .transfer(iban, reference):` moves the `let` to the front, binding everything.

When you only care about **one case**, a full switch is a lot of ceremony. `if case` does a single pattern match:

```swift
if case .card(let lastFour) = payment {
    print("Card \(lastFour)")
}
```

You've already been using an enum with associated values without knowing it: `Optional` is defined as `enum Optional<Wrapped> { case none; case some(Wrapped) }`. All the `?` syntax is sugar on top.

```compare typescript
type Payment =
  | { kind: "card"; lastFour: string }
  | { kind: "transfer"; iban: string; reference: string }
  | { kind: "cash" };
```

```compare rust
enum Payment {
    Card { last_four: String },
    Transfer { iban: String, reference: String },
    Cash,
}
```

```compare kotlin
sealed interface Payment {
    data class Card(val lastFour: String) : Payment
    data object Cash : Payment
}
```

```exercise
goal: "Add a case `giftCard(code: String)` to the enum, and handle it in the switch by returning \"Gift card \\(code)\"."
code: |-
  enum Payment {
      case card(lastFour: String)
      case cash
  }

  func label(_ p: Payment) -> String {
      switch p {
      case .card(let lastFour): return "Card \(lastFour)"
      case .cash: return "Cash"
      }
  }
checks:
  - match: 'case\s+giftCard\(\s*code\s*:\s*String\s*\)'
    message: "Add case giftCard(code: String) to the enum."
  - match: 'case\s+(\.giftCard\(\s*let\s+code\s*\)|let\s+\.giftCard\(\s*code\s*\))\s*:\s*return\s+"Gift card \\\(code\)"'
    message: 'Handle it: case .giftCard(let code): return "Gift card \(code)"'
solution: |-
  enum Payment {
      case card(lastFour: String)
      case cash
      case giftCard(code: String)
  }

  func label(_ p: Payment) -> String {
      switch p {
      case .card(let lastFour): return "Card \(lastFour)"
      case .cash: return "Cash"
      case .giftCard(let code): return "Gift card \(code)"
      }
  }
```

```quiz
question: Which Swift type is secretly an enum with associated values?
options:
  - "`Optional`"
  - "`String`"
  - "`Array`"
answer: 0
explain: Optional has two cases, none and some(Wrapped). The ? syntax is shorthand for it.
```
