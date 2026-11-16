---
title: Nested data
icon: "🪆"
branch: data
requires: [maps, keyword-lists]
summary: get_in, put_in and update_in for deep updates.
---
Immutable data is great, until you need to change something three levels deep:

```elixir
game = %{player: %{stats: %{hp: 10, xp: 0}}}
```

By hand, you rebuild each level:

```elixir
%{game | player: %{game.player | stats: %{game.player.stats | hp: 9}}}
```

The `*_in` functions do the walking for you:

```repl
> get_in(game, [:player, :stats, :hp])
10
> put_in(game, [:player, :stats, :hp], 9)
%{player: %{stats: %{hp: 9, xp: 0}}}
> update_in(game, [:player, :stats, :xp], &(&1 + 50))
%{player: %{stats: %{hp: 10, xp: 50}}}
```

With atom keys there's an even shorter macro form, using the dot path directly:

```elixir
game = put_in(game.player.stats.hp, 9)
game = update_in(game.player.stats.xp, &(&1 + 50))
```

`get_in` with a list of keys returns `nil` if any step is missing, so it's a safe way to read deep data from JSON:

```elixir
get_in(json, ["user", "address", "city"])
```

The `Access` module lets paths go into lists too, like `Access.at(0)` for the first element or `Access.all()` for every element.

```compare javascript
const next = structuredClone(game);
next.player.stats.hp = 9; // or nested spreads
json?.user?.address?.city;
```

```compare python
game["player"]["stats"]["hp"] = 9  # mutates in place
```

```compare kotlin
val next = game.copy(
    player = game.player.copy(
        stats = game.player.stats.copy(hp = 9)
    )
)
```

```compare java
// Records need a "wither" per level, or a lens library.
```

```compare go
game.Player.Stats.HP = 9 // structs mutate in place
```

```exercise
goal: Increase the score by 10 with update_in.
code: |
  state = %{team: %{score: 32}}
  state = state
checks:
  - match: 'update_in\('
    message: Use update_in.
  - match: 'update_in\(\s*state(\.team\.score\s*,|\s*,\s*\[\s*:team\s*,\s*:score\s*\]\s*,)\s*(&\(\s*&1\s*\+\s*10\s*\)|fn\s+\w+\s*->\s*\w+\s*\+\s*10\s+end)'
    message: 'Try update_in(state.team.score, &(&1 + 10))'
output: '%{team: %{score: 42}}'
```
