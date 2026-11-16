---
title: nixpkgs lib
icon: "📚"
branch: language
requires: [builtins]
summary: The standard library that every Nix file reaches for.
---
`builtins` is small on purpose. The real toolbox is `lib`, a big library of helpers that comes with [[nixpkgs]]:

```nix
let
  pkgs = import <nixpkgs> { };
  lib = pkgs.lib;
in
…
```

Some favourites:

```repl
> lib.strings.toUpper "nix"
"NIX"
> lib.concatStringsSep ", " [ "a" "b" "c" ]
"a, b, c"
> lib.optionals true [ "x" ]
[ "x" ]
> lib.mapAttrs (name: value: value * 10) { a = 1; b = 2; }
{ a = 10; b = 20; }
> lib.recursiveUpdate { a.x = 1; } { a.y = 2; }
{ a = { x = 1; y = 2; }; }
> lib.range 1 4
[ 1 2 3 4 ]
```

`//` only merges the top level; `lib.recursiveUpdate` merges nested sets too.

`lib` is split into sections like `lib.strings`, `lib.lists`, `lib.attrsets`; the most used functions are also available directly on `lib`.

Search it at noogle.dev, which lets you find functions by name or type signature.

```compare python
", ".join(["a", "b", "c"])
{k: v * 10 for k, v in d.items()}
```

```compare javascript
["a", "b", "c"].join(", ");
Object.fromEntries(Object.entries(d).map(([k, v]) => [k, v * 10]));
```

```compare java
String.join(", ", List.of("a", "b", "c"));
```

```compare kotlin
listOf("a", "b", "c").joinToString(", ")
d.mapValues { it.value * 10 }
```

```exercise
goal: Join the list with commas using `lib.concatStringsSep`.
code: |
  builtins.toString [ "web" "db" "cache" ]
checks:
  - match: lib\.concatStringsSep\s+",\s*"\s+\[
    message: Use  lib.concatStringsSep ", " [ … ]
output: '"web, db, cache"'
```
