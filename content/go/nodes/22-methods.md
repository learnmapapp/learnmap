---
title: Methods
icon: "🛠️"
branch: data
requires: [structs]
summary: Attach functions to your types with a receiver.
---
A **method** is a function with a [[receiver]]: an extra parameter, written before the name, that says which type the method belongs to.

```go title=main.go
package main

import (
    "fmt"
    "math"
)

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Describe() string {
    return fmt.Sprintf("circle with radius %.1f", c.Radius)
}

func main() {
    c := Circle{Radius: 2}
    fmt.Println(c.Area())     // 12.566370614359172
    fmt.Println(c.Describe()) // circle with radius 2.0
}
```

`func (c Circle) Area()` reads as "a method `Area` on `Circle`, where the circle is called `c`". Inside, you use `c` like any other parameter. Go has no `this` or `self`; by convention the receiver gets a short name, often the first letter of the type.

## Not only structs

You can add methods to any type you define in your package, not just structs:

```go
type Celsius float64

func (t Celsius) Fahrenheit() float64 {
    return float64(t)*9/5 + 32
}

fmt.Println(Celsius(100).Fahrenheit()) // 212
```

You can't add methods to types from other packages, like `int` or `string`. Define your own type based on them instead, as above.

## Methods and copies

With a receiver like `(c Circle)`, the method gets a **copy**. Changing `c.Radius` inside wouldn't affect the caller's circle. When a method needs to change its value, use a [pointer receiver](node:pointer-receivers).

```compare python
class Circle:
    def area(self): return math.pi * self.radius ** 2
```

```compare javascript
class Circle { area() { return Math.PI * this.radius ** 2; } }
```

```compare java
double area() { return Math.PI * radius * radius; }
```

```compare kotlin
fun area() = Math.PI * radius * radius
```

```compare rust
impl Circle { fn area(&self) -> f64 { PI * self.radius * self.radius } }
```

```exercise
goal: "Turn `perimeter` into a method on `Rect`, with receiver `r`, so it's called as `r.Perimeter()`."
code: |
  func perimeter(r Rect) int {
      return 2 * (r.W + r.H)
  }
checks:
  - match: 'func\s*\(\s*r\s+Rect\s*\)\s*Perimeter\s*\(\s*\)\s*int'
    message: "Write func (r Rect) Perimeter() int"
solution: |
  func (r Rect) Perimeter() int {
      return 2 * (r.W + r.H)
  }
```

```quiz
question: "In `func (c Circle) Grow() { c.Radius *= 2 }`, does calling `x.Grow()` change `x`?"
options:
  - Yes.
  - No, the method receives a copy of x.
answer: 1
explain: A value receiver is a copy. Use a pointer receiver (*Circle) to change the caller's value.
```
