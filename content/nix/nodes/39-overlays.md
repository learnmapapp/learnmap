---
title: Overlays
icon: "🥞"
branch: build
requires: [overrides]
summary: Change nixpkgs itself, for everything that uses it.
---
An override changes one package value. But what if **every** package that uses `openssl` should get your patched version? You need to change nixpkgs itself. That's an **overlay**.

An overlay is a function of two arguments, usually called `final` and `prev`, returning the attributes to add or replace:

```nix
final: prev: {
  hello = prev.hello.overrideAttrs (old: { doCheck = false; });
  my-tool = final.callPackage ./my-tool.nix { };
}
```

- `prev` is nixpkgs **before** this overlay. Use it for the thing you're changing.
- `final` is nixpkgs **after** all overlays. Use it for dependencies, so they pick up other changes.

Apply overlays when importing nixpkgs:

```nix
import <nixpkgs> {
  overlays = [ (import ./overlay.nix) ];
}
```

Or on NixOS:

```nix
nixpkgs.overlays = [ (final: prev: { … }) ];
```

Now `pkgs.my-tool` exists, and anything that uses `hello` gets your version.

```warn
Using `final.hello` inside the overlay that defines `hello` causes infinite recursion. To change a package, start from `prev`.
```

```exercise
goal: Add your package `my-tool` to nixpkgs with an overlay.
code: |
  final: prev: {
  }
checks:
  - match: 'my-tool\s*=\s*(final|prev)\.callPackage\s+\./my-tool\.nix\s*\{\s*\}\s*;'
    message: 'Add  my-tool = final.callPackage ./my-tool.nix { };'
output: "pkgs.my-tool → /nix/store/…-my-tool-0.1"
```
