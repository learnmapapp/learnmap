---
title: Trait contracts
icon: 🏷️
branch: types
requires:
  - methods
summary: A trait lists required capabilities.
---

A trait lists required capabilities. A struct explicitly declares conformance and supplies the required implementations.

A useful term here is [[trait]]: An explicitly adopted contract of methods and compile-time requirements.

```mojo
trait Readable:
    def reading(self) -> Float64:
        ...
@fieldwise_init
struct Sensor(Readable):
    def reading(self) -> Float64:
        return 21.5

def main() raises:
    var sensor = Sensor()
    print(sensor.reading())
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about trait contracts.
lang: mojo
code: |-
  trait Readable:
      def reading(self) -> Float64:
          ...
  @fieldwise_init
  struct Sensor(Readable):
      def reading(self) -> Float64:
          return 0.0

  def main() raises:
      var sensor = Sensor()
      print(sensor.reading())
checks:
  - match: return\s+21\.5
    message: Use return 21.5 for this step.
  - notMatch: return\s+0\.0
    message: Replace return 0.0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about trait contracts is correct?
options:
  - Matching method names alone automatically declares conformance.
  - Traits directly allocate instance fields.
  - A trait lists required capabilities. A struct explicitly declares conformance and supplies the
    required implementations.
answer: 2
explain: A trait lists required capabilities. A struct explicitly declares conformance and supplies
  the required implementations.
```
