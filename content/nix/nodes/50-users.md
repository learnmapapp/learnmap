---
title: Users and groups
icon: "👥"
branch: systems
requires: [nixos-modules]
summary: Declare accounts, SSH keys and sudo rights.
---
Users are configuration too:

```nix
users.users.ada = {
  isNormalUser = true;
  description = "Ada Lovelace";
  extraGroups = [ "wheel" "networkmanager" "docker" ];
  shell = pkgs.fish;
  openssh.authorizedKeys.keys = [
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI… ada@laptop"
  ];
};

programs.fish.enable = true;
```

- `isNormalUser` gives a home folder and a normal shell.
- `wheel` is the group allowed to use `sudo`.
- Changing a shell needs the program enabled system-wide too.

Passwords don't belong in your config, since everything in the Nix store is world-readable. Set them with `passwd` after the first boot, or use `hashedPasswordFile` with a secrets tool like sops-nix or agenix.

Want **only** declared users, so manual changes get undone?

```nix
users.mutableUsers = false;
```

Lock down SSH while you're at it:

```nix
services.openssh = {
  enable = true;
  settings.PasswordAuthentication = false;
  settings.PermitRootLogin = "no";
};
```

```exercise
goal: Give the user ada sudo rights.
code: |
  users.users.ada = {
    isNormalUser = true;
  };
checks:
  - match: 'extraGroups\s*=\s*\[[^\]]*"wheel"[^\]]*\]\s*;'
    message: 'Add  extraGroups = [ "wheel" ];'
output: "ada is now in group wheel"
```
