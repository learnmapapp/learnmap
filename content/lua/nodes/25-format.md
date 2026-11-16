---
title: Formatted output
icon: "🧾"
branch: text
requires: [strings, numbers]
summary: string.format builds tidy text with printf-style placeholders.
---
**A recipe for a receipt.** You need: item names lined up, prices with two decimals, and a total. `string.format` does all three:

```lua title=receipt.lua
local items = {
  { "Coffee", 3.5 },
  { "Croissant", 2.25 },
  { "Orange juice", 4 },
}

local total = 0
for _, item in ipairs(items) do
  local name, price = item[1], item[2]
  print(string.format("%-14s %6.2f", name, price))
  total = total + price
end
print(string.format("%-14s %6.2f", "TOTAL", total))
```

```repl shell
> lua receipt.lua
Coffee           3.50
Croissant        2.25
Orange juice     4.00
TOTAL            9.75
```

The first argument is a template. Each `%` placeholder is replaced by the next argument. The ingredients:

| Placeholder | Meaning | Example | Result |
| --- | --- | --- | --- |
| `%s` | any value, as text | `("%s!"):format("hi")` | `hi!` |
| `%d` | integer | `("%d"):format(42)` | `42` |
| `%.2f` | float, 2 decimals | `("%.2f"):format(1/3)` | `0.33` |
| `%5d` | pad to width 5, right-aligned | `("[%5d]"):format(42)` | `[   42]` |
| `%-5s` | pad to width 5, left-aligned | `("[%-5s]"):format("ab")` | `[ab   ]` |
| `%05d` | pad with zeros | `("%05d"):format(42)` | `00042` |
| `%x` | hexadecimal | `("%x"):format(255)` | `ff` |
| `%q` | quoted, safe to read back into Lua | `("%q"):format('say "hi"')` | `"say \"hi\""` |
| `%%` | a literal percent sign | `("%d%%"):format(50)` | `50%` |

That table also shows a handy shortcut: since strings have methods, `("%d"):format(42)` is the same as `string.format("%d", 42)`. The parentheses around the string literal are required.

`%d` is strict: `("%d"):format(3.5)` fails with *number has no integer representation*. Use `%.0f` or `math.floor` when the value might have a fraction. `3.0` is accepted, though.

```compare python
f"{name:<14} {price:6.2f}"
```

```compare javascript
`${name.padEnd(14)} ${price.toFixed(2).padStart(6)}`
```

```compare rust
format!("{:<14} {:6.2}", name, price)
```

```exercise
goal: "Format the progress so it reads like `Progress: 07/10 (70%)`: a zero-padded two-digit `done`, and a literal percent sign."
code: |-
  print(string.format("Progress: %d/%d (%d)", done, total, percent))
checks:
  - match: '%02d/%d'
    message: Use %02d for the zero-padded done.
  - match: '\(%d%%\)'
    message: "Write %% for a literal percent sign: (%d%%)"
solution: |-
  print(string.format("Progress: %02d/%d (%d%%)", done, total, percent))
```

```quiz
question: "What does `string.format(\"%.1f\", 2.46)` return?"
options:
  - "\"2.4\""
  - "\"2.5\""
  - "\"2.46\""
answer: 1
explain: "%.1f rounds to one decimal place."
```
