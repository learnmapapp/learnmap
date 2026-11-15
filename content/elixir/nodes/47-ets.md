---
title: ETS tables
icon: "🗄️"
branch: otp
requires: [genserver]
summary: Fast in-memory tables, shared between processes.
---
A GenServer handles one message at a time. That's safe, but if hundreds of processes **read** the same cache, they queue up behind it.

ETS (Erlang Term Storage) is a built-in, in-memory key-value table that many processes can read at the same time:

```elixir
table = :ets.new(:cache, [:set, :public, :named_table, read_concurrency: true])

:ets.insert(:cache, {"user:1", %{name: "Drop"}})
:ets.lookup(:cache, "user:1")
# [{"user:1", %{name: "Drop"}}]

:ets.delete(:cache, "user:1")
```

Rows are tuples; the first element is the key. Lookups are very fast, and don't copy the whole table.

Table types:

- `:set`: one row per key (the default).
- `:ordered_set`: sorted by key.
- `:bag` / `:duplicate_bag`: many rows per key.

A table belongs to the process that created it, and disappears when that process dies. The usual pattern: a GenServer owns the table and does the writes; everyone else reads directly.

```tip
ETS is an Erlang module, so you call it with an atom: `:ets.new/2`. Any Erlang library works this way, like `:crypto` or `:math`.
```

```compare java
ConcurrentHashMap<String, User> cache = new ConcurrentHashMap<>();
```

```compare kotlin
val cache = ConcurrentHashMap<String, User>()
```

```compare go
var cache sync.Map
cache.Store("user:1", user)
```

```compare python
# Closest: a dict guarded by a lock, or Redis for cross-process sharing.
```

```compare javascript
const cache = new Map(); // or Redis, shared across processes
```

```compare rust
let cache: DashMap<String, User> = DashMap::new();
```

```exercise
goal: Insert the row {"theme", "dark"} into the :settings table.
code: |
  :ets.new(:settings, [:set, :public, :named_table])
checks:
  - match: ':ets\.insert\(\s*:settings\s*,\s*\{\s*"theme"\s*,\s*"dark"\s*\}\s*\)'
    message: 'Call  :ets.insert(:settings, {"theme", "dark"})'
output: "true"
```
