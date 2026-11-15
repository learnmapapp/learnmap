---
title: The Nix store
icon: "🏪"
kind: hub
branch: build
requires: [nix]
summary: Where every package lives, side by side, forever.
---
Everything Nix builds ends up in one place: the [[nix store]], at `/nix/store`. Each item gets its own folder:

```shell
/nix/store/b6gvzjyb2pg0kjfwrjmg1vfhh54ad73z-hello-2.12.1/
/nix/store/0a8vn3p3k2z2l5lnhq3lj9yybyl7q0w4-hello-2.12.2/
/nix/store/q4a5s0c4m8l8i3d3a7kz5rx9b1pv7g2m-python3-3.12.4/
```

That long random-looking prefix is a hash of **everything** that went into the build: the source code, the compiler, the flags, all dependencies. Change any of it, and you get a different [[store path]].

This simple idea has big consequences:

- **No conflicts.** Two versions of the same library live side by side.
- **Nothing is overwritten.** The store is read-only, so upgrades can't break what's already there.
- **Rollbacks are free.** The old version is still in the store. Switching back is just pointing at it again.
- **Sharing is safe.** If someone else built the exact same hash, you can download their result instead of building it yourself.

```quiz
question: You change one compiler flag for a package. What happens to its store path?
options:
  - It stays the same; only the contents change.
  - It gets a new hash, so it's a new path next to the old one.
  - The old path is deleted and replaced.
answer: 1
explain: The hash covers every input, so a new flag means a new path. The old one stays until you garbage-collect it.
```

## Looking inside the store

You can explore the store with a few commands:

```shell
$ nix path-info -rS nixpkgs#hello
/nix/store/…-glibc-2.40          32.1M
/nix/store/…-hello-2.12.1        33.5M
$ nix why-depends nixpkgs#hello nixpkgs#glibc
/nix/store/…-hello-2.12.1
└───/nix/store/…-glibc-2.40
$ nix store ls nixpkgs#hello
./bin
./share
```

Every store path lists exactly which other paths it needs (its **closure**). Copy a closure to another machine with `nix copy`, and it runs there, with nothing else to install.

Most packages aren't built on your machine at all. The **binary cache** at cache.nixos.org has prebuilt results, looked up by hash. If the hash matches, you download; if not, you build.

The store grows over time. See [Garbage collection](node:gc) for cleaning it up.

```quiz
question: Why can Nix download a prebuilt package instead of compiling it?
options:
  - Because every package is only ever built once, by the NixOS team.
  - Because the store path hash identifies the exact inputs, so a cached result with that hash is the same build.
  - Because binaries are the same on every machine anyway.
answer: 1
explain: Same inputs means the same hash, so a cached result with that hash is exactly what you'd build.
```
