---
title: "Text files"
icon: "📄"
branch: "files"
requires: ["pathlib"]
summary: "Read and write Unicode text, or stream large files line by line."
---

For small text files, `Path` has convenient methods. Specify the encoding so the result does not depend on machine defaults:

```python
from pathlib import Path

path = Path("notes.txt")
path.write_text("Ada\nGrace\n", encoding="utf-8")
text = path.read_text(encoding="utf-8")
print(text.splitlines())  # ['Ada', 'Grace']
```

`write_text` replaces the whole file. A missing parent directory is not created automatically. `read_text` raises `FileNotFoundError` if the file does not exist.

## Stream a large input

```python
from pathlib import Path

path = Path("notes.txt")
with path.open(encoding="utf-8") as handle:
    for line in handle:
        print(line.rstrip("\n"))
```

Iteration reads lines without loading the entire file. Each line usually includes its ending newline, so decide whether to retain or remove it. `strip()` removes more whitespace than just a newline, which can matter for indented data.

Text mode decodes bytes into strings. For raw binary content, use `read_bytes`, `write_bytes`, or an `"rb"`/`"wb"` mode. Handle the exceptions your application expects rather than checking existence and assuming the file cannot change before you open it.

```exercise
goal: "Specify UTF-8 when writing this text file."
lang: python
code: |
  from pathlib import Path

  path = Path("notes.txt")
  path.write_text("café\n")
checks:
  - match: "write_text\\([^\\n]+encoding\\s*=\\s*[\"']utf-8[\"']"
    message: "Pass encoding=\"utf-8\" to write_text."
hint: "Pass encoding=\"utf-8\" to write_text."
```

```quiz
question: Which operation loads the complete file as a string?
options:
  - "`Path.read_text()`"
  - Iterating an open file line by line.
  - Path.name
answer: 0
explain: read_text reads and decodes the whole file; line iteration is the streaming option.
```
