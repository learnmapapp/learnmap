---
title: Theorems and rfl
icon: "📜"
branch: proofs
requires: [propositions]
summary: State a fact, prove it, and let Lean check it.
---
A [[theorem]] is a definition whose type is a proposition. You write `theorem`, a name, the statement after the colon, and the proof after `:=`:

```lean title=Theorems.lean
theorem two_plus_two : 2 + 2 = 4 := rfl

def double (n : Nat) : Nat := n + n

theorem double_three : double 3 = 6 := rfl

theorem list_length : [10, 20, 30].length = 3 := rfl
```

All of these are proved by `rfl`: Lean evaluates both sides and finds they're the same.

A false statement is rejected:

```lean
theorem oops : double 3 = 7 := rfl
-- error: Not a definitional equality: the left-hand side
--   double 3
-- is not definitionally equal to the right-hand side
--   7
```

## With parameters

Theorems can take parameters, just like functions. This one is about **every** `n`:

```lean
theorem add_zero (n : Nat) : n + 0 = n := rfl
```

Why does `rfl` work here, even though `n` is unknown? Because of how `+` is defined on `Nat`: `n + 0` is *defined* to be `n`. Lean can see that without knowing `n`.

But `0 + n = n` is **not** true by definition, even though it's true:

```lean
theorem zero_add (n : Nat) : 0 + n = n := rfl  -- error
```

Proving that needs [induction](node:induction). Not everything true is `rfl`.

## example

`example` is a theorem without a name, handy for trying things:

```lean
example : 10 * 10 = 100 := rfl
```

## sorry

`sorry` is a placeholder that "proves" anything. Lean accepts it, with a warning. It's useful to sketch a proof and fill in the gaps later:

```lean
theorem later (n : Nat) : 0 + n = n := sorry
-- warning: declaration uses 'sorry'
```

```compare python
assert double(3) == 6   # one example, at runtime
```

```compare typescript
expect(double(3)).toBe(6);  // a test, not a proof
```

```compare kotlin
assertEquals(6, double(3))
```

```compare rust
#[test] fn double_three() { assert_eq!(double(3), 6); }
```

```exercise
goal: "Replace `sorry` with a real proof: `rfl`."
code: |
  def square (n : Nat) : Nat := n * n

  theorem square_five : square 5 = 25 := sorry
checks:
  - notMatch: 'sorry'
    message: "Remove sorry."
  - match: 'theorem\s+square_five\s*:\s*square\s+5\s*=\s*25\s*:=\s*rfl'
    message: "Prove it with := rfl"
solution: |
  def square (n : Nat) : Nat := n * n

  theorem square_five : square 5 = 25 := rfl
```

```quiz
question: "What happens with `theorem t : 1 + 1 = 3 := rfl`?"
options:
  - "Lean accepts it with a warning."
  - "Lean rejects it, because the two sides aren't equal."
  - "Lean proves 1 + 1 = 2 instead."
answer: 1
explain: "rfl only proves things that are equal by computation, and 2 is not 3."
```
