---
title: Arrays
icon: "🧮"
branch: data
requires: [lists]
summary: Fast indexed collections, and safe ways to index them.
---
A `List` is great for recursion, but reaching item 1000 means walking past 999 others. An `Array` stores items side by side, so indexing is instant. Array literals start with `#`:

```lean title=Arrays.lean
def scores : Array Nat := #[90, 72, 85]

#eval scores.size        -- 3
#eval scores.push 60     -- #[90, 72, 85, 60]
#eval scores.map (· + 5) -- #[95, 77, 90]
#eval scores.toList      -- [90, 72, 85]
#eval [1, 2].toArray     -- #[1, 2]
```

## Indexing safely

Reading `scores[5]` makes no sense for a 3-item array, and Lean cares about that. There are three ways to index:

```lean
#eval scores[0]!   -- 90: crashes (panics) if out of range
#eval scores[5]?   -- none: an Option
#eval scores[1]?   -- some 72
```

And plain `scores[i]`, which needs a **proof** that `i` is in range. For a literal, Lean proves that itself:

```lean
#eval scores[1]    -- 72: Lean checks 1 < 3 on its own

def get (xs : Array Nat) (i : Nat) : Nat :=
  xs[i]            -- error: failed to prove index is valid
```

With an `if`, Lean can use the condition as the proof:

```lean
def getOr (xs : Array Nat) (i : Nat) : Nat :=
  if h : i < xs.size then xs[i] else 0
```

`if h : ...` names the fact `i < xs.size` as `h`, and Lean uses it to accept `xs[i]`. This is your first taste of how programs and proofs mix.

## Changing arrays

Arrays are values too, so `push` and `set!` return a new array. But when nothing else uses the old array, Lean updates it **in place** behind the scenes, so it's as fast as in an imperative language.

```compare python
scores = [90, 72, 85]
scores[5]   # IndexError at runtime
```

```compare typescript
const scores = [90, 72, 85];
scores[5];  // undefined
```

```compare kotlin
scores.getOrNull(5)  // null
```

```compare rust
scores.get(5)  // None
```

```exercise
goal: "Read the item safely: use `xs[i]?` and `.getD 0` instead of `xs[i]!`."
code: |
  def getAt (xs : Array Nat) (i : Nat) : Nat :=
    xs[i]!
checks:
  - match: 'xs\[\s*i\s*\]\?\.getD\s+0|\(xs\[\s*i\s*\]\?\)\.getD\s+0'
    message: "Write xs[i]?.getD 0"
solution: |
  def getAt (xs : Array Nat) (i : Nat) : Nat :=
    xs[i]?.getD 0
```

```quiz
question: "What does `#[1, 2, 3][7]?` return?"
options:
  - "A crash."
  - "`none`"
  - "`0`"
answer: 1
explain: "The ? version returns an Option, which is none when the index is out of range."
```
