---
title: Reference identity
icon: "🔗"
branch: types
requires: [structs]
summary: Classes are shared by reference. When that's useful, and the === operator.
---
Swap the word `struct` for `class` in the settings example from the [last lesson](node:copies), and the JavaScript-style surprise comes right back:

```swift title=account.swift
class BankAccount {
    let owner: String
    var balance: Double

    init(owner: String, balance: Double) {
        self.owner = owner
        self.balance = balance
    }
}

let joint = BankAccount(owner: "Sam & Alex", balance: 100)
let samsCard = joint
let alexsCard = joint

samsCard.balance -= 30
alexsCard.balance -= 20
print(joint.balance)   // 50.0
```

This time it's exactly what we want! There is **one** bank account, and three names that refer to it. Classes are **reference types**: assigning one copies the reference, not the object.

Compare the struct and class side by side:

| | struct | class |
| --- | --- | --- |
| Assignment | copies the value | shares the instance |
| Initializer | memberwise, free | you write `init` |
| Changing a `var` property through a `let` | not allowed | allowed |
| Methods that change properties | need `mutating` | don't |
| Inheritance | no | yes |
| Identity check `===` | no | yes |

Notice the odd one: `let joint` and yet `joint.balance -= 30` works. For a class, `let` only freezes the *reference* (you can't point `joint` at another account), not the object.

**Identity vs equality.** `===` asks "are these the very same instance?":

```swift
print(samsCard === joint)   // true: same account
let other = BankAccount(owner: "Sam & Alex", balance: 50)
print(other === joint)      // false: same contents, different account
```

**When to choose a class?** Start with a struct. Pick a class when the thing has a real identity that should be shared: a connection, a cache, a document that several screens edit, or when an Apple framework asks you to subclass. Mark classes `final` unless you plan to subclass them.

```compare kotlin
class BankAccount(val owner: String, var balance: Double)
println(a === b)  // same identity operator
```

```compare python
print(a is b)   # identity, like Swift's ===
```


```exercise
goal: "Several screens should share one live `Counter`. Make it a class, and give it the initializer classes need."
code: |-
  struct Counter {
      var count: Int
  }
checks:
  - match: '(final\s+)?class\s+Counter'
    message: Change struct to class.
  - match: 'init\(\s*count\s*:\s*Int\s*\)\s*\{\s*self\.count\s*=\s*count\s*\}'
    message: "Add init(count: Int) { self.count = count }"
solution: |-
  final class Counter {
      var count: Int

      init(count: Int) { self.count = count }
  }
```

```quiz
question: "`let a = Account(); let b = a; b.balance = 5`. If Account is a class, what is `a.balance`?"
options:
  - "5, because a and b refer to the same instance"
  - The original balance, because b is a copy
  - A compile error, because a is a let
answer: 0
explain: Assigning a class copies the reference. Both names point at one object, and let doesn't freeze its properties.
```
