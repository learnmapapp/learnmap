---
title: Installing for real
icon: "📌"
branch: tooling
requires: [try-packages]
summary: nix profile, generations and rolling back.
---
Shells are temporary. When you want a tool always available, install it into your **profile**:

```shell
$ nix profile install nixpkgs#ripgrep nixpkgs#bat
$ nix profile list
Name:  ripgrep
Name:  bat
$ nix profile remove bat
```

A profile is a set of symlinks pointing into the [[nix store]]. Installing doesn't overwrite anything: Nix builds a new set of links, a new **generation**, and switches to it in one step.

So you can always go back:

```shell
$ nix profile history
Version 3 (current): ripgrep, bat → removed bat
Version 2: ripgrep, bat
$ nix profile rollback
```

`nix profile upgrade --all` updates everything to the latest nixpkgs.

```tip
Imperative `nix profile install` is fine to start with. Most people later move to declaring their tools in a file, with [Home Manager](node:home-manager) or a NixOS config, so the list lives in git.
```

```compare javascript
// npm install -g ripgrep — no history, no rollback
```

```compare python
# pipx install ripgrep
```

```compare java
// sdk install java 21 (SDKMAN), with `sdk use` to switch
```

```compare kotlin
// sdk install kotlin (SDKMAN)
```

```exercise
goal: Undo the last change to your profile.
code: |
  nix profile remove ripgrep
checks:
  - match: 'nix\s+profile\s+rollback'
    message: 'Use  nix profile rollback'
output: "switching profile from version 3 to 2"
```
