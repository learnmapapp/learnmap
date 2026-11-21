---
title: Printing and formatting
icon: "🖨️"
branch: basics
requires: [packages]
summary: Println, Printf with verbs, and Sprintf to build strings.
---
The `fmt` package handles output. Three functions cover most needs:

```go title=main.go
package main

import "fmt"

func main() {
    name, score := "Ada", 92.5

    fmt.Println("Hi", name)                    // Hi Ada
    fmt.Printf("%s scored %.1f\n", name, score) // Ada scored 92.5

    label := fmt.Sprintf("%s (%d%%)", name, 92)
    fmt.Println(label) // Ada (92%)
}
```

- `Println` prints its arguments with spaces between and a newline at the end.
- `Printf` uses a **format string**. Each `%` verb is replaced by the next argument. It does *not* add a newline, so you write `\n`.
- `Sprintf` works like `Printf` but returns the string instead of printing it.

The verbs you'll use most:

| Verb | Shows | Example output |
| --- | --- | --- |
| `%v` | any value, default format | `[1 2 3]` |
| `%+v` | structs with field names | `{Name:Ada Age:36}` |
| `%d` | integer | `42` |
| `%.2f` | float with 2 decimals | `3.14` |
| `%s` | string | `hello` |
| `%q` | quoted string | `"hello"` |
| `%T` | the type | `[]int` |
| `%%` | a literal % | `%` |

`%v` works on anything, so when in doubt, use it. `%T` is handy when you're not sure what type something is.

```compare python
print(f"{name} scored {score:.1f}")
```

```compare javascript
console.log(`${name} scored ${score.toFixed(1)}`);
```

```compare java
System.out.printf("%s scored %.1f%n", name, score);
```

```compare rust
println!("{name} scored {score:.1}");
```

```exercise
goal: "Use `fmt.Printf` to print `Total: 12.50` with two decimals and a newline."
code: |
  total := 12.5
  fmt.Println("Total:", total)
checks:
  - match: 'fmt\.Printf\(\s*"Total: %\.2f\\n"\s*,\s*total\s*\)'
    message: "Write fmt.Printf(\"Total: %.2f\\n\", total)"
output: "Total: 12.50"
solution: |
  total := 12.5
  fmt.Printf("Total: %.2f\n", total)
```

```quiz
question: "Which verb prints any value in its default format?"
options:
  - "`%d`"
  - "`%v`"
  - "`%s`"
answer: 1
explain: "%v (for value) works with every type: numbers, slices, maps and structs."
```
