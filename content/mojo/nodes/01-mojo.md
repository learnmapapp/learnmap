---
title: Meet Mojo
icon: "🔥"
branch: core
requires: []
summary: What Mojo is, how to run your first program, and how it differs from Python.
kind: hub
---
Mojo looks like Python wearing a hard hat. The syntax is familiar (indentation, `def`, `for x in ...`), but every program is **compiled** to native machine code before it runs. You get Python's readability with speed in the same league as C, Rust and Zig, plus direct access to things Python hides, like memory ownership and the CPU's vector instructions.

It was created by Modular, originally to write fast AI code, and it runs Python libraries too. This course uses **Mojo 1.2**. To follow along on your own machine, install it in a `pixi` or `uv` environment as described at [mojolang.org](https://mojolang.org/install/), and check that `mojo --version` works.

Now create a file called `hello.mojo` with this content:

```mojo title=hello.mojo
def main():
    print("Hello, Mojo! 🔥")
```

And run it from the same folder:

```repl shell
> mojo run hello.mojo
Hello, Mojo! 🔥
```

(`mojo hello.mojo` works too.) Behind the scenes, `mojo run` compiles the file and runs the result in one go.

A first spot-the-difference with Python:

| | Python | Mojo |
| --- | --- | --- |
| Where the program starts | the top of the file | the `main` function |
| Code outside functions | runs immediately | only declarations (functions, structs, imports) |
| Types | optional hints | checked by the compiler |
| Mistakes like a wrong type | found when the line runs | found before the program starts |

That last row is the one you'll notice most. If you write `var n: Int = "five"`, nothing runs at all; the compiler stops with an error pointing at that line. It's a bit stricter up front, and in exchange whole categories of bugs never reach the running program.

**How this course works.** Every lesson has a short explanation, an exercise you solve right in the browser (it checks your code as you type), and a quick question. Pick a goal on the map, or work through the foundations first. Lessons build on each other, so the map shows you what to learn before what.

```compare python
# hello.py: no main needed
print("Hello, Python!")
```

```compare rust
fn main() {
    println!("Hello, Rust!");
}
```

```exercise
goal: "Make the program greet you. Mojo starts at `main`, so put the `print` inside it, indented."
code: |-
  def main():
  print("Hello, Mojo!")
checks:
  - match: '^def main\(\):\s*\n\s+print\('
    message: Indent the print line so it's inside main.
solution: |-
  def main():
      print("Hello, Mojo!")
```

```quiz
question: Where does a Mojo program start running?
options:
  - At the first line of the file.
  - In the main function.
  - In whichever function is defined first.
answer: 1
explain: Mojo is compiled, and execution begins in main. Top-level code can only declare things.
```
