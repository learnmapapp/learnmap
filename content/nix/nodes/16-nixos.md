---
title: NixOS
icon: "🐧"
kind: hub
branch: systems
requires: [set-arguments, store]
summary: A whole Linux distribution configured in Nix.
---
NixOS takes the Nix idea all the way: your **entire operating system** is described in one configuration. Users, services, packages, the bootloader, everything.

```nix title=/etc/nixos/configuration.nix
{ config, pkgs, ... }:

{
  networking.hostName = "workstation";
  time.timeZone = "Europe/Amsterdam";

  users.users.ada = {
    isNormalUser = true;
    extraGroups = [ "wheel" ];
  };

  environment.systemPackages = [ pkgs.git pkgs.firefox ];

  services.openssh.enable = true;
}
```

Read it top to bottom: it's a [[function]] with [[attribute set|set arguments]], returning an attribute set. You can read this now!

Apply it with:

```shell
$ sudo nixos-rebuild switch
```

Every switch creates a new *generation*. Broke something? Pick the previous generation in the boot menu, or run `nixos-rebuild switch --rollback`. Because of the [[nix store]], the old system is still there, untouched.

Each file like this is a [[module]]. NixOS merges all modules together, so you can split your config into `networking.nix`, `users.nix` and so on.

```exercise
goal: Enable the Docker service.
code: |
  { config, pkgs, ... }:
  {
    networking.hostName = "workstation";
  }
checks:
  - match: 'virtualisation\.docker\.enable\s*=\s*true\s*;'
    message: "The option is virtualisation.docker.enable (British spelling!)."
output: "building the system configuration…"
hint: "virtualisation.docker.enable = true;"
```

## Where to go from here

NixOS is a deep topic, but it's built from things you already know: attribute sets, functions and modules. The next lessons cover:

- [Modules](node:nixos-modules): splitting your config into files.
- [Your own options](node:nixos-options): reusable modules with `enable` switches.
- [Services](node:services): databases, web servers and systemd.
- [Users](node:users): accounts, SSH keys and sudo.
- [Rebuilding](node:rebuild): switch, test and roll back.
- [Home Manager](node:home-manager): your dotfiles, declared the same way.

```quiz
question: You run nixos-rebuild switch and the new config breaks your Wi-Fi. What's the quickest way back?
options:
  - Reinstall NixOS.
  - Run nixos-rebuild switch --rollback, or pick the previous generation at boot.
  - Edit files in /etc by hand.
answer: 1
explain: The previous generation is still in the store, so rolling back is instant.
```
