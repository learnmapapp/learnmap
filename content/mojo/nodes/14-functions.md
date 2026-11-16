---
title: Typed function signatures
icon: "🧩"
branch: functions
requires: [integers]
summary: def with typed parameters, and -> for the type of the result.
---
A Mojo function looks like a Python function where all the type hints are mandatory:

```mojo title=area.mojo
def rectangle_area(width: Float64, height: Float64) -> Float64:
    return width * height

def main():
    var area = rectangle_area(3.0, 4.5)
    print(t"Area: {area} m²")
```

```repl shell
> mojo run area.mojo
Area: 13.5 m²
```

Let's take the signature apart:

```text
def rectangle_area(width: Float64, height: Float64) -> Float64:
    ^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^     ^^^^^^^
    name           parameter 1     parameter 2         result type
```

- **Every parameter needs a type.** `def area(width, height)` won't compile.
- **`-> Type`** says what the function returns. Leave it out when the function returns nothing, like `main`.
- **Functions can be defined in any order.** `main` can call a function defined below it.

**Why bother with all these types?** Because the compiler checks every call against them. `rectangle_area("3", 4.5)` fails to build, with an error pointing at the call. In Python, the same mistake would only show up when that line runs, maybe in production. The signature also works as documentation: you can see what goes in and what comes out without reading the body.

**Mojo checks the result too.** If a function says `-> Float64`, every path through it must return a `Float64`. Forget the `return` in one branch, and the compiler tells you.

A detail you'll meet later: a function that can fail says so in its signature with [`raises`](node:errors), like `def load(path: String) raises -> String`. And functions can take compile-time parameters in square brackets, which is what [parameters](node:parameters) is about.

```compare python
def rectangle_area(width: float, height: float) -> float:
    return width * height   # hints are optional and not enforced
```

```compare javascript
function rectangleArea(width, height) {
  return width * height;
}
```

```compare rust
fn rectangle_area(width: f64, height: f64) -> f64 {
    width * height
}
```

```exercise
goal: "Add the missing types: `celsius` is a `Float64`, and the function returns a `Float64`."
code: |-
  def to_fahrenheit(celsius):
      return celsius * 9.0 / 5.0 + 32.0
checks:
  - match: 'def\s+to_fahrenheit\(\s*celsius\s*:\s*Float64\s*\)\s*->\s*Float64\s*:'
    message: 'Write def to_fahrenheit(celsius: Float64) -> Float64:'
solution: |-
  def to_fahrenheit(celsius: Float64) -> Float64:
      return celsius * 9.0 / 5.0 + 32.0
```

```quiz
question: "`def log(message: String):` has no arrow. What does it return?"
options:
  - A String.
  - Nothing.
  - It doesn't compile.
answer: 1
explain: Without -> the function returns no value, like main.
```
