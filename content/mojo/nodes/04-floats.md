---
title: Floating-point computation
icon: "🌊"
branch: basics
requires: [integers]
summary: Float64 and friends, and why 0.1 + 0.2 still isn't 0.3.
---
For numbers with a fractional part, Mojo's default is `Float64`, a 64-bit floating-point number. It's the same kind of number as Python's `float` and JavaScript's `number`:

```mojo title=pace.mojo
def main():
    var distance: Float64 = 10.0   # kilometers
    var minutes: Float64 = 52.5
    var pace = minutes / distance
    print("Pace:", pace, "min/km")
```

```repl shell
> mojo run pace.mojo
Pace: 5.25 min/km
```

A literal with a dot, like `2.5`, is a float, and a variable initialized with one becomes `Float64`.

**The usual floating-point caveat applies.** Floats store numbers in binary, so most decimal fractions are approximations:

```mojo
var a: Float64 = 0.1
var b: Float64 = 0.2
print(a + b == 0.3)   # False
```

That's not a Mojo quirk. Every language that uses standard floats behaves this way. Compare floats with a small tolerance instead: `abs(a - b) < 1e-9`. And never use floats for money; count cents in an `Int` instead.

**Smaller floats.** Like integers, floats come in sizes:

| Type | Bits | Typical use |
| --- | --- | --- |
| `Float64` | 64 | the default: about 15–16 significant digits |
| `Float32` | 32 | graphics, games, large arrays, about 7 digits |
| `Float16`, `BFloat16` | 16 | machine-learning models |

Smaller floats lose precision, but they use less memory, and a CPU can process twice as many `Float32`s as `Float64`s in one [SIMD](node:simd) instruction. That's why ML code uses them so much.

**Division.** `/` divides floats normally. For integers, `//` divides and rounds down, and `%` gives the remainder: `17 // 5` is 3, `17 % 5` is 2.

Floats also have the special values `inf` and `nan`, which you get from things like dividing by zero. They behave the same as in Python and JavaScript.

```compare python
pace = 52.5 / 10.0   # 5.25
0.1 + 0.2 == 0.3     # False here too
```

```compare javascript
0.1 + 0.2 === 0.3;   // false
```

```compare rust
let pace: f64 = 52.5 / 10.0;
```

```exercise
goal: "The vertex positions are for a graphics card, which wants 32-bit floats. Change both types to `Float32`."
code: |-
  def main():
      var x: Float64 = 0.5
      var y: Float64 = -0.25
checks:
  - match: 'var\s+x\s*:\s*Float32\s*='
    message: 'Make x a Float32.'
  - match: 'var\s+y\s*:\s*Float32\s*='
    message: 'Make y a Float32.'
solution: |-
  def main():
      var x: Float32 = 0.5
      var y: Float32 = -0.25
```

```quiz
question: "`a` and `b` are `Float64` variables holding 0.1 and 0.2. What does `print(a + b == 0.3)` print?"
options:
  - "True"
  - "False"
  - It's a compile error.
answer: 1
explain: Neither 0.1 nor 0.2 can be stored exactly in binary, so the sum is very slightly off.
```
