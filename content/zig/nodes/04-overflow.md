---
title: Explicit overflow
icon: "🌊"
branch: basics
requires: [integers]
summary: Overflow is a bug by default; wrapping and saturating are opt-in.
---
What happens when a `u8` holding 255 gets one more? In C it silently becomes 0. In Zig, ordinary `+` treats overflow as a bug. In a debug build the program stops with a clear message:

```repl shell
> zig run overflow.zig
panic: integer overflow
```

When you *want* different behaviour, you say so with a different operator:

| Operator | Name | `255 + 1` as `u8` |
| --- | --- | --- |
| `+` | normal | panic (bug) |
| `+%` | wrapping | `0` |
| `+\|` | saturating | `255` |

The same goes for `-%`, `*%`, `-|` and `*|`.

```zig title=overflow.zig
const std = @import("std");

pub fn main() void {
    const max: u8 = 255;
    const wrapped = max +% 1; // 0, like a car odometer
    const capped = max +| 1; // 255, stays at the limit
    std.debug.print("{d} {d}\n", .{ wrapped, capped });
}
```

Wrapping is handy for hashes and checksums. Saturating suits values like volume or health points that should simply stop at the edge.

```tip
Zig has build modes. In `Debug` and `ReleaseSafe`, overflow panics. In `ReleaseFast`, the check is removed for speed, and overflow becomes undefined behaviour. So write the operator you mean, rather than relying on the panic.
```

```exercise
goal: The volume should stop at the maximum instead of overflowing. Use a saturating add.
code: |-
  fn louder(volume: u8) u8 {
      return volume + 10;
  }
checks:
  - match: 'volume\s*\+\|\s*10'
    message: Use the saturating operator +| so the volume caps at 255.
solution: |-
  fn louder(volume: u8) u8 {
      return volume +| 10;
  }
hint: Saturating operators end in a pipe, |.
```

```quiz
question: "`const x: u8 = 250; const y = x +% 10;` What is `y`?"
options:
  - "4"
  - "255"
  - It panics.
answer: 0
explain: Wrapping arithmetic goes past 255 and starts again at 0. 250 + 10 = 260, and 260 − 256 = 4.
```
