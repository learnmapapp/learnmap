---
title: Flake inputs
icon: "📥"
branch: flakes
requires: [flakes]
summary: Depend on nixpkgs, other flakes, or plain repos.
---
Inputs say what your flake depends on. Each one has a URL:

```nix title=flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    home-manager.url = "github:nix-community/home-manager";
    my-tools.url = "git+https://git.example.org/tools.git?ref=main";
    local.url = "path:/home/ada/projects/lib";
  };

  outputs = { self, nixpkgs, home-manager, my-tools, local }: { … };
}
```

URL styles you'll see:

| URL | Points to |
| --- | --- |
| `github:owner/repo` | default branch |
| `github:owner/repo/branch-or-tag` | a branch or tag |
| `git+https://…?ref=main` | any git repo |
| `path:./sub` | a local folder |

Inputs that aren't flakes (just a repo with source code) need `flake = false;`:

```nix
inputs.theme = {
  url = "github:catppuccin/nvim";
  flake = false;
};
```

**Follows.** Home Manager has its own `nixpkgs` input. Without care you end up with two copies of nixpkgs. Tell it to use yours:

```nix
inputs.home-manager = {
  url = "github:nix-community/home-manager";
  inputs.nixpkgs.follows = "nixpkgs";
};
```

```exercise
goal: Make home-manager use your nixpkgs input instead of its own.
code: |
  inputs.home-manager = {
    url = "github:nix-community/home-manager";
  };
checks:
  - match: 'inputs\.nixpkgs\.follows\s*=\s*"nixpkgs"\s*;'
    message: 'Add  inputs.nixpkgs.follows = "nixpkgs";'
output: "• Updated input 'home-manager/nixpkgs': follows 'nixpkgs'"
```
