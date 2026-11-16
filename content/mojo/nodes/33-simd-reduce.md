---
title: SIMD reductions
icon: "🧮"
branch: comptime
requires: [simd-index]
summary: Combine all lanes into one number with reduce_add, reduce_max and friends.
---
A gym tracks the minutes each member exercised this week, eight members to a vector:

```mojo title=gym.mojo
def main():
    var minutes = SIMD[DType.int32, 8](120, 45, 200, 90, 0, 150, 60, 30)

    var total = minutes.reduce_add()
    var best = minutes.reduce_max()
    var worst = minutes.reduce_min()

    print("Total:", total)    # Total: 695
    print("Best:", best)      # Best: 200
    print("Worst:", worst)    # Worst: 0
    print("Average:", Float64(total) / 8.0)   # Average: 86.875
```

A **reduction** turns a whole vector into one value. The methods all follow the same naming pattern:

| Method | Combines lanes with | For our vector |
| --- | --- | --- |
| `reduce_add()` | `+` | 695 |
| `reduce_mul()` | `*` | 0 (one member skipped the gym) |
| `reduce_max()` | the larger one | 200 |
| `reduce_min()` | the smaller one | 0 |

**Why not write a loop?** You could: `comptime for i in range(8): total += minutes[i]`. But the reduction methods use special CPU instructions that combine lanes in a tree shape, pairing lanes up, then pairs of pairs, then the final pair. That's three steps for eight lanes instead of seven additions, and it's written for you.

**The typical pattern** in fast numeric code puts the last three lessons together:

1. Load data into vectors.
2. Do the heavy work lane by lane: `v * 2.0`, `a + b`.
3. Reduce at the end to get one answer.

```mojo
var a = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)
var b = SIMD[DType.float32, 4](4.0, 3.0, 2.0, 1.0)
var dot = (a * b).reduce_add()   # 4 + 6 + 6 + 4 = 20.0
```

That's a *dot product*, the core operation of machine learning, in one line.

**Watch the type of the result.** `reduce_add` on `int32` lanes gives an `Int32`, so a big enough sum can [overflow](node:integers). On `uint8` lanes, a total over 255 wraps around. Convert to a wider type first with `minutes.cast[DType.int64]()` when sums get big.

```compare python
import numpy as np
minutes = np.array([120, 45, 200, 90, 0, 150, 60, 30], dtype=np.int32)
minutes.sum(), minutes.max(), minutes.min()
```

```compare rust
let minutes = [120, 45, 200, 90, 0, 150, 60, 30];
let total: i32 = minutes.iter().sum();
```

```exercise
goal: "Replace the hand-written loop with a single reduction: `var total = scores.reduce_add()`."
code: |-
  def main():
      var scores = SIMD[DType.int32, 4](7, 9, 4, 10)
      var total: Int32 = 0
      comptime for i in range(4):
          total += scores[i]
      print(total)
checks:
  - match: 'var\s+total\s*=\s*scores\.reduce_add\(\)'
    message: Write var total = scores.reduce_add()
  - notMatch: 'comptime\s+for'
    message: Remove the loop.
solution: |-
  def main():
      var scores = SIMD[DType.int32, 4](7, 9, 4, 10)
      var total = scores.reduce_add()
      print(total)
```

```quiz
question: "What does `SIMD[DType.int32, 4](3, 9, 1, 5).reduce_max()` return?"
options:
  - "9"
  - "[9, 9, 9, 9]"
  - "18"
answer: 0
explain: A reduction combines all lanes into one value. The largest lane is 9.
```
