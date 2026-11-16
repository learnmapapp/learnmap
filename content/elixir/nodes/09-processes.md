---
title: Processes
icon: "🚀"
kind: hub
branch: beam
requires: [modules, basic-types]
summary: Millions of tiny workers that only talk through messages.
---
A [[process]] on the BEAM isn't an operating-system process. It's tiny (a few kilobytes) and starts in microseconds. Elixir apps routinely run hundreds of thousands of them.

Processes share **nothing**. The only way to talk is to send a message:

```elixir
pid = spawn(fn ->
  receive do
    {:hello, from} -> send(from, :hi_back)
  end
end)

send(pid, {:hello, self()})

receive do
  :hi_back -> IO.puts("They answered!")
end
```

`spawn` starts a process, `send` drops a message in its mailbox, and `receive` waits for a message matching a pattern. `self()` is the current process.

Because nothing is shared, a crashing process can't corrupt anyone else. Elixir embraces this with *supervisors*: processes that watch others and restart them when they fail. The motto is "let it crash".

```compare java
// Like a thread with its own BlockingQueue, but much lighter (closest: virtual threads).
Thread.startVirtualThread(() -> { var msg = queue.take(); });
```

```compare kotlin
// Like a coroutine with a Channel, but fully isolated.
launch { val msg = channel.receive() }
```

```compare go
// Like a goroutine with a channel, except each process has its own mailbox and nothing is shared.
go func() { msg := <-ch; reply <- "hi" }()
```

```compare python
# Closest: multiprocessing with a Queue, but BEAM processes are thousands of times cheaper.
```

```compare javascript
// Closest: a Web Worker with postMessage, but much cheaper.
worker.postMessage({ hello: true });
```

```quiz
question: How do Elixir processes normally communicate directly?
options:
  - By mutating one shared process-local map.
  - By sending messages to each other's mailboxes.
  - By assigning each other's local variables.
answer: 1
explain: Message passing is the normal direct process interface; ETS is a separate shared-storage facility.
```

## Processes are cheap

A new process takes a couple of kilobytes and a few microseconds. Spawning 100,000 of them is fine:

```elixir
for i <- 1..100_000 do
  spawn(fn -> Process.sleep(1000) end)
end
```

Each has its own memory and its own garbage collection, so one busy process never pauses the others. The BEAM's scheduler shares the CPU fairly, so a runaway loop in one process can't freeze the rest.

```repl
> Process.list() |> length()
62
> Process.alive?(self())
true
```

From here, the map goes two ways: talk to processes directly with [send and receive](node:send-receive), or let OTP's [GenServer](node:genserver) do the plumbing.

```quiz
question: A process gets stuck in a long computation. What happens to the others?
options:
  - They all freeze until it's done.
  - They keep running; the scheduler shares the CPU fairly.
  - The BEAM crashes.
answer: 1
explain: The BEAM preempts processes, so one busy process can't starve the rest.
```
