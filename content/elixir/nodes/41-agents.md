---
title: Agents
icon: "🕵️"
branch: beam
requires: [send-receive]
summary: A process that just holds some state.
---
Sometimes you just need a bit of shared state: a counter, a cache, a config. An `Agent` is a process that holds a value, with functions to read and update it.

```repl
> {:ok, counter} = Agent.start_link(fn -> 0 end)
{:ok, #PID<0.112.0>}
> Agent.update(counter, &(&1 + 1))
:ok
> Agent.get(counter, & &1)
1
```

The function you pass runs **inside** the agent process. Because a process handles one message at a time, updates never race with each other.

Give it a name so you don't need to pass the pid around:

```elixir
Agent.start_link(fn -> %{} end, name: Cache)

Agent.update(Cache, &Map.put(&1, :theme, "dark"))
Agent.get(Cache, &Map.get(&1, :theme))
```

`get_and_update/2` reads and writes in one step, for things like "take the next ticket number".

Agents are great for simple state. Once you need custom messages, timeouts or more logic, move to a [GenServer](node:genserver).

```compare java
AtomicInteger counter = new AtomicInteger();
counter.incrementAndGet();
```

```compare kotlin
val counter = AtomicInteger(0)
counter.incrementAndGet()
```

```compare go
var mu sync.Mutex
mu.Lock(); count++; mu.Unlock()
```

```compare python
with lock:
    count += 1
```

```compare javascript
// Single-threaded: a plain variable is enough.
let count = 0; count++;
```

```compare rust
let counter = Arc::new(Mutex::new(0));
*counter.lock().unwrap() += 1;
```

```exercise
goal: Add 10 to the agent's value.
code: |
  {:ok, score} = Agent.start_link(fn -> 0 end)
  Agent.get(score, & &1)
checks:
  - match: 'Agent\.update\(\s*score\s*,\s*(&\(\s*&1\s*\+\s*10\s*\)|fn\s+(\w+)\s*->\s*\2\s*\+\s*10\s+end)\s*\)'
    message: 'Call  Agent.update(score, &(&1 + 10))'
output: "10"
```
