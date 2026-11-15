---
title: A taste of Phoenix
icon: "🔥"
branch: tooling
requires: [applications, hex]
summary: The web framework, and live pages without JavaScript.
---
Phoenix is Elixir's web framework, and a big reason people pick Elixir. Everything you've learned shows up in it: a Phoenix app is an OTP [application](node:applications), each request runs in its own process, and each connected browser gets its own process too.

```repl shell
> mix archive.install hex phx_new
> mix phx.new hello
> cd hello && mix ecto.create
> mix phx.server
[info] Running HelloWeb.Endpoint at http://localhost:4000
```

A route and a controller:

```elixir title=lib/hello_web/router.ex
get "/greet/:name", GreetController, :show
```

```elixir title=lib/hello_web/controllers/greet_controller.ex
def show(conn, %{"name" => name}) do
  text(conn, "Hello, #{name}!")
end
```

Notice the pattern match on the params map, straight in the function head.

**LiveView** is the star: interactive pages with server-side state, and no JavaScript to write.

```elixir title=lib/hello_web/live/counter_live.ex
defmodule HelloWeb.CounterLive do
  use HelloWeb, :live_view

  def mount(_params, _session, socket), do: {:ok, assign(socket, count: 0)}

  def handle_event("inc", _, socket), do: {:noreply, update(socket, :count, &(&1 + 1))}

  def render(assigns) do
    ~H"""
    <button phx-click="inc">Clicked {@count} times</button>
    """
  end
end
```

Look familiar? It's shaped like a GenServer: state in, new state out. Phoenix sends only the changed bits to the browser over a WebSocket.

```compare javascript
// Like Next.js server components plus a WebSocket, minus the client state.
```

```compare python
# Like Django or FastAPI, with built-in live pages (HTMX-style).
```

```compare java
// Like Spring Boot, with each request and client in its own lightweight process.
```

```compare kotlin
// Like Ktor or Spring Boot, with server-driven live UI.
```

```compare go
// Like net/http plus a templating and live-update layer.
```

```compare rust
// Like Axum or Actix with built-in live views.
```

```exercise
goal: Add a "dec" event that lowers the count by 1.
code: |
  def handle_event("inc", _, socket), do: {:noreply, update(socket, :count, &(&1 + 1))}
checks:
  - match: 'def\s+handle_event\(\s*"dec"\s*,\s*_\w*\s*,\s*socket\s*\)\s*,\s*do:\s*\{\s*:noreply\s*,\s*update\(\s*socket\s*,\s*:count\s*,\s*&\(\s*&1\s*-\s*1\s*\)\s*\)\s*\}'
    message: 'Copy the "inc" clause and change it to "dec" with &(&1 - 1).'
output: "Clicked -1 times"
```
