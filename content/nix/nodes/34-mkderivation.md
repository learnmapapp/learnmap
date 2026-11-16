---
title: mkDerivation
icon: "🏗️"
branch: build
requires: [derivations]
summary: The standard way to package software.
---
Raw [[derivation|derivations]] are low level. Almost every package in nixpkgs is built with `stdenv.mkDerivation`, which brings a compiler, `make`, coreutils and sensible defaults.

```nix title=default.nix
{ pkgs ? import <nixpkgs> { } }:

pkgs.stdenv.mkDerivation {
  pname = "hello";
  version = "2.12.1";

  src = pkgs.fetchurl {
    url = "mirror://gnu/hello/hello-2.12.1.tar.gz";
    hash = "sha256-jZkUKv2SV28wsM18tCqNxoCZmLxdYH2Idh9RLibH2yA=";
  };
}
```

```shell
$ nix-build
/nix/store/…-hello-2.12.1
$ ./result/bin/hello
Hello, world!
```

For a standard `./configure && make && make install` project, that's the whole package. `result` is a symlink to the output in the store.

Dependencies go in two lists:

```nix
# tools that run during the build
nativeBuildInputs = [ pkgs.pkg-config pkgs.cmake ];
# libraries you link against
buildInputs = [ pkgs.openssl pkgs.zlib ];
```

Add a `meta` block so others know what it is:

```nix
meta = {
  description = "A program that says hello";
  license = pkgs.lib.licenses.gpl3Plus;
  mainProgram = "hello";
};
```

```exercise
goal: Add `pkgs.openssl` as a library the package links against.
code: |
  pkgs.stdenv.mkDerivation {
    pname = "client";
    version = "1.0";
    src = ./.;
  }
checks:
  - match: 'buildInputs\s*=\s*\[[^\]]*pkgs\.openssl[^\]]*\]\s*;'
    message: 'Add  buildInputs = [ pkgs.openssl ];'
  - notMatch: 'nativeBuildInputs\s*=\s*\[[^\]]*openssl'
    message: Libraries you link against go in buildInputs, not nativeBuildInputs.
output: "/nix/store/…-client-1.0"
```
