---
title: Lists
icon: "📋"
branch: data
requires: [recursion]
summary: The classic functional list, built from [] and ::.
---
A `List` holds values of one type, in order:

```lean title=Lists.lean
def nums : List Nat := [3, 1, 4, 1, 5]

#eval nums.length          -- 5
#eval nums.head?           -- some 3
#eval nums.reverse         -- [5, 1, 4, 1, 3]
#eval nums ++ [9, 2]       -- [3, 1, 4, 1, 5, 9, 2]
#eval nums.map (· * 10)    -- [30, 10, 40, 10, 50]
#eval nums.filter (· > 2)  -- [3, 4, 5]
#eval nums.foldl (· + ·) 0 -- 14
#eval nums.contains 4      -- true
```

## How lists are built

`List` is an inductive type with two constructors:

- `[]`, the empty list (`List.nil`)
- `x :: xs`, an item `x` in front of a list `xs` (`List.cons`)

`[3, 1, 4]` is shorthand for `3 :: 1 :: 4 :: []`. Adding to the **front** with `::` is instant; the rest of the list is shared, not copied.

```lean
#eval 0 :: nums  -- [0, 3, 1, 4, 1, 5]
```

## Recursion over lists

Since a list is either empty or "item then rest", functions on lists usually have those two cases:

```lean
def total : List Nat → Nat
  | [] => 0
  | x :: xs => x + total xs

def countBig : List Nat → Nat
  | [] => 0
  | x :: xs => (if x > 10 then 1 else 0) + countBig xs

#eval total [1, 2, 3]          -- 6
#eval countBig [5, 20, 30, 1]  -- 2
```

This shape, a base case for `[]` and a recursive case for `x :: xs`, is something you'll write over and over. And later, prove things about.

```tip
Lists are perfect for building up results and recursion. For fast access by position, use an Array instead.
```

```compare python
nums = [3, 1, 4]
[x * 10 for x in nums]
```

```compare typescript
const nums = [3, 1, 4];
nums.map((x) => x * 10);
```

```compare kotlin
val nums = listOf(3, 1, 4)
nums.map { it * 10 }
```

```compare rust
let nums = vec![3, 1, 4];
nums.iter().map(|x| x * 10)
```

```exercise
goal: "Write `len`, which counts the items of a list: 0 for `[]`, and `1 + len xs` for `x :: xs`."
code: |
  def len : List Nat → Nat
    | [] => 0
checks:
  - match: '\|\s*_?x?\s*::\s*xs\s*=>\s*1\s*\+\s*len\s+xs'
    message: "Add | x :: xs => 1 + len xs"
solution: |
  def len : List Nat → Nat
    | [] => 0
    | x :: xs => 1 + len xs
```

```quiz
question: "What is `[1, 2, 3]` written with `::`?"
options:
  - "`1 :: 2 :: 3 :: []`"
  - "`[] :: 1 :: 2 :: 3`"
  - "`1 :: [2] :: [3]`"
answer: 0
explain: "Each item is put in front of the rest, ending with the empty list."
```
