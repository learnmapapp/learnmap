---
title: "Context managers"
icon: "🚪"
branch: "files"
requires: ["exceptions"]
summary: "Use with to make resource cleanup part of the structure."
---
**The problem.** Some things need cleaning up: files must be closed, locks released, connections returned. Here's the naive way:

```python
f = open("notes.txt", "w", encoding="utf-8")
f.write("Remember the milk\n")
f.close()
```

If `write` raises an exception, `close()` never runs. The by-the-book fix is `try`/`finally`, which works but is a lot of ceremony for "please close this":

```python
f = open("notes.txt", "w", encoding="utf-8")
try:
    f.write("Remember the milk\n")
finally:
    f.close()
```

**The solution.** The `with` statement does exactly that, in one line:

```python
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("Remember the milk\n")
# f is closed here, whatever happened inside
```

Whatever is after `with` is a [[context manager]]: an object that knows how to set up and clean up. When the indented block ends, normally or because of an exception, the cleanup runs.

## Not just files

The same pattern shows up all over the standard library:

```python
import threading
lock = threading.Lock()
with lock:                       # acquire... and always release
    shared_counter += 1
```

You can also open several things at once:

```python
with open("in.txt") as src, open("out.txt", "w") as dst:
    dst.write(src.read().upper())
```

## Writing your own

The easiest way is a generator with the `@contextmanager` decorator. Code before `yield` is setup; code after it is cleanup:

```python
from contextlib import contextmanager
import time

@contextmanager
def timer(label):
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"{label}: {time.perf_counter() - start:.3f}s")

with timer("download"):
    download_everything()
```

```compare java
try (var reader = Files.newBufferedReader(path)) {
    // try-with-resources: same idea
}
```

```compare go
f, _ := os.Open("notes.txt")
defer f.Close()   // runs when the function returns
```

```exercise
goal: "This file is never closed. Open it with a `with` block and move the write inside it."
lang: python
code: |
  handle = open("notes.txt", "w", encoding="utf-8")
  handle.write("Hello\n")
checks:
  - match: '^with\s+open\([^\n]+\)\s+as\s+handle:\n[ \t]+handle\.write\('
    message: "Use with open(...) as handle: and indent the write inside it."
hint: "The with line ends in a colon, and the write is indented below it."
solution: |
  with open("notes.txt", "w", encoding="utf-8") as handle:
      handle.write("Hello\n")
```

```quiz
question: "An exception is raised inside a `with open(...) as f:` block. Is the file closed?"
options:
  - Yes, the cleanup runs even when the block fails.
  - Only if you also add a finally.
  - No, the exception skips the cleanup.
answer: 0
explain: That's the whole point of with. The context manager's exit code runs however the block ends.
```
