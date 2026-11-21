---
title: Modules
icon: "📚"
branch: tools
requires: [packages]
summary: go.mod, adding dependencies, and the go command.
---
A [[module]] is a project: a folder with a `go.mod` file and all the packages under it. You create one with `go mod init` and a module path, usually where the code will live:

```repl shell
> mkdir weather && cd weather
> go mod init github.com/gus/weather
go: creating new go.mod: module github.com/gus/weather
```

```text title=go.mod
module github.com/gus/weather

go 1.25
```

Packages inside the module are imported by module path plus folder:

```text
weather/
├── go.mod
├── main.go                 package main
└── forecast/
    └── forecast.go         package forecast
```

```go title=main.go
import "github.com/gus/weather/forecast"
```

## Adding a dependency

Use `go get` to add a module, then import it:

```repl shell
> go get github.com/fatih/color@latest
go: added github.com/fatih/color v1.18.0
```

This records the version in `go.mod` and writes checksums to `go.sum`. Commit both files. Run `go mod tidy` now and then: it adds anything missing and removes what you no longer use.

## The go command

| Command | What it does |
| --- | --- |
| `go run .` | compile and run the package in this folder |
| `go build` | compile a binary |
| `go test ./...` | run all tests in the module |
| `go fmt ./...` | format all code |
| `go vet ./...` | report suspicious code |
| `go mod tidy` | tidy up go.mod and go.sum |

`./...` means "this folder and everything below it".

```tip
go build produces one static binary with everything included. Copy it to a server and run it; there's no runtime to install.
```

```compare python
pip install requests   # requirements.txt / pyproject.toml
```

```compare javascript
npm install chalk   // package.json + lockfile
```

```compare java
// pom.xml or build.gradle
```

```compare rust
cargo add colored   # Cargo.toml + Cargo.lock
```

```exercise
lang: text
goal: "Fill in the module path in go.mod: the module is `github.com/gus/todo`."
code: |
  module

  go 1.25
checks:
  - match: '^module\s+github\.com/gus/todo\s*$'
    message: "Write module github.com/gus/todo"
solution: |
  module github.com/gus/todo

  go 1.25
```

```quiz
question: Which files should you commit to version control?
options:
  - Only go.mod.
  - go.mod and go.sum.
  - Neither; they're generated.
answer: 1
explain: go.mod lists your dependencies, and go.sum records their checksums so builds are reproducible.
```
