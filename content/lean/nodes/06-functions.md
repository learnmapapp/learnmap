---
title: Functions
icon: "🔧"
branch: basics
requires: [basic-types]
summary: Function types, arrows, and how Lean infers argument types.
---
You've already written functions with `def`. Let's look at their **types**. Ask Lean:

```lean title=Functions.lean
def add (a : Nat) (b : Nat) : Nat := a + b

#check add       -- add (a b : Nat) : Nat
#check @add      -- @add : Nat → Nat → Nat
#check add 1     -- add 1 : Nat → Nat
```

`Nat → Nat` is the type of a function that takes a `Nat` and returns a `Nat`. You can type `→` as `\to` in the editor, or write `->` instead.

`Nat → Nat → Nat` takes two `Nat`s and returns a `Nat`. (Why it's written with two arrows, and why `add 1` is allowed, is the topic of [currying](node:currying).)

## Shorter parameter lists

Parameters with the same type can share brackets:

```lean
def area (width height : Float) : Float :=
  width * height

#eval area 2.5 4.0  -- 10.000000
```

## Functions as arguments

A function can take another function. The parameter's type is a function type:

```lean
def twice (f : Nat → Nat) (x : Nat) : Nat :=
  f (f x)

def addThree (n : Nat) : Nat := n + 3

#eval twice addThree 10  -- 16
```

Functions that take or return other functions are called **higher-order** functions. They're everyday tools in functional languages.

## Long definitions

Put the body on the next line, indented, when it gets long:

```lean
def describe (name : String) (score : Nat) : String :=
  name ++ " scored " ++ toString score ++ " points"

#eval describe "Ada" 42  -- "Ada scored 42 points"
```

```compare python
def twice(f, x):
    return f(f(x))
```

```compare typescript
const twice = (f: (n: number) => number, x: number) => f(f(x));
```

```compare kotlin
fun twice(f: (Int) -> Int, x: Int) = f(f(x))
```

```compare rust
fn twice(f: impl Fn(u32) -> u32, x: u32) -> u32 { f(f(x)) }
```

```exercise
goal: "Complete the type of `applyTo5`: its parameter `f` is a function from `Nat` to `Nat`."
code: |
  def applyTo5 (f : ???) : Nat := f 5
checks:
  - match: '\(\s*f\s*:\s*Nat\s*(→|->)\s*Nat\s*\)'
    message: "Write (f : Nat → Nat)"
solution: |
  def applyTo5 (f : Nat → Nat) : Nat := f 5
```

```quiz
question: "What is the type of `fun (s : String) => s.length`?"
options:
  - "`String`"
  - "`String → Nat`"
  - "`Nat → String`"
answer: 1
explain: "It takes a String and returns its length, a Nat."
```
