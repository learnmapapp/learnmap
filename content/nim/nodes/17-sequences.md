---
title: Growable sequences
icon: "📚"
branch: data
requires: [arrays]
summary: seq[T] is Nim's growable list; @ turns an array literal into one.
---
**The arrays lesson ended with "use a sequence when the count depends on the data". So what's different?** Here's a playlist, side by side:

| | `array[3, string]` | `seq[string]` |
| --- | --- | --- |
| Literal | `["a", "b", "c"]` | `@["a", "b", "c"]` |
| Empty | not possible, always 3 slots | `@[]` or `newSeq[string]()` |
| Add an item | no | `songs.add("d")` |
| Remove an item | no | `songs.delete(0)`, `songs.pop()` |
| Size known | when compiling | at runtime |

The `@` is the "make it a sequence" operator. Without it, `["a", "b"]` is an array.

```nim title=playlist.nim
var songs = @["Intro", "Waves"]
songs.add("Finale")
songs.insert("Storm", 1)     # insert at index 1
echo songs                   # @["Intro", "Storm", "Waves", "Finale"]
echo songs.len               # 4
echo songs[^1]               # Finale: ^1 means "first from the end"

let last = songs.pop()       # removes and returns the last item
songs.delete(0)              # removes the item at index 0
echo songs                   # @["Storm", "Waves"]
echo "Waves" in songs        # true
```

A [[sequence]] holds items of one type. `@[1, "two"]` doesn't compile.

**Starting empty.** An empty literal doesn't say what type it holds, so declare the type:

```nim
var names: seq[string]       # empty, ready to add to
var scores = newSeq[int](5)  # five zeros: @[0, 0, 0, 0, 0]
```

**Sequences are values, too.** `let copy = songs` copies the items, so later changes to `songs` don't affect `copy`. (Nim avoids the actual copy when it can prove nobody will notice.)

**Changing requires `var`.** `add`, `delete` and assignment by index only work on a `var` sequence. A `let` sequence is completely frozen, items included.

```compare python
songs = ["Intro", "Waves"]
songs.append("Finale")
songs[-1]
```

```compare javascript
const songs = ["Intro", "Waves"];
songs.push("Finale");
songs.at(-1);
```

```compare rust
let mut songs = vec!["Intro", "Waves"];
songs.push("Finale");
songs.last();
```

```exercise
goal: "`add` doesn't work on an array. Make `queue` a sequence by adding `@` in front of the literal."
code: |-
  var queue = ["Ada", "Bo"]
  queue.add("Cy")
  echo queue
checks:
  - match: 'var\s+queue\s*=\s*@\['
    message: Write @["Ada", "Bo"]
solution: |-
  var queue = @["Ada", "Bo"]
  queue.add("Cy")
  echo queue
```

```quiz
question: "What does `@[1, 2, 3][^1]` evaluate to?"
options:
  - "1"
  - "3"
  - "A compile error: negative indexes aren't allowed."
answer: 1
explain: ^1 counts from the end, so it's the last item.
```
