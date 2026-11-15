---
title: Strings
icon: "💬"
branch: language
requires: [expressions]
summary: Double quotes, interpolation and multi-line strings.
---
Strings go between double quotes and join with `+`:

```repl
> "nix" + "os"
"nixos"
```

Gluing pieces together gets messy, so Nix has [[interpolation]]: put any expression inside `${ }`.

```repl
> let name = "world"; in "Hello, ${name}!"
"Hello, world!"
```

```compare python
name = "world"
f"Hello, {name}!"
```

```compare javascript
const name = "world";
`Hello, ${name}!`
```

```compare java
String name = "world";
"Hello, %s!".formatted(name)
```

```compare kotlin
val name = "world"
"Hello, $name!"
```

Interpolation only accepts strings (and paths). Numbers have to be converted first:

```repl
> "v${2}"
error: cannot coerce an integer to a string: 2
> "v${toString 2}"
"v2"
```

For longer text, use two single quotes. Nix strips the common indentation for you, which is perfect for scripts:

```nix
''
  echo "Building..."
  make install
''
```

```exercise
goal: Fix the error, so this evaluates to `"nix-2"`.
code: |
  "nix-${2}"
checks:
  - match: 'toString\s+2|"2"'
    message: Interpolation needs a string. Convert the number first.
output: '"nix-2"'
hint: There's a built-in function called toString.
```

## Handy string functions

A few builtins you'll use often:

```repl
> builtins.stringLength "nix"
3
> builtins.substring 0 3 "nixpkgs"
"nix"
> builtins.replaceStrings [ "-" ] [ "_" ] "my-app"
"my_app"
> builtins.split "," "a,b"
[ "a" [ ] "b" ]
> lib.splitString "," "a,b"
[ "a" "b" ]
> lib.hasPrefix "nix" "nixos"
true
```

The `lib` versions come from nixpkgs and are usually friendlier. See [nixpkgs lib](node:lib).

For long scripts and config files, see [Indented strings](node:multiline-strings), including how to escape `${`.

```quiz
question: How do you turn my-app into my_app?
options:
  - '"my-app".replace("-", "_")'
  - "builtins.replaceStrings [ \"-\" ] [ \"_\" ] \"my-app\""
  - '"my-app" // { "-" = "_"; }'
answer: 1
explain: replaceStrings takes a list of things to find and a list of replacements.
```
