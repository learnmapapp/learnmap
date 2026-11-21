---
title: Do notation
icon: "📝"
branch: programs
requires: [io-main]
summary: Run steps in order, and get results out with ←.
---
A `do` block runs actions one after another, like a list of instructions:

```lean title=Main.lean
def main : IO Unit := do
  let stdin ← IO.getStdin
  IO.print "What's your name? "
  let name ← stdin.getLine
  let name := name.trimAscii.toString
  IO.println s!"Nice to meet you, {name}!"
```

```repl shell
> lean --run Main.lean
What's your name? Ada
Nice to meet you, Ada!
```

## ← versus :=

There are two kinds of `let` in a `do` block:

- `let x ← action` **runs** an action and names its result. `stdin.getLine` has type `IO String`; after `←`, `name` is a plain `String`.
- `let x := value` just names a value, like everywhere else.

Type `←` as `\l`, or write `<-`.

Mixing them up gives a type error:

```lean
let name := stdin.getLine   -- name is an action (IO String), not a String
IO.println s!"Hi {name}"    -- error
```

## Calling pure functions

Inside `do`, ordinary pure functions are used as usual. Keeping most logic pure, and only the outer layer in `IO`, makes code easier to test and to prove things about:

```lean
def shout (s : String) : String := s.toUpper ++ "!"

def main : IO Unit := do
  let line ← (← IO.getStdin).getLine
  IO.println (shout line.trimAscii.toString)
```

`(← action)` runs an action in the middle of an expression. Handy for short steps.

## Conditions and return

`if` works in `do` blocks without needing an `else`, and `return` ends early:

```lean
def check (age : Nat) : IO Unit := do
  if age < 18 then
    IO.println "Sorry, adults only."
    return
  IO.println "Welcome!"
```

```compare python
name = input("What's your name? ").strip()
print(f"Nice to meet you, {name}!")
```

```compare typescript
const name = (await rl.question("What's your name? ")).trim();
```

```compare kotlin
val name = readln().trim()
```

```compare rust
let mut name = String::new();
io::stdin().read_line(&mut name)?;
```

```exercise
goal: "`getLine` is an action. Run it with `←` instead of `:=`."
code: |
  def main : IO Unit := do
    let stdin ← IO.getStdin
    let line := stdin.getLine
    IO.println line.trimAscii.toString
checks:
  - match: 'let\s+line\s*(←|<-)\s*stdin\.getLine'
    message: "Write let line ← stdin.getLine"
solution: |
  def main : IO Unit := do
    let stdin ← IO.getStdin
    let line ← stdin.getLine
    IO.println line.trimAscii.toString
```

```quiz
question: "`readName : IO String`. Inside a do block, what is `n` after `let n ← readName`?"
options:
  - "An IO String."
  - "A String."
  - "Unit."
answer: 1
explain: "The arrow runs the action and binds its result, which is a String."
```
