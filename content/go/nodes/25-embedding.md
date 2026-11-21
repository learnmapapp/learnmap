---
title: Embedding
icon: "🪆"
branch: data
requires: [methods]
summary: Reuse fields and methods by putting one struct inside another.
---
Go has no classes and no inheritance. Instead, you **embed** one type inside another by listing it without a field name:

```go title=main.go
package main

import "fmt"

type Animal struct {
    Name string
}

func (a Animal) Greet() string {
    return "Hi, I'm " + a.Name
}

type Dog struct {
    Animal        // embedded: no field name
    Breed  string
}

func main() {
    d := Dog{Animal: Animal{Name: "Rex"}, Breed: "beagle"}

    fmt.Println(d.Name)    // Rex: promoted from Animal
    fmt.Println(d.Greet()) // Hi, I'm Rex: promoted too
    fmt.Println(d.Breed)   // beagle
}
```

The fields and methods of `Animal` are **promoted**: you can use them directly on a `Dog`. You can still reach the inner value by its type name, `d.Animal`.

## Overriding

If `Dog` defines its own `Greet`, that one wins. The embedded one is still there:

```go
func (d Dog) Greet() string {
    return "Woof! " + d.Animal.Greet()
}
```

## Composition, not inheritance

A `Dog` **has** an `Animal`; it isn't one. You can't pass a `Dog` to a function that wants an `Animal`. To write code that works with "anything that can greet", use an [[interface]] instead. You'll meet those in the next branch.

Embedding is handy for building types out of smaller parts, like a struct that embeds a `sync.Mutex` to get `Lock` and `Unlock`.

```compare python
class Dog(Animal):   # inheritance
    pass
```

```compare java
class Dog extends Animal { }
```

```compare kotlin
class Dog(name: String) : Animal(name)
```

```compare rust
struct Dog { animal: Animal } // no promotion; call d.animal.greet()
```

```exercise
goal: "Embed `Engine` in `Car` so `car.Start()` works. Replace the named field with an embedded one."
code: |
  type Car struct {
      engine Engine
      Model  string
  }
checks:
  - match: '^\s*Engine\s*$'
    message: List Engine on its own line, without a field name.
  - notMatch: 'engine\s+Engine'
    message: Remove the field name engine.
solution: |
  type Car struct {
      Engine
      Model string
  }
```

```quiz
question: "`Dog` embeds `Animal`. Can you pass a `Dog` where a function expects an `Animal`?"
options:
  - Yes, Dog inherits from Animal.
  - No; embedding is composition. Pass d.Animal, or use an interface.
answer: 1
explain: Embedding promotes fields and methods, but Dog is still a different type from Animal.
```
