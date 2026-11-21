---
title: IO and main
icon: "🖥️"
branch: programs
requires: [strings, definitions]
summary: Programs that print, read and talk to the world.
---
Everything so far has been **pure**: functions that compute a result from their inputs, and nothing else. Real programs also print text, read files and ask for input. In Lean, those actions have the type `IO`.

```lean title=Main.lean
def main : IO Unit :=
  IO.println "Hello from Lean!"
```

```repl shell
> lean --run Main.lean
Hello from Lean!
```

`IO Unit` means "an action that, when run, interacts with the world and produces `Unit`". `Unit` is the type with exactly one value, `()`, used when there's nothing interesting to return. It's like `void`.

`main` is where a program starts. Lean runs that action.

## Actions are values

Here's a subtle point. `IO.println "hi"` doesn't print anything when it's **defined**; it's a description of printing. It prints when it's **run**, as part of `main`:

```lean
def greeting : IO Unit := IO.println "hi"
-- nothing is printed yet

#eval greeting  -- #eval runs the action: prints hi
```

That's how Lean keeps pure functions pure. A function returning `Nat` can't print: its type would have to be `IO Nat`.

## Doing several things

To run several actions in a row, use `do`:

```lean
def main : IO Unit := do
  IO.println "Starting..."
  IO.println s!"2 + 2 = {2 + 2}"
  IO.println "Done."
```

`do` blocks are the subject of the [next lesson](node:do-notation).

## Command-line arguments

`main` can also take the arguments the program was started with, and return an exit code:

```lean
def main (args : List String) : IO UInt32 := do
  IO.println s!"You gave {args.length} arguments"
  return 0
```

```compare python
def main():
    print("Hello from Python!")
```

```compare typescript
console.log("Hello from TypeScript!");
```

```compare kotlin
fun main() = println("Hello from Kotlin!")
```

```compare rust
fn main() { println!("Hello from Rust!"); }
```

```exercise
goal: "Fill in `main` so it prints `Hi, Lean!` with `IO.println`."
code: |
  def main : IO Unit :=
    sorry
checks:
  - notMatch: 'sorry'
    message: "Replace sorry."
  - match: 'IO\.println\s+"Hi, Lean!"'
    message: "Write IO.println \"Hi, Lean!\""
solution: |
  def main : IO Unit :=
    IO.println "Hi, Lean!"
```

```quiz
question: "What is the type of an action that reads a line of text?"
options:
  - "`String`"
  - "`IO String`"
  - "`IO Unit`"
answer: 1
explain: "It interacts with the world, so it's in IO, and its result is a String."
```
