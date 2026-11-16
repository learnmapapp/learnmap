---
title: Scoped file reading
icon: 🚦
branch: tools
requires:
  - defer
  - exceptions
summary: Opening a file can raise IOError; close it with defer after successful acquisition.
---

Opening a file can raise IOError; close it with defer after successful acquisition. Read mode preserves existing contents.

```nim
proc readFirst(path: string): string =
  let file = open(path, fmRead)
  defer: file.close()
  result = file.readLine()
when isMainModule:
  echo "Call readFirst with an existing file"
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about scoped file reading.
lang: nim
code: |-
  proc readFirst(path: string): string =
    let file = open(path, fmWrite)
    defer: file.close()
    result = file.readLine()
  when isMainModule:
    echo "Call readFirst with an existing file"
checks:
  - match: open\(path,\s+fmRead\)
    message: Use open(path, fmRead) for this step.
  - notMatch: open\(path,\s+fmWrite\)
    message: Replace open(path, fmWrite) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about scoped file reading is correct?
options:
  - fmWrite is a safe read-only mode.
  - File opening cannot fail.
  - Opening a file can raise IOError; close it with defer after successful acquisition. Read mode
    preserves existing contents.
answer: 2
explain: Opening a file can raise IOError; close it with defer after successful acquisition. Read
  mode preserves existing contents.
```
