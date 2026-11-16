---
title: assert and throw
icon: "🚨"
branch: language
requires: [if-else, builtins]
summary: Fail loudly with a helpful message.
---
Sometimes a value just doesn't make sense, and the best thing is to stop with a clear message.

`throw` stops evaluation with an error:

```nix
{ port }:
if port < 1024 then throw "port ${toString port} needs root, pick one above 1024"
else { inherit port; }
```

`assert` checks a condition before continuing:

```nix
{ version }:
assert builtins.isString version;
{ name = "app-${version}"; }
```

```repl
> assert 1 + 1 == 3; "never"
error: assertion '((1 + 1) == 3)' failed
```

`abort` is like `throw` but can't be caught. And `builtins.tryEval` catches a `throw` (only a `throw`, nothing else):

```repl
> builtins.tryEval (throw "nope")
{ success = false; value = false; }
```

For debugging, `builtins.trace` prints a message and returns its second argument:

```nix
builtins.trace "got here: ${toString x}" x
```

In NixOS modules, prefer the `assertions` option, which collects all problems and reports them together.

```compare python
assert isinstance(version, str)
raise ValueError("port needs root")
```

```compare javascript
console.assert(typeof version === "string");
throw new Error("port needs root");
```

```compare java
assert version != null;
throw new IllegalArgumentException("port needs root");
```

```compare kotlin
require(version.isNotEmpty())
error("port needs root")
```

```exercise
goal: Throw a helpful error when name is empty, instead of returning `null`.
code: |
  { name }:
  if name == "" then null else { inherit name; }
checks:
  - match: then\s+throw\s+"[^"]+"
    message: Replace null with  throw "name must not be empty"
output: "error: name must not be empty"
```
