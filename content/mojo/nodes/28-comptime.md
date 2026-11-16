---
title: Compile-time constants
icon: "⏱️"
branch: comptime
requires: [integers]
summary: comptime computes a value while the program is being compiled, so it costs nothing at runtime.
---
Every Mojo program lives through two moments:

1. **Compile time**: `mojo build` (or `mojo run`) reads your code and turns it into machine code.
2. **Runtime**: the machine code runs, perhaps millions of times, on other people's computers.

Anything you can work out at moment 1 doesn't have to be worked out at moment 2. The keyword for that is [[comptime]]:

```mojo title=pixels.mojo
comptime WIDTH = 1920
comptime HEIGHT = 1080
comptime PIXELS = WIDTH * HEIGHT
comptime BYTES_PER_PIXEL = 4

def main():
    print("Frame buffer:", PIXELS * BYTES_PER_PIXEL, "bytes")
```

```repl shell
> mojo run pixels.mojo
Frame buffer: 8294400 bytes
```

`PIXELS * BYTES_PER_PIXEL` was calculated by the compiler. The finished program just contains the number 8294400, as if you'd typed it in yourself.

**`comptime` versus `var`:**

| | `var` | `comptime` |
| --- | --- | --- |
| Value known | when that line runs | when compiling |
| Can change | yes | never |
| Can be used in `[...]` | no | yes |

That last row is the important one for what's coming. Square brackets in Mojo hold [parameters](node:parameters), values the compiler needs to know, like the size of a [SIMD](node:simd) vector. A `var` can't go there, because its value only exists at runtime. A `comptime` value can.

**Not just numbers.** Strings, booleans, even types can be `comptime`. And you can make *decisions* at compile time:

```mojo
comptime DEBUG = False

def main():
    comptime if DEBUG:
        print("debug: starting up")
    print("Hello")
```

With `comptime if`, the branch that isn't taken is removed from the program completely. Your debugging code costs nothing in the release build.

By convention, names of top-level constants are `UPPER_CASE`, like in Python. Older Mojo code used `alias` for the same thing; you'll still see it in blog posts.

```compare python
WIDTH = 1920   # a convention: nothing stops reassignment
```

```compare rust
const WIDTH: usize = 1920;
const PIXELS: usize = WIDTH * 1080;
```

```compare javascript
const WIDTH = 1920;   // constant binding, but computed at runtime
```

```exercise
goal: "`SECONDS_PER_DAY` never changes. Make it a compile-time constant with `comptime` instead of `var`."
code: |-
  def main():
      var SECONDS_PER_DAY = 24 * 60 * 60
      print(SECONDS_PER_DAY * 7)
checks:
  - match: 'comptime\s+SECONDS_PER_DAY\s*=\s*24\s*\*\s*60\s*\*\s*60'
    message: 'Write comptime SECONDS_PER_DAY = 24 * 60 * 60'
  - notMatch: 'var\s+SECONDS_PER_DAY'
    message: Replace the var, don't add a second declaration.
solution: |-
  def main():
      comptime SECONDS_PER_DAY = 24 * 60 * 60
      print(SECONDS_PER_DAY * 7)
```

```quiz
question: "Which value can go inside square brackets, like `SIMD[DType.float32, N]`?"
options:
  - A var read from user input.
  - A comptime constant.
  - Both.
answer: 1
explain: Square brackets take parameters, which the compiler must know. A var only has a value at runtime.
```
