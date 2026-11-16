---
title: "Protocols"
icon: "🧩"
branch: "objects"
requires: ["type-hints", "inheritance"]
summary: "Describe capabilities through structural typing rather than a shared base class."
---

A [[protocol]] describes the methods or attributes a value needs. A static checker accepts compatible objects based on their structure:

```python
from typing import Protocol

class Speaker(Protocol):
    def speak(self) -> str: ...

class Duck:
    def speak(self) -> str:
        return "quack"

def announce(speaker: Speaker) -> str:
    return speaker.speak()

print(announce(Duck()))  # quack
```

`Duck` does not inherit from `Speaker`. Its compatible `speak` method satisfies the protocol. This expresses [[duck typing]] in a form that a checker can verify.

## Static contracts

A protocol is primarily a static interface, not an automatic runtime validator. `@runtime_checkable` permits limited runtime checks, but those inspect member presence rather than verifying complete method signatures or value types.

Keep protocols focused on the capability a caller actually needs. A function that writes messages may need only a `write(text: str) -> int` method, rather than an entire concrete file class. That makes small in-memory implementations easy to substitute in tests.

Use the ordinary class when callers need that concrete implementation; use a protocol when multiple independent implementations should fulfill the same small contract.

```compare go
type Speaker interface {
    Speak() string
} // implementations satisfy the method set implicitly
```

```exercise
goal: Call the speak method rather than returning the method object.
lang: python
code: |
  from typing import Protocol

  class Speaker(Protocol):
      def speak(self) -> str: ...

  class Duck:
      def speak(self) -> str:
          return "quack"

  def announce(speaker: Speaker) -> str:
      return speaker.speak

  print(announce(Duck()))
checks:
  - match: ^\s+return\s+speaker\.speak\(\s*\)\s*$
    message: Use return speaker.speak().
hint: Use return `speaker.speak()`.
```

```quiz
question: "Must Duck inherit Speaker to satisfy a compatible Speaker protocol?"
options:
  - "Yes, otherwise no checker can accept it."
  - "No, a compatible structure is enough."
  - "Only if it has an initializer."
answer: 1
explain: "Protocols support structural typing: compatible methods and attributes satisfy the contract."
```
