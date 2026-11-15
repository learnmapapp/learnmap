---
title: callPackage
icon: "📞"
branch: build
requires: [set-arguments, import]
summary: How nixpkgs fills in a package's dependencies.
---
Look at any package file in nixpkgs, and it starts like this:

```nix title=hello.nix
{ lib, stdenv, fetchurl }:

stdenv.mkDerivation {
  pname = "hello";
  version = "2.12.1";
  src = fetchurl { … };
}
```

It's a function taking a set of dependencies. Who calls it? `callPackage`:

```nix
pkgs.callPackage ./hello.nix { }
```

`callPackage` looks at the function's argument names, finds each one in `pkgs`, and passes them in. You list what you need; it brings them.

Override one argument with the second set:

```nix
pkgs.callPackage ./app.nix { python3 = pkgs.python311; }
```

The result also gets `.override` for free, so others can change the dependencies later (next lesson).

Use it for your own packages:

```nix title=default.nix
let
  pkgs = import <nixpkgs> { };
in
{
  tool = pkgs.callPackage ./tool.nix { };
  server = pkgs.callPackage ./server.nix { };
}
```

```compare java
// Like constructor injection in Spring: list dependencies, the container supplies them.
```

```compare kotlin
// Like constructor injection with Koin or Spring.
```

```compare python
# Like pytest fixtures: name an argument, get the fixture.
```

```compare javascript
// Like Angular or NestJS dependency injection by name.
```

```exercise
goal: Build ./tool.nix with callPackage.
code: |
  tool = import ./tool.nix;
checks:
  - match: 'tool\s*=\s*pkgs\.callPackage\s+\./tool\.nix\s*\{\s*\}\s*;'
    message: 'Write  tool = pkgs.callPackage ./tool.nix { };'
output: "/nix/store/…-tool-1.0"
```
