---
title: "CSV"
icon: "📑"
branch: "files"
requires: ["json", "comprehensions"]
summary: "Read tabular data without hand-splitting commas."
---

A CSV field can contain commas, quotes, or even a newline. Use `csv` rather than `line.split(",")` so quoting rules are handled correctly.

```python
import csv
from io import StringIO

source = StringIO('name,score\n"Ada, Jr.",42\nGrace,37\n')
rows = list(csv.DictReader(source))
print(rows[0]["name"])         # Ada, Jr.
print(int(rows[0]["score"]))   # 42
```

`DictReader` takes column names from the header. Field values are strings; convert numbers explicitly and handle invalid values according to the application's needs.

## Write a report

```python
import csv

with open("scores.csv", "w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerow({"name": "Ada", "score": 42})
```

Use `newline=""` when opening files for CSV reading or writing so the module can handle newlines itself. `writeheader()` writes the column names; each subsequent `writerow` supplies one record.

A useful automation pipeline is: discover files with `Path.glob`, read records, validate and convert fields, then write a summary. Keep that transformation in a function so the next branch can test it independently of real files.

```exercise
goal: Convert CSV scores to integers before summing them.
lang: python
code: |
  import csv
  from io import StringIO

  rows = csv.DictReader(StringIO("name,score\nAda,42\nGrace,37\n"))
  total = sum(row["score"] for row in rows)
  print(total)
checks:
  - match: sum\(\s*int\(\s*row\[["']score["']\]\s*\)\s+for
    message: Wrap row["score"] in int(...) before summing.
hint: Wrap row["score"] in `int(...)` before summing.
```

```quiz
question: "Why use csv.DictReader instead of splitting on commas?"
options:
  - "It automatically converts all numbers to integers."
  - "It handles quoted fields and uses header names."
  - "It only works with files that contain no commas."
answer: 1
explain: "CSV quoting allows separators inside fields. DictReader handles those rules, but field values remain strings."
```
