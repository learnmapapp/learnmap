---
title: "Text files"
icon: "📄"
branch: "files"
requires: ["pathlib"]
summary: "Read and write Unicode text, or stream large files line by line."
---
Let's build a tiny journal app. It needs to do three things: write an entry, add another one later, and read them all back.

**Write the first entry.** For small files, `Path` has one-call helpers:

```python
from pathlib import Path

journal = Path("journal.txt")
journal.write_text("Mon: started learning Python\n", encoding="utf-8")
```

`write_text` creates the file, or **replaces** whatever was in it.

**Add more later.** To append instead of replacing, open the file in `"a"` mode:

```python
with journal.open("a", encoding="utf-8") as f:
    f.write("Tue: learned about with blocks\n")
```

The mode letter decides what happens:

| Mode | Meaning |
| --- | --- |
| `"r"` | read (the default); the file must exist |
| `"w"` | write; **empties the file first** |
| `"a"` | append to the end |
| `"x"` | create; fails if the file already exists |

**Read it back.** For a small file, read everything at once:

```python
print(journal.read_text(encoding="utf-8"))
```

For a big file, loop over the lines instead, so only one line is in memory at a time:

```python
with journal.open(encoding="utf-8") as f:
    for number, line in enumerate(f, start=1):
        print(number, line.rstrip("\n"))
```

Each line keeps its trailing `\n`, which is why `rstrip("\n")` is there. Otherwise `print` adds a second newline and you get blank lines in between.

## Always say `encoding="utf-8"`

Without it, Python uses your operating system's default encoding. On many systems that's UTF-8, but on Windows it may not be, and then the `é` in "café" turns into garbage or a `UnicodeDecodeError`. Spelling it out makes your script behave the same everywhere.

```compare javascript
fs.writeFileSync("journal.txt", "Mon: ...\n", "utf8");
fs.appendFileSync("journal.txt", "Tue: ...\n", "utf8");
```

```compare go
os.WriteFile("journal.txt", []byte("Mon: ...\n"), 0644)
```

```exercise
goal: "Make this script save `café` correctly on every computer: pass `encoding=\"utf-8\"` to `write_text`."
lang: python
code: |
  from pathlib import Path

  path = Path("notes.txt")
  path.write_text("café\n")
checks:
  - match: 'write_text\([^\n]+encoding\s*=\s*["'']utf-8["'']'
    message: "Pass encoding=\"utf-8\" to write_text."
hint: It's a keyword argument after the text.
solution: |
  from pathlib import Path

  path = Path("notes.txt")
  path.write_text("café\n", encoding="utf-8")
```

```quiz
question: "You open an existing file with mode `\"w\"` and write one line. What happened to the old contents?"
options:
  - They're still there, before the new line.
  - They're gone; "w" empties the file first.
  - Python raises an error because the file exists.
answer: 1
explain: '"w" truncates. Use "a" to append, or "x" if you want an error when the file exists.'
```
