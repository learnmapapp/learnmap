---
title: Applications
icon: "📦"
branch: otp
requires: [supervisors, mix]
summary: The top of the tree, started when your project boots.
---
An **application** is a component that can be started and stopped as a unit. Your Mix project is one; so is each library you depend on, like Phoenix or Ecto.

`mix new my_app --sup` generates the entry point:

```elixir title=lib/my_app/application.ex
defmodule MyApp.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      MyApp.Repo,
      {Phoenix.PubSub, name: MyApp.PubSub},
      MyApp.Counter
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: MyApp.Supervisor)
  end
end
```

And `mix.exs` points to it:

```elixir title=mix.exs
def application do
  [
    mod: {MyApp.Application, []},
    extra_applications: [:logger]
  ]
end
```

When you run `mix run` or `iex -S mix`, the BEAM starts every dependency's application first, then yours, which starts your supervision tree. The whole system comes up in the right order, and every process has a supervisor.

Settings go in `config/*.exs`, and are read at runtime with `Application.get_env/3` (or `Application.fetch_env!/2`):

```elixir
config :my_app, greeting: "Hello"
```

```repl
> Application.get_env(:my_app, :greeting)
"Hello"
```

```compare java
// Like a Spring Boot application context: beans started in dependency order.
```

```compare kotlin
// Like a Spring Boot or Ktor application module.
```

```compare javascript
// Like the entry point that starts your server, DB pool and workers.
```

```compare python
# Like a Django app config with ready() starting background services.
```

```compare go
// Like main() wiring up and starting each component.
```

```compare rust
// Like a #[tokio::main] that spawns and joins each service.
```

```exercise
goal: Add MyApp.Cache to the children, so it starts with the app.
code: |
  children = [
    MyApp.Repo
  ]
checks:
  - match: 'MyApp\.Repo\s*,\s*\n?\s*MyApp\.Cache'
    message: 'Add  MyApp.Cache  after MyApp.Repo (with a comma).'
output: "{:ok, #PID<0.300.0>}"
```
