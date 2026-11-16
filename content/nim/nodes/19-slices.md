---
title: Slices and indices
icon: "🔪"
branch: data
requires: [sequences]
summary: Take parts of strings and sequences with ranges, and count from the end with ^.
---
**Spot the difference.** Each pair below looks almost the same. Can you predict both results before reading the answers?

```nim title=slices.nim
let word = "lighthouse"
let nums = @[10, 20, 30, 40, 50]

echo word[0..4]      # A
echo word[0..<4]     # B

echo nums[1..2]      # C
echo nums[1..^2]     # D

echo word[^5..^1]    # E
echo word[5..^1]     # F
```

```repl shell
> nim r slices.nim
light
ligh
@[20, 30]
@[20, 30, 40]
house
house
```

**The answers:**

- **A vs B:** `..` includes the end, `..<` stops before it. Same as [ranges in loops](node:for).
- **C vs D:** `^2` means "second from the end". In `nums`, that's `40`, so `1..^2` runs from `20` up to and including `40`.
- **E vs F:** two ways to reach the end. `^1` is the last character. `word[5..^1]` reads "from 5 to the end", which is how you write Python's `word[5:]`.

**Slicing copies.** `nums[1..2]` gives you a new sequence (or string). Changing it doesn't change `nums`. When you only want to *read* part of a sequence without copying, pass `nums.toOpenArray(1, 2)` to a proc that takes an [openArray](node:openarrays).

**Slices can be assigned to**, on a `var`, which replaces that part:

```nim
var s = "hello world"
s[0..4] = "HOWDY"
echo s               # HOWDY world
```

**Out of range is an error**, as always: `word[3..50]` stops the program with an `IndexDefect` instead of quietly returning less.

```compare python
word[0:5]    # end excluded, like Nim's 0..<5
word[5:]     # to the end, like Nim's 5..^1
nums[1:-1]   # Nim: nums[1..^2]
```

```compare javascript
word.slice(0, 5);
word.slice(5);
nums.slice(1, -1);
```

```compare rust
&word[0..5]   // exclusive, like Nim's 0..<5
&word[5..]
```

```exercise
goal: "`file[0..5]` includes the dot and prints `notes.`. Change the slice to `file[0..<5]` so it prints `notes`."
code: |-
  let file = "notes.txt"
  echo file[0..5]
checks:
  - match: 'file\[\s*0\s*\.\.<\s*5\s*\]'
    message: Write file[0..<5]
solution: |-
  let file = "notes.txt"
  echo file[0..<5]
```

```quiz
question: "What is `\"banana\"[^3..^1]`?"
options:
  - "\"ana\""
  - "\"nan\""
  - "\"an\""
answer: 0
explain: ^3 is the third character from the end, and ^1 is the last, both included.
```
