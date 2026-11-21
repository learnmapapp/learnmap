---
title: Any and type switches
icon: "🧩"
branch: interfaces
requires: [interfaces, switch]
summary: Hold any value with any, and find out what's inside.
---
An interface with no methods is satisfied by **every** type. It's so common that it has a short name, `any`:

```go
var box any
box = 42
box = "hello"
box = []int{1, 2}
```

`fmt.Println` takes `...any`, which is why it can print anything.

But with an `any` you can't do much directly, because Go doesn't know what's inside. To get the value back you ask for its type.

## Type assertions

`v.(T)` says "I expect `v` holds a `T`". Use the comma-ok form so a wrong guess doesn't panic:

```go
s, ok := box.(string)
if ok {
    fmt.Println("a string of length", len(s))
}
```

## Type switches

To handle several types, use a **type switch**:

```go title=main.go
package main

import "fmt"

func describe(v any) string {
    switch x := v.(type) {
    case int:
        return fmt.Sprintf("int, doubled is %d", x*2)
    case string:
        return fmt.Sprintf("string of %d bytes", len(x))
    case nil:
        return "nothing"
    default:
        return fmt.Sprintf("something else: %T", x)
    }
}

func main() {
    fmt.Println(describe(21))      // int, doubled is 42
    fmt.Println(describe("gopher")) // string of 6 bytes
    fmt.Println(describe(3.5))     // something else: float64
}
```

Inside each case, `x` already has that case's type, so `x*2` works in the `int` case.

```tip
Reach for any sparingly. If you know the types up front, generics or a small interface give you the compiler's help instead of runtime checks.
```

```compare python
match v:
    case int(): ...
    case str(): ...
```

```compare javascript
if (typeof v === "number") { }
```

```compare java
switch (v) { case Integer i -> ...; case String s -> ...; default -> ...; }
```

```compare kotlin
when (v) { is Int -> v * 2; is String -> v.length }
```

```compare rust
if let Some(s) = v.downcast_ref::<String>() { }
```

```exercise
goal: "The assertion panics if `data` isn't a string. Use the comma-ok form, with `ok`."
code: |
  name := data.(string)
  fmt.Println(name)
checks:
  - match: 'name\s*,\s*ok\s*:=\s*data\.\(string\)'
    message: "Write name, ok := data.(string)"
solution: |
  name, ok := data.(string)
  if ok {
      fmt.Println(name)
  }
```

```quiz
question: "Inside `case string:` of `switch x := v.(type)`, what type is `x`?"
options:
  - "`any`"
  - "`string`"
  - "`interface{}`"
answer: 1
explain: In each case of a type switch, the variable has the type named by that case.
```
