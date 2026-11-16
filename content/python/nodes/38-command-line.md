---
title: "Command-line tools"
icon: "⌨️"
branch: "tooling"
requires: ["dependencies", "raising-errors"]
summary: "Parse options with argparse and keep the useful work in functions."
---
Let's grow a real command-line tool, version by version. It greets people. (Every great tool starts small.)

**v0.1: read arguments by hand.** `sys.argv` is the list of words on the command line, and the script's own name comes first:

```python title=greet.py
import sys

print(f"Hello, {sys.argv[1]}!")
```

```shell
$ python3 greet.py Ada
Hello, Ada!
$ python3 greet.py
Traceback (most recent call last):
  ...
IndexError: list index out of range
```

It works until someone forgets the name. Then they get a traceback instead of help.

**v0.2: switch to argparse.** The standard `argparse` module turns a few declarations into proper argument parsing, error messages and `--help`:

```python title=greet.py
import argparse

parser = argparse.ArgumentParser(description="Greet someone.")
parser.add_argument("name", help="who to greet")
args = parser.parse_args()

print(f"Hello, {args.name}!")
```

```shell
$ python3 greet.py
usage: greet.py [-h] name
greet.py: error: the following arguments are required: name
```

A helpful error message, for free.

**v0.3: add options.** Options start with dashes and are optional. Use `type` to convert the text, and `action="store_true"` for on/off flags:

```python
parser.add_argument("--times", type=int, default=1, help="how often")
parser.add_argument("--shout", action="store_true",
                    help="use capitals")
args = parser.parse_args()

greeting = f"Hello, {args.name}!"
if args.shout:
    greeting = greeting.upper()
for _ in range(args.times):
    print(greeting)
```

```shell
$ python3 greet.py Ada --times 2 --shout
HELLO, ADA!
HELLO, ADA!
```

**v0.4: exit codes.** Other programs and shell scripts check whether you succeeded. By convention 0 means success and anything else means failure. `parser.error("...")` exits with code 2 and a usage message, and `sys.exit(1)` works for your own failures:

```python
if args.times < 1:
    parser.error("--times must be at least 1")
```

And `python3 greet.py --help` lists every argument with its help text, generated for you.

```compare javascript
// Node: process.argv, or util.parseArgs, or a package like
// commander or yargs.
```

```compare go
times := flag.Int("times", 1, "how often")   // the flag package
flag.Parse()
```

```exercise
goal: "`args.count + 1` fails because `--count` arrives as text. Make argparse convert it to an `int`."
lang: python
code: |
  import argparse

  parser = argparse.ArgumentParser()
  parser.add_argument("--count", default=1)
  args = parser.parse_args(["--count", "3"])
  print(args.count + 1)
checks:
  - match: 'add_argument\(\s*["'']--count["'']\s*,\s*type\s*=\s*int'
    message: Add type=int to the --count argument.
hint: add_argument accepts a type= keyword.
solution: |
  import argparse

  parser = argparse.ArgumentParser()
  parser.add_argument("--count", type=int, default=1)
  args = parser.parse_args(["--count", "3"])
  print(args.count + 1)
```

```quiz
question: "With `parser.add_argument(\"--shout\", action=\"store_true\")`, what is `args.shout` when the flag isn't given?"
options:
  - "`None`"
  - "`False`"
  - "An error, because the argument is missing."
answer: 1
explain: store_true options default to False and become True when the flag is present.
```
