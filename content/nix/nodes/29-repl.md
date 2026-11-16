---
title: The REPL
icon: "⌨️"
branch: tooling
requires: [expressions]
summary: Try expressions and explore nixpkgs interactively.
---
`nix repl` gives you an interactive Nix prompt. It's the best place to learn and to poke at things:

```shell
$ nix repl
Nix 2.28.3
Type :? for help.
nix-repl> 1 + 2
3
nix-repl> map (x: x * 2) [ 1 2 3 ]
[ 2 4 6 ]
```

Load all of nixpkgs and explore it with Tab completion:

```shell
nix-repl> :l <nixpkgs>
Added 24812 variables.
nix-repl> pkgs.hello.version
"2.12.1"
nix-repl> pkgs.lib.<Tab>
```

Or load a flake: `:lf .` loads the flake in the current folder, so you can inspect its outputs.

Useful commands:

| Command | Does |
| --- | --- |
| `:l <file>` | load a file or `<nixpkgs>` |
| `:lf <flake>` | load a flake |
| `:p expr` | print a value fully |
| `:b drv` | build a derivation |
| `:e pkgs.hello` | open its source in your editor |
| `:doc lib.map` | show docs |
| `:q` | quit |

```compare python
# python  →  >>> 1 + 2
```

```compare javascript
// node  →  > 1 + 2
```

```compare java
// jshell  →  jshell> 1 + 2
```

```compare kotlin
// kotlinc  →  >>> 1 + 2
```

```quiz
question: In `nix repl`, how do you load nixpkgs?
options:
  - import nixpkgs
  - :l `<nixpkgs>`
  - :load pkgs
answer: 1
explain: :l loads a file, and `<nixpkgs>` finds nixpkgs on your `NIX_PATH`.
```
