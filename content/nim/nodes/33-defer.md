---
title: Scope cleanup
icon: "🧹"
branch: tools
requires: [procedures]
summary: defer schedules cleanup code to run when the current scope ends, however it ends.
---
**Before**: cleaning up with `try`/`finally`. The cleanup sits at the bottom, far away from the code that opened the resource:

```nim
proc report() =
  let f = open("report.txt", fmWrite)
  try:
    f.writeLine("Sales report")
    f.writeLine("Total: 1200")
    # ... forty more lines ...
  finally:
    f.close()
```

**After**: the same with `defer`, cleanup written right next to the opening:

```nim title=report.nim
proc report() =
  let f = open("report.txt", fmWrite)
  defer: f.close()

  f.writeLine("Sales report")
  f.writeLine("Total: 1200")
  # ... forty more lines ...
```

`defer: f.close()` means "run `f.close()` when this scope ends". It runs whether the proc reaches its last line, `return`s early, or is interrupted by an exception. It's the same `try`/`finally` underneath; you just write it where it makes sense.

**Several defers run in reverse order**, like a stack of plates. Last opened, first closed:

```nim title=demo.nim
proc demo() =
  echo "open A"
  defer: echo "close A"
  echo "open B"
  defer: echo "close B"
  echo "working"

demo()
```

```repl shell
> nim r demo.nim
open A
open B
working
close B
close A
```

That's exactly right for nested resources: B might depend on A, so B must go first.

**Three rules:**

1. Put `defer` *after* the line that acquires the resource. If `open` fails, there's nothing to close, and the `defer` was never reached.
2. A `defer` belongs to the block it's written in. Inside a loop body, it runs at the end of every round.
3. Don't use it at the top level of a module; put the code in a proc.

**Do you always need it?** Not for memory: Nim frees objects automatically. Use `defer` for things the compiler can't see: files, sockets, locks, temporary directories, "print the elapsed time when done".

```compare python
with open("report.txt", "w") as f:   # a context manager
    f.write("Sales report\n")
```

```compare javascript
try {
  // work
} finally {
  handle.close();
}
```

```compare rust
// Rust closes automatically when f goes out of scope (Drop).
```

```exercise
goal: "Move the cleanup up: add `defer: conn.close()` right after `let conn = connect()`, and remove the `conn.close()` at the end."
code: |-
  proc greet() =
    let conn = connect()
    conn.send("hello")
    conn.send("bye")
    conn.close()
checks:
  - match: 'let\s+conn\s*=\s*connect\(\)\s*\n\s*defer\s*:\s*conn\.close\(\)'
    message: Put defer conn.close() on the line after connect().
  - notMatch: '^\s*conn\.close\(\)'
    message: Remove the conn.close() line at the end.
solution: |-
  proc greet() =
    let conn = connect()
    defer: conn.close()
    conn.send("hello")
    conn.send("bye")
```

```quiz
question: "A proc has `defer: echo 1` and later `defer: echo 2`. What's printed when it ends?"
options:
  - "1, then 2"
  - "2, then 1"
  - "Only 2"
answer: 1
explain: Deferred code runs in reverse order, so the last defer runs first.
```
