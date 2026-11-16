---
title: import
icon: "📥"
branch: language
requires: [paths, functions]
summary: Load another file as a value.
---
A `.nix` file contains exactly one expression. `import` evaluates a file and gives you that value:

```nix title=settings.nix
{ port = 8080; host = "localhost"; }
```

```repl
> import ./settings.nix
{ host = "localhost"; port = 8080; }
> (import ./settings.nix).port
8080
```

Importing a folder loads its `default.nix`.

Very often the file is a **function**. Then you import it and call it right away:

```nix title=greet.nix
name: "Hello, ${name}!"
```

```repl
> import ./greet.nix "Nix"
"Hello, Nix!"
```

You've seen this already: `import <nixpkgs> { }` imports nixpkgs (a function) and calls it with an empty set of options.

```nix
let
  pkgs = import <nixpkgs> { };
  config = import ./config.nix { inherit pkgs; };
in
config
```

That's how big Nix setups are split into files: each one is a function that takes what it needs.

```compare python
from settings import port
```

```compare javascript
import settings from "./settings.js";
```

```compare java
// No equivalent: Java imports bring in types, not values.
```

```compare kotlin
// No equivalent: imports bring in names, not evaluated values.
```

```exercise
goal: Import `./hosts.nix` and call it with `{ inherit pkgs; }`.
code: |
  let
    hosts = ./hosts.nix;
  in
  hosts
checks:
  - match: hosts\s*=\s*import\s+\./hosts\.nix\s*\{\s*inherit\s+pkgs\s*;\s*\}\s*;
    message: Write  hosts = import ./hosts.nix { inherit pkgs; };
output: "{ web = { … }; db = { … }; }"
```
