---
title: Calls, casts and info
icon: "📞"
branch: otp
requires: [genserver]
summary: When to wait for an answer, and handling timers.
---
A GenServer gets messages three ways.

**`call`** is synchronous: the caller waits for the reply (5 s by default).

```elixir
def handle_call({:withdraw, amount}, _from, balance) when amount <= balance do
  {:reply, :ok, balance - amount}
end

def handle_call({:withdraw, _amount}, _from, balance) do
  {:reply, {:error, :insufficient_funds}, balance}
end
```

**`cast`** is asynchronous: send and move on, no reply.

```elixir
def handle_cast({:log, line}, lines), do: {:noreply, [line | lines]}
```

**`info`** is everything else: plain `send` messages, timers, monitor notifications.

```elixir
def init(state) do
  Process.send_after(self(), :tick, 1000)
  {:ok, state}
end

def handle_info(:tick, state) do
  Process.send_after(self(), :tick, 1000)
  {:noreply, refresh(state)}
end
```

Which one should you pick?

- Use **call** by default. It gives back-pressure: a slow server slows its callers instead of drowning in messages.
- Use **cast** only when you really don't care about the result.

```warn
A GenServer handles one message at a time. A slow `handle_call` blocks every other caller. Move heavy work into a [Task](node:tasks).
```

```compare javascript
await server.withdraw(10); // call
server.log("hi");          // cast: no await
```

```compare kotlin
val ok = server.withdraw(10) // suspend fun: a call
scope.launch { server.log("hi") } // fire and forget
```

```compare java
server.withdraw(10).get(); // call
server.log("hi");          // cast
```

```compare go
reply := make(chan error)
reqs <- withdraw{10, reply}; err := <-reply
```

```compare python
await server.withdraw(10)
```

```compare rust
let (tx, rx) = oneshot::channel();
server.send(Withdraw(10, tx)).await; rx.await
```

```exercise
goal: Reply with the current count, and keep the state unchanged.
code: |
  def handle_call(:value, _from, count) do
    {:noreply, count}
  end
checks:
  - match: '\{\s*:reply\s*,\s*count\s*,\s*count\s*\}'
    message: 'A call needs  {:reply, answer, new_state}: {:reply, count, count}'
output: "1"
```
