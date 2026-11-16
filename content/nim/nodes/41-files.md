---
title: Scoped file reading
icon: "📄"
branch: tools
requires: [defer, exceptions]
summary: Read and write whole files, go line by line, and close files reliably.
---
**A cheat sheet for files, from simplest to most control.** Nothing to import: these live in the always-available `system` module.

**1. The whole file at once.** For small files, this is all you need:

```nim
let text = readFile("notes.txt")           # one string
writeFile("copy.txt", text)                # create or overwrite
```

**2. Line by line.** For big files, or when each line is a record. `lines` is an [iterator](node:iterators), so only one line is in memory at a time, and the file is closed when the loop ends:

```nim title=count.nim
var total = 0
for line in lines("expenses.csv"):
  if line.len > 0:
    total += 1
echo total, " entries"
```

**3. A file handle, when you need several steps.** Open it, and `defer` the close on the next line, so it closes [whatever happens](node:defer):

```nim title=log.nim
proc appendLog(msg: string) =
  let f = open("app.log", fmAppend)
  defer: f.close()
  f.writeLine(msg)

appendLog("started")
appendLog("loaded 12 users")
```

| Mode | Meaning |
| --- | --- |
| `fmRead` (default) | read; the file must exist |
| `fmWrite` | write; creates the file or empties it |
| `fmAppend` | add to the end; creates the file if missing |
| `fmReadWrite` | read and write an existing file |

On a handle: `f.readLine()`, `f.readAll()`, `f.write(...)`, `f.writeLine(...)`, and `f.endOfFile` to know when to stop reading.

**4. When the file might not be there.** Opening or reading a missing file raises an `IOError`. Catch it where you can do something sensible:

```nim
try:
  let settings = readFile("settings.ini")
  echo settings.len, " bytes of settings"
except IOError:
  echo "No settings file; using defaults."
```

Or check first with `fileExists` from `std/os`. Catching is still wise, since a file can disappear between the check and the read.

**Where do relative paths point?** To the folder you ran the program *from* (the working directory), not the folder containing the executable. [Portable paths](node:paths) shows how to build paths that work everywhere.

```compare python
with open("app.log", "a") as f:
    f.write("started\n")
```

```compare javascript
import { appendFileSync } from "node:fs";
appendFileSync("app.log", "started\n");
```

```compare rust
use std::io::Write;
let mut f = std::fs::OpenOptions::new().append(true).create(true).open("app.log")?;
writeln!(f, "started")?;
```

```exercise
goal: "The file is never closed. Add `defer: f.close()` right after the `open` line."
code: |-
  proc firstLine(path: string): string =
    let f = open(path)
    result = f.readLine()
checks:
  - match: 'let\s+f\s*=\s*open\(\s*path\s*\)\s*\n\s+defer\s*:\s*f\.close\(\)'
    message: Put defer f.close() on the line after open.
solution: |-
  proc firstLine(path: string): string =
    let f = open(path)
    defer: f.close()
    result = f.readLine()
```

```quiz
question: "Which mode keeps the existing content and adds new lines at the end?"
options:
  - "fmWrite"
  - "fmAppend"
  - "fmRead"
answer: 1
explain: fmWrite empties the file first; fmAppend adds to the end.
```
