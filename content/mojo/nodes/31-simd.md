---
title: SIMD vectors
icon: "⚡"
branch: comptime
requires: [parameters]
summary: One SIMD value holds several numbers, and one operation works on all of them at once.
---
Picture a cashier scanning groceries one item at a time. Now picture four cashiers side by side, each scanning one item, all at the same moment. Same work, four times the speed.

Modern CPUs have that second setup built in. A single instruction can add, multiply or compare **several numbers at once**. That's called [[SIMD]]: *Single Instruction, Multiple Data*. Most languages hide it, and hope the compiler uses it for you. Mojo makes it an ordinary type:

```mojo title=recipe.mojo
def main():
    # grams of flour, sugar, salt and butter, for one cake
    var grams = SIMD[DType.float32, 4](250.0, 100.0, 2.5, 75.0)
    var for_two_cakes = grams * 2.0
    print(for_two_cakes)
```

```repl shell
> mojo run recipe.mojo
[500.0, 200.0, 5.0, 150.0]
```

One multiplication, four results. Each slot in the vector is called a **lane**.

**Reading the type** `SIMD[DType.float32, 4]`:

- **`DType.float32`** is the [[dtype]], the kind of number in every lane. Others include `DType.int32`, `DType.uint8` and `DType.float64`.
- **`4`** is the number of lanes. It must be a power of two (1, 2, 4, 8, 16...), because that's how the hardware is built.
- Both are [parameters](node:parameters), in square brackets, because the compiler must know them to pick the right CPU instructions.

**Operations work lane by lane.** Two vectors of the same type combine pairwise:

```mojo
var a = SIMD[DType.int32, 4](1, 2, 3, 4)
var b = SIMD[DType.int32, 4](10, 20, 30, 40)
print(a + b)   # [11, 22, 33, 44]
print(a * b)   # [10, 40, 90, 160]
```

**A surprise:** you've been using SIMD all along. `Float32` is a [type alias](node:type-aliases) for `SIMD[DType.float32, 1]`, a vector with a single lane. Mojo's sized number types are all built on SIMD, which is why a scalar and a vector feel so similar to work with.

**Where does this matter?** Image processing, audio, physics, machine learning: anywhere the same calculation runs over many numbers. You won't use SIMD for a shopping list. You'll use it for the inner loop that processes a million pixels.

```compare python
# Plain Python handles one number at a time. NumPy uses SIMD internally:
import numpy as np
grams = np.array([250.0, 100.0, 2.5, 75.0], dtype=np.float32) * 2.0
```

```compare rust
// Rust's portable SIMD is still unstable (nightly only):
// let grams = f32x4::from_array([250.0, 100.0, 2.5, 75.0]) * f32x4::splat(2.0);
```

```exercise
goal: "Create `heights` as a SIMD vector of 4 `float64` values: 1.62, 1.75, 1.80, 1.68."
code: |-
  def main():
      var heights = SIMD[DType.float32, 3](1.62, 1.75, 1.80, 1.68)
      print(heights)
checks:
  - match: 'SIMD\[\s*DType\.float64\s*,\s*4\s*\]\(\s*1\.62\s*,\s*1\.75\s*,\s*1\.80?\s*,\s*1\.68\s*\)'
    message: 'Use SIMD[DType.float64, 4] with the four heights.'
solution: |-
  def main():
      var heights = SIMD[DType.float64, 4](1.62, 1.75, 1.80, 1.68)
      print(heights)
```

```quiz
question: "Why doesn't `SIMD[DType.float32, 3]` compile?"
options:
  - float32 vectors must have at least 4 lanes.
  - The number of lanes must be a power of two.
  - SIMD only works with integers.
answer: 1
explain: The hardware works with 1, 2, 4, 8, 16... lanes, so the width must be a power of two.
```
