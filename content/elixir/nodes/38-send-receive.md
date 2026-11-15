---
title: Send and receive
icon: "📬"
branch: beam
requires: [processes]
summary: Messages, mailboxes and a process that loops.
---
Processes share nothing. They talk by sending [[message|messages]]. Every process has a [[mailbox]], a queue of messages waiting to be read.

```elixir
pid = self()
send(pid, {:hello, "Drop"})

receive do
  {:hello, name} -> "Got a hello from #{name}"
after
  1000 -> "Nobody wrote"
end
```

- `send/2` drops a message in a mailbox and returns immediately.
- `receive` waits for the first message that matches one of its patterns.
- `after` gives up after a timeout, in milliseconds.

A process that keeps running is a **recursive function** that receives, handles, and calls itself with new state:

```elixir
defmodule Counter do
  def loop(count) do
    receive do
      :inc -> loop(count + 1)
      {:get, from} ->
        send(from, {:count, count})
        loop(count)
    end
  end
end
```

```elixir
pid = spawn(Counter, :loop, [0])
send(pid, :inc)
send(pid, :inc)
send(pid, {:get, self()})
receive do {:count, n} -> n end  # 2
```

The state lives in the function argument. No variables were mutated; the process just loops with a new value. This pattern is so common that OTP wraps it as a [GenServer](node:genserver).

```compare go
ch := make(chan int)
go func() { ch <- 42 }()
n := <-ch
```

```compare javascript
worker.postMessage({ hello: "Drop" });
worker.onmessage = (e) => { /* ... */ };
```

```compare kotlin
val channel = Channel<Int>()
launch { channel.send(42) }
val n = channel.receive()
```

```compare java
BlockingQueue<Msg> mailbox = new LinkedBlockingQueue<>();
mailbox.put(msg); mailbox.take();
```

```compare python
q = queue.Queue(); q.put(msg); q.get()
```

```compare rust
let (tx, rx) = mpsc::channel();
tx.send(42).unwrap();
rx.recv().unwrap();
```

```exercise
goal: Add a 500 ms timeout that returns :timeout.
code: |
  receive do
    {:result, value} -> value
  end
checks:
  - match: 'after\s+500\s*->\s*:timeout'
    message: 'Add  after 500 -> :timeout  before end.'
output: ":timeout"
```
