---
title: "JSON"
icon: "🔀"
branch: "files"
requires: ["text-files", "dictionaries"]
summary: "Turn structured text into Python values, and serialize them again."
---

JSON is a common format for configuration and exchanged data. The standard library's `json` module converts between JSON text and Python values:

```python
import json

text = '{"name": "Ada", "active": true, "score": null}'
player = json.loads(text)
print(player["name"])          # Ada
print(player["active"] is True) # True
print(player["score"] is None)  # True
```

JSON `true`, `false`, and `null` become Python `True`, `False`, and `None`. Arrays become lists; objects become dictionaries with string keys. JSON requires double-quoted strings and does not accept Python comments.

## Strings versus files

`loads` and `dumps` work with strings. `load` and `dump` read or write file-like objects:

```python
import json

with open("player.json", "w", encoding="utf-8") as handle:
    json.dump({"name": "Ada", "score": 42}, handle, indent=2)
```

Malformed input raises `json.JSONDecodeError`. Parsing establishes valid JSON syntax, not your application's schema: check the expected keys and value types after loading. Ordinary JSON does not automatically encode custom classes, sets, or datetime objects; convert them into supported values first.

```exercise
goal: Parse the JSON string instead of serializing it again.
lang: python
code: |
  import json

  text = '{"score": 42}'
  player = json.dumps(text)
  print(player["score"])
checks:
  - match: player\s*=\s*json\.loads\(\s*text\s*\)
    message: Replace json.dumps(text) with json.loads(text).
hint: Replace `json.dumps(text)` with `json.loads(text)`.
```

```quiz
question: "Which function parses JSON from a string?"
options:
  - "json.dumps"
  - "json.loads"
  - "json.dump"
answer: 1
explain: "loads reads a string; dumps produces a string. The forms without s use file-like objects."
```
