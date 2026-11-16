---
title: "Inheritance"
icon: "🧬"
branch: "objects"
requires: ["properties"]
summary: "Override behavior, delegate with super, and prefer clear relationships."
---
[[inheritance]] lets one class build on another: the new class gets everything the parent has, and changes or adds what's different. Let's design a family of notifications.

**The parent class** holds what every notification shares:

```python
class Notification:
    def __init__(self, recipient):
        self.recipient = recipient

    def render(self, text):
        return text

    def send(self, text):
        print(f"To {self.recipient}: {self.render(text)}")
```

**A child class** names its parent in brackets. Here it **overrides** `render`, replacing the parent's version:

```python
class SmsNotification(Notification):
    def render(self, text):
        return text[:160]          # SMS is short
```

`send` is inherited unchanged, and when it calls `self.render(...)`, Python finds the child's version first.

**Extending instead of replacing.** Often you want the parent's behaviour plus a bit more. `super()` calls the parent's version:

```python
class UrgentNotification(Notification):
    def render(self, text):
        return "🚨 " + super().render(text).upper()
```

The same goes for `__init__`. If the child needs extra data, call the parent's `__init__` first so its setup still happens:

```python
class EmailNotification(Notification):
    def __init__(self, recipient, subject):
        super().__init__(recipient)
        self.subject = subject
```

Forgetting that `super().__init__(...)` call is a classic bug: `self.recipient` would never be set.

## When to reach for it

Inheritance shines when the child truly **is a** kind of the parent and the parent was designed for extension, like custom exceptions (`class PaymentDeclined(Exception)`) or framework base classes.

For "this class needs some of that one's features", consider plain composition instead: store the other object as an attribute and call it. Deep inheritance trees are hard to follow, and Python's [duck typing](node:protocols) often makes a shared parent unnecessary.

```compare java
class SmsNotification extends Notification {
    @Override String render(String text) { ... }
}
```

```compare kotlin
open class Notification(val recipient: String)   // open to extend
class Sms(recipient: String) : Notification(recipient)
```

```exercise
goal: "`self.greet(name)` calls this very method again, forever. Call the parent's `greet` instead."
lang: python
code: |
  class Greeter:
      def greet(self, name):
          return f"Hello, {name}"

  class ExcitedGreeter(Greeter):
      def greet(self, name):
          return self.greet(name) + "!"

  print(ExcitedGreeter().greet("Ada"))
checks:
  - match: 'super\(\s*\)\.greet\(\s*name\s*\)'
    message: Replace self.greet(name) with super().greet(name).
hint: super() reaches the parent class's version.
solution: |
  class Greeter:
      def greet(self, name):
          return f"Hello, {name}"

  class ExcitedGreeter(Greeter):
      def greet(self, name):
          return super().greet(name) + "!"

  print(ExcitedGreeter().greet("Ada"))
```

```quiz
question: "A child class defines its own `__init__` but doesn't call `super().__init__(...)`. What happens?"
options:
  - Python calls the parent's __init__ automatically afterwards.
  - The parent's __init__ doesn't run, so its attributes are never set.
  - A SyntaxError.
answer: 1
explain: Defining __init__ replaces the parent's. Only super().__init__() runs the parent's setup.
```
