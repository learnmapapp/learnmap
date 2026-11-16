---
title: Parse JSON data
icon: 📋
branch: tools
requires:
  - tables
  - exceptions
summary: JSON nodes carry runtime kinds.
---

JSON nodes carry runtime kinds. Validate required fields and their types before converting untrusted input.

```nim
import std/json
let data = parseJson("""{"title":"Practice","done":false}""")
echo data["title"].getStr()
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about parse json data.
lang: nim
code: |-
  import std/json
  let data = parseJson("""{"title":"Practice","done":false}""")
  echo data["done"].getStr()
checks:
  - match: data\["title"\]\.getStr\(\)
    message: Use data["title"].getStr() for this step.
  - notMatch: data\["done"\]\.getStr\(\)
    message: Replace data["done"].getStr() in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: After `parseJson`, what still needs checking for external data?
options:
  - Whether JSON syntax was skipped by the parser.
  - Required fields, their kinds, and domain constraints.
  - Whether every field has already become a string.
answer: 1
explain: Parsing checks syntax, not the application's complete data contract.
```
