---
title: Optional chaining
icon: "⛓️"
branch: data
requires: [optionals]
summary: "?. reaches through several maybes in one go, and stops quietly at the first nil."
---
Imagine a contacts app. A person *may* have a company, the company *may* have an address, and the address *may* have a postcode. Getting the postcode with `if let` takes three steps. **Optional chaining** does it in one:

```swift title=contacts.swift
struct Address { var postcode: String? }
struct Company { var address: Address? }
struct Person { var name: String; var company: Company? }

let ada = Person(name: "Ada", company: Company(address: Address(postcode: "N1 9GU")))
let bob = Person(name: "Bob", company: nil)

print(ada.company?.address?.postcode ?? "unknown")  // N1 9GU
print(bob.company?.address?.postcode ?? "unknown")  // unknown
```

Read `?.` as "and if that exists, then...". The chain is evaluated left to right, and as soon as one link is `nil` the **whole expression becomes nil**. Nothing crashes, and the rest of the chain is skipped.

Two rules that trip people up:

**1. The result is always optional**, even if the last property isn't. `ada.company?.address` is `Address?`, and `bob.name.count` is `Int` but `bob.company?.address?.postcode?.count` is `Int?`. One maybe anywhere in the chain makes the whole result a maybe. That's why chains so often end in `??`.

**2. Method calls work too**, and are simply skipped on nil:

```swift
var playlist: [String]? = nil
playlist?.append("Song")   // does nothing, no crash
print(playlist?.count)     // nil
```

(Printing an optional shows `Optional(...)` or `nil`. Swift even warns you about printing optionals, because it's rarely what you meant.)

Optional chaining with a fallback at the end, `a?.b?.c ?? default`, is one of the most common lines in Swift code. Combined with the operators from the last two lessons, you now have the full toolkit.

```compare typescript
const postcode = ada.company?.address?.postcode ?? "unknown";
```

```compare kotlin
val postcode = ada.company?.address?.postcode ?: "unknown"
```

```compare python
# No built-in chaining; you'd guard each step:
postcode = ada.company and ada.company.address and ada.company.address.postcode
```

```exercise
goal: Collapse the nested if lets into a single optional chain with a fallback.
code: |-
  var city = "nowhere"
  if let home = user.home {
      if let town = home.city {
          city = town
      }
  }
checks:
  - match: 'let\s+city\s*=\s*user\.home\?\.city\s*\?\?\s*"nowhere"'
    message: 'Write: let city = user.home?.city ?? "nowhere"'
solution: |-
  let city = user.home?.city ?? "nowhere"
```

```quiz
question: "`name` is a `String` (not optional). What's the type of `user?.name`?"
options:
  - "`String`"
  - "`String?`"
  - "`String!`"
answer: 1
explain: A chain that passes through an optional can stop at nil, so its result is always optional.
```
