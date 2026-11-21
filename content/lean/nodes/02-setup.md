---
title: Setup
icon: "🧰"
branch: basics
requires: [lean]
summary: Install Lean with elan and use it in VS Code.
---
Lean is installed through **elan**, a small tool that downloads and manages Lean versions. Each project says which version it needs, and elan fetches it automatically.

The easiest route is the official **Lean 4 extension for VS Code**. After installing it, open the command palette and pick "Lean 4: Setup: Install elan", or install elan from a terminal:

```repl shell
> curl https://elan.lean-lang.org/elan-init.sh -sSf | sh
info: downloading installer
> lean --version
Lean (version 4.x.x, ...)
```

## The infoview

Lean is meant to be used **interactively**. Create a file `Hello.lean`, open it in VS Code, and type:

```lean title=Hello.lean
#eval 2 + 3
```

A panel called the **infoview** opens beside your code and shows `5`. As you move the cursor, the infoview shows information for that line: results, types, errors, and later, what's left to prove.

Errors appear immediately, with red underlines:

```lean
#eval 2 + "three"
-- error: failed to synthesize HAdd Nat String ?m
```

That message is Lean saying "I don't know how to add a number and a string". You'll learn to read messages like that as you go.

## Without an editor

You can also try Lean in the browser at live.lean-lang.org, with no installation. And a file can be run from the terminal:

```repl shell
> lean --run Hello.lean
```

```tip
Keep the infoview open at all times. Most of the time, it answers your question before you ask it.
```

```compare python
# python3 installs once; pyenv manages versions, like elan
```

```compare typescript
// nvm manages Node versions; elan does the same for Lean
```

```compare rust
// rustup manages Rust toolchains; elan is modelled on it
```

```exercise
goal: "Check that Lean works: write an `#eval` line that adds 40 and 2."
code: |
  -- type below
checks:
  - match: '^#eval\s+40\s*\+\s*2\s*$'
    message: "Write #eval 40 + 2"
solution: |
  -- type below
  #eval 40 + 2
```

```quiz
question: "What does elan do?"
options:
  - "It installs and switches between Lean versions."
  - "It formats Lean code."
  - "It's Lean's maths library."
answer: 0
explain: "elan is the Lean version manager. Each project pins a version and elan fetches it."
```
