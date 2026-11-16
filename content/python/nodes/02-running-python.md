---
title: "Running Python"
icon: "▶️"
branch: "core"
requires: ["python"]
summary: "Try a REPL, save a script, and choose the right command."
---
There are two ways to talk to Python, and you'll use both every day.

## Way 1: the interactive prompt

Open a terminal and start Python. On macOS and Linux the command is `python3`; on Windows it's usually `py`:

```shell
$ python3 --version
Python 3.13.1
$ python3
>>>
```

Your version number will differ; anything from 3.11 up is fine for this map. No Python yet? Get it from [python.org/downloads](https://www.python.org/downloads/).

That `>>>` is the [[repl]]: you type an expression, and Python immediately shows its value. It's the quickest way to try something out:

```repl
> 2 + 3
5
> "na" * 4 + " batman"
'nanananana batman'
> len("hello")
5
```

Type `exit()` (or press Ctrl+D, or Ctrl+Z then Enter on Windows) to leave.

## Way 2: a script

For anything you want to keep, write a file. Create `hello.py` in any folder:

```python title=hello.py
# Lines starting with # are comments.
name = "Ada"
print("Hello,", name)
2 + 3
```

Then, in a terminal **in that same folder**, run it:

```shell
$ python3 hello.py
Hello, Ada
```

Notice what's missing: the `5`. The prompt echoes every value automatically, but a script only shows what you explicitly `print`. That's the number one surprise when moving from one to the other.

```warn
`python3 hello.py` is a terminal command, not Python code. Typing it at the `>>>` prompt gives a `SyntaxError`. If you see `>>>`, you're inside Python; type `exit()` first.
```

```compare javascript
// node hello.js runs a file; plain `node` opens a prompt.
// It's the same split.
```

```compare go
// Go compiles first: go run hello.go builds and runs in one step.
// There's no built-in interactive prompt.
```

```exercise
goal: "This script shows nothing when run. Make it print `Hello, Python!`."
lang: python
code: |
  "Hello, Python!"
checks:
  - match: '^print\(\s*["'']Hello, Python!["'']\s*\)\s*$'
    message: Wrap the string in print(...).
hint: A script only shows what you pass to print().
solution: |
  print("Hello, Python!")
```

```quiz
question: "`calc.py` contains just the line `6 * 7`. What does `python3 calc.py` show?"
options:
  - "`42`"
  - Nothing at all.
  - An error, because the result isn't used.
answer: 1
explain: The value is computed and then thrown away. Only the interactive prompt echoes values; a script needs print(6 * 7).
```
