---
title: "Command-line tools"
icon: "⌨️"
branch: "tooling"
requires: ["dependencies", "raising-errors"]
summary: "Parse options with argparse and keep the useful work in functions."
---

`argparse` turns command-line arguments into named values, validates simple types, and generates `--help`:

```python title=greet.py
import argparse


def main():
    parser = argparse.ArgumentParser(description="Greet a learner")
    parser.add_argument("name")
    parser.add_argument("--count", type=int, default=1)
    args = parser.parse_args()
    for _ in range(args.count):
        print(f"Hello, {args.name}!")


if __name__ == "__main__":
    main()
```

Run `python3 greet.py Ada --count 2`, or use `python3 greet.py --help` to inspect the interface. Positional arguments have no leading dashes; options usually do.

## Validate meaningful ranges

`type=int` rejects non-integer text, but still accepts negative integers. After parsing, use `parser.error("count must be positive")` when `args.count < 1`; it prints usage and exits with an error status.

Keep parsing in `main` and put transformations in separate functions. That makes them usable from tests or another module without inventing command-line arguments. Passing an explicit argument list to `parse_args` is also useful for small tests.

```exercise
goal: "Parse --count as an integer instead of leaving it as text."
lang: python
code: |
  import argparse

  parser = argparse.ArgumentParser()
  parser.add_argument("--count", default=1)
  args = parser.parse_args(["--count", "3"])
  print(args.count + 1)
checks:
  - match: "add_argument\\(\\s*[\"']--count[\"']\\s*,\\s*type\\s*=\\s*int"
    message: "Add type=int to the --count argument."
hint: "Add type=int to the --count argument."
```

```quiz
question: "What does type=int on an argparse argument do?"
options:
  - "Converts accepted text to an integer and rejects invalid integer text."
  - "Guarantees the value is positive."
  - "Makes the argument a list."
answer: 0
explain: "Type conversion checks integer syntax. Validate positive ranges separately."
```
