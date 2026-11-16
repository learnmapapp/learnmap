---
title: "Dependencies"
icon: "🧰"
branch: "tooling"
requires: ["virtual-environments"]
summary: "Install with the selected interpreter and record project requirements."
---
You've built something in a [virtual environment](node:virtual-environments). Now a teammate clones the project. How do they get the same packages? This lesson is a checklist you can follow on any project.

**☐ 1. Install with pip, through Python.** `pip` is Python's package installer, and it downloads from [PyPI](https://pypi.org), the public package index. With the environment active:

```shell
(.venv) $ python -m pip install requests
```

`python -m pip` instead of plain `pip` guarantees you install into the Python you're actually using. It avoids a whole class of "but I installed it!" mysteries.

**☐ 2. Write the list down.** The simplest format is `requirements.txt`, one package per line:

```text title=requirements.txt
requests>=2.32
rich
```

`>=2.32` sets a minimum version. Leave it off to accept any version.

**☐ 3. Install from the list.** On a fresh checkout, after creating and activating `.venv`:

```shell
(.venv) $ python -m pip install -r requirements.txt
```

The `-r` is important. Without it, pip looks on PyPI for a package literally called `requirements.txt`.

**☐ 4. Check what's there.** These are useful when something seems off:

```shell
(.venv) $ python -m pip list           # everything installed
(.venv) $ python -m pip show requests  # version, location, deps
```

## The modern alternative: pyproject.toml

Bigger projects describe themselves in `pyproject.toml`, which holds the name, version and dependencies in one standard place:

```toml title=pyproject.toml
[project]
name = "studytools"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = ["requests>=2.32", "rich"]
```

Then `python -m pip install -e .` installs your project, plus its dependencies, in "editable" mode. Tools such as `uv` and Poetry build on the same file and add lock files for exactly reproducible installs.

```compare javascript
// package.json is the list, npm install reads it, and
// package-lock.json pins exact versions.
```

```compare rust
// Cargo.toml lists dependencies; cargo build fetches them.
```

```exercise
goal: "This tries to install a package called `requirements.txt`. Make pip read the file instead."
lang: shell
code: |
  python -m pip install requirements.txt
checks:
  - match: '^python\s+-m\s+pip\s+install\s+-r\s+requirements\.txt\s*$'
    message: Add -r so pip reads the requirements file.
hint: pip needs a flag that means "read from this file".
solution: |
  python -m pip install -r requirements.txt
```

```quiz
question: "Why `python -m pip install ...` rather than just `pip install ...`?"
options:
  - It downloads packages faster.
  - It installs into the exact Python that `python` runs.
  - pip no longer works as a standalone command.
answer: 1
explain: With several Pythons around, a bare pip might belong to a different one. python -m pip always matches.
```
