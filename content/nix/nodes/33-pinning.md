---
title: Pinning nixpkgs
icon: "📍"
branch: tooling
requires: [search, import]
summary: Same nixpkgs version, same result, on every machine.
---
`import <nixpkgs> { }` uses whatever nixpkgs version your machine has right now. A colleague on another version may get a different build. That's not [[reproducible]].

The fix is to **pin** nixpkgs to an exact commit:

```nix title=shell.nix
let
  nixpkgs = fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/8b27c1239e5c.tar.gz";
    sha256 = "1ki8nj8bnbpq8d6p8rmzkhdm1yj2g6gxbdfv43yq8jpb5pq9bsva";
  };
  pkgs = import nixpkgs { };
in
pkgs.mkShell { packages = [ pkgs.nodejs_22 ]; }
```

Now everyone gets exactly the same packages, today and in five years.

Updating means changing the commit and hash by hand, which is tedious. Tools help:

- **npins** or **niv** keep pins in a JSON file and update them with one command.
- **[Flakes](node:flakes)** pin every input automatically in `flake.lock`. This is the most common way today.

```compare javascript
// package-lock.json pins every dependency's exact version
```

```compare python
# uv.lock / requirements.txt with == versions
```

```compare java
// exact versions in pom.xml, or Gradle's dependency locking
```

```compare kotlin
// Gradle dependency locking: gradle dependencies --write-locks
```

```quiz
question: "Why is  import <nixpkgs> { }  not reproducible?"
options:
  - It downloads packages over HTTP.
  - It depends on which nixpkgs version each machine has.
  - It isn't lazy.
answer: 1
explain: "<nixpkgs> comes from NIX_PATH, which differs per machine. Pin it with fetchTarball, npins or flakes."
```
