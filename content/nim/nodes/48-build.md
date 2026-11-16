---
title: Build configurations
icon: "🏗️"
branch: tools
requires: [nim, when]
summary: Debug, release and danger builds, -d defines, and putting compiler flags in a config file.
---
**Q&A with the compiler.** Common questions about `nim c`, answered.

**"My program is slow. Am I doing something wrong?"**

Possibly not: by default `nim c` makes a **debug build**. It keeps every safety check and adds debugging information, and it's not optimized. For speed, ask for a release build:

```repl shell
> nim c -d:release app.nim
```

**"What are the build modes, exactly?"**

| Command | Optimized | Runtime checks | Use it for |
| --- | --- | --- | --- |
| `nim c app.nim` | no | all | everyday development |
| `nim c -d:release app.nim` | yes | most kept | what you ship |
| `nim c -d:danger app.nim` | yes | all removed | measured hot spots, after testing |

The checks are things like index bounds, integer overflow and nil access. A release build keeps them, so a bug still stops loudly. A danger build turns them off, so a bug becomes silent memory corruption. Use it only when you've measured that the checks matter.

**"What does `-d:` actually do?"**

It *defines* a symbol, which your code can test with [when defined(...)](node:when). `release` and `danger` are just names the standard library looks for. Your own work the same way:

```nim
when defined(release):
  const logLevel = "warn"
else:
  const logLevel = "debug"
```

You can define values, too: `-d:port=8080` together with `const port {.intdefine.} = 3000` in the code. Without the flag, `port` is 3000.

**"Where does the executable go, and what's it called?"**

Next to the source, named after it. Change that with `--out`: `nim c -d:release --out:bin/app app.nim`.

**"I'm tired of typing the same flags."**

Put them in a config file named after your program with a `.nims` extension, next to `app.nim`:

```nim title=app.nims
switch("define", "release")
switch("out", "bin/app")
```

Now plain `nim c app.nim` uses those flags. A `config.nims` file applies to every program in its folder.

**"Can it build for another platform?"**

Yes, with a matching C toolchain installed: `--os:windows --cpu:amd64`, for example. And `nim js app.nim` compiles to JavaScript instead of C.

```compare python
# No build step; python -O only strips asserts.
```

```compare javascript
// Bundlers have modes too: vite build vs. vite dev.
```

```compare rust
// cargo build (debug) and cargo build --release; profiles live in Cargo.toml.
```

```exercise
goal: "Make this command produce an optimized build that keeps the runtime checks."
lang: shell
code: nim c app.nim
checks:
  - match: '^nim\s+c\s+-d:release\s+app\.nim'
    message: Add -d:release before the file name.
solution: nim c -d:release app.nim
```

```quiz
question: "An index-out-of-bounds bug slips into code built with `-d:danger`. What happens when it runs?"
options:
  - It stops with an IndexDefect, as in a debug build.
  - The check is gone, so it may read or corrupt other memory silently.
  - It doesn't compile in danger mode.
answer: 1
explain: Danger builds remove runtime checks. That's why release, which keeps them, is the shipping default.
```
