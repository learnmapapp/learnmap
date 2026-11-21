---
title: Pointers
icon: "👉"
branch: data
requires: [structs]
summary: Share a value instead of copying it, with & and *.
---
A [[pointer]] holds the **address** of a value, so you can reach the original instead of a copy.

- `&x` gives you a pointer to `x`.
- `*p` follows the pointer to the value.
- The type "pointer to int" is written `*int`.

```go title=main.go
package main

import "fmt"

func resetCopy(n int)     { n = 0 }
func resetShared(n *int)  { *n = 0 }

func main() {
    score := 42

    resetCopy(score)
    fmt.Println(score) // 42: the function got a copy

    resetShared(&score)
    fmt.Println(score) // 0: the function changed the original
}
```

## Pointers to structs

Pointers to structs are very common. Go lets you use `.` directly, without writing `(*p).Field`:

```go
type Player struct {
    Name string
    HP   int
}

func heal(p *Player) {
    p.HP += 10 // same as (*p).HP += 10
}

hero := Player{Name: "Gus", HP: 50}
heal(&hero)
fmt.Println(hero.HP) // 60
```

You'll often create a struct and take its address in one go:

```go
boss := &Player{Name: "Dragon", HP: 500} // boss is a *Player
```

## nil

A pointer that points nowhere is `nil`, and following it crashes:

```repl shell
> go run .
panic: runtime error: invalid memory address or nil pointer dereference
```

Check `if p == nil` when a pointer might be empty.

```tip
There's no pointer arithmetic in Go, and the garbage collector frees memory for you. Pointers are just a way to share.
```

```compare python
# every object is shared by reference already
```

```compare javascript
// objects are shared; numbers are copied
```

```compare java
// objects are references; there's no & or *
```

```compare rust
fn heal(p: &mut Player) { p.hp += 10; }
```

```exercise
goal: "Make `double` change the caller's number: take a `*int` and update it with `*n`."
code: |
  func double(n int) {
      n = n * 2
  }
checks:
  - match: 'func\s+double\s*\(\s*n\s+\*int\s*\)'
    message: "Change the parameter to n *int."
  - match: '\*n\s*=\s*\*n\s*\*\s*2|\*n\s*\*=\s*2'
    message: "Update the value with *n = *n * 2."
solution: |
  func double(n *int) {
      *n = *n * 2
  }
```

```quiz
question: "What does `&score` give you?"
options:
  - A copy of score.
  - A pointer to score.
  - The value score points to.
answer: 1
explain: The & operator takes the address of a variable, producing a pointer.
```
