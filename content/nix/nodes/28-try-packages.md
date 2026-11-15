---
title: Try any package
icon: "🛝"
branch: tooling
requires: [store]
summary: nix shell and nix run, without installing anything.
---
Want to try a tool without installing it? Ask Nix for a shell that has it:

```shell
$ cowsay hi
cowsay: command not found
$ nix shell nixpkgs#cowsay nixpkgs#lolcat
$ cowsay hi | lolcat
 ____
< hi >
 ----
$ exit
$ cowsay hi
cowsay: command not found
```

The package is downloaded into the [[nix store]], put on your `PATH` for this shell only, and gone from your `PATH` when you exit.

Just want to run it once? `nix run` does it in one step:

```shell
$ nix run nixpkgs#hello
Hello, world!
$ nix run nixpkgs#python3 -- --version
Python 3.12.8
```

`nixpkgs#cowsay` is a **flake reference**: "the `cowsay` package from the `nixpkgs` flake". Arguments after `--` go to the program.

```tip
These commands are part of the "new" Nix CLI. If you get an error about experimental features, add `experimental-features = nix-command flakes` to `~/.config/nix/nix.conf`.
```

```compare javascript
// npx cowsay hi
```

```compare python
# uvx cowsay  or  pipx run cowsay
```

```compare java
// jbang, or downloading a jar to run once
```

```compare kotlin
// jbang, or a throwaway Gradle project
```

```exercise
goal: Write the command that runs `ripgrep` once, without installing it.
code: |
  nix install nixpkgs#ripgrep
checks:
  - match: 'nix\s+run\s+nixpkgs#ripgrep'
    message: 'Use  nix run nixpkgs#ripgrep'
output: "ripgrep 14.1.1"
```
