---
title: Code templates
icon: "📋"
branch: design
requires: [procedures]
summary: Templates paste code at the call site, which lets them do things a proc can't.
---
**Think of a rubber stamp.** A proc is a phone call: the program jumps to it, runs it, and comes back. A template is a stamp: the compiler presses its code into your source wherever you call it, with your arguments filled in. Nothing is called at runtime.

```nim title=stamp.nim
template twice(action: untyped) =
  action
  action

twice:
  echo "hip hip"
echo "hooray"
```

After the compiler stamps it in, the code is simply:

```nim
echo "hip hip"
echo "hip hip"
echo "hooray"
```

`untyped` means "any piece of code, not checked yet". The block after `twice:` is passed as the last argument.

**Something a proc can't do: skip evaluating an argument.** A proc always evaluates its arguments before it runs. A template inserts them as code, so they run only where they appear:

```nim
var debugMode = false

proc expensiveReport(): string =
  echo "(building report...)"
  "42 users online"

template debugLog(msg: string) =
  if debugMode:
    echo msg

debugLog(expensiveReport())   # prints nothing, and never builds the report
```

Had `debugLog` been a proc, `expensiveReport()` would run on every call, only for the result to be thrown away. As a template, the call is stamped inside the `if`, so it's skipped entirely.

**Another: wrapping a block of code.** A [[template]] can put code before and after your block:

```nim
import std/[algorithm, monotimes, times]

template timed(label: string, body: untyped) =
  let start = getMonoTime()
  body
  echo label, " took ", getMonoTime() - start

timed("sorting"):
  var xs = @[5, 3, 9, 1]
  xs.sort()
```

This is how libraries offer friendly block syntax.

**Hygiene.** The `start` variable inside `timed` won't clash with a `start` of your own. Names a template declares are private to each stamp, unless you ask otherwise.

**When to choose a template over a proc:** only when you need one of those powers (lazy arguments, wrapping code, or zero call overhead in a hot spot). Otherwise a proc is easier to debug and gives clearer errors.

```compare python
# No equivalent; decorators and context managers cover some uses.
```

```compare javascript
// No equivalent; pass a function to delay evaluation: debugLog(() => report())
```

```compare rust
macro_rules! twice {
    ($e:expr) => { $e; $e; };
}
```

```exercise
goal: "Make `unless` work: it should run `body` only when `cond` is false. Write `if not cond:` and indent `body` under it."
code: |-
  template unless(cond: bool, body: untyped) =
    body

  unless 2 > 3:
    echo "maths still works"
checks:
  - match: 'template\s+unless[^\n]*=\s*\n\s+if\s+not\s+cond\s*:\s*\n\s+body'
    message: 'The template body should be: if not cond: body'
solution: |-
  template unless(cond: bool, body: untyped) =
    if not cond:
      body

  unless 2 > 3:
    echo "maths still works"
```

```quiz
question: "`log(compute())`: when is `compute()` NOT called if `log` is a template that only uses its argument inside an if?"
options:
  - Never; arguments are always evaluated first.
  - When the if condition is false, because the argument is pasted inside the if.
  - Only in release builds.
answer: 1
explain: Templates insert their arguments as code, so they run only where they appear.
```
