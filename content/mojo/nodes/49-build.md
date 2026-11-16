---
title: Build a native program
icon: "🛠️"
branch: tools
requires: [mojo]
summary: mojo build compiles your code into a standalone executable you can run without Mojo.
---
So far, every example used `mojo run`, which compiles and runs in one go. That's perfect while you're writing code. To *ship* a program, you build it once:

```repl shell
> mojo build hello.mojo
> ./hello
Hello, Mojo! 🔥
```

`mojo build` produces an executable file named after the source file, here `hello`. It's a native program: you start it directly, and it doesn't compile anything when it starts.

**`mojo run` versus `mojo build`:**

| | `mojo run file.mojo` | `mojo build file.mojo` |
| --- | --- | --- |
| Produces | nothing you keep | an executable file |
| Every time you run it | compiles first | starts instantly |
| Use it for | development, quick experiments | releases, benchmarks, deployment |

**Choose the output name** with `-o`:

```repl shell
> mojo build main.mojo -o shop
> ./shop
```

**Debug and release.** By default, `mojo build` optimizes the code, so it runs fast. Add `-D ASSERT=all` to turn on every internal check in the standard library, which catches more mistakes at the cost of some speed:

```repl shell
> mojo build -D ASSERT=all main.mojo -o shop-debug
```

**Build-time settings.** That `-D` flag can pass your own values too, which your code reads at [compile time](node:comptime):

```mojo title=main.mojo
from std.sys import get_defined_string

def main():
    comptime mode = get_defined_string["mode", "debug"]()
    comptime if mode == "release":
        print("fast path")
    else:
        print("debug path, with extra checks")
```

`mojo build -D mode=release main.mojo` builds the first branch; without the flag, `mode` is `"debug"`. The branch that isn't chosen isn't even in the executable.

**A native executable is built for one kind of machine.** A program built on an ARM Mac runs on ARM Macs; for Linux servers, build it on (or for) Linux.

**Benchmarking?** Always measure the built program, not `mojo run`. Otherwise the compile time ends up in your numbers.

```compare rust
// cargo build --release
// ./target/release/hello
```

```compare python
# Python has no compile step; tools like PyInstaller bundle the
# interpreter with your script instead.
```

```exercise
goal: "Complete the command that compiles `server.mojo` into an executable called `api`."
lang: shell
code: |-
  mojo server.mojo -o api
checks:
  - match: '^mojo\s+build\s+server\.mojo\s+-o\s+api\s*$'
    message: Use mojo build server.mojo -o api
solution: |-
  mojo build server.mojo -o api
```

```quiz
question: "Which command should you use when timing how fast your program is?"
options:
  - "`mojo run`, because it's simpler."
  - "Run the executable from `mojo build`, so compile time isn't included."
  - It makes no difference.
answer: 1
explain: mojo run compiles before running, so its timings include the compiler's work.
```
