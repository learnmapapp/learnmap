---
title: Compile-time branches
icon: "🔧"
branch: design
requires: [constants, if]
summary: when is an if that the compiler evaluates, keeping only the chosen branch.
---
**Q: What's the difference between `if` and `when`?**

`if` picks a branch while the program runs. `when` picks one while *compiling*, and the other branches aren't compiled at all, as if you'd deleted them:

```nim title=platform.nim
when defined(windows):
  const configDir = "C:/ProgramData/myapp"
elif defined(macosx):
  const configDir = "/Library/Application Support/myapp"
else:
  const configDir = "/etc/myapp"

echo "Config lives in ", configDir
```

Build this on a Mac, and the executable contains only the macOS path. The Windows line wasn't just skipped: it's not in the program.

**Q: Why does that matter?**

Because the unused branches don't even need to compile. Code in a `when defined(windows)` branch can call Windows-only APIs, and building on Linux won't complain about them. With a normal `if`, every branch must compile on every platform.

**Q: What can a `when` condition use?**

Anything known at compile time:

| Condition | True when |
| --- | --- |
| `defined(windows)`, `defined(linux)`, `defined(macosx)` | building for that OS |
| `defined(release)` | building with `-d:release` |
| `defined(myFlag)` | you passed `-d:myFlag` to the compiler |
| `sizeof(int) == 8` | building for a 64-bit target |
| `MaxUsers > 100` | a [const](node:constants) has that value |

**Q: How do I use my own flags?**

Pass `-d:name` when compiling, and test it with `defined(name)`:

```nim title=app.nim
when defined(verbose):
  echo "loading settings..."
```

```repl shell
> nim r -d:verbose app.nim
loading settings...
```

Without `-d:verbose`, that `echo` isn't in the program at all: zero cost in the normal build.

**Q: Anything else `when` is good for?**

`when isMainModule:` runs code only when this file is the program being compiled, not when it's imported by another file. It's the Nim version of Python's `if __name__ == "__main__":`, perfect for small demos and quick tests at the bottom of a module.

```compare python
import sys
if sys.platform == "win32":   # decided at runtime
    config_dir = "C:/ProgramData/myapp"
```

```compare javascript
// No compile-time branching; bundlers replace process.env checks instead.
```

```compare rust
#[cfg(target_os = "windows")]
const CONFIG_DIR: &str = "C:/ProgramData/myapp";
```

```exercise
goal: "Only print the debug line in builds made with `-d:debugLog`: change `if` to `when`, and the condition to `defined(debugLog)`."
code: |-
  let x = 42
  if true:
    echo "x = ", x
checks:
  - match: 'when\s+defined\(\s*debugLog\s*\)\s*:'
    message: 'Write when defined(debugLog):'
solution: |-
  let x = 42
  when defined(debugLog):
    echo "x = ", x
```

```quiz
question: "A `when false:` branch calls a proc that doesn't exist. What happens?"
options:
  - A compile error, because every branch must compile.
  - Nothing; the branch is discarded before it's checked.
  - A runtime error if the branch is reached.
answer: 1
explain: when removes the branches it doesn't take, so their contents are never type-checked.
```
