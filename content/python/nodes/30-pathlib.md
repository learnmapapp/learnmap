---
title: "Paths with pathlib"
icon: "📂"
branch: "files"
requires: ["context-managers", "string-methods"]
summary: "Build portable paths and inspect files with Path objects."
---

`pathlib.Path` represents a filesystem path. Use `/` to combine parts instead of manually choosing slash characters:

```python
from pathlib import Path

report = Path("reports") / "daily.txt"
print(report.name)    # daily.txt
print(report.suffix)  # .txt
print(report.parent)  # reports
```

Constructing a path does not create a file or directory. `path.exists()`, `path.is_file()`, and `path.is_dir()` inspect what is actually on disk.

## Find and prepare files

```python
from pathlib import Path

folder = Path("reports")
folder.mkdir(parents=True, exist_ok=True)
for path in sorted(folder.glob("*.txt")):
    print(path.name)
```

`glob("*.txt")` selects matching entries in one directory; `rglob("*.txt")` searches recursively. Sorting makes the processing order explicit. `parents=True` creates missing parent directories, and `exist_ok=True` accepts an already existing directory.

Relative paths are resolved from the process's current working directory, which is not necessarily the script's directory. When you need files shipped beside a script, a starting point such as `Path(__file__).resolve().parent` is more explicit. Paths can also be passed directly to `open`.

```exercise
goal: "Use Path and / to build the path to daily.txt."
lang: python
code: |
  from pathlib import Path

  report = "reports/daily.txt"
  print(report.name)
checks:
  - match: "Path\\(\\s*[\"']reports[\"']\\s*\\)\\s*/\\s*[\"']daily\\.txt[\"']"
    message: "Build report with Path(\"reports\") / \"daily.txt\"."
hint: "Build report with Path(\"reports\") / \"daily.txt\"."
```

```quiz
question: "Does Path(\"reports\") / \"daily.txt\" create that file?"
options:
  - "Yes, immediately."
  - "Only if the parent exists."
  - "No, it constructs a path object."
answer: 2
explain: "Path construction describes a location. A write or explicit creation operation changes the filesystem."
```
