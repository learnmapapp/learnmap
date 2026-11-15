---
title: "Dependencies"
icon: "🧰"
branch: "tooling"
requires: ["virtual-environments"]
summary: "Install with the selected interpreter and record project requirements."
---

Inside an activated environment, pip installs third-party distributions from a package index:

```shell
python -m pip install requests
python -m pip show requests
```

This is an installation example; the course's other runnable examples use the standard library. A dependency is code your program relies on. Read its documentation and choose it for a concrete need rather than installing a tool for every small task.

## Record the environment

For a small application, a requirements file can capture the installed versions:

```shell
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
```

`freeze` reports installed distributions, including transitive dependencies and unrelated packages if the environment is not clean. It is not a complete cross-platform lock strategy. Keep the environment focused on one project.

For a distributable package, declare project metadata and direct dependencies in `pyproject.toml`; the build backend and your chosen environment tool determine the rest of the workflow. Version ranges describe compatibility; an application lockfile or pinned environment describes a particular resolution. Keep credentials and environment directories out of committed dependency files.

```exercise
goal: "Install the dependencies listed in requirements.txt."
lang: shell
code: |
  python -m pip install requirements.txt
checks:
  - match: "^python\\s+-m\\s+pip\\s+install\\s+-r\\s+requirements\\.txt\\s*$"
    message: "Add -r so pip reads the requirements file."
hint: "Add -r so pip reads the requirements file."
```

```quiz
question: "Why prefer python -m pip to a bare pip command?"
options:
  - "It installs only standard-library modules."
  - "It uses pip belonging to the selected Python interpreter."
  - "It removes the need for an environment."
answer: 1
explain: "The module invocation links package installation to the interpreter you selected."
```
