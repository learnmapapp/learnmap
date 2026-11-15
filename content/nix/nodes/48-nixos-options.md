---
title: Your own options
icon: "🎚️"
branch: systems
requires: [nixos-modules, if-else]
summary: mkOption, mkEnableOption and mkIf.
---
Modules can declare **options** too, which is how every `services.*.enable` in NixOS is made. A module with options has two parts: `options` and `config`.

```nix title=modules/greeter.nix
{ config, lib, pkgs, ... }:

let
  cfg = config.services.greeter;
in
{
  options.services.greeter = {
    enable = lib.mkEnableOption "the greeter service";
    message = lib.mkOption {
      type = lib.types.str;
      default = "Hello";
      description = "What to say.";
    };
  };

  config = lib.mkIf cfg.enable {
    environment.etc."greeting".text = cfg.message;
  };
}
```

Now any machine can use it:

```nix
services.greeter = {
  enable = true;
  message = "Moin";
};
```

- `mkEnableOption` makes a boolean defaulting to `false`.
- `mkOption` declares a typed option. Types like `types.str`, `types.port`, `types.listOf types.str` catch mistakes early.
- `mkIf` only applies the config when the condition holds. Use it instead of `if … then … else`, which would cause infinite recursion when reading `config`.

```exercise
goal: Add a `port` option with type lib.types.port and default 8080.
code: |
  options.services.greeter = {
    enable = lib.mkEnableOption "the greeter service";
  };
checks:
  - match: 'port\s*=\s*lib\.mkOption\s*\{'
    message: 'Add  port = lib.mkOption { … };'
  - match: 'type\s*=\s*lib\.types\.port\s*;'
    message: 'Set  type = lib.types.port;'
  - match: 'default\s*=\s*8080\s*;'
    message: 'Set  default = 8080;'
output: "services.greeter.port = 8080"
```
