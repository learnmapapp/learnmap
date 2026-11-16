---
title: Handle errors
icon: "🥅"
branch: tools
requires: [errors]
summary: Catch errors with try and except, so the program can recover instead of stopping.
---
A thermostat app reads settings typed by users. Some of them will be nonsense. Without handling, the first bad value stops the whole program. With `try`/`except`, it can shrug and carry on:

```mojo title=thermostat.mojo
def parse_temp(text: String) raises -> Int:
    var t = atol(text)
    if t < 5 or t > 30:
        raise Error(t"{t} is outside 5-30")
    return t

def main():
    var inputs: List[String] = ["21", "45", "warm", "19"]
    for text in inputs:
        try:
            var t = parse_temp(text)
            print("Set to", t)
        except e:
            print("Ignored:", e)
```

```repl shell
> mojo run thermostat.mojo
Set to 21
Ignored: 45 is outside 5-30
Ignored: (a message about "warm" not being a number)
Set to 19
```

The third line is the error `atol` raised; its exact wording comes from the standard library. Either way, one bad value no longer stops the program.

**Reading the pieces:**

- **`try:`** runs a block that might raise.
- **`except e:`** runs only if something in the `try` block raised. The error is available as `e`; print it, or turn it into text with `String(e)`.
- When the `try` block raises, the rest of it is skipped. `print("Set to", t)` doesn't run for "warm".

**Notice what `main` lost: its `raises`.** Every error from `parse_temp` is now handled inside `main`, so nothing can escape, and the compiler agrees that `main` can't fail. That's the trade: handle the error, or declare `raises` and let your caller deal with it.

**`else`** runs when the `try` block finished *without* an error. It keeps the "happy path" code out of the `try`, so you don't accidentally catch errors from it:

```mojo
try:
    var t = parse_temp(text)
except e:
    print("Ignored:", e)
else:
    print("Saved!")
```

**Re-raising.** Sometimes you want to log the error and still pass it on. A bare `raise` inside `except` does that (the function then needs `raises` again).

**Catch at the right level.** Handle an error where you can do something sensible about it: skip the value, use a default, ask again. If you can't, let it travel up. An `except` that silently ignores everything hides bugs.

```compare python
try:
    t = parse_temp(text)
except ValueError as e:
    print("Ignored:", e)
```

```compare javascript
try {
  const t = parseTemp(text);
} catch (e) {
  console.log("Ignored:", e.message);
}
```

```compare rust
match parse_temp(&text) {
    Ok(t) => println!("Set to {t}"),
    Err(e) => println!("Ignored: {e}"),
}
```

```exercise
goal: "Wrap the call in `try`/`except e`, printing `\"bad input\"` when it fails, so `main` doesn't need `raises`."
code: |-
  def main():
      var n = atol("twelve")
      print(n)
checks:
  - match: 'try\s*:\s*\n\s+var\s+n\s*=\s*atol\("twelve"\)'
    message: Put the atol call inside a try block.
  - match: 'except\s+\w+\s*:\s*\n\s+print\("bad input"\)'
    message: 'Add: except e: print("bad input")'
solution: |-
  def main():
      try:
          var n = atol("twelve")
          print(n)
      except e:
          print("bad input")
```

```quiz
question: "In a `try` block, line 2 of 4 raises. What happens to lines 3 and 4?"
options:
  - They still run.
  - They're skipped, and the except block runs.
  - They run after the except block.
answer: 1
explain: As soon as an error is raised, execution jumps to except.
```
