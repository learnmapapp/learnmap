---
title: "Python"
icon: "🐍"
branch: "core"
requires: []
summary: "Readable programs, an interactive interpreter, and batteries included."
kind: "hub"
---
Here's a complete Python program. It counts the words in a text file and shows the five most common ones:

```python title=top_words.py
from collections import Counter
from pathlib import Path

text = Path("notes.txt").read_text().lower()
counts = Counter(text.split())

for word, n in counts.most_common(5):
    print(f"{word:>10}  {n}")
```

Nine lines. No `main` function, no type declarations, no build step, no dependencies to install. You save it, run `python3 top_words.py`, and it prints a little table.

That's the Python pitch: **you get from idea to working code fast**, and the code still reads like a description of what it does. Three things make that happen:

- **Indentation is the structure.** Blocks are marked by indenting, not by braces. Everybody's Python looks roughly the same, which makes other people's code easy to read.
- **The standard library is huge.** Files, JSON, CSV, dates, HTTP, command-line parsing: "batteries included", in Python speak.
- **It's dynamically typed.** Values have types, names don't. You can add type hints later, when the code grows.

```tip
Python is checked while it runs. A typo in a branch that never runs won't be noticed until it does. That's why the later branches spend time on tests and type hints.
```

## Getting around this map

Every dot is a small lesson. They're grouped into branches:

- **First programs**: running code, values, decisions, loops and functions.
- **Working with data**: lists, dictionaries, sets, slicing and comprehensions.
- **Functions and iteration**: arguments, scope, sorting, iterators and generators.
- **Files and automation**: errors, paths, text files, JSON and CSV.
- **Real projects**: modules, packages, virtual environments and command-line tools.
- **Objects and types**, **Tests and debugging**, and **Async code**.

The exercises are checked right here in your browser, by looking at the code you write; they don't execute it. To run the examples yourself, you'll want Python 3.11 or newer on your machine. The [next lesson](node:running-python) shows how.

```compare javascript
// Node runs a .js file directly too, but most of what the Python
// script uses (Counter, pathlib) would be npm packages.
```

```compare java
// The same program needs a class, a main method, and either a
// stream pipeline or a HashMap counting loop.
```

```exercise
goal: "Make the program show the top 3 words instead of the top 5."
lang: python
code: |
  from collections import Counter
  from pathlib import Path

  text = Path("notes.txt").read_text().lower()
  counts = Counter(text.split())

  for word, n in counts.most_common(5):
      print(f"{word:>10}  {n}")
checks:
  - match: 'most_common\(\s*3\s*\)'
    message: Change the 5 in most_common(5) to a 3.
hint: The number of words to show is the argument to most_common.
solution: |
  from collections import Counter
  from pathlib import Path

  text = Path("notes.txt").read_text().lower()
  counts = Counter(text.split())

  for word, n in counts.most_common(3):
      print(f"{word:>10}  {n}")
```

```quiz
question: In Python, what marks which lines belong to a `for` loop?
options:
  - Curly braces around the body.
  - The indentation of the lines below it.
  - An `end` keyword after the body.
answer: 1
explain: The loop body is every line indented under the `for ...:` line. Indentation isn't style in Python; it's syntax.
```
