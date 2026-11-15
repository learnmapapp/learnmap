---
title: Naming processes
icon: "📇"
branch: otp
requires: [genserver]
summary: Find processes by name, from atoms to Registry.
---
To talk to a process, you need its pid. Passing pids around gets awkward, so processes can have **names**.

A single process can use an atom:

```elixir
GenServer.start_link(Counter, 0, name: Counter)
GenServer.call(Counter, :value)
```

But atoms aren't garbage collected, so never create them from user input. For many processes, like one per chat room or per user, use a `Registry`:

```elixir
# in your supervision tree
{Registry, keys: :unique, name: MyApp.Rooms}
```

```elixir
def start_link(room_id) do
  GenServer.start_link(__MODULE__, room_id, name: via(room_id))
end

defp via(room_id), do: {:via, Registry, {MyApp.Rooms, room_id}}

def post(room_id, msg), do: GenServer.cast(via(room_id), {:post, msg})
```

Now `Room.post("elixir", "hi")` finds the right process by its room id. When the process dies, its name disappears from the registry automatically.

To start such processes on demand, pair the Registry with a `DynamicSupervisor`:

```elixir
DynamicSupervisor.start_child(MyApp.RoomSup, {Room, "elixir"})
```

```compare java
ConcurrentHashMap<String, Room> rooms = new ConcurrentHashMap<>();
rooms.computeIfAbsent(id, Room::new);
```

```compare kotlin
val rooms = ConcurrentHashMap<String, Room>()
rooms.getOrPut(id) { Room(id) }
```

```compare go
var rooms sync.Map
r, _ := rooms.LoadOrStore(id, NewRoom(id))
```

```compare python
rooms.setdefault(room_id, Room(room_id))
```

```compare javascript
const rooms = new Map();
if (!rooms.has(id)) rooms.set(id, new Room(id));
```

```compare rust
rooms.entry(id).or_insert_with(|| Room::new(id));
```

```quiz
question: Why shouldn't you name a process with String.to_atom(user_input)?
options:
  - Atoms are slow to compare.
  - Atoms are never garbage collected, so you could run out.
  - Names have to be strings.
answer: 1
explain: The atom table has a fixed limit. Use a Registry with any term as the key instead.
```
