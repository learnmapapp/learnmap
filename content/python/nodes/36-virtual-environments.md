---
title: "Virtual environments"
icon: "🏕️"
branch: "tooling"
requires: ["packages"]
summary: "Give each project its own interpreter environment and installed packages."
---

A [[virtual environment]] isolates a project's installed Python packages. Create one with the standard library's `venv` module:

```shell
python3 -m venv .venv
```

On macOS or Linux, activate it with `source .venv/bin/activate`. In Windows PowerShell, use `.venv\Scripts\Activate.ps1`. Activation adjusts your shell so `python` and related commands select the environment.

```shell
python --version
python -m pip --version
```

Use `python -m pip` to tie pip to that interpreter. You can skip activation and call `.venv/bin/python` directly, or `.venv\Scripts\python.exe` on Windows.

## Recreate, do not copy

Do not commit `.venv/` to version control. Environments contain machine-specific paths and can be recreated from your project's dependency declarations. `deactivate` restores your previous shell path when you are done.

An environment isolates installed packages; it is not an operating-system sandbox. Programs inside it can still read and write files according to your normal permissions. [Dependencies](node:dependencies) shows how to describe what belongs in the environment.

```exercise
goal: Create an environment named .venv using the venv module.
lang: shell
code: |
  python3 -m venv env
checks:
  - match: ^python3\s+-m\s+venv\s+\.venv\s*$
    message: Use python3 -m venv .venv.
hint: Use `python3 -m venv .venv`.
```

```quiz
question: "What does activating a virtual environment mainly change?"
options:
  - "The shell commands used to select the interpreter and installed tools."
  - "The permissions of all Python programs."
  - "Every installed Python on the computer."
answer: 0
explain: "Activation adjusts the current shell path; the environment provides isolated package installation locations."
```
