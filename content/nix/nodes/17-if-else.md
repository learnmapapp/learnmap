---
title: if … then … else
icon: "🔀"
branch: language
requires: [booleans]
summary: Conditionals that always return a value.
---
In Nix, `if` is an expression, like the ternary operator in other languages. That means it **always** needs an `else`:

```repl
> if 3 > 2 then "yes" else "no"
"yes"
> if false then 1
error: syntax error, unexpected end of file, expecting 'else'
```

Since it returns a value, you can drop it anywhere a value fits:

```nix
{
  port = if production then 443 else 8080;
  packages = [ pkgs.git ]
    ++ (if withDocs then [ pkgs.pandoc ] else [ ]);
}
```

That last pattern is so common that nixpkgs has helpers for it, `lib.optional` and `lib.optionals`:

```nix
packages = [ pkgs.git ] ++ lib.optionals withDocs [ pkgs.pandoc ];
```

The condition must be a real boolean. `if 1 then …` is an error, not "truthy".

```compare python
port = 443 if production else 8080
```

```compare javascript
const port = production ? 443 : 8080;
```

```compare java
int port = production ? 443 : 8080;
```

```compare kotlin
val port = if (production) 443 else 8080
```

```exercise
goal: Use port 443 when `secure` is `true`, and 80 otherwise.
code: |
  { secure }:
  {
    port = 80;
  }
checks:
  - match: port\s*=\s*if\s+secure\s+then\s+443\s+else\s+80\s*;
    message: Write  port = if secure then 443 else 80;
output: "{ port = 443; }"
```
