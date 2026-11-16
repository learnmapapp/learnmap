---
title: Custom initializers
icon: "🏗️"
branch: types
requires: [structs]
summary: Write __init__ yourself when creating a value needs defaults, calculations or checks.
---
`@fieldwise_init` is great when "create a value" means "fill in every field". Often it means more. Here's a timer where callers give minutes, but the struct stores seconds:

```mojo title=timer.mojo
struct Timer(Writable):
    var label: String
    var seconds: Int
    var running: Bool

    def __init__(out self, label: String, minutes: Int):
        self.label = label
        self.seconds = minutes * 60
        self.running = False

def main():
    var tea = Timer("Tea", 4)
    print(tea.label, tea.seconds)   # Tea 240
```

**Walkthrough:**

1. **`__init__`** is the initializer, the code that runs when you write `Timer(...)`. The double underscores mark it as one of Mojo's special methods, as in Python.
2. **`out self`** means: "`self` doesn't exist yet; this function's job is to create it". That's different from Python's plain `self`, which is an object that already exists. `out` is the fourth [[argument convention]], used almost only here.
3. **Every field must be set** before `__init__` ends. Leave out `self.running = False`, and the compiler stops with an error that `self` isn't fully initialized. No half-built timers.
4. **Callers never pass `self`.** `Timer("Tea", 4)` maps to `label` and `minutes`.

**Several initializers.** A struct can have more than one `__init__`, as long as their parameter types differ. Mojo picks the one that fits the call:

```mojo
    def __init__(out self, label: String):
        self.label = label
        self.seconds = 300   # five-minute default
        self.running = False
```

Now both `Timer("Tea", 4)` and `Timer("Eggs")` work. For simple cases, a [default argument](node:defaults) (`minutes: Int = 5`) does the same with less code.

**`@fieldwise_init` or your own?** Use the decorator when the arguments are exactly the fields. Write `__init__` when you convert units, compute values, fill in fields that callers shouldn't control, like `running`, or validate input.

```compare python
class Timer:
    def __init__(self, label: str, minutes: int):
        self.label = label
        self.seconds = minutes * 60
```

```compare rust
impl Timer {
    fn new(label: String, minutes: i32) -> Self {
        Timer { label, seconds: minutes * 60, running: false }
    }
}
```

```exercise
goal: "The initializer forgets one field. Set `self.balance` to 0 so every field is initialized."
code: |-
  struct Account:
      var owner: String
      var balance: Int

      def __init__(out self, owner: String):
          self.owner = owner
checks:
  - match: 'self\.balance\s*=\s*0'
    message: Add self.balance = 0 to the initializer.
solution: |-
  struct Account:
      var owner: String
      var balance: Int

      def __init__(out self, owner: String):
          self.owner = owner
          self.balance = 0
```

```quiz
question: "Why does `__init__` take `out self` instead of plain `self`?"
options:
  - Because self is read-only in initializers.
  - Because the initializer creates self; it doesn't exist before the call.
  - It's just a naming style.
answer: 1
explain: out marks a value the function must initialize, which is exactly what an initializer does.
```
