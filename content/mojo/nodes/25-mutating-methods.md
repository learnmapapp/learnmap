---
title: Mutating methods
icon: "🔧"
branch: types
requires: [initializers]
summary: Write mut self when a method needs to change the value it's called on.
---
**Spot the bug:**

```mojo
struct Counter:
    var count: Int

    def __init__(out self):
        self.count = 0

    def increment(self):
        self.count += 1   # error: 'self' is immutable
```

A plain `self` is [read-only](node:methods). The fix is the same keyword you used for [mutable arguments](node:mutable-args): `mut`.

```mojo title=counter.mojo
struct Counter:
    var count: Int

    def __init__(out self):
        self.count = 0

    def increment(mut self):
        self.count += 1

    def reset(mut self):
        self.count = 0

    def value(self) -> Int:
        return self.count

def main():
    var clicks = Counter()
    clicks.increment()
    clicks.increment()
    print(clicks.value())   # 2
    clicks.reset()
    print(clicks.value())   # 0
```

**Reading the signatures** now tells you a lot without opening a single method body:

| Signature | Promise |
| --- | --- |
| `def __init__(out self)` | creates a new counter |
| `def increment(mut self)` | changes this counter |
| `def value(self) -> Int` | only looks at it |

**The caller needs a `var`.** A mutating method changes the value, so it can only be called on something that's allowed to change. Calling `increment()` on a read-only parameter is a compile error:

```mojo
def show(c: Counter):
    c.increment()   # error: c is read-only here
```

If `show` really must change the counter, its parameter becomes `mut c: Counter`. The `mut` flows through: from the struct, to the function, all the way to the caller's variable.

**Rule of thumb:** start every method with plain `self`. Switch to `mut self` only when the compiler, or the method's purpose, says it changes something. Keeping as many methods read-only as possible makes the type easier to reason about.

```compare python
class Counter:
    def increment(self):
        self.count += 1   # every method can modify
```

```compare rust
impl Counter {
    fn increment(&mut self) { self.count += 1; }
}
```

```exercise
goal: "`deposit` changes the balance, so it needs mutable access. Change its `self` to `mut self`."
code: |-
  struct Wallet:
      var balance: Int

      def __init__(out self):
          self.balance = 0

      def deposit(self, amount: Int):
          self.balance += amount
checks:
  - match: 'def\s+deposit\(\s*mut\s+self\s*,\s*amount\s*:\s*Int\s*\)'
    message: 'Write def deposit(mut self, amount: Int):'
solution: |-
  struct Wallet:
      var balance: Int

      def __init__(out self):
          self.balance = 0

      def deposit(mut self, amount: Int):
          self.balance += amount
```

```quiz
question: "Which method can be called on a read-only `Counter` parameter?"
options:
  - "`def increment(mut self)`"
  - "`def value(self) -> Int`"
  - Both.
answer: 1
explain: A read-only value only allows methods that take plain self.
```
