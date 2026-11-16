---
title: Attribute sets
icon: "🗂️"
branch: language
requires: [strings, booleans]
summary: The key–value structure that holds almost everything in Nix.
---
An [[attribute set]] is a collection of names and values between curly braces. Every [[attribute]] ends with a semicolon:

```repl
> { name = "hello"; version = "2.12"; }
{ name = "hello"; version = "2.12"; }
```

You'll write these constantly. A NixOS config, a package, a flake: they are all attribute sets.

```compare python
{"name": "hello", "version": "2.12"}
```

```compare javascript
{ name: "hello", version: "2.12" }
```

```compare java
Map.of("name", "hello", "version", "2.12")
```

```compare kotlin
mapOf("name" to "hello", "version" to "2.12")
```

```compare go
map[string]string{"name": "hello", "version": "2.12"}
```

Grab a value with a dot. Nested sets can be written with dots too, which keeps configs short:

```repl
> { a = 1; b = 2; }.b
2
> { services.nginx.enable = true; }
{ services = { nginx = { enable = true; }; }; }
```

Missing attributes are an error, unless you give a fallback with `or`:

```repl
> { a = 1; }.b
error: attribute 'b' missing
> { a = 1; }.b or 0
0
```

And `//` merges two sets. The right side wins:

```repl
> { color = "red"; size = 1; } // { size = 2; }
{ color = "red"; size = 2; }
```

```exercise
goal: Add an attribute `enable` with the value `true`.
code: |
  {
    name = "nginx";
  }
checks:
  - match: 'enable\s*=\s*true'
    message: Add a line like  name = value;  inside the braces.
  - match: 'enable\s*=\s*true\s*;'
    message: "Almost: every attribute ends with a semicolon."
output: '{ enable = true; name = "nginx"; }'
```

```quiz
question: "What does `{ a = 1; b = 2; } // { b = 3; }` evaluate to?"
options:
  - "`{ a = 1; b = 2; }`"
  - "`{ a = 1; b = 3; }`"
  - "`{ b = 3; }`"
answer: 1
explain: "`//` merges both sets, and when a name exists on both sides, the right one wins."
```

## Exploring sets

A few builtins help you look inside attribute sets:

```repl
> builtins.attrNames { b = 1; a = 2; }
[ "a" "b" ]
> builtins.attrValues { b = 1; a = 2; }
[ 2 1 ]
> { a = 1; } ? a
true
> builtins.removeAttrs { a = 1; b = 2; } [ "b" ]
{ a = 1; }
> builtins.mapAttrs (name: value: value + 1) { a = 1; b = 2; }
{ a = 2; b = 3; }
```

`?` checks whether an attribute exists. Names are always sorted alphabetically when printed.

Attribute names can be strings, which lets you use any characters, or computed with interpolation:

```nix
{
  "my-app.service" = { … };
  ${name} = value;
}
```

Next up: let the attributes refer to each other with [rec](node:rec), and copy names in quickly with [inherit](node:inherit).

```quiz
question: What does  `{ a = 1; } ? b`  return?
options:
  - "`null`"
  - "`false`"
  - An error.
answer: 1
explain: The ? operator checks for an attribute and returns a boolean.
```
