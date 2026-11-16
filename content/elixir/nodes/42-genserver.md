---
title: GenServer
icon: "🏗️"
branch: otp
kind: hub
requires: [send-receive, behaviours]
summary: The standard stateful process, from OTP.
---
Remember the counter that looped with `receive`? Writing that by hand every time gets repetitive and easy to get wrong: timeouts, replies, debugging hooks. [[otp|OTP]] solves it once, with the [[genserver|GenServer]] behaviour.

You write callbacks. OTP runs the loop.

```elixir title=lib/counter.ex
defmodule Counter do
  use GenServer

  # Client API: called by other processes
  def start_link(start), do: GenServer.start_link(__MODULE__, start, name: __MODULE__)
  def inc, do: GenServer.cast(__MODULE__, :inc)
  def value, do: GenServer.call(__MODULE__, :value)

  # Server callbacks: run inside the GenServer process
  @impl true
  def init(start), do: {:ok, start}

  @impl true
  def handle_cast(:inc, count), do: {:noreply, count + 1}

  @impl true
  def handle_call(:value, _from, count), do: {:reply, count, count}
end
```

```repl
> Counter.start_link(0)
{:ok, #PID<0.150.0>}
> Counter.inc()
:ok
> Counter.value()
1
```

The shape is always the same:

- `init/1` sets up the starting state.
- `handle_call/3` answers a request and returns `{:reply, answer, new_state}`.
- `handle_cast/2` handles a fire-and-forget message: `{:noreply, new_state}`.
- `handle_info/2` handles any other message, like timers.

The client functions at the top hide the messaging, so callers just call `Counter.inc()`.

```compare java
// Closest: an actor (Akka) or a single-threaded executor guarding some state.
```

```compare kotlin
// Closest: an actor coroutine reading from a Channel.
```

```compare go
// A goroutine with a for/select loop over a request channel.
```

```compare python
# Closest: an asyncio task reading from a Queue.
```

```compare javascript
// Closest: a Worker with a message handler.
```

```compare rust
// An actor: a tokio task owning its state, reading from an mpsc channel.
```

```quiz
question: Which callback answers a `GenServer.call`?
options:
  - handle_cast/2
  - handle_call/3
  - init/1
answer: 1
explain: handle_call gets the request, who it's from, and the state, and returns {:reply, answer, state}.
```
