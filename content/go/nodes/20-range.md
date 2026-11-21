---
title: Range
icon: "🔄"
branch: data
requires: [slices, maps]
summary: Loop over slices, maps, strings and numbers.
---
`for ... range` walks over a collection, giving you two values each round:

```go title=main.go
package main

import "fmt"

func main() {
    fruits := []string{"apple", "banana", "cherry"}
    for i, fruit := range fruits {
        fmt.Println(i, fruit)
    }
    // 0 apple
    // 1 banana
    // 2 cherry

    prices := map[string]float64{"tea": 2.5, "cake": 3.75}
    for item, price := range prices {
        fmt.Printf("%s costs %.2f\n", item, price)
    }
}
```

What you get depends on what you range over:

| Range over | First value | Second value |
| --- | --- | --- |
| slice or array | index | element |
| map | key | value |
| string | byte position | rune (character) |
| channel | element | (none) |
| integer `n` | 0 to n-1 | (none) |

Don't need the index? Use `_`. Only need the index? Leave the second one out:

```go
for _, fruit := range fruits { }  // values only
for i := range fruits { }         // indexes only
```

## The value is a copy

The loop variable is a **copy** of the element. Changing it doesn't change the slice:

```go
for _, n := range nums {
    n *= 2 // changes the copy only
}
for i := range nums {
    nums[i] *= 2 // changes the slice
}
```

```compare python
for i, fruit in enumerate(fruits): ...
for item, price in prices.items(): ...
```

```compare javascript
fruits.forEach((fruit, i) => { });
for (const [item, price] of Object.entries(prices)) { }
```

```compare java
for (var e : prices.entrySet()) { }
```

```compare kotlin
for ((i, fruit) in fruits.withIndex()) { }
```

```compare rust
for (i, fruit) in fruits.iter().enumerate() { }
```

```exercise
goal: "Replace the counting loop with `for _, name := range names`."
code: |
  for i := 0; i < len(names); i++ {
      fmt.Println(names[i])
  }
checks:
  - match: 'for\s+_\s*,\s*name\s*:=\s*range\s+names\s*\{'
    message: "Write for _, name := range names {"
  - match: 'fmt\.Println\(\s*name\s*\)'
    message: Print name instead of names[i].
solution: |
  for _, name := range names {
      fmt.Println(name)
  }
```

```quiz
question: "In `for _, v := range nums { v = 0 }`, what happens to `nums`?"
options:
  - Every element becomes 0.
  - Nothing; v is a copy of each element.
answer: 1
explain: The loop variable holds a copy. Assign through nums[i] to change the slice.
```
