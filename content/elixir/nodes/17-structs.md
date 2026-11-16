---
title: Structs
icon: "🧱"
branch: data
requires: [maps, modules]
summary: Maps with a fixed set of keys and a name.
---
A [[struct]] is a map with a fixed set of fields, defined in a module:

```elixir
defmodule User do
  defstruct name: nil, age: 0, admin: false
end
```

```repl
> %User{name: "Drop"}
%User{name: "Drop", age: 0, admin: false}
> %User{nmae: "Drop"}
error: ** (KeyError) key :nmae not found
```

Typos in field names fail at compile time. Everything that works on maps works on structs: the dot, update syntax, `Map.put`.

```elixir
drop = %User{name: "Drop"}
older = %{drop | age: 4}
```

Pattern matching on the struct name is how functions say "I only accept Users":

```elixir
def promote(%User{} = user), do: %{user | admin: true}
```

Require some fields with `@enforce_keys`:

```elixir
defmodule User do
  @enforce_keys [:name]
  defstruct [:name, age: 0]
end
```

A struct is still a map underneath, with a hidden `__struct__` key holding the module name. What it **doesn't** have is access with `user[:name]`, or `Enum` support; those are opt-in via [protocols](node:protocols).

```compare kotlin
data class User(
    val name: String,
    val age: Int = 0,
    val admin: Boolean = false,
)
```

```compare java
record User(String name, int age, boolean admin) {}
```

```compare python
@dataclass
class User:
    name: str
    age: int = 0
```

```compare javascript
const user = { name: "Drop", age: 0, admin: false }; // no fixed shape
```

```compare go
type User struct { Name string; Age int; Admin bool }
```

```exercise
goal: Define a Point struct with x and y fields, both defaulting to 0.
code: |
  defmodule Point do
  end
checks:
  - match: 'defstruct\s+\[?\s*x:\s*0\s*,\s*y:\s*0\s*\]?'
    message: 'Inside the module: defstruct x: 0, y: 0'
output: '%Point{x: 0, y: 0}'
```
