---
title: Fetchers
icon: "🎣"
branch: build
requires: [mkderivation]
summary: Download sources with a hash, so they can't change.
---
Builds have no network access. Sources come in through **fetchers**, which download something and check it against a hash:

```nix
src = pkgs.fetchurl {
  url = "https://example.org/app-1.0.tar.gz";
  hash = "sha256-…";
};

src = pkgs.fetchFromGitHub {
  owner = "BurntSushi";
  repo = "ripgrep";
  rev = "14.1.1";
  hash = "sha256-…";
};

src = pkgs.fetchgit {
  url = "https://git.example.org/app.git";
  rev = "a1b2c3d";
  hash = "sha256-…";
};
```

If the download ever changes, even by one byte, the hash doesn't match and the build fails. That's how Nix keeps builds [[reproducible]].

**Don't know the hash yet?** Use an empty one, and Nix tells you:

```nix
hash = "";
```

```shell
$ nix-build
error: hash mismatch in fixed-output derivation:
         specified: sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
            got:    sha256-XUSfJfQdJn3hAvAFj8bnM1h9VH6QUkVrIhb8vNbNfSk=
```

Copy the `got:` value into your file. Or use `nix-prefetch-url` / `nix-prefetch-github` up front.

```warn
Updated the `rev` but forgot the hash? Nix may happily reuse the **old** download it already has with that hash. Always clear the hash when you change the version.
```

```exercise
goal: Fetch version 2.0 from GitHub, owner "acme", repo "rocket".
code: |
  src = pkgs.fetchurl {
    url = "";
  };
checks:
  - match: 'pkgs\.fetchFromGitHub\s*\{'
    message: Use pkgs.fetchFromGitHub.
  - match: 'owner\s*=\s*"acme"\s*;'
    message: 'Set  owner = "acme";'
  - match: 'repo\s*=\s*"rocket"\s*;'
    message: 'Set  repo = "rocket";'
  - match: '(rev|tag)\s*=\s*"v?2\.0"\s*;'
    message: 'Set  rev = "2.0";'
  - match: 'hash\s*=\s*"[^"]*"\s*;'
    message: 'Add a hash (an empty "" is fine for now).'
output: "/nix/store/…-source"
```
