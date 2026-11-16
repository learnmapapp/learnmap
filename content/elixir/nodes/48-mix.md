---
title: Mix
icon: "🧪"
branch: tooling
kind: hub
requires: [modules]
summary: Create, build, test and run Elixir projects.
---
[[mix|Mix]] is Elixir's build tool. It ships with Elixir, so there's nothing to install.

```repl shell
> mix new greeter
* creating mix.exs
* creating lib/greeter.ex
* creating test/greeter_test.exs
> cd greeter
```

The project file is plain Elixir:

```elixir title=mix.exs
defmodule Greeter.MixProject do
  use Mix.Project

  def project do
    [
      app: :greeter,
      version: "0.1.0",
      elixir: "~> 1.18",
      deps: deps()
    ]
  end

  defp deps do
    []
  end
end
```

The commands you'll use every day:

| Command | Does |
| --- | --- |
| `mix compile` | compile the project |
| `iex -S mix` | start IEx with your project loaded |
| `mix test` | run the tests |
| `mix format` | format all code |
| `mix deps.get` | download dependencies |
| `mix run script.exs` | run a script inside the project |
| `mix help` | list everything |

In IEx, `recompile()` picks up your code changes without restarting.

```tip
`mix format` has no options to argue about. Run it on save and never discuss style again.
```

```compare javascript
// npm init, npm test, npm install
```

```compare python
# uv init, uv run pytest, uv add
```

```compare java
// mvn archetype:generate, mvn test, mvn compile
```

```compare kotlin
// gradle init, gradle test, gradle build
```

```compare rust
// cargo new, cargo test, cargo build
```

```compare go
// go mod init, go test ./..., go build
```

```quiz
question: How do you get an interactive shell with your project's code loaded?
options:
  - "`mix shell`"
  - "`iex -S mix`"
  - "`mix run --iex`"
answer: 1
explain: "`iex -S mix` starts IEx and runs the project inside it."
```
