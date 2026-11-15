---
title: "Running Python"
icon: "▶️"
branch: "core"
requires: ["python"]
summary: "Try a REPL, save a script, and choose the right command."
---

Check that Python is installed, then open the interactive prompt:

```repl shell
> python3 --version
Python 3.11.0
> python3
Python 3.11.0 ...
```

Your version and startup banner may differ. On Windows, `py -3` often selects Python 3. Inside an activated virtual environment, `python` selects that environment's interpreter.

At the `>>>` prompt, type an expression such as `2 + 3`. The [[repl]] displays its value immediately. To leave, call `exit()`.

For a repeatable program, put this in `hello.py`:

```python title=hello.py
print("Hello from a file!")
```

Run `python3 hello.py` from a terminal in the same directory. A script displays only what you explicitly print; a bare `2 + 3` in a file produces no visible output. Lines beginning with `#` are comments, ignored by the interpreter.

```tip
Terminal commands and Python code go in different places. Do not paste `python3 hello.py` at the `>>>` prompt.
```

```exercise
goal: "Print Hello, Python! from this script."
lang: python
code: |
  "Hello, Python!"
checks:
  - match: "^print\\(\\s*[\"']Hello, Python![\"']\\s*\\)\\s*$"
    message: "Wrap the string in print(...)."
hint: "Wrap the string in print(...)."
```

```quiz
question: "Why does a script containing only 2 + 3 display nothing?"
options:
  - "Scripts cannot do arithmetic."
  - "Scripts need print() to display that value."
  - "Every file needs a class."
answer: 1
explain: "The REPL echoes expressions. A script does not; print() writes output."
```
