---
title: SIMD vectors
icon: "🚀"
branch: comptime
requires: [arrays]
summary: Do the same maths on several numbers at once with @Vector.
---
Modern CPUs can add four (or eight, or sixteen) numbers in a single instruction. That's called **SIMD**: Single Instruction, Multiple Data. In C you'd reach for strange platform-specific functions. In Zig there's a built-in type:

```zig title=vectors.zig
const std = @import("std");

pub fn main() void {
    const prices: @Vector(4, f32) = .{ 10, 20, 30, 40 };
    const half: @Vector(4, f32) = @splat(0.5); // sale!

    const sale = prices * half; // four multiplications, one instruction
    const total = @reduce(.Add, sale);

    std.debug.print("{any}\n", .{sale});
    std.debug.print("total: {d:.2}\n", .{total});
}
```

```repl shell
> zig run vectors.zig
{ 5, 10, 15, 20 }
total: 50.00
```

The ingredients:

- **`@Vector(4, f32)`**: four `f32` values, treated as one unit. Normal operators (`+`, `*`, `<`...) work element by element.
- **`@splat(x)`**: a vector with `x` in every position. The length and type come from the variable it's assigned to.
- **`@reduce(.Add, v)`**: combines all the elements into one value. `.Mul`, `.Min`, `.Max`, `.And` and `.Or` exist too.
- Comparing two vectors gives a vector of `bool`s. Combine it with `@reduce(.And, ...)` to ask "are all of these true?"

Vectors convert to and from arrays of the same length, so you can load a chunk of data from an array, compute on it, and store it back.

The same code compiles everywhere. On a CPU without SIMD, Zig falls back to ordinary instructions.

```tip
Vectors matter in tight loops over lots of numbers: audio, images, physics, parsing. For everyday code, a normal loop is clearer, and the optimiser often vectorises it for you anyway.
```

```exercise
goal: Add up the elements of `v`. Replace the manual sum with @reduce.
code: |-
  fn sum(v: @Vector(4, u32)) u32 {
      return v[0] + v[1] + v[2] + v[3];
  }
checks:
  - match: 'return\s+@reduce\(\.Add,\s*v\)'
    message: Use @reduce(.Add, v).
solution: |-
  fn sum(v: @Vector(4, u32)) u32 {
      return @reduce(.Add, v);
  }
```

```quiz
question: "`const a: @Vector(3, i32) = .{ 1, 2, 3 };` What is `a * a`?"
options:
  - "14, the dot product."
  - "{ 1, 4, 9 }"
  - A compile error; vectors can't be multiplied.
answer: 1
explain: Operators work on each element separately. Use @reduce(.Add, a * a) for the dot product.
```
