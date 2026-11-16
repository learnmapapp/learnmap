---
title: Paths
icon: "📁"
branch: language
requires: [strings]
summary: A type of its own, copied into the store when used.
---
Nix has a real **path** type. Paths are written without quotes, and must contain a slash:

```repl
> ./src
/home/you/project/src
> ../README.md
/home/you/README.md
> builtins.typeOf ./src
"path"
```

Relative paths are resolved against the file they're written in, not the folder you're in.

The magic part: when a path ends up in a [[derivation]] or a string, Nix **copies it into the store** and uses the store path:

```repl
> "${./hello.sh}"
"/nix/store/2xhq…-hello.sh"
```

That's how your source code gets into a build: `src = ./.;` copies the current folder into the store, so the build can never see files you didn't hand it.

Join a path and a string with `+`:

```nix
./config + "/default.nix"
```

Angle brackets look up a path from `NIX_PATH`, like `<nixpkgs>`. That's the old way of finding nixpkgs; [flakes](node:flakes) replace it with pinned inputs.

```compare python
Path(__file__).parent / "src"
```

```compare javascript
path.join(__dirname, "src");
```

```compare java
Path.of("src").toAbsolutePath();
```

```compare kotlin
File("src").absolutePath
```

```quiz
question: What is  ./src  relative to?
options:
  - The folder you ran nix from.
  - The `.nix` file it's written in.
  - The Nix store.
answer: 1
explain: Paths are resolved relative to the file, so a project builds the same from anywhere.
```
