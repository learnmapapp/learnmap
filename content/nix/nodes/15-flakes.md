---
title: Flakes
icon: "❄️"
kind: hub
branch: flakes
requires: [dev-shells]
summary: Pinned inputs, standard outputs, reproducible projects.
---
`import <nixpkgs>` uses whatever version of nixpkgs happens to be on your machine. Your colleague might have a different one, and suddenly the "reproducible" build isn't.

A [[flake]] fixes that. It's a `flake.nix` file with two parts: **inputs** (what you depend on) and **outputs** (what you provide).

```nix title=flake.nix
{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";

  outputs = { self, nixpkgs }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = [ pkgs.nodejs_22 ];
      };
    };
}
```

The first time you use it, Nix writes a `flake.lock` with the exact commit of every input. Commit that file, and everyone gets exactly the same packages, until you decide to update with `nix flake update`.

```compare javascript
// Same idea as package.json + package-lock.json:
{ "dependencies": { "nixpkgs": "github:NixOS/nixpkgs#nixos-24.11" } }
```

```compare python
# Same idea as pyproject.toml + a lock file (uv.lock / poetry.lock).
```

```compare java
// Same idea as a Gradle version catalog + dependency locking.
```

```compare kotlin
// Same idea as a Gradle version catalog + dependency locking.
```

```compare go
// Same idea as go.mod + go.sum.
```

Notice `outputs` is just a function taking your inputs as a set argument. Everything you've learned comes together here.

```quiz
question: Which file makes a flake reproducible across machines?
options:
  - "`flake.nix`"
  - "`flake.lock`"
  - "`shell.nix`"
answer: 1
explain: "`flake.lock` pins the exact revision of every input."
```

## Flake commands

You use flakes through the `nix` command:

```shell
$ nix flake init            # start a flake.nix in this folder
$ nix flake show            # what does this flake provide?
$ nix develop               # enter its dev shell
$ nix build                 # build its default package
$ nix run github:owner/repo # run someone else's flake, no clone
$ nix flake update          # update flake.lock
```

The `#` picks an output: `nix build .#docs` builds the `docs` package of the flake in `.`, and `nixpkgs#hello` means the `hello` package of nixpkgs.

The rest of this branch goes deeper into [inputs](node:flake-inputs), [outputs](node:flake-outputs), the [lock file](node:flake-lock) and [multiple systems](node:flake-systems).
