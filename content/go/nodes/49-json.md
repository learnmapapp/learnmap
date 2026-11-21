---
title: JSON
icon: "🧾"
branch: tools
requires: [structs, errors]
summary: Encode and decode JSON with struct tags.
---
The `encoding/json` package turns structs into JSON and back. **Struct tags**, the strings in backticks after a field, choose the JSON names:

```go title=main.go
package main

import (
    "encoding/json"
    "fmt"
)

type Task struct {
    ID    int      `json:"id"`
    Title string   `json:"title"`
    Done  bool     `json:"done"`
    Tags  []string `json:"tags,omitempty"`
}

func main() {
    t := Task{ID: 1, Title: "Write docs"}
    data, err := json.Marshal(t)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(data))
    // {"id":1,"title":"Write docs","done":false}

    var back Task
    err = json.Unmarshal([]byte(`{"id":2,"title":"Ship","done":true}`), &back)
    fmt.Println(back, err) // {2 Ship true []} <nil>
}
```

- `json.Marshal` turns a value into JSON bytes.
- `json.Unmarshal` fills in a value from JSON. Pass a **pointer** (`&back`), so it can write into it.
- `omitempty` leaves a field out when it has its zero value.
- `json:"-"` never includes the field.

## Only exported fields

`encoding/json` lives in another package, so it can only see **exported** fields, the ones starting with a capital letter. A lowercase field is silently skipped:

```go
type User struct {
    name string // never appears in the JSON!
}
```

## Pretty output and streams

`json.MarshalIndent(t, "", "  ")` makes indented output. To read from or write to files and HTTP bodies directly, use `json.NewDecoder(r).Decode(&v)` and `json.NewEncoder(w).Encode(v)`.

Unknown JSON fields are ignored, and missing ones keep their zero value.

```compare python
json.dumps({"id": 1, "title": "Write docs"})
```

```compare javascript
JSON.stringify({ id: 1, title: "Write docs" });
```

```compare java
new ObjectMapper().writeValueAsString(task); // Jackson
```

```compare kotlin
Json.encodeToString(task) // kotlinx.serialization
```

```compare rust
serde_json::to_string(&task)?
```

```exercise
goal: "Add a struct tag so `Email` appears as `\"email\"` in the JSON."
code: |
  type Contact struct {
      Email string
  }
checks:
  - match: 'Email\s+string\s+`json:"email"`'
    message: "Add the tag `json:\"email\"` after the type."
solution: |
  type Contact struct {
      Email string `json:"email"`
  }
```

```quiz
question: "A struct field is called `password` (lowercase). Does json.Marshal include it?"
options:
  - Yes, as "password".
  - No; json can only see exported fields.
  - Only with omitempty.
answer: 1
explain: Lowercase fields are private to their package, so encoding/json can't read them.
```
