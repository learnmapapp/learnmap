---
title: Your first project
icon: "🛠️"
branch: basics
requires: [go]
summary: Install Go, create a module, and run a program.
---
Download Go from go.dev and check that it works:

```repl shell
> go version
go version go1.25.0 darwin/arm64
```

Every Go project is a **module**: a folder with a `go.mod` file that names the project. Create one:

```repl shell
> mkdir hello && cd hello
> go mod init example.com/hello
go: creating new go.mod: module example.com/hello
```

The name looks like a web address because that's how Go identifies code you can share. For a project you keep to yourself, any name works.

Now add a file:

```go title=main.go
package main

import "fmt"

func main() {
    fmt.Println("It works!")
}
```

And run it:

```repl shell
> go run .
It works!
> go build
> ./hello
It works!
```

- `go run .` compiles and runs the program in the current folder, in one step.
- `go build` creates a program file (`hello`, or `hello.exe` on Windows) that runs without Go installed.

Every program starts in the function `main`, inside `package main`.

```tip
Run `go fmt ./...` (or turn on "format on save" in your editor). Go has one official code style, so nobody argues about where braces go.
```

```compare python
# python main.py: no compile step, but you need Python where it runs
```

```compare javascript
// node main.js
```

```compare java
// javac Main.java && java Main
```

```compare rust
// cargo new hello && cargo run
```

```exercise
goal: "Every program needs a `main` function to start in. Rename `start` to `main`."
code: |
  package main

  import "fmt"

  func start() {
      fmt.Println("Ready")
  }
checks:
  - match: 'func\s+main\s*\(\s*\)\s*\{'
    message: Write func main() {
  - notMatch: 'func\s+start'
    message: Rename start, don't add a second function.
solution: |
  package main

  import "fmt"

  func main() {
      fmt.Println("Ready")
  }
```

```quiz
question: What does `go mod init example.com/hello` create?
options:
  - A go.mod file that makes the folder a module.
  - A main.go file with Hello World.
  - A compiled program.
answer: 0
explain: go.mod names the module and will later list its dependencies.
```
