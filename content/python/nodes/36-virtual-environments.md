---
title: "Virtual environments"
icon: "🏕️"
branch: "tooling"
requires: ["packages"]
summary: "Give each project its own interpreter environment and installed packages."
---
**A story you want to avoid.** Project A needs version 1 of a library. Project B needs version 2. Both install into the one Python on your machine, so updating for B quietly breaks A. Months later, nobody remembers why A stopped working.

A [[virtual environment]] fixes that: a private folder of installed packages, one per project. Here's the full routine, from zero.

**1. Create it**, in your project folder:

```shell
$ cd my-project
$ python3 -m venv .venv
```

This makes a `.venv` folder containing its own `python` and its own (empty) set of packages. The name `.venv` is a convention that editors like VS Code and PyCharm pick up automatically.

**2. Activate it:**

```shell
$ source .venv/bin/activate
(.venv) $
```

On Windows it's `.venv\Scripts\activate`. The `(.venv)` in your prompt means it worked. From now on, in **this** terminal, `python` and `pip` point into `.venv`.

**3. Use it.** Install and run as usual. Everything stays inside the project:

```shell
(.venv) $ python -m pip install requests
(.venv) $ python app.py
```

**4. Leave it** when you're done:

```shell
(.venv) $ deactivate
```

## House rules

- **One environment per project.** It's cheap: delete the folder and recreate it any time.
- **Don't commit `.venv`** to git. Add it to `.gitignore`; the list of dependencies is what you share. [Dependencies](node:dependencies) covers that.
- **Activation is per terminal.** Open a new terminal tab and you'll need to activate again. Seeing `ModuleNotFoundError` for something you just installed? Check for the `(.venv)` first.

```tip
You don't strictly have to activate. `.venv/bin/python app.py` runs that environment's Python directly, which is handy in scripts and cron jobs.
```

```compare javascript
// npm installs into ./node_modules per project by default, so
// isolation is built in.
```

```compare rust
// Cargo builds dependencies per project; nothing is installed
// globally.
```

```exercise
goal: "Create the environment in a folder called `.venv`, the name editors look for."
lang: shell
code: |
  python3 -m venv env
checks:
  - match: '^python3\s+-m\s+venv\s+\.venv\s*$'
    message: Use python3 -m venv .venv.
hint: The last argument is the folder name.
solution: |
  python3 -m venv .venv
```

```quiz
question: "You activated `.venv` in one terminal and installed `requests`. In a **new** terminal, `import requests` fails. Why?"
options:
  - The install didn't finish.
  - The new terminal isn't using the activated environment.
  - requests only works in the first terminal that imported it.
answer: 1
explain: Activation only affects the terminal you ran it in. Activate again in the new one.
```
