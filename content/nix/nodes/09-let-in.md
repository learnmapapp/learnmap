---
title: let … in
icon: "🏷️"
branch: language
requires: [attribute-sets]
summary: Give names to values and reuse them.
---
Sooner or later the same value shows up twice:

```nix
{
  name = "hello-2.12.1";
  url = "https://ftp.gnu.org/gnu/hello/hello-2.12.1.tar.gz";
}
```

Update one, forget the other, and things break. `let … in` lets you name a value once. Between `let` and `in` you write [[binding|binding]]s; after `in` comes the expression that uses them:

```nix
let
  version = "2.12.1";
in
{
  name = "hello-${version}";
  url = "https://ftp.gnu.org/gnu/hello/hello-${version}.tar.gz";
}
```

```compare python
version = "2.12.1"
pkg = {"name": f"hello-{version}", "url": f".../hello-{version}.tar.gz"}
```

```compare javascript
const version = "2.12.1";
const pkg = { name: `hello-${version}`, url: `.../hello-${version}.tar.gz` };
```

```compare java
final var version = "2.12.1";
var pkg = Map.of("name", "hello-" + version, "url", ".../hello-" + version + ".tar.gz");
```

```compare kotlin
val version = "2.12.1"
val pkg = mapOf("name" to "hello-$version", "url" to ".../hello-$version.tar.gz")
```

Bindings are like constants: they never change. The order doesn't matter, and they can refer to each other:

```repl
> let full = "${name}-${version}"; name = "hello"; version = "2.12"; in full
"hello-2.12"
```

They also only exist inside their own `let … in`. Nothing leaks out.

```exercise
goal: Introduce a binding `port = 8080;` and use it in both places.
code: |
  {
    listen = 8080;
    firewall.allowedPorts = [ 8080 ];
  }
checks:
  - match: 'let[\s\S]*port\s*=\s*8080\s*;[\s\S]*in'
    message: Start with  let port = 8080; in  before the braces.
  - notMatch: 'listen\s*=\s*8080'
    message: Use the port binding for listen, instead of the number.
  - notMatch: '\[\s*8080\s*\]'
    message: Use the port binding in the list too.
output: '{ firewall = { allowedPorts = [ 8080 ]; }; listen = 8080; }'
hint: "let port = 8080; in { listen = port; … }"
```

## let in real files

Most Nix files you'll meet start with a `let` block that sets up names, then return one big set:

```nix
{ pkgs, ... }:

let
  python = pkgs.python312;
  tools = [ pkgs.ruff pkgs.uv ];
in
{
  environment.systemPackages = [ python ] ++ tools;
}
```

`let` bindings can be functions too, which is how you write little helpers:

```nix
let
  mkUser = name: { isNormalUser = true; description = name; };
in
{
  users.users.ada = mkUser "Ada";
  users.users.bob = mkUser "Bob";
}
```

```quiz
question: "Can a binding in a let block refer to a binding written below it?"
options:
  - No, they're evaluated top to bottom.
  - Yes, order doesn't matter.
  - Only with rec.
answer: 1
explain: Bindings in one let can refer to each other in any order. Nix is lazy, so it works out what's needed.
```
