---
title: Custom initializers
icon: 🛠️
branch: types
requires:
  - structs
summary: An initializer uses out self to construct an instance and must initialize its fields before
  returning successfully.
---

An initializer uses out self to construct an instance and must initialize its fields before returning successfully.

```mojo
struct Counter:
    var value: Int
    def __init__(out self, start: Int):
        self.value = start

def main() raises:
    var counter = Counter(2)
    print(counter.value)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about custom initializers.
lang: mojo
code: |-
  struct Counter:
      var value: Int
      def __init__(out self, start: Int):
          self.value = 0

  def main() raises:
      var counter = Counter(2)
      print(counter.value)
checks:
  - match: self\.value\s+=\s+start
    message: Use self.value = start for this step.
  - notMatch: self\.value\s+=\s+0
    message: Replace self.value = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What must a successful custom initializer do with the struct's fields?
options:
  - Leave unused fields uninitialized for later callers.
  - Assign runtime defaults in their field declarations instead.
  - Initialize every field before returning.
answer: 2
explain: Construction must establish a usable initialized instance.
```
