---
title: Type aliases
icon: "🪪"
branch: comptime
requires: [comptime]
summary: Give a type a meaningful name with comptime, and change it in one place.
---
**A recipe for flexible number types.**

**The situation:** a physics simulation uses `Float64` everywhere. Someone asks whether `Float32` would be faster and still accurate enough. Changing it means editing forty type annotations, and missing one gives a confusing type error.

**The ingredient:** `comptime` doesn't only hold numbers. It can hold a **type**:

```mojo title=physics.mojo
comptime Real = Float64

@fieldwise_init
struct Particle(Copyable):
    var x: Real
    var velocity: Real

def step(mut p: Particle, dt: Real):
    p.x += p.velocity * dt

def main():
    var p = Particle(0.0, 2.5)
    step(p, 0.1)
    print(p.x)   # 0.25
```

**The method:**

1. Pick a name that says what the type *means* in your program, not how it's stored: `Real`, `Money`, `Score`, `PixelValue`.
2. Define it once with `comptime Name = Type`.
3. Use the name everywhere.

Now the experiment is a one-line change: `comptime Real = Float32`, rebuild, measure.

**Good to know:**

- An alias is **just another name**, not a new type. A `Real` and a `Float64` mix freely, because they're the same thing. If you want the compiler to keep two kinds of numbers apart, like meters and seconds, define [structs](node:structs) for them instead.
- **Aliases can have parameters.** `comptime Vec4 = SIMD[DType.float32, 4]` gives a short name to a long [SIMD](node:simd) type. You'll see that pattern a lot in numeric code.
- Like other comptime values, an alias can be defined at the top of a file or inside a function.
- Type names are `PascalCase` by convention, like `Real` and `Vec4`, so they look like the types they stand for.

```compare python
Real = float               # type alias, used by type checkers
type Real = float          # Python 3.12+ syntax
```

```compare rust
type Real = f64;
```

```compare javascript
// TypeScript: type Real = number;
```

```exercise
goal: "Add the alias `comptime Score = Int` at the top, and use `Score` as the parameter and return type."
code: |-
  def double_points(points: Int) -> Int:
      return points * 2
checks:
  - match: 'comptime\s+Score\s*=\s*Int'
    message: 'Add comptime Score = Int at the top.'
  - match: 'def\s+double_points\(\s*points\s*:\s*Score\s*\)\s*->\s*Score'
    message: 'Use Score in the signature: def double_points(points: Score) -> Score:'
solution: |-
  comptime Score = Int

  def double_points(points: Score) -> Score:
      return points * 2
```

```quiz
question: "After `comptime Meters = Float64`, can you add a Meters and a Float64?"
options:
  - Yes, they're the same type.
  - No, the compiler keeps them apart.
  - Only after converting with Meters(...).
answer: 0
explain: An alias is just a second name for the same type.
```
