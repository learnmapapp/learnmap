---
title: Overriding packages
icon: "🎛️"
branch: build
requires: [callpackage]
summary: override and overrideAttrs to tweak any package.
---
Nixpkgs packages aren't fixed. You can change them without copying their code.

**`.override`** changes the arguments passed to the package function, the things `callPackage` filled in:

```nix
pkgs.ffmpeg.override { withSvtav1 = true; }
pkgs.curl.override { openssl = pkgs.libressl; }
```

**`.overrideAttrs`** changes the attributes passed to `mkDerivation`: version, source, patches, phases.

```nix
pkgs.hello.overrideAttrs (old: {
  version = "2.12.2";
  src = pkgs.fetchurl {
    url = "mirror://gnu/hello/hello-2.12.2.tar.gz";
    hash = "sha256-…";
  };
  patches = (old.patches or [ ]) ++ [ ./fix-greeting.patch ];
})
```

`old` is the original attribute set, so you can extend lists instead of replacing them. `old.patches or [ ]` falls back to an empty list when there were no patches.

| I want to change… | Use |
| --- | --- |
| a dependency or feature flag | `.override` |
| the version, source, patches, build steps | `.overrideAttrs` |

Everything that depends on the overridden package gets rebuilt against your version, automatically.

```exercise
goal: Add ./my.patch to hello's patches, keeping the existing ones.
code: |
  pkgs.hello.overrideAttrs (old: {
  })
checks:
  - match: 'patches\s*=\s*\(?\s*old\.patches\s+or\s+\[\s*\]\s*\)?\s*\+\+\s*\[\s*\./my\.patch\s*\]\s*;'
    message: 'Write  patches = (old.patches or [ ]) ++ [ ./my.patch ];'
output: "/nix/store/…-hello-2.12.1"
```
