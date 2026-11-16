---
title: Portable paths
icon: 🔁
branch: tools
requires:
  - modules
summary: Use path joining from std/os instead of hard-coding separators.
---

Use path joining from std/os instead of hard-coding separators. Computing a path does not create the file.

```nim
import std/os
let path = getTempDir() / "learnmap-example.json"
echo path
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about portable paths.
lang: nim
code: |-
  import std/os
  let path = getTempDir() / "other.json"
  echo path
checks:
  - match: /\s+"learnmap\-example\.json"
    message: Use / "learnmap-example.json" for this step.
  - notMatch: /\s+"other\.json"
    message: Replace / "other.json" in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `getTempDir() / "example.json"` do?
options:
  - Constructs a joined path.
  - Creates and writes a JSON file.
  - Changes the current working directory.
answer: 0
explain: Path construction does not itself perform filesystem writes.
```
