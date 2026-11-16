---
title: Derivations
icon: "🧪"
branch: build
requires: [store, set-arguments]
summary: Recipes that turn inputs into store paths.
---
A [[derivation]] is a build recipe: which source to use, which tools are allowed, and what commands produce the result. Nix runs it in a sandbox, so the build can only see what you declared.

You'll rarely write raw derivations. Instead you call helpers from [[nixpkgs]]. The most common one is `stdenv.mkDerivation`:

```nix title=hello.nix
{ stdenv, fetchurl }:

stdenv.mkDerivation {
  pname = "hello";
  version = "2.12.1";
  src = fetchurl {
    url = "https://ftp.gnu.org/gnu/hello/hello-2.12.1.tar.gz";
    hash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="; # Nix tells you the real one
  };
}
```

Look closely, and you know everything here already: a function taking a [[attribute set|set argument]], calling another function with an attribute set. The hash pins the download, so a changed file is caught right away.

For small things there are even simpler helpers:

```nix
pkgs.writeShellScriptBin "greet" ''
  echo "Hello from the Nix store!"
''
```

Build it, and you get a store path with a `bin/greet` inside:

```shell
$ nix build
$ ./result/bin/greet
Hello from the Nix store!
```

```exercise
goal: Change the script so it prints `Hello, Nix!` instead.
code: |
  pkgs.writeShellScriptBin "greet" ''
    echo "Hello from the Nix store!"
  ''
checks:
  - match: 'writeShellScriptBin\s+"greet"'
    message: Keep the name "greet".
  - match: 'echo\s+"Hello, Nix!"'
    message: Change the echo line.
output: "/nix/store/…-greet"
```

## Sandboxed builds

When Nix builds a derivation, it runs in a **sandbox**:

- No network access (sources come from [fetchers](node:fetchers) with a known hash).
- No access to your home folder or `/usr`.
- Only the inputs the derivation lists are visible.
- The output must go into `$out`, a fresh store path.

That's what makes builds reproducible: if it isn't declared, it can't be used. A build that works on your laptop works on CI, because neither can see anything extra.

To see what a derivation would do, without building it:

```shell
$ nix derivation show nixpkgs#hello
{ "/nix/store/…-hello-2.12.1.drv": { "outputs": { "out": … }, "inputDrvs": … } }
```

Ready to package something properly? Continue with [mkDerivation](node:mkderivation).

```quiz
question: Your build script runs `curl` to download a library halfway through the build. What happens?
options:
  - It works, as long as the URL is reachable.
  - It fails. The sandbox has no network, so downloads must be declared up front with a fetcher and a hash.
  - Nix caches the download for next time.
answer: 1
explain: Inside the sandbox there's no network. Fetchers download sources before the build and check them against a known hash.
```
