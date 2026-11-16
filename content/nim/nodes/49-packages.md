---
title: Nimble packages
icon: "📦"
branch: tools
requires: [modules, testing]
summary: Start a project with nimble init, declare dependencies in the .nimble file, then build and test.
---
**Walkthrough: from empty folder to tested project.** [[nimble]] is Nim's package manager and build tool. It's installed along with Nim.

**1. Create the project.**

```repl shell
> mkdir weather && cd weather
> nimble init
```

`nimble init` asks a few questions (package name, binary or library, license) and creates:

```text
weather/
  weather.nimble       the project description
  src/weather.nim      your code
  tests/test1.nim      a first test
```

**2. Read the `.nimble` file.** It's ordinary Nim syntax:

```nim title=weather.nimble
version       = "0.1.0"
author        = "You"
description   = "Weather in your terminal"
license       = "MIT"
srcDir        = "src"
bin           = @["weather"]

requires "nim >= 2.2.0"
requires "cligen >= 1.7"
```

`bin` lists the programs to build. Each `requires` line declares a dependency, with a version range.

**3. Add a dependency.** Add a `requires` line to the `.nimble` file, like the `cligen` line above. Nimble downloads dependencies the first time you build, so there's no separate install step for a project. To install a package globally, for quick experiments, use `nimble install cligen`.

**4. Build and run.**

```repl shell
> nimble build
> nimble run weather
```

`nimble build` compiles everything in `bin` and resolves dependencies first. Pass extra compiler flags as usual: `nimble build -d:release`.

**5. Test.** `nimble test` compiles and runs every `tests/t*.nim` file, as you saw in [unit tests](node:testing):

```repl shell
> nimble test
[OK] can parse a forecast
   Success: Execution finished
   Success: All tests passed
```

**6. Find packages.** `nimble search json` searches the package list, which is also browsable at nimble.directory. Packages are just Git repositories, so you can depend on one by URL too: `requires "https://github.com/user/repo"`.

**Lock files.** `nimble lock` writes the exact versions in use into `nimble.lock`. Commit it, and everyone building the project gets identical dependencies.

```compare python
# pyproject.toml lists dependencies; pip or uv installs them.
```

```compare javascript
// package.json lists dependencies; npm install fetches them.
```

```compare rust
// Cargo.toml lists dependencies; cargo build fetches them.
```

```exercise
goal: "The project needs the `jsony` package, version 1.1 or newer. Add a `requires` line for it."
code: |-
  version = "0.1.0"
  srcDir = "src"
  bin = @["app"]

  requires "nim >= 2.2.0"
checks:
  - match: '^requires\s+"jsony\s*>=\s*1\.1(\.0)?"'
    message: 'Add requires "jsony >= 1.1"'
solution: |-
  version = "0.1.0"
  srcDir = "src"
  bin = @["app"]

  requires "nim >= 2.2.0"
  requires "jsony >= 1.1"
```

```quiz
question: "Which command runs all the test files in a Nimble project's tests folder?"
options:
  - "nim test"
  - "nimble test"
  - "nimble run tests"
answer: 1
explain: nimble test finds the tests/t*.nim files, compiles them and runs each one.
```
