---
title: Interfaces
icon: "🔌"
kind: hub
branch: interfaces
requires: [methods]
summary: Describe behaviour as a set of methods. Types match it without saying so.
---
An [[interface]] lists methods. Any type that has those methods **automatically** satisfies the interface. There's no `implements` keyword.

```go title=main.go
package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
}

type Rect struct{ W, H float64 }
type Circle struct{ R float64 }

func (r Rect) Area() float64   { return r.W * r.H }
func (c Circle) Area() float64 { return math.Pi * c.R * c.R }

func total(shapes []Shape) float64 {
    sum := 0.0
    for _, s := range shapes {
        sum += s.Area()
    }
    return sum
}

func main() {
    shapes := []Shape{Rect{W: 2, H: 3}, Circle{R: 1}}
    fmt.Printf("%.2f\n", total(shapes)) // 9.14
}
```

`Rect` and `Circle` never mention `Shape`. They just have an `Area() float64` method, and that's enough.

## Why this matters

Because matching is automatic, you can write an interface for types you didn't write yourself. The standard library is full of tiny interfaces that many types satisfy:

```go
type Stringer interface { String() string }        // fmt
type Reader interface { Read(p []byte) (int, error) } // io
type error interface { Error() string }            // built in
```

Files, network connections and in-memory buffers are all `io.Reader`s, so a function that takes an `io.Reader` works with any of them.

```tip
Keep interfaces small, often a single method. And define them where they're **used**, not next to the type: the code that needs "something with Area" is the code that declares it.
```

## Interface values

A variable of interface type holds some concrete value plus its type. If it holds nothing, it's `nil`, and calling a method on it panics.

```compare java
class Rect implements Shape { }   // must say so explicitly
```

```compare kotlin
class Rect : Shape { override fun area() = w * h }
```

```compare python
class Shape(Protocol):   # structural, like Go
    def area(self) -> float: ...
```

```compare rust
impl Shape for Rect { fn area(&self) -> f64 { self.w * self.h } }
```

```exercise
goal: "Declare an interface `Speaker` with one method, `Speak() string`."
code: |
  type Speaker
checks:
  - match: 'type\s+Speaker\s+interface\s*\{\s*Speak\s*\(\s*\)\s*string\s*\}'
    message: "Write type Speaker interface { Speak() string }"
solution: |
  type Speaker interface {
      Speak() string
  }
```

```quiz
question: How does a type satisfy an interface in Go?
options:
  - By writing implements in its declaration.
  - By having all the methods the interface lists.
  - By embedding the interface.
answer: 1
explain: Interfaces are satisfied implicitly. Having the right methods is all it takes.
```
