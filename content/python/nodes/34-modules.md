---
title: "Modules"
icon: "🧱"
branch: "tooling"
requires: ["function-arguments"]
summary: "Split code into importable files and protect script entry points."
---

A [[module]] is commonly a `.py` file. Put reusable definitions in one file, then import them from another:

```python title=helpers.py
def double(number):
    return number * 2
```

```python title=app.py
from helpers import double

print(double(21))  # 42
```

Run `python3 app.py` from the directory containing both files. `import helpers` is another form; then call `helpers.double(21)`. Prefer explicit imports over `from helpers import *` so readers can see where names come from.

## Importing executes top-level code

The first import normally executes a module's top-level statements and caches the module. Do not put interactive prompts or file-processing work at module level if other code should import its functions.

```python title=tool.py
def main():
    print("Running as a script")

if __name__ == "__main__":
    main()
```

This guard runs `main` when executed as a script, but not on ordinary import. Avoid filenames such as `json.py` or `csv.py` in your project: they can shadow standard-library modules and make imports confusing.

```compare rust
mod helpers;
fn main() { println!("{}", helpers::double(21)); }
```

```compare javascript
import { double } from "./helpers.js";
console.log(double(21));
```

```exercise
goal: "Use the correct module entry-point sentinel."
lang: python
code: |
  def main():
      print("ready")

  if __name__ == "main":
      main()
checks:
  - match: "if\\s+__name__\\s*==\\s*[\"']__main__[\"']\\s*:"
    message: "The sentinel has two underscores on each side: \"__main__\"."
hint: "The sentinel has two underscores on each side: \"__main__\"."
```

```quiz
question: "Why guard main() with if __name__ == \"__main__\"?"
options:
  - "To stop Python from importing any functions."
  - "To run script work only when that module is the entry point."
  - "To make the module private."
answer: 1
explain: "The guard keeps entry-point behavior from running when another module imports the file."
```
