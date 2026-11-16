---
title: "CSV"
icon: "📑"
branch: "files"
requires: ["json", "comprehensions"]
summary: "Read tabular data without hand-splitting commas."
---
Someone exports a spreadsheet and sends you `sales.csv`:

```text title=sales.csv
region,product,units
North,Widget,12
South,"Gadget, deluxe",5
North,Gadget,8
```

"Easy," you think, "split each line on commas." Look at line 3, though: that quoted comma would break your fields apart. CSV has rules for quoting, escaping and line endings, and the `csv` module knows all of them. Don't split by hand.

## Reading rows as dictionaries

`csv.DictReader` uses the header line as keys, so each row becomes a dictionary:

```python
import csv

with open("sales.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["region"], row["product"], row["units"])
```

Two details worth knowing:

- `newline=""` lets the `csv` module handle line endings itself. The Python docs recommend it for every CSV file you open.
- **Every value is a string.** `row["units"]` is `"12"`, not `12`.

## From rows to an answer

Let's total the units per region, converting as we go:

```python
import csv
from collections import defaultdict

totals = defaultdict(int)   # a dict that starts missing keys at 0
with open("sales.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        totals[row["region"]] += int(row["units"])

print(dict(totals))   # {'North': 20, 'South': 5}
```

## Writing a report

`DictWriter` does the reverse. Give it the column names, write the header, then the rows:

```python
with open("report.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["region", "units"])
    writer.writeheader()
    for region, units in totals.items():
        writer.writerow({"region": region, "units": units})
```

Any value containing a comma or quote is quoted for you, so the output opens cleanly in a spreadsheet.

```compare javascript
// No CSV parser built in; most projects add a package such as
// csv-parse or papaparse.
```

```compare go
r := csv.NewReader(f)   // encoding/csv in the standard library
records, _ := r.ReadAll()
```

```exercise
goal: "Summing fails because CSV values are strings. Convert each score to an integer first."
lang: python
code: |
  import csv
  from io import StringIO

  rows = csv.DictReader(StringIO("name,score\nAda,42\nGrace,37\n"))
  total = sum(row["score"] for row in rows)
  print(total)
checks:
  - match: 'sum\(\s*int\(\s*row\[["'']score["'']\]\s*\)\s+for'
    message: Wrap row["score"] in int(...) before summing.
hint: int(...) turns "42" into 42.
solution: |
  import csv
  from io import StringIO

  rows = csv.DictReader(StringIO("name,score\nAda,42\nGrace,37\n"))
  total = sum(int(row["score"]) for row in rows)
  print(total)
```

```quiz
question: "Why not parse CSV with `line.split(\",\")`?"
options:
  - split is too slow for large files.
  - Quoted fields can contain commas, and split would break them apart.
  - split doesn't work on files.
answer: 1
explain: '"Gadget, deluxe" is one field. The csv module understands the quoting rules; split doesn''t.'
```
