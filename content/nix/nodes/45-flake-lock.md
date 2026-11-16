---
title: flake.lock
icon: "🔒"
branch: flakes
requires: [flake-inputs]
summary: Updating, pinning and inspecting your inputs.
---
The first time a flake is used, Nix resolves every input to an exact commit and writes `flake.lock`:

```json title=flake.lock
{
  "nodes": {
    "nixpkgs": {
      "locked": {
        "owner": "NixOS",
        "repo": "nixpkgs",
        "rev": "8b27c1239e5c421a2bbc2c65d52e4a6fbf2ff296",
        "narHash": "sha256-…",
        "type": "github"
      }
    }
  }
}
```

Commit it. From then on, everyone builds against those exact commits.

Updating is always explicit:

```shell
$ nix flake update          # update every input
$ nix flake update nixpkgs  # update just one
$ nix flake metadata        # show inputs and when they were locked
```

Want an older nixpkgs for one input? Pin a commit in the URL:

```nix
inputs.nixpkgs-old.url =
  "github:NixOS/nixpkgs/8b27c1239e5c421a2bbc2c65d52e4a6fbf2ff296";
```

```warn
Flakes only see files that git knows about. A new file you haven't `git add`-ed is invisible to the build, which is the most common "file not found" surprise.
```

```quiz
question: You only want a newer nixpkgs, and leave the other inputs alone. What do you run?
options:
  - "`nix flake update`"
  - "`nix flake update nixpkgs`"
  - rm `flake.lock`
answer: 1
explain: Naming an input updates only that one in `flake.lock`.
```
