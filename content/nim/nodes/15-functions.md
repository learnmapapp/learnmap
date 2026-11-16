---
title: Side-effect-free functions
icon: "✨"
branch: functions
requires: [procedures]
summary: func is a proc that promises no side effects, and the compiler holds it to that.
---
**Recipe: a function the compiler guarantees is pure.**

*You'll need:* a calculation that only depends on its inputs.

**Step 1.** Write it with `func` instead of `proc`:

```nim title=pricing.nim
func discounted(price: float, percent: float): float =
  price * (1 - percent / 100)

echo discounted(80.0, 25.0)   # 60.0
```

`func` is exactly a `proc`, plus a promise: **no side effects**. It doesn't print, doesn't read or write files, doesn't touch global variables. Given the same arguments, it always returns the same result.

**Step 2.** Let the compiler check the promise. Sneak in a side effect:

```nim
var callCount = 0

func discounted(price: float, percent: float): float =
  callCount += 1      # Error: 'discounted' can have side effects
  echo "debug"        # (this would be an error too)
  price * (1 - percent / 100)
```

The compiler tracks this through calls as well: a `func` can only call procs that are themselves free of side effects.

**Step 3.** Enjoy the benefits:

- **Easy to test.** Inputs in, output out, nothing to set up or clean up.
- **Easy to read.** Seeing `func` tells you the whole story is in the signature and body.
- **Safe to move.** Calling it twice, or not at all, can't change anything else in the program.

**Tips from the kitchen:**

- *Printing while debugging?* Wrap the line in `debugEcho`, which is allowed inside a `func` for exactly this reason.
- *Changing a parameter?* A `var` parameter is allowed. Changing what the caller passed in is visible in the signature, so it doesn't count as hidden.
- *Not sure yet?* Start with `func`. If the compiler objects, that's useful information: either the side effect is a mistake, or the routine really belongs in a `proc`.

A good program shape: lots of small `func`s for the logic, and a few `proc`s at the edges for input and output.

```compare python
def discounted(price, percent):   # purity is a convention, not checked
    return price * (1 - percent / 100)
```

```compare javascript
const discounted = (price, percent) => price * (1 - percent / 100);
```

```compare rust
// Rust has no pure keyword; const fn is the closest, and stricter.
fn discounted(price: f64, percent: f64) -> f64 { price * (1.0 - percent / 100.0) }
```

```exercise
goal: "`area` has a stray `echo`, so it can't be a func. Remove the echo line, and change `proc` to `func`."
code: |-
  proc area(w, h: float): float =
    echo "calculating"
    w * h
checks:
  - match: '^func\s+area'
    message: Declare area with func.
  - notMatch: 'echo'
    message: Remove the echo line; a func can't print.
solution: |-
  func area(w, h: float): float =
    w * h
```

```quiz
question: "Which of these can a `func` do?"
options:
  - Print a line with echo.
  - Increase a global counter.
  - Call another func and return its result.
answer: 2
explain: Calling side-effect-free routines is fine. Printing and changing globals are side effects.
```
