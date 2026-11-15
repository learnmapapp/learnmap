---
title: Maps
icon: "🗺️"
branch: data
requires: [pattern-matching]
summary: "Key-value data with %{}, and matching on it."
---
A [[map]] holds keys and values. Any value can be a key:

```repl
> %{"name" => "Drop", "age" => 3}
%{"age" => 3, "name" => "Drop"}
```

With atom keys there's a shorter syntax, and you can read with a dot:

```repl
> user = %{name: "Drop", age: 3}
%{age: 3, name: "Drop"}
> user.name
"Drop"
> user[:email]
nil
> user.email
error: ** (KeyError) key :email not found
```

`map[key]` returns `nil` for missing keys; `map.key` raises. Use the dot when the key must be there.

"Changing" a map gives you a new one:

```repl
> Map.put(user, :email, "drop@beam.dev")
%{age: 3, email: "drop@beam.dev", name: "Drop"}
> %{user | age: 4}
%{age: 4, name: "Drop"}
> Map.delete(user, :age)
%{name: "Drop"}
```

`%{map | key: value}` updates an **existing** key, and fails if it's missing. That catches typos.

Maps shine with pattern matching. A pattern only needs the keys it cares about:

```elixir
def greet(%{name: name}), do: "Hi #{name}"

greet(%{name: "Drop", age: 3}) # "Hi Drop"
```

```compare python
user = {"name": "Drop", "age": 3}
user.get("email")
```

```compare javascript
const user = { name: "Drop", age: 3 };
const older = { ...user, age: 4 };
```

```compare java
var user = Map.of("name", "Drop", "age", 3);
```

```compare kotlin
val user = mapOf("name" to "Drop", "age" to 3)
val older = user + ("age" to 4)
```

```compare go
user := map[string]any{"name": "Drop", "age": 3}
```

```exercise
goal: Use the update syntax to set the age to 4.
code: |
  user = %{name: "Drop", age: 3}
  older = user
checks:
  - match: 'older\s*=\s*%\{\s*user\s*\|\s*age:\s*4\s*\}'
    message: 'Write older = %{user | age: 4}'
output: '%{age: 4, name: "Drop"}'
```
