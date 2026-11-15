---
title: direnv
icon: "🪄"
branch: build
requires: [dev-shells]
summary: Enter the dev shell automatically when you cd in.
---
Typing `nix develop` every time gets old. **direnv** switches environments for you: `cd` into a project and its tools appear; `cd` out and they're gone.

Install `direnv` and `nix-direnv` (the latter caches the shell so it's instant), hook it into your shell, then add a `.envrc` to the project:

```shell title=.envrc
use flake
```

Or, without flakes:

```shell title=.envrc
use nix
```

```shell
$ cd my-project
direnv: error .envrc is blocked. Run `direnv allow` to approve its content
$ direnv allow
direnv: loading .envrc
direnv: using flake
$ node --version
v22.11.0
$ cd ..
direnv: unloading
```

`direnv allow` is a safety check: an `.envrc` runs code, so you approve each one (and again after it changes).

Editors pick it up too. The direnv plugins for IntelliJ and VS Code load the same environment, so your IDE sees the project's exact compiler and tools.

```tip
Add `.direnv/` to `.gitignore`; it's direnv's cache folder.
```

```quiz
question: Why do you have to run direnv allow?
options:
  - To install direnv.
  - Because .envrc runs code, so you approve it first.
  - To download the packages.
answer: 1
explain: An .envrc from a cloned repo could run anything, so direnv only loads ones you've approved.
```
