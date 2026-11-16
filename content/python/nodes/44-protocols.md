---
title: "Protocols"
icon: "🧩"
branch: "objects"
requires: ["type-hints", "inheritance"]
summary: "Describe capabilities through structural typing rather than a shared base class."
---
> "If it walks like a duck and quacks like a duck, it's a duck."

That's [[duck typing]], and Python has always worked this way. A function doesn't care **what class** an object is, only whether it has the methods it needs:

```python
class Duck:
    def speak(self):
        return "Quack"

class Robot:
    def speak(self):
        return "Beep boop"

def announce(thing):
    print(thing.speak())

announce(Duck())    # Quack
announce(Robot())   # Beep boop
```

`Duck` and `Robot` share no parent class, and they don't need one. That's very flexible, but it raises a question once you add [type hints](node:type-hints): what type is `thing`?

## Protocols: duck typing, written down

A [[protocol]] describes the shape you need: "anything with a `speak()` method that returns a string".

```python
from typing import Protocol

class Speaker(Protocol):
    def speak(self) -> str: ...

def announce(thing: Speaker) -> None:
    print(thing.speak())
```

The `...` is literally three dots: a body that does nothing. A protocol only describes the method; it doesn't implement it.

Here's the key difference from inheritance: **`Duck` and `Robot` don't change at all.** They never mention `Speaker`. A type checker looks at their methods, sees that they match, and accepts them. If you pass something without `speak`, it reports an error before the code runs.

## Protocols you already use

Python's built-ins are protocols in disguise. Implement the right dunder method, and your object joins in:

| Implement | And your object works with |
| --- | --- |
| `__len__` | `len(obj)` |
| `__iter__` | `for x in obj` |
| `__contains__` | `x in obj` |
| `__enter__` / `__exit__` | `with obj:` |

The `collections.abc` module has ready-made names for many of these, such as `Iterable`, `Sized` and `Mapping`. Prefer `Iterable[str]` over `list[str]` in a parameter type when you only loop over it; then callers can pass a list, a tuple, a set or a generator.

```compare go
type Speaker interface { Speak() string }
// Go interfaces are satisfied implicitly too: same idea.
```

```compare java
interface Speaker { String speak(); }
class Duck implements Speaker { ... }   // must be declared
```

```exercise
goal: "`announce` returns the method itself instead of its result. Call `speak`."
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
  - match: '^\s+return\s+speaker\.speak\(\s*\)\s*$'
    message: Use return speaker.speak().
hint: A method needs brackets to be called.
solution: |
  from typing import Protocol

  class Speaker(Protocol):
      def speak(self) -> str: ...

  class Duck:
      def speak(self) -> str:
          return "quack"

  def announce(speaker: Speaker) -> str:
      return speaker.speak()

  print(announce(Duck()))
```

```quiz
question: "To satisfy the `Speaker` protocol, what must the `Duck` class do?"
options:
  - Inherit from Speaker.
  - Have a matching speak method; nothing else.
  - Be registered with typing.register.
answer: 1
explain: Protocols are structural. Matching methods are enough; the class never has to mention the protocol.
```
