---
title: Mutating methods
icon: "✏️"
branch: types
requires: [structs]
summary: Why a struct method needs permission to change its own properties.
---
Here's a step counter. It looks fine, but it won't compile. Can you guess why?

```swift
struct StepCounter {
    var steps = 0

    func walk(_ n: Int) {
        steps += n
    }
}
```

```repl shell
> swift steps.swift
error: left side of mutating operator isn't mutable: 'self' is immutable
```

In a struct, methods are **read-only by default**. Inside a normal method, `self` is a constant. To change properties, the method has to say so with **`mutating`**:

```swift title=steps.swift
struct StepCounter {
    var steps = 0

    mutating func walk(_ n: Int) {
        steps += n
    }

    mutating func reset() {
        self = StepCounter()   // a mutating method can even replace self entirely
    }
}

var today = StepCounter()
today.walk(4_000)
today.walk(2_500)
print(today.steps)   // 6500
```

Why the extra keyword? Because it connects to the `let` rule from the [last lesson](node:structs). Swift needs to know which methods change the value, so it can stop you calling them on a constant:

```swift
let frozen = StepCounter()
frozen.walk(10)   // error: cannot use mutating member on immutable value: 'frozen' is a 'let' constant
```

Without `mutating`, the compiler would have to guess. With it, every method's effect is visible in its signature.

You've already met this from the other side: `append` on an array is a mutating method, which is why it only works on a `var` array.

**Classes don't need `mutating`.** A class instance is a shared reference, so its methods can always change properties. That difference is the subject of the [classes lesson](node:classes).

A design note: many Swift APIs come in pairs, a mutating verb and a non-mutating noun-ish form. `sort()` changes the array, `sorted()` returns a new one. `append(_:)` versus `+`. Following the same convention in your own types makes them feel native.

```compare kotlin
// Kotlin data classes don't have this distinction; vals are just read-only properties.
data class StepCounter(var steps: Int = 0) {
    fun walk(n: Int) { steps += n }
}
```

```compare rust
impl StepCounter {
    fn walk(&mut self, n: u32) { self.steps += n; }  // &mut self plays the same role
}
```

```exercise
goal: "`add` changes `items`, so it needs a keyword. Fix the method."
code: |-
  struct Basket {
      var items: [String] = []

      func add(_ item: String) {
          items.append(item)
      }
  }
checks:
  - match: 'mutating\s+func\s+add'
    message: Mark the method as mutating func add.
solution: |-
  struct Basket {
      var items: [String] = []

      mutating func add(_ item: String) {
          items.append(item)
      }
  }
```

```quiz
question: Where can you call a mutating method on a struct value?
options:
  - Only on a var.
  - On both var and let.
  - Only inside the struct itself.
answer: 0
explain: A let struct is immutable, so the compiler rejects calls to its mutating methods.
```
