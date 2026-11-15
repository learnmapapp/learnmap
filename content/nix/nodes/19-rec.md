---
title: rec sets
icon: "🔁"
branch: language
requires: [attribute-sets]
summary: Attribute sets whose attributes can see each other.
---
Inside a normal attribute set, attributes can't refer to each other:

```repl
> { a = 1; b = a + 1; }
error: undefined variable 'a'
```

Put `rec` in front, and they can:

```repl
> rec { a = 1; b = a + 1; }
{ a = 1; b = 2; }
```

Old packages use it a lot:

```nix
stdenv.mkDerivation rec {
  pname = "hello";
  version = "2.12.1";
  src = fetchurl {
    url = "mirror://gnu/hello/hello-${version}.tar.gz";
    hash = "sha256-…";
  };
}
```

```warn
`rec` makes it easy to create infinite recursion by accident: `rec { a = b; b = a; }` never finishes. Many people prefer `let … in` instead, which is clearer about what refers to what.
```

The same package with `let`:

```nix
let
  version = "2.12.1";
in
stdenv.mkDerivation {
  pname = "hello";
  inherit version;
  src = fetchurl { url = "mirror://gnu/hello/hello-${version}.tar.gz"; hash = "sha256-…"; };
}
```

```compare javascript
// Objects can't refer to their own properties while being built:
const o = { a: 1, b: o.a + 1 }; // ReferenceError
```

```compare python
# Same in Python: a dict literal can't use its own keys.
```

```compare kotlin
// Use a val first, or an object with properties that refer to each other.
```

```compare java
// Fields can refer to earlier fields in a class, but not in a Map literal.
```

```exercise
goal: Make this set recursive so `url` can use `version`.
code: |
  {
    version = "1.0";
    url = "https://example.org/app-${version}.tar.gz";
  }
checks:
  - match: '^\s*rec\s*\{'
    message: Put rec before the opening brace.
output: '{ url = "https://example.org/app-1.0.tar.gz"; version = "1.0"; }'
```
