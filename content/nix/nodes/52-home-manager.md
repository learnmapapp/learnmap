---
title: Home Manager
icon: "🏡"
branch: systems
requires: [nixos-modules, flake-inputs]
summary: Your dotfiles and user tools, declared like a system.
---
NixOS configures the system. **Home Manager** does the same for your user: packages, dotfiles, shell, git, editor. It works on NixOS, other Linux distributions and macOS.

```nix title=home.nix
{ pkgs, ... }:

{
  home.username = "ada";
  home.homeDirectory = "/home/ada";
  home.stateVersion = "25.05";

  home.packages = [ pkgs.ripgrep pkgs.fd pkgs.bat ];

  programs.git = {
    enable = true;
    userName = "Ada Lovelace";
    userEmail = "ada@example.org";
    extraConfig.init.defaultBranch = "main";
  };

  programs.fish.enable = true;
  programs.starship.enable = true;

  home.file.".config/wezterm/wezterm.lua".source = ./wezterm.lua;
}
```

It uses the same module system as NixOS, so everything you learned about modules, options and `mkIf` applies.

From a flake:

```nix
homeConfigurations.ada = home-manager.lib.homeManagerConfiguration {
  pkgs = nixpkgs.legacyPackages.x86_64-linux;
  modules = [ ./home.nix ];
};
```

```shell
$ home-manager switch --flake .#ada
```

Like NixOS, every switch is a generation, and `home-manager generations` lets you go back. On a new laptop, clone your config, run one command, and your whole environment is back.

```exercise
goal: Enable Home Manager's git module and set your user name.
code: |
  {
    home.packages = [ pkgs.ripgrep ];
  }
checks:
  - match: 'programs\.git\s*=\s*\{[^}]*enable\s*=\s*true\s*;'
    message: 'Add  programs.git = { enable = true; … };'
  - match: 'programs\.git\s*=\s*\{[^}]*userName\s*=\s*"[^"]+"\s*;'
    message: 'Set  userName = "Your Name";  inside programs.git.'
output: "~/.config/git/config written"
```
