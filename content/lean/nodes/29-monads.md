---
title: Monads
icon: "🌀"
branch: programs
requires: [except]
summary: The common idea behind IO, Option, Except and do.
---
You've used `do` with three different types: `IO`, `Except` and `Id`. It works with `Option` too:

```lean title=Monads.lean
def addStrings (a b : String) : Option Nat := do
  let x ← a.toNat?
  let y ← b.toNat?
  return x + y

#eval addStrings "2" "40"  -- some 42
#eval addStrings "2" "oops" -- none
```

For `Option`, `←` means "if this is `none`, stop with `none`; otherwise unwrap it".

What these types share is that they're [[monad|monads]]. That's a scary-sounding word for a simple idea: a type `m` is a monad if it has two operations.

- `pure x` wraps a plain value: `some x`, `.ok x`, or an action that just returns `x`. (`return x` in a `do` block is `pure x`.)
- `bind` chains two steps: run the first, and feed its result into the second. **How** that happens is up to the monad. That's what `←` uses.

| Monad | What bind does between steps |
| --- | --- |
| `Option` | stops at the first `none` |
| `Except ε` | stops at the first error |
| `IO` | runs the actions in order, against the real world |
| `Id` | nothing special; plain values |
| `StateM σ` | passes a piece of state along |

## Without do

`do` is just a nicer syntax for `bind`, which is written `>>=`:

```lean
def addStrings' (a b : String) : Option Nat :=
  a.toNat? >>= fun x =>
  b.toNat? >>= fun y =>
  pure (x + y)
```

You'll almost always use `do`, but it helps to know there's no magic underneath.

## Writing code for any monad

Since `Monad` is a type class, you can write functions that work in **any** monad:

```lean
def twice [Monad m] (action : m Nat) : m Nat := do
  let a ← action
  let b ← action
  return a + b
```

```tip
You don't need to understand monads deeply to use them. If a type works with do, use do.
```

```compare typescript
// Promise is monad-like: then() is bind, Promise.resolve is pure
const r = await fetchA().then((a) => fetchB(a));
```

```compare kotlin
val sum = a?.toIntOrNull()?.let { x -> b?.toIntOrNull()?.let { y -> x + y } }
```

```compare rust
fn add(a: &str, b: &str) -> Option<u32> { Some(a.parse().ok()? + b.parse::<u32>().ok()?) }
```

```compare python
# no built-in equivalent; you'd check for None after each step
```

```exercise
goal: "Use `do` with `Option`: get both values with `←` and return their product."
code: |
  def mulFirst (xs ys : List Nat) : Option Nat :=
    match xs.head?, ys.head? with
    | some x, some y => some (x * y)
    | _, _ => none
checks:
  - match: 'Option\s+Nat\s*:=\s*do'
    message: "Start the body with do."
  - match: 'let\s+x\s*(←|<-)\s*xs\.head\?'
    message: "Write let x ← xs.head?"
  - match: 'let\s+y\s*(←|<-)\s*ys\.head\?'
    message: "Write let y ← ys.head?"
  - match: 'return\s+x\s*\*\s*y'
    message: "Finish with return x * y"
solution: |
  def mulFirst (xs ys : List Nat) : Option Nat := do
    let x ← xs.head?
    let y ← ys.head?
    return x * y
```

```quiz
question: "In an `Option` do block, what does `let x ← none` do?"
options:
  - "Sets x to 0."
  - "Stops the block, which returns none."
  - "It's a type error."
answer: 1
explain: "Option's bind stops at the first none, so the whole block evaluates to none."
```
