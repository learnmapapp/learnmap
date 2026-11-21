---
title: Strings and runes
icon: "💬"
branch: basics
requires: [basic-types]
summary: Strings are bytes; characters are runes. The strings package does the rest.
---
A Go string is a read-only sequence of **bytes**, holding text encoded as UTF-8. For English letters, one byte is one character. For `é` or `🐹`, it isn't:

```go title=main.go
package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    word := "café"
    fmt.Println(len(word))                    // 5 (bytes)
    fmt.Println(utf8.RuneCountInString(word)) // 4 (characters)

    for i, r := range word {
        fmt.Println(i, string(r))
    }
    // 0 c
    // 1 a
    // 2 f
    // 3 é
}
```

A single character is a [[rune]], written in single quotes: `'é'`. Looping over a string with `range` gives you runes, which is almost always what you want. Indexing with `word[0]` gives a byte.

## The strings package

Most text work happens with functions from `strings`:

```go
strings.ToUpper("go")                 // "GO"
strings.Contains("gopher", "go")      // true
strings.Split("a,b,c", ",")           // ["a" "b" "c"]
strings.Join([]string{"a", "b"}, "-") // "a-b"
strings.TrimSpace("  hi  ")           // "hi"
strings.ReplaceAll("a-b-c", "-", "+") // "a+b+c"
```

Join strings with `+`. For many pieces in a loop, a `strings.Builder` is faster:

```go
var b strings.Builder
for i := 0; i < 3; i++ {
    b.WriteString("ha")
}
fmt.Println(b.String()) // hahaha
```

For text over several lines, or with lots of backslashes, use a **raw string** in backticks. Nothing inside it is treated specially:

```go
path := `C:\Users\gus\notes.txt`
```

```compare python
len("café")   # 4: Python counts characters
```

```compare javascript
"café".length  // 4
```

```compare java
"café".length()  // 4
```

```compare rust
"café".len()  // 5 bytes, like Go
```

```exercise
goal: "Split the line on commas with `strings.Split`."
code: |
  line := "red,green,blue"
  colors := line
checks:
  - match: 'colors\s*:=\s*strings\.Split\(\s*line\s*,\s*","\s*\)'
    message: "Write colors := strings.Split(line, \",\")"
solution: |
  line := "red,green,blue"
  colors := strings.Split(line, ",")
```

```quiz
question: "What does `len(\"日本\")` return?"
options:
  - "2"
  - "6"
  - "4"
answer: 1
explain: len counts bytes, and each of these characters takes three bytes in UTF-8.
```
