---
title: Named and default arguments
icon: "🎛️"
branch: functions
requires: [procedures, strings]
summary: Give parameters default values, and name arguments at the call site when it helps.
---
**Puzzle.** What does this call do?

```nim
banner("Sale", 40, '*', true)
```

You can't tell without opening the definition. Is `40` a width or a percentage? What does `true` switch on? Now compare:

```nim
banner("Sale", width = 40, fill = '*', shout = true)
```

Same call, readable at a glance. Here's the proc:

```nim title=banner.nim
import std/strutils

proc banner(text: string, width = 20, fill = '-', shout = false): string =
  let label = if shout: text.toUpperAscii() else: text
  let side = fill.repeat((width - label.len - 2) div 2)
  side & " " & label & " " & side

echo banner("Hi")                           # -------- Hi --------
echo banner("Sale", fill = '*', shout = true)
echo banner("Menu", 12)
```

**Default values.** `width = 20` gives the parameter a default, and its type is inferred from the value (`int`). A caller can leave it out. Parameters with defaults normally go after the ones without.

**Named arguments.** At the call site, `name = value` sets a parameter by name. It lets you:

- skip some defaults and set a later one: `banner("Sale", shout = true)` keeps `width` and `fill`;
- make literals like `true` and `40` self-explanatory;
- pass arguments in any order, once you're naming them.

Positional arguments come first; named ones after.

**A rule of thumb:** a `bool` parameter is almost always clearer named. `save(doc, true)` is a riddle; `save(doc, overwrite = true)` isn't.

**One gotcha with the dot syntax:** `"Sale".banner(shout = true)` works, because the dot only fills the first parameter. The rest of the call is unchanged.

```compare python
def banner(text, width=20, fill="-", shout=False): ...
banner("Sale", fill="*", shout=True)
```

```compare javascript
function banner(text, { width = 20, fill = "-", shout = false } = {}) { }
banner("Sale", { fill: "*", shout: true });   // an options object instead
```

```compare rust
// Rust has neither defaults nor named arguments;
// you'd use a builder or an options struct.
```

```exercise
goal: "Give `retries` a default of `3`, so the last line compiles without passing it."
code: |-
  proc connect(host: string, retries: int) =
    echo "Connecting to ", host, " (", retries, " tries)"

  connect("example.org")
checks:
  - match: 'retries\s*(:\s*int\s*)?=\s*3'
    message: Write retries = 3 in the parameter list.
solution: |-
  proc connect(host: string, retries = 3) =
    echo "Connecting to ", host, " (", retries, " tries)"

  connect("example.org")
```

```quiz
question: "With `proc f(a: int, b = 1, c = 2)`, which call sets c to 9 and keeps b's default?"
options:
  - "`f(0, 9)`"
  - "`f(0, c = 9)`"
  - "`f(c = 9)`"
answer: 1
explain: f(0, 9) would set b. Naming c skips b, and a is still required, so f(c = 9) fails.
```
