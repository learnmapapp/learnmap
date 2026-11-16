---
title: Typed lists
icon: "📋"
branch: data
requires: [integers]
summary: A List holds any number of values, all of the same type.
---
A [[list]] in Mojo is like a Python list with one house rule: **everything in it has the same type.**

```mojo title=playlist.mojo
def main():
    var durations: List[Int] = [215, 187, 242, 199]   # seconds
    var titles: List[String] = ["Intro", "Run", "Drift", "Home"]

    print(len(titles), "tracks")      # 4 tracks
    print("First:", titles[0])        # First: Intro
    print("Third lasts", durations[2], "s")   # Third lasts 242 s
```

**`List[Int]`** reads as "a list of Ints". The type in the square brackets is a [parameter](node:parameters), and it's checked everywhere: `durations.append("five")` doesn't compile.

**Coming from Python?**

| Python | Mojo |
| --- | --- |
| `[1, "two", 3.0]` mixes types freely | one item type per list |
| `x = [1, 2]` | `var x: List[Int] = [1, 2]` (or let Mojo infer it) |
| `b = a` shares the list | `b = a` is an error; use `a.copy()` or `a^` |
| `len(x)`, `x[0]`, `for v in x` | the same |

That third row trips people up most. A Mojo list is a *value*: `var b = a.copy()` gives an independent copy, and plain `b = a` isn't allowed, so you can't create two names for the same list by accident. The [copies](node:copies) lesson has the full reasoning.

**Empty lists** need their type spelled out, because there's nothing to infer it from:

```mojo
var queue = List[String]()
var scores: List[Float64] = []
```

**Mixed data?** If you'd reach for `["Ana", 34, True]` in Python, you probably have a record: make it a [struct](node:structs), and keep a `List[Person]`. Or, for a quick pair of values, a [tuple](node:tuples).

**What's next:** [add items](node:append), [read and change them](node:indexing), [loop over them](node:iteration), and [remove them](node:pop).

```compare python
durations = [215, 187, 242, 199]
titles = ["Intro", "Run", "Drift", "Home"]
```

```compare javascript
const durations = [215, 187, 242, 199];
```

```compare rust
let durations: Vec<i32> = vec![215, 187, 242, 199];
```

```exercise
goal: "Create `temps`, a `List[Float64]` containing 18.5, 21.0 and 19.5."
code: |-
  def main():
      var temps = 
      print(len(temps))
checks:
  - match: 'var\s+temps\s*:\s*List\[\s*Float64\s*\]\s*=\s*\[\s*18\.5\s*,\s*21\.0\s*,\s*19\.5\s*\]'
    message: 'Write var temps: List[Float64] = [18.5, 21.0, 19.5]'
solution: |-
  def main():
      var temps: List[Float64] = [18.5, 21.0, 19.5]
      print(len(temps))
```

```quiz
question: "Can a `List[Int]` hold the string \"7\"?"
options:
  - Yes, lists can hold anything.
  - No, every item must be an Int.
  - Yes, it's converted to 7 automatically.
answer: 1
explain: The item type is part of the list's type and checked at compile time.
```
