---
title: inherit
icon: "🧬"
branch: language
requires: [let-in]
summary: Copy names into a set without repeating yourself.
---
You'll often write things like `name = name;` when passing a value along:

```nix
let
  name = "hello";
  version = "2.12";
in
{
  name = name;
  version = version;
}
```

`inherit` says the same thing in fewer characters:

```nix
let
  name = "hello";
  version = "2.12";
in
{
  inherit name version;
}
```

It also takes names **from another set**, with parentheses:

```nix
{
  inherit (pkgs) git curl jq;
}
# same as: git = pkgs.git; curl = pkgs.curl; jq = pkgs.jq;
```

You'll see `inherit` constantly in packages and flakes. It works in `let` blocks too:

```nix
let
  inherit (pkgs.lib) mkIf mkOption types;
in
…
```

```compare javascript
const pkg = { name, version };          // shorthand properties
const { git, curl } = pkgs;             // destructuring
```

```compare python
pkg = dict(name=name, version=version)
```

```compare kotlin
val pkg = mapOf("name" to name, "version" to version)
```

```compare java
var pkg = Map.of("name", name, "version", version);
```

```exercise
goal: Replace the three repeated lines with one `inherit (pkgs)`.
code: |
  {
    git = pkgs.git;
    curl = pkgs.curl;
    jq = pkgs.jq;
  }
checks:
  - match: 'inherit\s*\(\s*pkgs\s*\)\s+(?=[^;]*\bgit\b)(?=[^;]*\bcurl\b)(?=[^;]*\bjq\b)[\w\s]+;'
    message: 'Write  inherit (pkgs) git curl jq;'
  - notMatch: '=\s*pkgs\.'
    message: Remove the old name = pkgs.name; lines.
output: "{ curl = «derivation»; git = «derivation»; jq = «derivation»; }"
```
