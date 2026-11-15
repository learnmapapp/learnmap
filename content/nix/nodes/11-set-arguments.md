---
title: Set arguments
icon: "🎁"
branch: language
requires: [functions]
summary: Named arguments with defaults, the way every package is written.
---
Most real-world Nix functions take an [[attribute set]] as their single argument, and pull it apart right away:

```nix
{ name, greeting }: "${greeting}, ${name}!"
```

Call it with a set:

```repl
> let greet = { name, greeting }: "${greeting}, ${name}!"; in greet { name = "Ada"; greeting = "Hi"; }
"Hi, Ada!"
```

This gives you named arguments, so order doesn't matter. Add `?` for a default value:

```nix
{ name, greeting ? "Hello" }: "${greeting}, ${name}!"
```

```compare python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
```

```compare javascript
const greet = ({ name, greeting = "Hello" }) => `${greeting}, ${name}!`;
```

```compare kotlin
fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"
```

```compare java
// Java has no named or default parameters; a record + builder is the usual workaround.
record Greet(String name, String greeting) {}
```

Passing an attribute the function doesn't expect is an error. Add `...` to allow extra ones:

```nix
{ pkgs, lib, ... }:
{
  environment.systemPackages = [ pkgs.git ];
}
```

That `{ pkgs, lib, ... }:` header sits at the top of almost every NixOS module and package. Now you can read it!

```exercise
goal: Give `greeting` a default value of `"Hello"`, so the call works without it.
code: |
  let
    greet = { name, greeting }: "${greeting}, ${name}!";
  in
  greet { name = "Ada"; }
checks:
  - match: 'greeting\s*\?\s*"Hello"'
    message: Use ? to give greeting a default.
output: '"Hello, Ada!"'
```

## Naming the whole set with @

Sometimes you want the named arguments **and** the whole set. Use `@`:

```nix
args@{ name, greeting ? "Hello", ... }:
"${greeting}, ${name}! You passed ${toString (builtins.length (builtins.attrNames args))} arguments."
```

`args` is the whole set that was passed in. Note: defaults are **not** added to `args`; it holds exactly what the caller passed.

You'll see this in flakes:

```nix
outputs = inputs@{ self, nixpkgs, ... }: {
  # pass all inputs to a module
};
```

```quiz
question: "In  { a, b ? 2 }: a + b , what happens when you call it with { a = 1; c = 3; }?"
options:
  - "It returns 3."
  - "An error: c is not expected."
  - "It returns 6."
answer: 1
explain: Without ..., unexpected attributes are an error.
```
