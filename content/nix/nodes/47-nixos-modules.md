---
title: NixOS modules
icon: "🧩"
branch: systems
requires: [nixos]
summary: Split your system into files that merge together.
---
Every NixOS config file is a [[module]]. A module is a function that returns some config:

```nix title=desktop.nix
{ config, pkgs, ... }:

{
  services.xserver.enable = true;
  services.displayManager.gdm.enable = true;
  environment.systemPackages = [ pkgs.firefox ];
}
```

Pull modules in with `imports`:

```nix title=configuration.nix
{ ... }:

{
  imports = [
    ./hardware-configuration.nix
    ./desktop.nix
    ./users.nix
  ];

  networking.hostName = "workstation";
}
```

NixOS **merges** all modules together. Lists are concatenated (so two modules can both add `systemPackages`), sets are merged, and plain values must agree, or you get a conflict error.

The arguments a module gets:

- `config`: the **final**, merged configuration of the whole system. Read other options with it, like `config.networking.hostName`.
- `pkgs`: nixpkgs.
- `lib`: the library.
- `...`: everything else, which you can ignore.

When two modules set the same value, decide who wins with `lib.mkDefault` (weak) or `lib.mkForce` (strong):

```nix
networking.firewall.enable = lib.mkForce false;
```

```exercise
goal: Import `./users.nix` into this config.
code: |
  { ... }:
  {
    imports = [ ./hardware-configuration.nix ];
  }
checks:
  - match: imports\s*=\s*\[[^\]]*\./users\.nix[^\]]*\]\s*;
    message: Add ./users.nix to the imports list.
output: building the system configuration…
```
