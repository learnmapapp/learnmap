---
title: "Paths with pathlib"
icon: "📂"
branch: "files"
requires: ["context-managers", "string-methods"]
summary: "Build portable paths and inspect files with Path objects."
---
File paths are strings, right? You could glue them with `+`... until your code runs on Windows, or someone forgets a slash. The `pathlib` module gives you real path objects instead.

Here's a quick tour, at the prompt:

```repl
> from pathlib import Path
> report = Path("reports") / "2025" / "summary.txt"
> report
PosixPath('reports/2025/summary.txt')
> report.name
'summary.txt'
> report.stem
'summary'
> report.suffix
'.txt'
> report.parent
PosixPath('reports/2025')
```

The `/` operator joins path pieces with the right separator for your operating system. (On Windows you'd see `WindowsPath('reports\\2025\\summary.txt')`.) No more worrying about slashes.

## Asking the file system

```python
from pathlib import Path

here = Path.cwd()                   # the folder you ran Python from
home = Path.home()                  # your home folder

downloads = home / "Downloads"
print(downloads.exists(), downloads.is_dir())

# create a folder; no fuss if it already exists
(here / "output").mkdir(exist_ok=True)
```

## Finding files

`glob` finds files by pattern. `*` matches anything in one folder, and `rglob` searches all subfolders too:

```python
for photo in Path("holiday").rglob("*.jpg"):
    print(photo.name, photo.stat().st_size, "bytes")
```

## Relative paths are relative to where you are

`Path("data.csv")` means "data.csv in the **current working directory**", which is the folder your terminal was in when you started Python. It isn't necessarily the folder the script lives in. If a script can't find a file that's "right next to it", that's usually why. To build a path relative to the script itself:

```python
DATA = Path(__file__).parent / "data.csv"
```

Path objects work everywhere a file name does: `open(path)`, `csv` readers, `json` loading. [Text files](node:text-files) shows the reading and writing helpers.

```compare javascript
const path = require("node:path");
path.join("reports", "2025", "summary.txt");
```

```compare java
Path report = Path.of("reports", "2025", "summary.txt");
```

```exercise
goal: "`report` is a plain string, so `.name` fails. Build it as a `Path` using `/`."
lang: python
code: |
  from pathlib import Path

  report = "reports/daily.txt"
  print(report.name)
checks:
  - match: 'Path\(\s*["'']reports["'']\s*\)\s*/\s*["'']daily\.txt["'']'
    message: Build report with Path("reports") / "daily.txt".
hint: Start with Path("reports") and join the file name with /.
solution: |
  from pathlib import Path

  report = Path("reports") / "daily.txt"
  print(report.name)
```

```quiz
question: "What is `Path(\"photos/cat.jpeg\").suffix`?"
options:
  - "`'cat'`"
  - "`'.jpeg'`"
  - "`'jpeg'`"
answer: 1
explain: suffix includes the dot. stem is 'cat', and name is 'cat.jpeg'.
```
