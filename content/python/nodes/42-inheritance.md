---
title: "Inheritance"
icon: "🧬"
branch: "objects"
requires: ["properties"]
summary: "Override behavior, delegate with super, and prefer clear relationships."
---

[[Inheritance]] lets a class reuse or specialize another class's behavior:

```python
class Greeter:
    def greet(self, name):
        return f"Hello, {name}"

class ExcitedGreeter(Greeter):
    def greet(self, name):
        return super().greet(name) + "!"

print(ExcitedGreeter().greet("Ada"))  # Hello, Ada!
```

The subclass overrides `greet`. `super()` delegates to the next implementation in Python's method resolution order, which also supports cooperative multiple inheritance. In a simple single-parent hierarchy, that is the parent's implementation.

## Initialize the parent when needed

If you define a subclass's `__init__`, call `super().__init__(...)` when the base class needs initialization. Python does not automatically call both initializers.

Use inheritance for an actual substitutable relationship: callers expecting the base class should still get sensible behavior from the subclass. To combine independent capabilities, composition is often simpler: store a helper object on `self` and delegate work to it.

Python also supports [[duck typing]]: callers can use an object's methods without requiring it to inherit a specific base class. [Protocols](node:protocols) can describe that interface to a type checker without forcing an inheritance hierarchy.

```exercise
goal: Reuse the parent greeting through super instead of recursively calling this method.
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
  - match: super\(\s*\)\.greet\(\s*name\s*\)
    message: Replace self.greet(name) with super().greet(name).
hint: Replace `self.greet(name)` with `super()`.`greet(name)`.
```

```quiz
question: If a subclass defines `__init__`, is its parent initializer called automatically?
options:
  - Yes, with the same arguments.
  - No; call `super()`.`__init__` when the parent needs initialization.
  - Only for dataclasses.
answer: 1
explain: An explicit subclass initializer must delegate to the base initializer when needed.
```
