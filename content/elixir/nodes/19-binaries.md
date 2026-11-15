---
title: Binaries
icon: "💾"
branch: data
requires: [strings, pattern-matching]
summary: Strings are bytes, and you can pattern match on bytes.
---
Under the hood, an Elixir string is a [[binary]]: a sequence of bytes. You can write binaries directly with `<<>>`:

```repl
> <<104, 105>>
"hi"
> byte_size("héllo")
6
> String.length("héllo")
5
```

`é` takes two bytes in UTF-8, so the byte size and the character count differ.

The fun part: pattern matching works on binaries. Match a prefix with `<>`:

```elixir
def parse("GET " <> path), do: {:get, path}
def parse("POST " <> path), do: {:post, path}
```

```repl
> parse("GET /index.html")
{:get, "/index.html"}
```

And you can match exact bits and bytes, which makes parsing file formats and network protocols almost pleasant:

```elixir
<<width::32, height::32, rest::binary>> = png_header
```

That reads two 32-bit integers off the front and keeps the rest. Each segment has a size and a type (`integer`, `binary`, `utf8`…).

```tip
Need individual characters? `String.graphemes("héllo")` gives `["h", "é", "l", "l", "o"]`. Need the code points? `String.to_charlist/1`.
```

```compare python
if path.startswith("GET "): path = path[4:]
struct.unpack(">II", header[:8])
```

```compare javascript
if (line.startsWith("GET ")) path = line.slice(4);
new DataView(buf).getUint32(0);
```

```compare java
ByteBuffer.wrap(header).getInt();
```

```compare kotlin
line.removePrefix("GET ")
```

```compare go
binary.BigEndian.Uint32(header[0:4])
```

```exercise
goal: Add a clause that matches messages starting with "DELETE " and returns {:delete, path}.
code: |
  def parse("GET " <> path), do: {:get, path}
checks:
  - match: 'def\s+parse\(\s*"DELETE "\s*<>\s*(\w+)\s*\)\s*,\s*do:\s*\{\s*:delete\s*,\s*\1\s*\}'
    message: 'Add  def parse("DELETE " <> path), do: {:delete, path}'
output: '{:delete, "/users/1"}'
```
