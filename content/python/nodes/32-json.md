---
title: "JSON"
icon: "🔀"
branch: "files"
requires: ["text-files", "dictionaries"]
summary: "Turn structured text into Python values, and serialize them again."
---
JSON is the lingua franca of APIs and config files, and it maps neatly onto Python:

| JSON | Python |
| --- | --- |
| object `{}` | `dict` |
| array `[]` | `list` |
| string | `str` |
| number | `int` or `float` |
| `true` / `false` | `True` / `False` |
| `null` | `None` |

The `json` module converts between the two. The names are easy to mix up, so here's a memory aid: the **s** stands for **string**.

| Function | Direction |
| --- | --- |
| `json.loads(text)` | JSON string → Python |
| `json.dumps(value)` | Python → JSON string |
| `json.load(file)` | JSON file → Python |
| `json.dump(value, file)` | Python → JSON file |

## Round trip: a settings file

Let's save some settings, then read them back:

```python
import json
from pathlib import Path

settings = {
    "theme": "dark",
    "font_size": 14,
    "plugins": ["git", "vim"],
}

path = Path("settings.json")
path.write_text(json.dumps(settings, indent=2), encoding="utf-8")
```

`indent=2` makes the file pleasant to read:

```json
{
  "theme": "dark",
  "font_size": 14,
  "plugins": ["git", "vim"]
}
```

And loading it back gives a regular dictionary:

```python
loaded = json.loads(path.read_text(encoding="utf-8"))
print(loaded["plugins"][0])   # git
```

## Things JSON can't hold

JSON only knows the types in the first table. Try to dump a date, a set or your own class and you'll get:

```repl
> json.dumps({"tags": {"a", "b"}})
error: TypeError: Object of type set is not JSON serializable
```

Convert first, for example a set to a sorted list, or a date to `date.isoformat()`. Also note that JSON object keys are always strings: `{1: "a"}` comes back as `{"1": "a"}`.

```compare javascript
JSON.parse(text);              // like json.loads
JSON.stringify(value, null, 2); // like json.dumps(value, indent=2)
```

```compare go
json.Unmarshal(data, &settings)   // into a struct with tags
```

```exercise
goal: "`text` is already JSON, so turning it into JSON again gives a string. Parse it into a dictionary instead."
lang: python
code: |
  import json

  text = '{"score": 42}'
  player = json.dumps(text)
  print(player["score"])
checks:
  - match: 'player\s*=\s*json\.loads\(\s*text\s*\)'
    message: Replace json.dumps(text) with json.loads(text).
hint: loads reads a string; dumps writes one.
solution: |
  import json

  text = '{"score": 42}'
  player = json.loads(text)
  print(player["score"])
```

```quiz
question: "What does `json.loads('{\"ok\": true, \"n\": null}')` return?"
options:
  - "`{'ok': True, 'n': None}`"
  - "`{'ok': 'true', 'n': 'null'}`"
  - "`{\"ok\": true, \"n\": null}` as a string"
answer: 0
explain: true becomes True and null becomes None. You get a real dictionary back.
```
