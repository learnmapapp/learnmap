---
title: Language builders
icon: "🧑‍🍳"
branch: build
requires: [mkderivation, fetchers]
summary: buildGoModule, buildPythonPackage, buildNpmPackage and friends.
---
Each language ecosystem has its own way of fetching dependencies. Nixpkgs wraps them in builders that know the details:

```nix
pkgs.buildGoModule {
  pname = "api";
  version = "1.0";
  src = ./.;
  vendorHash = "sha256-…";
}
```

```nix
pkgs.rustPlatform.buildRustPackage {
  pname = "cli";
  version = "1.0";
  src = ./.;
  cargoHash = "sha256-…";
}
```

```nix
pkgs.buildNpmPackage {
  pname = "web";
  version = "1.0";
  src = ./.;
  npmDepsHash = "sha256-…";
}
```

```nix
pkgs.python3Packages.buildPythonApplication {
  pname = "tool";
  version = "1.0";
  src = ./.;
  pyproject = true;
  build-system = [ pkgs.python3Packages.setuptools ];
  dependencies = with pkgs.python3Packages; [ requests click ];
}
```

The `*Hash` attributes cover **all** dependencies at once. Builds have no network, so the builder downloads the dependencies in a separate fetch step and checks them against that hash. Use the empty-hash trick from [Fetchers](node:fetchers) to get it.

There are builders for Java (Maven and Gradle), Haskell, Elixir (`mixRelease`), Zig and many more. Search nixpkgs for `build*Package`.

```quiz
question: What does `vendorHash` in buildGoModule cover?
options:
  - The source code of your project.
  - All the Go dependencies, fetched in a separate step.
  - The final binary.
answer: 1
explain: The builder fetches all module dependencies at once and checks them against `vendorHash`.
```
