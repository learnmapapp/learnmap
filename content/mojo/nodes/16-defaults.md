---
title: Default arguments
icon: "🎛️"
branch: functions
requires: [functions]
summary: Give parameters default values so callers can leave out the common choices.
---
**FAQ: default arguments**

**What are they?** Values that a parameter gets when the caller doesn't pass one:

```mojo title=coffee.mojo
def order(drink: String, size: String = "medium", shots: Int = 1):
    print(t"{size} {drink}, {shots} shot(s)")

def main():
    order("latte")                    # medium latte, 1 shot(s)
    order("flat white", "small")      # small flat white, 1 shot(s)
    order("americano", "large", 3)    # large americano, 3 shot(s)
```

**Do the defaults have to come last?** Yes. Once a parameter has a default, the ones after it need one too. Otherwise `order("latte", 2)` would be ambiguous: is 2 the size or the shots?

**Can I skip a middle one?** Not by position. To set `shots` but keep the default `size`, name it: `order("mocha", shots=2)`. That's the topic of [named arguments](node:named-args).

**When should I use a default?** When almost every caller passes the same value. A good test: if you'd have to explain the default in the documentation as "usually just pass X", make X the default. If callers pick different values all the time, keep it required, so nobody forgets to think about it.

```compare python
def order(drink: str, size: str = "medium", shots: int = 1):
    print(f"{size} {drink}, {shots} shot(s)")
```

```compare javascript
function order(drink, size = "medium", shots = 1) { }
```

```compare rust
// Rust has no default arguments; use separate functions or a builder.
```

```exercise
goal: "Most greetings use \"Hello\". Give `greeting` the default value `\"Hello\"` so `greet(\"Sam\")` works."
code: |-
  def greet(name: String, greeting: String):
      print(t"{greeting}, {name}!")
checks:
  - match: 'greeting\s*:\s*String\s*=\s*"Hello"'
    message: 'Write greeting: String = "Hello"'
solution: |-
  def greet(name: String, greeting: String = "Hello"):
      print(t"{greeting}, {name}!")
```

```quiz
question: "Why doesn't `def f(a: Int = 1, b: Int):` compile?"
options:
  - Int parameters can't have defaults.
  - A parameter without a default can't follow one with a default.
  - Defaults must be strings.
answer: 1
explain: Otherwise a call like f(5) would be ambiguous.
```
