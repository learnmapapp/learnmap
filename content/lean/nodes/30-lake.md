---
title: Lake projects
icon: "🏞️"
branch: tools
requires: [setup]
summary: Create, build and run projects with Lean's build tool.
---
For anything beyond a single file, use [[lake|Lake]], Lean's build tool and package manager. It comes with Lean.

```repl shell
> lake new greeter
> cd greeter
> lake build
Build completed successfully.
> lake exe greeter
Hello, world!
```

`lake new` creates a project like this:

```text
greeter/
├── Main.lean           the program's main
├── Greeter.lean        imports the library modules
├── Greeter/
│   └── Basic.lean      library code
├── lakefile.toml       project settings
└── lean-toolchain      the Lean version, read by elan
```

```toml title=lakefile.toml
name = "greeter"
version = "0.1.0"
defaultTargets = ["greeter"]

[[lean_lib]]
name = "Greeter"

[[lean_exe]]
name = "greeter"
root = "Main"
```

## Modules and imports

Each file is a **module**, named after its path: `Greeter/Basic.lean` is `Greeter.Basic`. Use another module's definitions with `import`, at the very top of the file:

```lean title=Main.lean
import Greeter

def main : IO Unit :=
  IO.println s!"Hello, {hello}!"
```

## Versions

`lean-toolchain` pins the exact Lean version, like `leanprover/lean4:v4.x.0`. When you open the project, elan installs that version if needed. Everyone on the project uses the same one.

Dependencies go in `lakefile.toml` as `require` sections, and `lake update` fetches them. You'll add the biggest one, Mathlib, in [Mathlib](node:mathlib).

| Command | What it does |
| --- | --- |
| `lake new name` | create a project |
| `lake build` | compile everything |
| `lake exe name` | build and run an executable |
| `lake update` | fetch or update dependencies |
| `lake clean` | remove build output |

```compare python
uv init greeter   # pyproject.toml
```

```compare typescript
npm init   // package.json
```

```compare kotlin
gradle init   // build.gradle.kts
```

```compare rust
cargo new greeter   # Cargo.toml, very similar to Lake
```

```exercise
lang: toml
goal: "Add an executable to the lakefile: a `[[lean_exe]]` section named `tool` with root `Main`."
code: |
  name = "tool"

  [[lean_lib]]
  name = "Tool"
checks:
  - match: '\[\[lean_exe\]\]\s*\n\s*name\s*=\s*"tool"\s*\n\s*root\s*=\s*"Main"'
    message: "Add [[lean_exe]] with name = \"tool\" and root = \"Main\"."
solution: |
  name = "tool"

  [[lean_lib]]
  name = "Tool"

  [[lean_exe]]
  name = "tool"
  root = "Main"
```

```quiz
question: "What is the `lean-toolchain` file for?"
options:
  - "It pins the Lean version, so elan uses the right one."
  - "It lists the project's dependencies."
  - "It configures the editor."
answer: 0
explain: "Every project records its Lean version there; elan reads it and installs that version."
```
