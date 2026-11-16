---
title: Meet Nim
icon: "👑"
branch: core
requires: []
summary: What Nim is, how to compile and run your first program, and what makes it different.
kind: hub
---
Nim is a compiled language that reads like Python. You write indented, uncluttered code; the Nim compiler turns it into C, and then into a small native executable. The result starts instantly, runs about as fast as C, and needs no runtime or virtual machine installed on the machine that runs it.

This course uses **Nim 2.2**. To follow along on your own machine, install it from [nim-lang.org](https://nim-lang.org/install.html) (or with `choosenim`), and check that `nim --version` works.

Create a file called `hello.nim`:

```nim title=hello.nim
let name = "Nim"
echo "Hello, ", name, "!"
```

Then compile and run it from the same folder:

```repl shell
> nim c -r hello.nim
Hello, Nim!
```

**What that command means:** `c` compiles the file (through C, hence the letter), and `-r` runs the program right after. The compiler also prints some progress lines, and it leaves an executable called `hello` next to your source file. Run `./hello` again any time, without compiling. `nim r hello.nim` is a shorter way to say "compile and run".

**Three first impressions:**

1. **No `main` function.** Top-level code runs from top to bottom, like a Python script.
2. **`echo`** prints its arguments, all joined together, followed by a newline. Note there's no space between them: that's why the example writes `"Hello, "` with a space inside.
3. **Types are inferred, but checked.** `name` is a `string`, and the compiler knows it. Try `name + 1` and the program won't compile.

**How this course works.** Each lesson has a short explanation, an exercise you solve in the browser (the page checks your code as you type), and a quick question. The map shows which lessons build on which; start with the foundations, or pick a goal and follow its route.

```compare python
name = "Python"
print("Hello,", name + "!")
```

```compare rust
fn main() {
    let name = "Rust";
    println!("Hello, {name}!");
}
```

```exercise
goal: "The greeting is missing its space: it prints `Hello,Nim!`. Add a space inside the first string."
code: |-
  let name = "Nim"
  echo "Hello,", name, "!"
checks:
  - match: 'echo\s+"Hello, ",\s*name,\s*"!"'
    message: 'Change "Hello," to "Hello, " (with a space at the end).'
solution: |-
  let name = "Nim"
  echo "Hello, ", name, "!"
```

```quiz
question: "What does `nim c -r hello.nim` do?"
options:
  - Starts an interactive Nim shell.
  - Compiles hello.nim to an executable, then runs it.
  - Checks the code for errors without compiling.
answer: 1
explain: c compiles the program; -r runs the result straight away.
```
