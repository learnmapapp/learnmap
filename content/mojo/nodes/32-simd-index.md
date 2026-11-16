---
title: SIMD lanes
icon: "🎯"
branch: comptime
requires: [simd]
summary: Read and write single lanes by index, and fill every lane at once.
---
**Question & answer, five quick ones.**

**How do I read one lane?** Index it like a list, starting at 0:

```mojo
var rgba = SIMD[DType.uint8, 4](255, 128, 0, 255)
print(rgba[0])   # 255: red
print(rgba[2])   # 0: blue
```

**Can I change a lane?** Yes, if the vector is a `var`:

```mojo
rgba[3] = 128    # half transparent
print(rgba)      # [255, 128, 0, 128]
```

**How do I loop over all lanes?** The width is a [parameter](node:parameters), so you can use it as a number. `comptime for` unrolls the loop at compile time:

```mojo title=channels.mojo
def main():
    comptime WIDTH = 4
    var rgba = SIMD[DType.uint8, WIDTH](255, 128, 0, 255)
    var names: List[String] = ["red", "green", "blue", "alpha"]
    comptime for i in range(WIDTH):
        print(names[i], rgba[i])
```

```repl shell
> mojo run channels.mojo
red 255
green 128
blue 0
alpha 255
```

**How do I fill every lane with the same value?** Pass a single value to the constructor:

```mojo
var zeros = SIMD[DType.float32, 8](0.0)   # eight zeros
var halves = SIMD[DType.float32, 4](0.5)  # [0.5, 0.5, 0.5, 0.5]
```

This is called *splatting*, and it's also what happened in the last lesson when you wrote `grams * 2.0`: Mojo spread the `2.0` across every lane before multiplying.

**What about an index that's too big?** `rgba[7]` on a four-lane vector is a bug: there is no lane 7. Index within `0` to width minus 1, just as with lists.

**A tip on performance.** Reading lanes one by one is fine for setup and printing, but it gives up the speed advantage. Keep the hot code working on whole vectors (`a + b`, `v * 2.0`), and only touch single lanes at the edges. When you need to combine all lanes into one answer, there's a better tool: [reductions](node:simd-reduce).

```compare python
import numpy as np
rgba = np.array([255, 128, 0, 255], dtype=np.uint8)
rgba[3] = 128
```

```compare rust
let mut rgba = [255u8, 128, 0, 255];
rgba[3] = 128;
```

```exercise
goal: "Make the pixel fully opaque: set lane 3 of `pixel` to 255."
code: |-
  def main():
      var pixel = SIMD[DType.uint8, 4](30, 60, 90, 0)
      print(pixel)
checks:
  - match: 'pixel\[\s*3\s*\]\s*=\s*255'
    message: Write pixel[3] = 255 before the print.
solution: |-
  def main():
      var pixel = SIMD[DType.uint8, 4](30, 60, 90, 0)
      pixel[3] = 255
      print(pixel)
```

```quiz
question: "What does `SIMD[DType.int32, 4](7)` contain?"
options:
  - "[7, 0, 0, 0]"
  - "[7, 7, 7, 7]"
  - It's a compile error; you must pass 4 values.
answer: 1
explain: A single value is splatted across all lanes.
```
