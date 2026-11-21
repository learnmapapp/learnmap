---
title: Mathlib
icon: "📚"
branch: tools
requires: [lake, simp]
summary: The huge library of mathematics, and its power tactics.
---
[[Mathlib]] is Lean's community library of mathematics: real numbers, algebra, analysis, topology, and hundreds of thousands of theorems. It also adds powerful tactics.

Start a project with Mathlib:

```repl shell
> lake new mymath math
> cd mymath
> lake exe cache get
Downloading Mathlib build files...
> lake build
```

The `math` template adds Mathlib as a dependency. `lake exe cache get` downloads pre-built files; without it, building Mathlib yourself takes hours.

Then import it at the top of a file:

```lean title=Mymath/Basic.lean
import Mathlib

example (a b : ℝ) : (a + b) ^ 2 = a ^ 2 + 2 * a * b + b ^ 2 := by
  ring

example (x y : ℝ) (h1 : x < 3) (h2 : y ≤ 2) : x + y < 5 := by
  linarith

example : (2 : ℝ) ^ 10 = 1024 := by
  norm_num
```

`ℝ` (typed `\R`) is the real numbers, and `ℕ`, `ℤ`, `ℚ` are the naturals, integers and rationals.

## The power tactics

| Tactic | Proves |
| --- | --- |
| `ring` | identities in commutative rings, like `(a + b)^2 = ...` |
| `linarith` | linear inequalities from hypotheses |
| `nlinarith` | some non-linear inequalities |
| `norm_num` | numeric facts, like `2^10 = 1024` or `7` is prime |
| `positivity` | goals like `0 < x^2 + 1` |
| `field_simp` | clears denominators |
| `exact?` | searches Mathlib for a matching theorem |

## Finding things

Mathlib is enormous, so searching is a skill. Its names follow strict conventions (`mul_comm`, `add_pos`, `Nat.Prime.two_le`), the [documentation](https://leanprover-community.github.io/mathlib4_docs/) is searchable, and `exact?` often finds what you need. The [Lean Zulip](https://leanprover.zulipchat.com) is a friendly place to ask.

```tip
Mathematics in Lean (a free online book) is the best next step for doing maths with Mathlib.
```

```compare python
import sympy   # computes answers; Mathlib proves them
```

```compare typescript
// no equivalent
```

```compare kotlin
// no equivalent
```

```compare rust
// no equivalent
```

```exercise
goal: "Polynomial identities are what `ring` is for. Replace `sorry` with `ring`."
code: |
  import Mathlib

  example (x : ℝ) : (x + 1) * (x - 1) = x ^ 2 - 1 := by
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: '^\s*ring\s*$'
    message: "Use ring."
solution: |
  import Mathlib

  example (x : ℝ) : (x + 1) * (x - 1) = x ^ 2 - 1 := by
    ring
```

```quiz
question: "What does `lake exe cache get` do in a Mathlib project?"
options:
  - "Downloads pre-built Mathlib files, so you don't compile it yourself."
  - "Clears the build cache."
  - "Installs Lean."
answer: 0
explain: "Building Mathlib from source takes a long time; the cache gives you ready-made build files."
```
