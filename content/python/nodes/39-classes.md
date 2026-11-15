---
title: "Classes"
icon: "🏗️"
branch: "objects"
requires: ["function-arguments", "scope"]
summary: "Bundle state and behavior in instances with explicit self."
---

A [[class]] defines a kind of object. Each [[instance]] can hold its own state, and methods describe operations on it:

```python
class Counter:
    def __init__(self, start=0):
        self.value = start

    def increment(self):
        self.value += 1

counter = Counter(10)
counter.increment()
print(counter.value)  # 11
```

`__init__` initializes the newly created instance. A method's first parameter conventionally has the name `self`; Python supplies the instance when you call `counter.increment()`.

## Instance and class attributes

Store per-object state on `self` inside initialization. A mutable list assigned directly in the class body would be shared by instances unless replaced on each instance.

Class names conventionally use `PascalCase`; methods and attributes use `snake_case`. A leading underscore marks an implementation detail by convention, not an enforced access restriction.

Use a class when state and behavior belong together. Plain functions and dictionaries are often enough for a small transformation. If you mainly need named data fields, [dataclasses](node:dataclasses) remove repetitive initialization and comparison methods.

```compare javascript
class Counter {
  constructor() { this.value = 0; }
  increment() { this.value += 1; }
}
```

```compare java
class Counter {
    int value = 0;
    void increment() { value += 1; }
}
```

```exercise
goal: "Increment this instance's value using self."
lang: python
code: |
  class Counter:
      def __init__(self):
          self.value = 0

      def increment(self):
          value += 1

  counter = Counter()
  counter.increment()
  print(counter.value)
checks:
  - match: "^\\s+self\\.value\\s*\\+=\\s*1\\s*$"
    message: "Use self.value += 1 inside increment."
hint: "Use self.value += 1 inside increment."
```

```quiz
question: "What should hold state that is different for each instance?"
options:
  - "An attribute on self, initialized per instance."
  - "A shared list in the class body."
  - "A global variable."
answer: 0
explain: "Instance attributes created during initialization keep each instance's state separate."
```
