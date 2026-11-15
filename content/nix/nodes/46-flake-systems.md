---
title: Multiple systems
icon: "🌍"
branch: flakes
requires: [flake-outputs, lib]
summary: One flake for Linux and macOS, Intel and ARM.
---
Outputs are keyed by **system**: `x86_64-linux`, `aarch64-linux`, `x86_64-darwin`, `aarch64-darwin` (Apple Silicon). Writing each by hand means copying everything four times.

A small helper function fixes that:

```nix title=flake.nix
{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell { packages = [ pkgs.nodejs_22 ]; };
      });

      packages = forAllSystems (pkgs: {
        default = pkgs.callPackage ./package.nix { };
      });
    };
}
```

`lib.genAttrs` builds an attribute set with one entry per name:

```repl
> lib.genAttrs [ "a" "b" ] (name: "hi ${name}")
{ a = "hi a"; b = "hi b"; }
```

The community libraries **flake-utils** (`eachDefaultSystem`) and **flake-parts** (a module system for flakes) do the same with more features. The plain helper above has no extra inputs, which many people like.

```exercise
goal: Add "aarch64-darwin" so the flake also works on Apple Silicon Macs.
code: |
  systems = [ "x86_64-linux" "aarch64-linux" ];
checks:
  - match: 'systems\s*=\s*\[[^\]]*"aarch64-darwin"[^\]]*\]\s*;'
    message: 'Add "aarch64-darwin" to the list (no commas!).'
  - notMatch: '",'
    message: No commas in Nix lists.
output: "devShells.aarch64-darwin.default ✓"
```
