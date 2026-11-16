---
title: Read-only methods
icon: 🌐
branch: types
requires:
  - structs
  - functions
summary: Methods organize behavior beside the data it uses.
---

Methods organize behavior beside the data it uses. A self receiver can read fields without granting mutation of the instance.

```mojo
@fieldwise_init
struct Point:
    var x: Int
    var y: Int
    def total(self) -> Int:
        return self.x + self.y

def main() raises:
    var point = Point(3, 4)
    print(point.total())
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about read-only methods.
lang: mojo
code: |-
  @fieldwise_init
  struct Point:
      var x: Int
      var y: Int
      def total(self) -> Int:
          return self.x - self.y

  def main() raises:
      var point = Point(3, 4)
      print(point.total())
checks:
  - match: self\.x\s+\+\s+self\.y
    message: Use self.x + self.y for this step.
  - notMatch: self\.x\s+\-\s+self\.y
    message: Replace self.x - self.y in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about read-only methods is correct?
options:
  - Methods organize behavior beside the data it uses. A self receiver can read fields without
    granting mutation of the instance.
  - Every method implicitly mutates its receiver.
  - Methods must be defined outside their struct.
answer: 0
explain: Methods organize behavior beside the data it uses. A self receiver can read fields without
  granting mutation of the instance.
```
