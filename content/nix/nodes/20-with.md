---
title: with
icon: "🎒"
branch: language
requires: [attribute-sets]
summary: Bring a set's attributes into scope.
---
Writing `pkgs.` before every package gets repetitive:

```nix
[ pkgs.git pkgs.curl pkgs.jq pkgs.ripgrep pkgs.fd ]
```

`with` makes all attributes of a set available as plain names, for one expression:

```nix
with pkgs; [ git curl jq ripgrep fd ]
```

You'll see it a lot in package lists:

```nix
environment.systemPackages = with pkgs; [ git vim htop ];
```

```warn
Keep `with` small and local. A big `with pkgs;` at the top of a file makes it hard to tell where a name comes from, and tools can't warn you about typos. `inherit (pkgs) …` is the explicit alternative.
```

One quirk: variables you define yourself always win over names from `with`:

```repl
> let git = "mine"; in with { git = "theirs"; }; git
"mine"
```

```compare python
from pkgs import git, curl, jq  # but for one expression only
```

```compare javascript
// JavaScript had a with statement too. It was deprecated for the same reasons.
const { git, curl, jq } = pkgs;
```

```compare kotlin
with(pkgs) { listOf(git, curl, jq) }
```

```compare java
import static pkgs.*; // closest, but for a whole file
```

```exercise
goal: Shorten the list with `with pkgs;`.
code: |
  [ pkgs.git pkgs.curl pkgs.jq ]
checks:
  - match: 'with\s+pkgs\s*;\s*\[\s*git\s+curl\s+jq\s*\]'
    message: 'Write  with pkgs; [ git curl jq ]'
output: "[ «derivation» «derivation» «derivation» ]"
```
