---
title: Compile-time checks
icon: "✅"
branch: design
requires: [constants, functions]
summary: Run Nim code while compiling with static and const, and stop a bad build with doAssert.
---
**Puzzle: what does this program print when it runs?**

```nim title=table.nim
func squares(n: int): seq[int] =
  for i in 1..n:
    result.add(i * i)

const lookup = squares(10)

static:
  echo "building with ", lookup.len, " squares"

echo lookup[4]
```

**Answer:** only `25`. The `"building with..."` line appears *while compiling*, in the compiler's output, and never again. Running the executable a hundred times prints `25` a hundred times, and never the build message.

That's the big idea: Nim can run ordinary Nim code at compile time. It has an interpreter built into the compiler.

**Two ways in:**

- **`const x = someCall()`** evaluates the call while compiling and bakes the result into the program. `lookup` above is a finished `seq` inside the executable; `squares` never runs at runtime. Great for lookup tables, parsed config embedded in the binary, precomputed values.
- **`static:` blocks** run arbitrary code while compiling, for checks and messages.

The code must be compile-time friendly: pure calculations work (a [func](node:functions) is ideal), while reading the network or the clock doesn't.

**Stopping a bad build.** Combine the two with an assertion. If someone edits a constant into a nonsense value, the build fails with your message, and the broken program is never produced:

```nim title=game.nim
const
  MaxPlayers = 8
  TeamSize = 3

static:
  doAssert MaxPlayers mod TeamSize == 0, "MaxPlayers must divide into full teams"
```

```repl shell
> nim c game.nim
error: Error: unhandled exception: ... MaxPlayers must divide into full teams [AssertionDefect]
```

`doAssert` works at runtime too; inside `static:` it checks while compiling.

**Reading files while compiling.** `staticRead("data/words.txt")` embeds a file's contents into the program as a string. The executable no longer needs the file next to it.

```compare python
# No compile step; module-level code runs at import time instead.
```

```compare javascript
// No compile-time evaluation; build tools generate files instead.
```

```compare rust
const fn square(n: u32) -> u32 { n * n }
const NINE: u32 = square(3);
const _: () = assert!(8 % 3 == 0, "MaxPlayers must divide into full teams");
```

```exercise
goal: "Make the build fail when `BufferSize` isn't a power of two: add a `static:` block with `doAssert BufferSize.isPowerOfTwo`. (1000 isn't one, so the build will then stop, as intended.)"
code: |-
  import std/math

  const BufferSize = 1000
checks:
  - match: 'static\s*:\s*\n\s+doAssert\s+(BufferSize\.isPowerOfTwo|isPowerOfTwo\(\s*BufferSize\s*\))'
    message: 'Add static: with doAssert BufferSize.isPowerOfTwo on the next line.'
solution: |-
  import std/math

  const BufferSize = 1000
  static:
    doAssert BufferSize.isPowerOfTwo
```

```quiz
question: "`const data = squares(10)`. When does `squares` run?"
options:
  - Every time the program starts.
  - Once, while compiling; the result is stored in the program.
  - The first time data is read.
answer: 1
explain: A const is evaluated by the compiler, so the finished value is in the executable.
```
