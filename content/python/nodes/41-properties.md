---
title: "Properties"
icon: "📐"
branch: "objects"
requires: ["classes", "raising-errors"]
summary: "Expose computed attributes and validate assignments through methods."
---
**Myth:** "Every attribute needs a getter and a setter, in case you need logic later."

**Reality:** in Python you start with plain attributes, and add logic later **without changing a single caller**. That's what a [[property]] is for.

Here's a thermostat with a plain attribute:

```python
class Thermostat:
    def __init__(self, celsius):
        self.celsius = celsius

t = Thermostat(21)
t.celsius = 23
```

Six months later, you need to reject impossible temperatures. In Java you'd regret not having `setCelsius`. In Python, you turn the attribute into a property:

```python
class Thermostat:
    def __init__(self, celsius):
        self.celsius = celsius          # goes through the setter too

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("below absolute zero")
        self._celsius = value
```

Callers still write `t.celsius = 23` and `print(t.celsius)`, but now your code runs on every read and write. The real value lives in `_celsius`; the leading underscore is a convention for "internal, please don't touch".

## Computed attributes

A property without a setter is a read-only, computed value. It reads like data, but it's calculated each time:

```python
    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32
```

```repl
> t = Thermostat(20)
> t.fahrenheit
68.0
> t.fahrenheit = 100
error: AttributeError: property 'fahrenheit' of 'Thermostat' object has no setter
```

Note: `t.fahrenheit`, no brackets. Properties are accessed like attributes, not called like methods.

```tip
Keep properties cheap and free of surprises. If it hits the network or takes a second, make it a regular method, so the call site shows that work is happening.
```

```compare kotlin
var celsius: Double = 0.0
    set(value) { require(value >= -273.15); field = value }
```

```compare javascript
class Thermostat {
  get fahrenheit() { return this.celsius * 9 / 5 + 32; }
}
```

```exercise
goal: "`print(...area)` shows a method object instead of 12. Make `area` a property."
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
  - match: '^\s+@property\s*\n\s+def\s+area\('
    message: "Add @property directly above def area."
hint: The decorator goes on the line above def.
solution: |
  class Rectangle:
      def __init__(self, width, height):
          self.width = width
          self.height = height

      @property
      def area(self):
          return self.width * self.height

  print(Rectangle(3, 4).area)
```

```quiz
question: "You turn a plain attribute `price` into a property with a setter. What do callers that wrote `item.price = 10` need to change?"
options:
  - They must call item.set_price(10).
  - Nothing; the assignment now runs the setter.
  - They must write item.price(10).
answer: 1
explain: That's the point of properties. The attribute syntax stays the same, so you can add logic later without touching callers.
```
