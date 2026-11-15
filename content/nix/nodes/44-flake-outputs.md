---
title: Flake outputs
icon: "📤"
branch: flakes
requires: [flakes]
summary: packages, devShells, apps and nixosConfigurations.
---
`outputs` is a function from your inputs to an attribute set. Nix tools know where to look in that set:

```nix
outputs = { self, nixpkgs }:
  let
    pkgs = nixpkgs.legacyPackages.x86_64-linux;
  in
  {
    packages.x86_64-linux.default = pkgs.callPackage ./package.nix { };
    packages.x86_64-linux.docs = pkgs.callPackage ./docs.nix { };

    devShells.x86_64-linux.default = pkgs.mkShell { packages = [ pkgs.go ]; };

    apps.x86_64-linux.default = {
      type = "app";
      program = "${self.packages.x86_64-linux.default}/bin/tool";
    };

    nixosConfigurations.server = nixpkgs.lib.nixosSystem { modules = [ ./server.nix ]; };
  };
```

And the commands that use them:

| Command | Uses |
| --- | --- |
| `nix build` | `packages.<system>.default` |
| `nix build .#docs` | `packages.<system>.docs` |
| `nix develop` | `devShells.<system>.default` |
| `nix run` | `apps.<system>.default` (or the default package) |
| `nixos-rebuild switch --flake .#server` | `nixosConfigurations.server` |
| `nix flake check` | builds `checks`, validates everything |

`self` is the flake itself, so outputs can refer to each other.

`nix flake show` lists everything a flake provides.

```exercise
goal: Add a dev shell with pkgs.go as the default devShell.
code: |
  {
    packages.x86_64-linux.default = pkgs.hello;
  }
checks:
  - match: 'devShells\.x86_64-linux\.default\s*=\s*pkgs\.mkShell\s*\{[^}]*packages\s*=\s*\[[^\]]*pkgs\.go\b'
    message: 'Add  devShells.x86_64-linux.default = pkgs.mkShell { packages = [ pkgs.go ]; };'
output: "nix develop → [go 1.23]"
```
