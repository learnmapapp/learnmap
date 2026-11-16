---
title: Portable paths
icon: "🧭"
branch: tools
requires: [modules]
summary: Build file paths with / from std/os, split them apart, and find standard folders.
---
**Bug report:** *"Works on my Mac, crashes on Windows."* The code:

```nim
let path = dataDir & "/" & "users.json"
```

Hard-coding `/` (or `\`) is a classic portability bug. The fix is a one-character change, once you import `std/os`:

```nim title=paths.nim
import std/os

let dataDir = getHomeDir() / "myapp"
let path = dataDir / "users.json"
echo path        # /home/ada/myapp/users.json on Linux
                 # C:\Users\ada\myapp\users.json on Windows
```

`/` between two strings, with `std/os` imported, joins them with the right separator for the platform the program runs on. It also avoids doubled separators: `"a/" / "b"` is `"a/b"`.

**Taking paths apart:**

| Code | Result for `"/srv/app/report.final.csv"` |
| --- | --- |
| `path.splitFile.dir` | `/srv/app` |
| `path.splitFile.name` | `report.final` |
| `path.splitFile.ext` | `.csv` |
| `path.extractFilename` | `report.final.csv` |
| `path.parentDir` | `/srv/app` |
| `path.changeFileExt("json")` | `/srv/app/report.final.json` |

**Useful starting points:**

| Proc | Gives |
| --- | --- |
| `getCurrentDir()` | the folder the program was started from |
| `getAppDir()` | the folder containing the executable |
| `getHomeDir()` | the user's home folder |
| `getConfigDir()` | where settings go (e.g. `~/.config` on Linux) |
| `getTempDir()` | a folder for temporary files |

`getAppDir()` is the one to use for files shipped *next to* your program, since the user might start it from anywhere.

**Checking and creating:**

```nim
if not dirExists(dataDir):
  createDir(dataDir)                 # creates parent folders too
if fileExists(path):
  echo "found ", path
for file in walkFiles(dataDir / "*.json"):
  echo file
```

```compare python
from pathlib import Path
path = Path.home() / "myapp" / "users.json"
path.suffix   # ".json"
```

```compare javascript
import path from "node:path";
import os from "node:os";
const p = path.join(os.homedir(), "myapp", "users.json");
```

```compare rust
let path = dirs::home_dir().unwrap().join("myapp").join("users.json");
```

```exercise
goal: "Replace the hard-coded slashes: join `base`, `\"logs\"` and `\"today.txt\"` with the `/` operator from std/os."
code: |-
  import std/os

  let base = getCurrentDir()
  let logFile = base & "/logs/" & "today.txt"
  echo logFile
checks:
  - match: 'let\s+logFile\s*=\s*base\s*/\s*"logs"\s*/\s*"today\.txt"'
    message: Write base / "logs" / "today.txt"
solution: |-
  import std/os

  let base = getCurrentDir()
  let logFile = base / "logs" / "today.txt"
  echo logFile
```

```quiz
question: "Your program ships with `help.txt` next to the executable. Which proc finds that folder, wherever the user starts the program from?"
options:
  - "getCurrentDir()"
  - "getAppDir()"
  - "getHomeDir()"
answer: 1
explain: getCurrentDir depends on where the program was started; getAppDir is where the executable lives.
```
