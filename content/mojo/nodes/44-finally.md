---
title: Always-run cleanup
icon: "🧹"
branch: tools
requires: [handling]
summary: finally runs whether the try block succeeded, failed or returned early.
---
**Order of events, a puzzle.** What does this print?

```mojo title=lamp.mojo
def risky(fail: Bool) raises:
    print("1. lamp on")
    try:
        if fail:
            raise Error("bulb blew")
        print("2. reading")
    finally:
        print("3. lamp off")

def main():
    try:
        risky(False)
        risky(True)
    except e:
        print("4. caught:", e)
```

```repl shell
> mojo run lamp.mojo
1. lamp on
2. reading
3. lamp off
1. lamp on
3. lamp off
4. caught: bulb blew
```

The second call raises, so "2. reading" is skipped. But "3. lamp off" still runs, *before* the error continues on its way up to `main`. That's what `finally` is for: code that must run no matter how the block ends.

**`finally` runs when the `try` block:**

- finishes normally,
- raises an error (handled or not),
- or leaves early with `return`, `break` or `continue`.

Notice that `risky` has no `except` at all. `try`/`finally` without `except` is perfectly fine: "I'm not handling the error, but I am cleaning up".

**Typical cleanups:** close a file or connection, release a lock, restore a setting you changed temporarily, stop a timer and log how long something took.

**For files, prefer `with`.** Opening files is so common that it has a shortcut, which closes the file for you, even on errors:

```mojo
with open("notes.txt", "r") as f:
    var text = f.read()
# the file is closed here, whatever happened inside
```

The full form puts all four together: `try`, `except`, `else`, `finally`. The `finally` block always comes last, and always runs.

```compare python
try:
    ...
finally:
    print("lamp off")   # same semantics
```

```compare javascript
try { risky(); } finally { console.log("lamp off"); }
```

```compare rust
// Rust has no finally; cleanup runs when a value is dropped (RAII).
```

```exercise
goal: "Make sure the lock is always released: move `print(\"unlock\")` into a `finally` block."
code: |-
  def update() raises:
      print("lock")
      try:
          raise Error("disk full")
      except e:
          print("failed:", e)
      print("unlock")
checks:
  - match: 'finally\s*:\s*\n\s+print\("unlock"\)'
    message: 'Add finally: with print("unlock") inside it.'
solution: |-
  def update() raises:
      print("lock")
      try:
          raise Error("disk full")
      except e:
          print("failed:", e)
      finally:
          print("unlock")
```

```quiz
question: "A try block runs `return 5`. Does its finally block run?"
options:
  - No, return leaves the function immediately.
  - Yes, before the function actually returns.
  - Only if there's also an except block.
answer: 1
explain: finally runs on every way out of the try block, including return.
```
