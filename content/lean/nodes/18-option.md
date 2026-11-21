---
title: Option
icon: "🎁"
branch: data
requires: [inductive]
summary: A value that might be missing, with no null in sight.
---
Lean has no `null`. When a value might be missing, its type says so: `Option Nat` is either `some n` or `none`. Lean's library defines it like this (shown in a namespace, so it doesn't clash with the real one):

```lean
namespace Example

inductive Option (α : Type) where
  | none
  | some (value : α)

end Example
```

Functions that might not have an answer return an `Option`:

```lean title=Options.lean
#eval [5, 8, 2].head?         -- some 5
#eval ([] : List Nat).head?   -- none
#eval [5, 8, 2].find? (· > 6) -- some 8
#eval "42".toNat?             -- some 42
#eval "4x2".toNat?            -- none
```

The `?` at the end of a name is a convention: "this returns an Option".

## Using an Option

You can't use an `Option Nat` as a `Nat`. You have to handle both cases. A `match` does that:

```lean
def describe (input : String) : String :=
  match input.toNat? with
  | some n => s!"you typed the number {n}"
  | none => "that's not a number"

#eval describe "7"    -- "you typed the number 7"
#eval describe "abc"  -- "that's not a number"
```

For common cases there are helpers:

```lean
#eval ("12".toNat?).getD 0           -- 12: the value, or a default
#eval ("x".toNat?).getD 0            -- 0
#eval ("12".toNat?).map (· * 2)      -- some 24
#eval ("12".toNat?).isSome           -- true
```

There's also `xs[i]!` and `.get!`, which crash on a missing value. Prefer the safe versions.

```compare python
n = int(s) if s.isdigit() else None   # Optional[int]
```

```compare typescript
const n: number | undefined = map.get("key");
```

```compare kotlin
val n: Int? = s.toIntOrNull()
val value = n ?: 0
```

```compare rust
let n: Option<u32> = s.parse().ok();
let value = n.unwrap_or(0);
```

```exercise
goal: "Return the first item, or 0 if the list is empty, using `.head?` and `.getD 0`."
code: |
  def firstOrZero (xs : List Nat) : Nat :=
    xs.head
checks:
  - match: 'xs\.head\?\.getD\s+0|\(xs\.head\?\)\.getD\s+0'
    message: "Write xs.head?.getD 0"
solution: |
  def firstOrZero (xs : List Nat) : Nat :=
    xs.head?.getD 0
```

```quiz
question: "What type does `\"abc\".toNat?` have?"
options:
  - "`Nat`"
  - "`Option Nat`"
  - "`String`"
answer: 1
explain: "Parsing might fail, so the result is an Option Nat. Here it's none."
```
