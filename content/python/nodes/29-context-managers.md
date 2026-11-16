---
title: "Context managers"
icon: "🚪"
branch: "files"
requires: ["exceptions"]
summary: "Use with to make resource cleanup part of the structure."
---

A [[context manager]] pairs setup with cleanup. The `with` statement enters the resource, runs a block, and exits it even if the block raises an exception:

```python
with open("notes.txt", "w", encoding="utf-8") as handle:
    handle.write("Remember the milk\n")
# The file is closed here.
```

Opening in `"w"` creates a file or replaces its existing contents. Use `"a"` to append instead. Keep the resource's work inside its block; reading or writing a file after it is closed raises an error.

## More than files

Locks, temporary directories, and database transactions can also offer context managers. `contextlib.contextmanager` lets you define one with a generator:

```python
from contextlib import contextmanager

@contextmanager
def announce():
    print("enter")
    try:
        yield
    finally:
        print("leave")

with announce():
    print("work")
```

The code before `yield` enters; the `finally` block performs cleanup. This decorator is an advanced convenience; when an API already provides a context manager, use that directly. A `with` statement guarantees the exit protocol, but does not automatically suppress errors.

```exercise
goal: Open the file with a context manager so it is closed automatically.
lang: python
code: |
  handle = open("notes.txt", "w", encoding="utf-8")
  handle.write("Hello\n")
checks:
  - match: ^with\s+open\([^\n]+\)\s+as\s+handle:\n[ \t]+handle\.write\(
    message: "Use with open(...) as handle: and indent the write inside it."
hint: "Use with `open(...)` as handle: and indent the write inside it."
```

```quiz
question: "When does a file opened with with get closed?"
options:
  - "Only if the block finishes without an error."
  - "When leaving the block, including on an exception."
  - "Only when the program ends."
answer: 1
explain: "The context manager closes the file as the block exits, even when an exception propagates."
```
