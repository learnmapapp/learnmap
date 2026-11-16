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
question: How does a struct adopt the `Readable` trait?
options:
  - Define any method with a similar name, without declaring conformance.
  - Import the trait and leave its requirements unimplemented.
  - Declare conformance and implement its requirements.
answer: 2
explain: Trait conformance is explicit and checked by the compiler.
```
