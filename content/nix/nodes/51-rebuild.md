---
title: Rebuilding and rolling back
icon: "⏪"
branch: systems
requires: [nixos, flakes]
summary: switch, test, boot, and generations.
---
`nixos-rebuild` builds your config and activates it. It has a few modes:

| Command | Does |
| --- | --- |
| `nixos-rebuild switch` | build, activate now, and make it the boot default |
| `nixos-rebuild test` | activate now, but boot the old one next time |
| `nixos-rebuild boot` | make it the boot default, activate on next reboot |
| `nixos-rebuild build` | only build, to check it compiles |
| `nixos-rebuild build-vm` | build a VM of the config to try it safely |

With a flake, name the configuration:

```shell
$ sudo nixos-rebuild switch --flake .#workstation
```

Every successful switch creates a new **generation**:

```shell
$ nixos-rebuild list-generations
 Generation  Build-date           NixOS version
 42 current  2026-11-15 10:02:11  25.05
 41          2026-11-10 18:44:03  25.05
$ sudo nixos-rebuild switch --rollback
```

If a change breaks so badly that you can't log in, reboot and pick an older generation in the boot menu. The old system is still in the store, exactly as it was.

Rebuild a remote machine from your laptop:

```shell
$ nixos-rebuild switch --flake .#server --target-host root@server.example.org
```

```quiz
question: You want to try a risky change, and get the old system back with a simple reboot. Which command?
options:
  - "nixos-rebuild switch"
  - "nixos-rebuild test"
  - "nixos-rebuild boot"
answer: 1
explain: test activates the new config now, but the boot default stays the same, so rebooting brings back the old one.
```
