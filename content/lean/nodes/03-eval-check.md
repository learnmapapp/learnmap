---
title: "#eval and #check"
icon: "🔍"
branch: basics
requires: [setup]
summary: Ask Lean to compute a value, or to tell you its type.
---
Two commands will be your constant companions. Both start with `#`, which marks a command that asks Lean something instead of defining something.

**`#eval`** computes a value and shows the result:

```lean title=Scratch.lean
#eval 7 * 6              -- 42
#eval "Lean" ++ " 4"     -- "Lean 4"
#eval 10 / 3             -- 3
#eval (10 : Float) / 3   -- 3.333333
#eval [1, 2, 3].reverse  -- [3, 2, 1]
```

**`#check`** shows the **type** of an expression without running it:

```lean
#check 42           -- 42 : Nat
#check "hello"      -- "hello" : String
#check [1, 2, 3]    -- [1, 2, 3] : List Nat
#check String.length -- String.length (s : String) : Nat
```

The colon is read "has type". `42 : Nat` means "42 is a natural number".

## Natural numbers

Lean's default number type is `Nat`, the **natural numbers** 0, 1, 2, and so on. There are no negative `Nat`s, so subtraction stops at zero:

```lean
#eval 3 - 5            -- 0
#eval (3 - 5 : Int)    -- -2
```

Writing `(3 - 5 : Int)` tells Lean which type you mean. This **type ascription**, `(value : Type)`, is something you'll use often.

```warn
10 / 3 is 3 for natural numbers: division rounds down. Use Float for decimals.
```

```compare python
type(42)   # <class 'int'>
```

```compare typescript
typeof 42  // "number"
```

```compare kotlin
println(42::class)  // class kotlin.Int
```

```compare rust
let x: u32 = 42;   // like Lean's Nat, unsigned
```

```exercise
goal: "Ask Lean for the type of `\"abc\".length` with `#check`."
code: |
  #eval "abc".length
checks:
  - match: '^#check\s+"abc"\.length'
    message: "Write #check \"abc\".length"
solution: |
  #eval "abc".length
  #check "abc".length
```

```quiz
question: "What does `#eval 2 - 7` show?"
options:
  - "-5"
  - "0"
  - "An error."
answer: 1
explain: "Numbers default to Nat, which has no negatives, so subtraction stops at 0."
```
