---
title: with
icon: "🪜"
branch: control
requires: [case]
summary: Chain several steps that can each fail.
---
Say you need three things in a row, and each can fail:

```elixir
case File.read(path) do
  {:ok, text} ->
    case Jason.decode(text) do
      {:ok, json} ->
        case Map.fetch(json, "port") do
          {:ok, port} -> {:ok, port}
          :error -> {:error, :no_port}
        end
      error -> error
    end
  error -> error
end
```

That staircase is what `with` flattens:

```elixir
with {:ok, text} <- File.read(path),
     {:ok, json} <- Jason.decode(text),
     {:ok, port} <- Map.fetch(json, "port") do
  {:ok, port}
end
```

Each `pattern <- expression` line must match to continue. The first one that **doesn't** match stops the chain, and its value is returned as-is. So a failed `File.read` returns `{:error, :enoent}` straight away.

Add `else` to translate failures:

```elixir
with {:ok, text} <- File.read(path),
     {:ok, json} <- Jason.decode(text) do
  json
else
  {:error, :enoent} -> %{}
  {:error, _} -> raise "bad config"
end
```

You can mix in plain bindings too: `port = String.to_integer(raw)` on its own line just runs.

```compare rust
let text = fs::read_to_string(path)?;
let json: Value = serde_json::from_str(&text)?;
```

```compare javascript
const text = await readFile(path); // and try/catch around it all
```

```compare kotlin
val port = runCatching { readFile(path) }
  .mapCatching { parse(it) }
  .getOrNull()
```

```compare python
try:
    text = open(path).read()
    port = json.loads(text)["port"]
except (OSError, KeyError): ...
```

```compare java
Optional.of(path).flatMap(this::read).flatMap(this::parse);
```

```compare go
text, err := os.ReadFile(path)
if err != nil { return err }
```

```exercise
goal: Add the second step, matching {:ok, user} from fetch_user(id).
code: |
  with {:ok, id} <- parse_id(params) do
    {:ok, user}
  end
checks:
  - match: 'with\s+\{:ok,\s*id\}\s*<-\s*parse_id\(params\),\s*\n?\s*\{:ok,\s*user\}\s*<-\s*fetch_user\(\s*id\s*\)\s+do'
    message: 'After the first line, add  , {:ok, user} <- fetch_user(id)'
output: '{:ok, %User{id: 7}}'
```
