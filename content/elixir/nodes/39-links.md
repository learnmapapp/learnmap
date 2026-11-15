---
title: Links and monitors
icon: "🔗"
branch: beam
requires: [send-receive]
summary: Get told, or go down together, when a process dies.
---
Processes crash. What matters is who finds out.

A **link** ties two processes together: if one crashes, the other crashes too.

```elixir
spawn_link(fn -> raise "boom" end)
# the calling process goes down as well
```

That sounds bad, but it's the point: a group of processes that depend on each other fails **as a unit**, so nothing is left half-working.

A process can **trap exits** to turn a linked crash into a message instead:

```elixir
Process.flag(:trap_exit, true)
pid = spawn_link(fn -> raise "boom" end)

receive do
  {:EXIT, ^pid, reason} -> "child died: #{inspect(reason)}"
end
```

That's exactly what a [[supervisor]] does: it links to its children, traps exits, and restarts them.

A **monitor** is one-way and gentler. You get a `:DOWN` message, and nothing crashes:

```elixir
{pid, ref} = spawn_monitor(fn -> exit(:tired) end)

receive do
  {:DOWN, ^ref, :process, ^pid, reason} -> reason
end
# :tired
```

| | Link | Monitor |
| --- | --- | --- |
| Direction | both ways | one way |
| On crash | other process dies (or gets `:EXIT`) | watcher gets `:DOWN` |
| Use for | processes that live and die together | watching something you don't own |

```compare go
// No built-in links; use context cancellation and errgroup.
```

```compare java
// No equivalent; executors report failures through Future.get().
```

```compare kotlin
// Structured concurrency: a failing child cancels its parent scope.
coroutineScope { launch { error("boom") } }
```

```compare javascript
worker.onerror = (e) => console.log("worker died", e);
```

```compare python
# asyncio.TaskGroup cancels siblings when one task fails.
```

```compare rust
// JoinHandle::join() returns Err if the thread panicked.
```

```quiz
question: You want to be notified when a process you don't own dies, without crashing yourself. What do you use?
options:
  - spawn_link
  - A monitor
  - Process.flag(:trap_exit, false)
answer: 1
explain: Monitors are one-way and only deliver a :DOWN message.
```
