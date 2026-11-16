---
title: "Properties"
icon: "📐"
branch: "objects"
requires: ["classes", "raising-errors"]
summary: "Expose computed attributes and validate assignments through methods."
---

A [[property]] lets callers use attribute syntax while a method computes the result:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

rectangle = Rectangle(3, 4)
print(rectangle.area)  # 12, without parentheses
```

`@property` is a [[decorator]]: it transforms the method into an attribute interface. The area is computed on access, so it reflects the current dimensions rather than a separately maintained cached value.

## Validate a write

A setter uses the same public name and can enforce a rule:

```python
class Temperature:
    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("below absolute zero")
        self._celsius = value
```

Assign `temperature.celsius = 20` before reading in this minimal example. The backing attribute `_celsius` is an implementation detail. Setting `self.celsius` inside its own setter would call the setter recursively.

Keep properties cheap and unsurprising. An operation that performs slow I/O or changes unrelated state is usually clearer as an explicit method call.

```exercise
goal: "Make area a computed attribute using @property."
lang: python
code: |
  class Rectangle:
      def __init__(self, width, height):
          self.width = width
          self.height = height

      def area(self):
          return self.width * self.height

  print(Rectangle(3, 4).area)
checks:
  - match: "^\\s+@property\\s*\\n\\s+def\\s+area\\("
    message: "Add @property directly above def area."
hint: "Add @property directly above def area."
```

```quiz
question: How do you read an area method decorated with @property?
options:
  - rectangle.area
  - "`rectangle.area()`"
  - "`property(rectangle)`"
answer: 0
explain: Properties expose a method through ordinary attribute access.
```
