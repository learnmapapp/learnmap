---
title: Hex packages
icon: "🧰"
branch: tooling
requires: [mix]
summary: Add libraries from hex.pm.
---
[[hex|Hex]] is Elixir's package registry, at hex.pm. Add a dependency to `deps` in `mix.exs`:

```elixir title=mix.exs
defp deps do
  [
    {:jason, "~> 1.4"},
    {:req, "~> 0.5"},
    {:credo, "~> 1.7", only: [:dev, :test], runtime: false}
  ]
end
```

Then fetch them:

```repl shell
> mix deps.get
Resolving Hex dependencies...
  jason 1.4.4
  req 0.5.10
```

The exact versions are written to `mix.lock`. Commit it, so everyone gets the same versions.

`"~> 1.4"` means "1.4 or newer, but below 2.0". `"~> 0.5.2"` means "0.5.2 or newer, below 0.6".

`only:` limits a dependency to some environments, like test helpers. `runtime: false` means it's only a tool, not part of your running app.

```repl
> Jason.encode!(%{name: "Drop"})
"{\"name\":\"Drop\"}"
> Req.get!("https://api.github.com/repos/elixir-lang/elixir").body["stargazers_count"]
25000
```

Documentation for every package lives at hexdocs.pm, generated from the same `@doc` attributes you write.

```compare javascript
// package.json + npm install, package-lock.json
```

```compare python
# pyproject.toml + uv add, uv.lock
```

```compare rust
// Cargo.toml [dependencies] + Cargo.lock
```

```compare java
// <dependency> in pom.xml, or Gradle's implementation(...)
```

```compare kotlin
// implementation("...") in build.gradle.kts
```

```compare go
// go get + go.mod, go.sum
```

```exercise
goal: Add the jason dependency, version ~> 1.4.
code: |
  defp deps do
    []
  end
checks:
  - match: '\{\s*:jason\s*,\s*"~>\s*1\.4"\s*\}'
    message: 'Add  {:jason, "~> 1.4"}  to the list.'
output: "* Getting jason (Hex package)"
```
