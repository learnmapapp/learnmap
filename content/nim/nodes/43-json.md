---
title: Parse JSON data
icon: "🧾"
branch: tools
requires: [tables, exceptions]
summary: Parse JSON into a tree with parseJson, map it straight onto your types with to, and build JSON with %*.
---
**Step-by-step: reading a weather API response.** The JSON we receive:

```json title=weather.json
{
  "city": "Lisbon",
  "temp": 23.5,
  "tags": ["sunny", "windy"],
  "wind": { "speed": 18, "dir": "NW" }
}
```

**Step 1: parse it.** `parseJson` turns text into a `JsonNode`, a tree you can walk:

```nim title=weather.nim
import std/json

let data = parseJson(readFile("weather.json"))
echo data["city"].getStr          # Lisbon
echo data["temp"].getFloat        # 23.5
echo data["wind"]["speed"].getInt # 18
echo data["tags"][0].getStr       # sunny
```

`data["city"]` is still a `JsonNode`; `getStr`, `getInt`, `getFloat` and `getBool` turn it into a normal Nim value.

**Step 2: handle what might be missing.** `data["rain"]` raises a `KeyError`. Two gentler options:

```nim
echo data.hasKey("rain")             # false
echo data{"rain"}.getFloat(0.0)      # 0.0: {} returns nil instead of raising
```

The `get` procs accept a fallback, used when the node is missing or has another type.

**Step 3: skip the manual digging.** Declare an object with matching fields and let `to` fill it in:

```nim
type
  Wind = object
    speed: int
    dir: string
  Weather = object
    city: string
    temp: float
    tags: seq[string]
    wind: Wind

let w = data.to(Weather)
echo w.city, " ", w.wind.dir       # Lisbon NW
```

`to` checks the types as it goes. If `temp` contained a string, you'd get an exception, not a silently wrong value.

**Step 4: produce JSON.** `%*` builds a `JsonNode` from Nim values; `$` or `pretty` turns it into text:

```nim
let reply = %*{"city": w.city, "ok": true, "tags": w.tags}
echo reply                 # {"city":"Lisbon","ok":true,"tags":["sunny","windy"]}
echo reply.pretty          # the same, indented over several lines
```

`%` works on objects too: `echo %w` serializes the whole `Weather`.

**Step 5: guard against bad input.** `parseJson` raises `JsonParsingError` for malformed text. Catch it wherever the input comes from outside your program.

```compare python
import json
data = json.loads(text)
data["wind"]["speed"]
data.get("rain", 0.0)
```

```compare javascript
const data = JSON.parse(text);
data.wind.speed;
data.rain ?? 0;
```

```compare rust
#[derive(serde::Deserialize)]
struct Weather { city: String, temp: f64 }
let w: Weather = serde_json::from_str(&text)?;
```

```exercise
goal: "Read the `name` field as a Nim string: add `.getStr` so `name` isn't a JsonNode."
code: |-
  import std/json

  let user = parseJson("""{"name": "Ada", "age": 36}""")
  let name = user["name"]
  echo "Hello, " & name
checks:
  - match: 'let\s+name\s*=\s*user\["name"\]\.getStr'
    message: Write user["name"].getStr
solution: |-
  import std/json

  let user = parseJson("""{"name": "Ada", "age": 36}""")
  let name = user["name"].getStr
  echo "Hello, " & name
```

```quiz
question: "What's the difference between `data[\"x\"]` and `data{\"x\"}` when there's no key x?"
options:
  - "There is none; both return nil."
  - "[] raises a KeyError; {} returns nil, which the get procs turn into a fallback."
  - "{} raises; [] returns nil."
answer: 1
explain: Use {} with getStr, getInt and friends when a field is optional.
```
