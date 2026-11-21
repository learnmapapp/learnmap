---
title: Sorting
icon: "📊"
branch: interfaces
requires: [slices, closures]
summary: Sort slices with slices.Sort and slices.SortFunc.
---
The `slices` package sorts slices **in place**:

```go
nums := []int{5, 2, 8, 1}
slices.Sort(nums)
fmt.Println(nums) // [1 2 5 8]

words := []string{"pear", "apple", "fig"}
slices.Sort(words)
fmt.Println(words) // [apple fig pear]
```

`slices.Sort` works for any ordered type. For anything else, like structs, use `slices.SortFunc` and pass a closure that compares two items:

```go title=main.go
package main

import (
    "cmp"
    "fmt"
    "slices"
)

type Player struct {
    Name  string
    Score int
}

func main() {
    players := []Player{
        {"Ada", 72}, {"Gus", 95}, {"Lin", 72},
    }

    slices.SortFunc(players, func(a, b Player) int {
        return cmp.Compare(b.Score, a.Score) // highest score first
    })

    fmt.Println(players) // [{Gus 95} {Ada 72} {Lin 72}]
}
```

The comparison function returns:

- a **negative** number if `a` should come first,
- **zero** if they're equal,
- a **positive** number if `b` should come first.

`cmp.Compare(x, y)` does that for you. Swap the arguments, as above, to sort in reverse.

## Sorting by two things

`cmp.Or` returns the first non-zero comparison, which makes tie-breakers easy:

```go
slices.SortFunc(players, func(a, b Player) int {
    return cmp.Or(
        cmp.Compare(b.Score, a.Score), // score, high to low
        cmp.Compare(a.Name, b.Name),   // then name, A to Z
    )
})
```

Use `slices.SortStableFunc` when items that compare equal must keep their original order.

```compare python
players.sort(key=lambda p: -p.score)
```

```compare javascript
players.sort((a, b) => b.score - a.score);
```

```compare java
players.sort(Comparator.comparingInt(Player::score).reversed());
```

```compare kotlin
players.sortedByDescending { it.score }
```

```compare rust
players.sort_by(|a, b| b.score.cmp(&a.score));
```

```exercise
goal: "Sort `books` by `Pages`, shortest first, using `slices.SortFunc` and `cmp.Compare`."
code: |
  slices.SortFunc(books, func(a, b Book) int {
      return 0
  })
checks:
  - match: 'cmp\.Compare\(\s*a\.Pages\s*,\s*b\.Pages\s*\)'
    message: "Return cmp.Compare(a.Pages, b.Pages)."
solution: |
  slices.SortFunc(books, func(a, b Book) int {
      return cmp.Compare(a.Pages, b.Pages)
  })
```

```quiz
question: "Your compare function returns a negative number. What does that mean?"
options:
  - a should come before b.
  - b should come before a.
  - They're equal.
answer: 0
explain: Negative means a sorts first, zero means equal, positive means b sorts first.
```
