---
title: HTTP server
icon: "🌐"
branch: tools
requires: [json, interfaces]
summary: A small JSON API with only the standard library.
---
Go's standard library includes a production-quality web server. Here's a small JSON API, with no dependencies:

```go title=main.go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

type Greeting struct {
    Message string `json:"message"`
}

func hello(w http.ResponseWriter, r *http.Request) {
    name := r.PathValue("name")
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Greeting{Message: "Hello, " + name + "!"})
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /hello/{name}", hello)
    mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "ok")
    })

    log.Println("listening on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", mux))
}
```

```repl shell
> curl localhost:8080/hello/Gus
{"message":"Hello, Gus!"}
```

## How it fits together

- A **handler** is a function taking `(w http.ResponseWriter, r *http.Request)`. You read the request from `r` and write the response to `w`.
- `http.ResponseWriter` is an [[interface]]. It's also an `io.Writer`, which is why `fmt.Fprintln(w, ...)` and `json.NewEncoder(w)` work on it.
- Patterns like `"GET /hello/{name}"` match a method and a path. `r.PathValue("name")` reads the `{name}` part.
- Every request runs in its own goroutine, so handlers run concurrently. Protect shared data with a [mutex](node:mutex).

## Reading a JSON body

```go
mux.HandleFunc("POST /tasks", func(w http.ResponseWriter, r *http.Request) {
    var t Task
    if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
        http.Error(w, "bad JSON", http.StatusBadRequest)
        return
    }
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(t)
})
```

`http.Error` writes an error status and message. After it, `return`, so you don't write a second response.

You've now covered the core of Go. Good next steps: database access with `database/sql`, structured logging with `log/slog`, and reading other people's Go code, which tends to be pleasantly plain.

```compare python
@app.get("/hello/{name}")   # FastAPI
def hello(name: str): return {"message": f"Hello, {name}!"}
```

```compare javascript
app.get("/hello/:name", (req, res) => res.json({ message: `Hello, ${req.params.name}!` }));
```

```compare java
@GetMapping("/hello/{name}") Greeting hello(@PathVariable String name) { }
```

```compare kotlin
get("/hello/{name}") { call.respond(Greeting("Hello, ${call.parameters["name"]}!")) }
```

```compare rust
async fn hello(Path(name): Path<String>) -> Json<Greeting> { } // axum
```

```exercise
goal: "Register `listTasks` for `GET /tasks` on `mux` with `HandleFunc`."
code: |
  mux := http.NewServeMux()
  log.Fatal(http.ListenAndServe(":8080", mux))
checks:
  - match: 'mux\.HandleFunc\(\s*"GET /tasks"\s*,\s*listTasks\s*\)'
    message: "Add mux.HandleFunc(\"GET /tasks\", listTasks)."
solution: |
  mux := http.NewServeMux()
  mux.HandleFunc("GET /tasks", listTasks)
  log.Fatal(http.ListenAndServe(":8080", mux))
```

```quiz
question: Why can you pass an http.ResponseWriter to fmt.Fprintln?
options:
  - It satisfies io.Writer, which Fprintln accepts.
  - fmt has a special case for HTTP.
  - Fprintln accepts any value.
answer: 0
explain: ResponseWriter has a Write method, so it's an io.Writer, and Fprintln writes to any io.Writer.
```
