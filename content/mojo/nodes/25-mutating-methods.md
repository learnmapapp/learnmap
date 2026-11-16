---
title: Mutating methods
icon: 🧪
branch: types
requires:
  - initializers
  - mutable-args
summary: Use mut self when a method updates fields.
---

Use mut self when a method updates fields. The receiver’s state change is then visible after the call.

```mojo
@fieldwise_init
struct Counter:
    var value: Int
    def increment(mut self):
        self.value += 1

def main() raises:
    var counter = Counter(0)
    counter.increment()
    print(counter.value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about mutating methods.
lang: mojo
code: |-
  @fieldwise_init
  struct Counter:
      var value: Int
      def increment(mut self):
          self.value -= 1

  def main() raises:
      var counter = Counter(0)
      counter.increment()
      print(counter.value)
checks:
  - match: self\.value\s+\+=\s+1
    message: Use self.value += 1 for this step.
  - notMatch: self\.value\s+\-=\s+1
    message: Replace self.value -= 1 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which receiver permits an increment method to update the instance's field?
options:
  - A compile-time alias of the struct name.
  - "`mut self`"
  - Plain `self` without mutable access.
answer: 1
explain: The receiver convention makes instance mutation part of the method's interface.
```
