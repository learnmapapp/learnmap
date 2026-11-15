---
title: Build phases
icon: "🪜"
branch: build
requires: [mkderivation, multiline-strings]
summary: unpack, configure, build, install, and how to change them.
---
`mkDerivation` runs a build as a series of **phases**, each a small shell script:

| Phase | Default |
| --- | --- |
| `unpackPhase` | extract `src` |
| `patchPhase` | apply `patches` |
| `configurePhase` | run `./configure` |
| `buildPhase` | run `make` |
| `checkPhase` | run `make check` (if `doCheck = true`) |
| `installPhase` | run `make install` into `$out` |

For anything non-standard, replace a phase:

```nix
stdenv.mkDerivation {
  pname = "greet";
  version = "1.0";
  src = ./.;

  buildPhase = ''
    runHook preBuild
    $CC greet.c -o greet
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mkdir -p $out/bin
    cp greet $out/bin/
    runHook postInstall
  '';
}
```

`$out` is the store path this build must write to. It's the only place a build can write.

Often you don't need to replace a phase, just add to it with a hook like `postInstall`:

```nix
postInstall = ''
  install -Dm644 greet.1 $out/share/man/man1/greet.1
'';
```

```tip
`runHook preBuild` / `postBuild` keep the hooks working when you write your own phase. Leave them in.
```

```exercise
goal: Write an installPhase that copies `app` into $out/bin.
code: |
  installPhase = ''
    runHook preInstall
    runHook postInstall
  '';
checks:
  - match: 'mkdir\s+-p\s+\$out/bin'
    message: 'First create the folder:  mkdir -p $out/bin'
  - match: 'cp\s+(\./)?app\s+\$out/bin/?'
    message: 'Then copy it:  cp app $out/bin/'
output: "/nix/store/…-app-1.0/bin/app"
```
