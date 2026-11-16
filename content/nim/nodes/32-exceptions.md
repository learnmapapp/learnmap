---
title: Catch exceptions
icon: "🧯"
branch: tools
requires: [procedures, strings]
summary: raise, try/except/finally, your own exception types, and errors versus defects.
---
**What to do when something goes wrong, one situation at a time.**

**Situation: user input might not be a number.** `parseInt` raises a `ValueError` for bad input. Catch it with `try`/`except`:

```nim title=age.nim
import std/strutils

proc askAge(input: string): int =
  try:
    result = parseInt(input)
  except ValueError:
    echo "That's not a number: ", input
    result = -1

echo askAge("42")       # 42
echo askAge("forty")    # That's not a number: forty, then -1
```

If the code in `try` raises a `ValueError`, Nim jumps to the matching `except`. If nothing goes wrong, the `except` is skipped.

**Situation: you need the error message.** Name it with `as`:

```nim
try:
  discard parseInt("12x")
except ValueError as e:
  echo "Failed: ", e.msg    # Failed: invalid integer: 12x
```

**Situation: your own code finds a problem.** `raise` an [[exception]] with `newException`:

```nim
proc withdraw(balance, amount: int): int =
  if amount > balance:
    raise newException(ValueError, "not enough money")
  balance - amount
```

**Situation: callers should be able to tell your errors apart.** Define your own type:

```nim
type InsufficientFunds = object of ValueError

raise newException(InsufficientFunds, "balance is 20, needed 50")
```

`object of ValueError` makes it a kind of `ValueError`, so `except ValueError` still catches it, while `except InsufficientFunds` catches only this one.

**Situation: something must happen, error or not.** Add `finally`:

```nim
try:
  processOrder()
except IOError:
  echo "could not save"
finally:
  echo "closing the session"    # always runs
```

**Errors versus defects.** Nim separates two families:

| Family | Examples | Meaning | Catch it? |
| --- | --- | --- | --- |
| `CatchableError` | `ValueError`, `IOError`, `KeyError` | things that go wrong in normal operation | yes |
| `Defect` | `IndexDefect`, `OverflowDefect`, `NilAccessDefect` | bugs in the program | no: fix the code |

A bare `except:` catches `CatchableError`s. Defects mean the program is wrong, and pretending otherwise just hides the bug.

```compare python
try:
    age = int(text)
except ValueError as e:
    print("Failed:", e)
```

```compare javascript
try {
  JSON.parse(text);
} catch (e) {
  console.log("Failed:", e.message);
}
```

```compare rust
// Rust returns Result instead of raising:
match text.parse::<i32>() { Ok(n) => n, Err(e) => { println!("Failed: {e}"); -1 } }
```

```exercise
goal: "Wrap the parse in `try`, and add an `except ValueError:` branch that echoes `\"invalid\"`."
code: |-
  import std/strutils

  let text = "abc"
  echo parseInt(text)
checks:
  - match: 'try\s*:\s*\n\s+echo\s+parseInt\(\s*text\s*\)'
    message: Put the echo parseInt(text) line inside a try block.
  - match: 'except\s+ValueError\s*:\s*\n\s+echo\s+"invalid"'
    message: 'Add except ValueError: with echo "invalid"'
solution: |-
  import std/strutils

  let text = "abc"
  try:
    echo parseInt(text)
  except ValueError:
    echo "invalid"
```

```quiz
question: "`xs[2]` on a two-item seq raises an IndexDefect. Should you catch it?"
options:
  - Yes, with except IndexDefect.
  - No; a defect means a bug, so fix the index instead.
  - Yes, a bare except catches it automatically.
answer: 1
explain: Defects signal programming errors. Fix the code rather than catch them.
```
