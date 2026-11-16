---
title: Finding packages
icon: "🔎"
branch: tooling
requires: [try-packages]
summary: Search nixpkgs by name, and find what a package contains.
---
[[nixpkgs]] has more packages than any other package collection. Finding the right name is step one.

**On the web**: search.nixos.org has packages and NixOS options, with versions and descriptions.

**From the terminal**:

```shell
$ nix search nixpkgs ripgrep
* legacyPackages.x86_64-linux.ripgrep (14.1.1)
  Utility that combines the usability of The Silver Searcher with
  the raw speed of grep
```

Package names don't always match command names. To find which package provides a command, use `nix-locate` (from `nix-index`), or the `comma` tool:

```shell
$ nix-locate --top-level bin/rg
ripgrep.out   /nix/store/…-ripgrep-14.1.1/bin/rg
$ , rg --version          # comma: find and run it in one go
```

Some packages come in several versions with the version in the name: `nodejs_20`, `nodejs_22`, `python312`, `python313`, `postgresql_16`.

Language libraries live in sets: `python3Packages.requests`, `nodePackages.prettier`, `haskellPackages.aeson`.

```compare javascript
// npm search ripgrep, or npmjs.com
```

```compare python
# pypi.org search
```

```compare java
// search.maven.org
```

```compare kotlin
// search.maven.org
```

```quiz
question: You need Python's requests library from nixpkgs. Where is it?
options:
  - "`pkgs.requests`"
  - "`pkgs.python3Packages.requests`"
  - "`pkgs.pip.requests`"
answer: 1
explain: Language libraries live in per-language sets like python3Packages.
```
