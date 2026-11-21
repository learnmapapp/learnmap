---
title: Anonymous functions
icon: "λ"
branch: basics
requires: [functions]
summary: Write functions inline with fun and the · shorthand.
---
You don't always need `def` to make a function. `fun` creates one on the spot:

```lean title=Lambdas.lean
#eval (fun x => x * 10) 4   -- 40

#eval [1, 2, 3].map (fun x => x * 10)        -- [10, 20, 30]
#eval [1, 2, 3, 4].filter (fun x => x % 2 == 0) -- [2, 4]
```

`fun x => x * 10` reads "the function that takes `x` and returns `x * 10`". These are also called **lambdas**, after the λ in maths. Lean even accepts `λ x => ...`.

You can give the parameter a type when Lean can't work it out:

```lean
def addTax := fun (price : Float) => price * 1.21
```

## The · shorthand

For short functions there's an even shorter form. A `·` (a middle dot, typed `\.`) inside brackets stands for the argument:

```lean
#eval [1, 2, 3].map (· * 10)          -- [10, 20, 30]
#eval [1, 2, 3, 4].filter (· > 2)     -- [3, 4]
#eval ["a", "bb"].map (·.length)      -- [1, 2]
```

`(· * 10)` means exactly `fun x => x * 10`.

## Several parameters

```lean
#eval (fun a b => a + b) 3 4                  -- 7
#eval [3, 1, 2].foldl (fun acc x => acc + x) 0 -- 6
```

With several dots, each `·` is the next argument: `(· + ·)` is `fun a b => a + b`.

```compare python
list(map(lambda x: x * 10, [1, 2, 3]))
```

```compare typescript
[1, 2, 3].map((x) => x * 10);
```

```compare kotlin
listOf(1, 2, 3).map { it * 10 }
```

```compare rust
vec![1, 2, 3].iter().map(|x| x * 10)
```

```exercise
goal: "Rewrite the lambda with the `·` shorthand: `(· + 1)`."
code: |
  #eval [5, 6, 7].map (fun n => n + 1)
checks:
  - match: '\.map\s*\(\s*·\s*\+\s*1\s*\)'
    message: "Write .map (· + 1)"
solution: |
  #eval [5, 6, 7].map (· + 1)
```

```quiz
question: "Which function does `(· * 2)` stand for?"
options:
  - "`fun x => x * 2`"
  - "`fun x => 2`"
  - "It multiplies a list by 2."
answer: 0
explain: "The dot is a placeholder for the function's argument."
```
