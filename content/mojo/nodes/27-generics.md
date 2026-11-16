---
title: Trait-constrained functions
icon: 🔢
branch: types
requires:
  - traits
  - functions
summary: A type parameter constrained by a trait lets a function use that trait’s required methods
  while retaining a concrete input type.
---

A type parameter constrained by a trait lets a function use that trait’s required methods while retaining a concrete input type.

```mojo
trait Readable:
    def reading(self) -> Float64:
        ...
@fieldwise_init
struct Sensor(Readable):
    def reading(self) -> Float64:
        return 8.0
def read_value[T: Readable](item: T) -> Float64:
    return item.reading()

def main() raises:
    var sensor = Sensor()
    print(read_value(sensor))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about trait-constrained functions.
lang: mojo
code: |-
  trait Readable:
      def reading(self) -> Float64:
          ...
  @fieldwise_init
  struct Sensor(Readable):
      def reading(self) -> Float64:
          return 8.0
  def read_value[T: Readable](item: T) -> Float64:
      return 0.0

  def main() raises:
      var sensor = Sensor()
      print(read_value(sensor))
checks:
  - match: return\s+item\.reading\(\)
    message: Use return item.reading() for this step.
  - notMatch: return\s+0\.0
    message: Replace return 0.0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "What capability does `T: Readable` guarantee to `read_value`?"
options:
  - The operations required by `Readable`.
  - That every `T` is a `Float64`.
  - That `T` contains no mutable fields.
answer: 0
explain: A trait constraint supplies the capabilities generic code may rely on.
```
