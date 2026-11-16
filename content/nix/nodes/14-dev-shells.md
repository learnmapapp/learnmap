---
title: Dev shells
icon: "🐚"
branch: build
requires: [derivations, lists]
summary: A per-project environment with exactly the right tools.
---
Ever cloned a project and spent an hour installing the right Node, Python or database version? With Nix, the project brings its own tools.

Put a `shell.nix` in the project root:

```nix title=shell.nix
{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  packages = [
    pkgs.nodejs_22
    pkgs.postgresql_16
    pkgs.jq
  ];
}
```

Then step into it:

```shell
$ nix-shell
[nix-shell]$ node --version
v22.11.0
```

Leave the shell, and those tools are gone again. Nothing was installed globally, and the next project can use a completely different Node version without any conflict.

```tip
With [flakes](node:flakes) you'll write the same thing as a `devShells` output and enter it with `nix develop`. Tools like `direnv` can even switch shells automatically when you `cd` into a folder.
```

```exercise
goal: Add `pkgs.git` to the shell's packages.
code: |
  pkgs.mkShell {
    packages = [
      pkgs.nodejs_22
    ];
  }
checks:
  - notMatch: 'nodejs_22\s*,'
    message: No commas in Nix lists!
  - match: 'packages\s*=\s*\[[^\]]*pkgs\.git\b[^\]]*\]'
    message: Add pkgs.git inside the packages list.
output: "/nix/store/…-nix-shell"
```

## Environment variables and hooks

`mkShell` takes more than packages. Set environment variables and run commands when the shell starts:

```nix title=shell.nix
pkgs.mkShell {
  packages = [ pkgs.python312 pkgs.uv ];

  DATABASE_URL = "postgres://localhost/dev";

  shellHook = ''
    echo "Welcome to the dev shell"
    export PATH="$PWD/bin:$PATH"
  '';
}
```

Any attribute that isn't a known option becomes an environment variable.

Need a different shell per task, like one for docs? A flake can have several: `devShells.x86_64-linux.docs`, entered with `nix develop .#docs`.

Tired of typing `nix-shell`? [direnv](node:direnv) loads it for you when you `cd` in.

```quiz
question: Where do you put commands that should run every time the shell starts?
options:
  - In packages.
  - In `shellHook`.
  - In .bashrc.
answer: 1
explain: "`shellHook` is a script that runs when you enter the shell."
```
