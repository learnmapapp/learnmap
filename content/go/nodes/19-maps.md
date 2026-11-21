---
title: Maps
icon: "🗺️"
branch: data
requires: [slices]
summary: Look up values by key, and the comma-ok check.
---
A **map** stores values by key. Its type is `map[KeyType]ValueType`:

```go title=main.go
package main

import "fmt"

func main() {
    ages := map[string]int{
        "Ada":  36,
        "Alan": 41,
    }

    ages["Grace"] = 85         // add or update
    fmt.Println(ages["Ada"])   // 36
    fmt.Println(len(ages))     // 3

    delete(ages, "Alan")
    fmt.Println(ages)          // map[Ada:36 Grace:85]
}
```

## Missing keys

Looking up a key that isn't there gives the [[zero value]], not an error:

```go
fmt.Println(ages["Nobody"]) // 0
```

That's handy for counters (`counts[word]++` just works), but it means you can't tell "missing" from "really 0". For that, use the **comma-ok** form:

```go
age, ok := ages["Nobody"]
if !ok {
    fmt.Println("no such person")
}
```

`ok` is `true` if the key was there. You'll often see it inside an `if`:

```go
if age, ok := ages["Ada"]; ok {
    fmt.Println("Ada is", age)
}
```

## Create before writing

A map declared with `var m map[string]int` is `nil`. Reading it is fine; **writing panics**. Create maps with a literal (`map[string]int{}`) or with `make(map[string]int)`.

```warn
Map order is random on purpose. If you loop over a map twice, you may get a different order. Sort the keys when the order matters.
```

```compare python
ages = {"Ada": 36}
ages.get("Nobody")   # None
```

```compare javascript
const ages = new Map([["Ada", 36]]);
ages.has("Nobody");
```

```compare java
Map<String, Integer> ages = new HashMap<>();
```

```compare rust
let mut ages = HashMap::new();
ages.get("Nobody") // None
```

```exercise
goal: "Use the comma-ok form to check whether `\"tea\"` is in `stock`."
code: |
  qty := stock["tea"]
  if qty == 0 {
      fmt.Println("not stocked")
  }
checks:
  - match: 'qty\s*,\s*ok\s*:=\s*stock\["tea"\]'
    message: "Write qty, ok := stock[\"tea\"]"
  - match: 'if\s+!ok\s*\{'
    message: "Check with if !ok {"
solution: |
  qty, ok := stock["tea"]
  if !ok {
      fmt.Println("not stocked")
  }
```

```quiz
question: "What does `counts[\"x\"]` return when `\"x\"` isn't in a `map[string]int`?"
options:
  - "`nil`"
  - "`0`"
  - It panics.
answer: 1
explain: A missing key gives the zero value of the value type. Use comma-ok to tell the difference.
```
