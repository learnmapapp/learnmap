---
title: Inspect syntax trees
icon: "🌳"
branch: design
requires: [templates]
summary: Macros receive your code as a tree, and return a new tree for the compiler to use.
---
**A field trip inside the compiler.** Before Nim compiles anything, it turns your source into a tree. You can look at that tree yourself:

```nim title=peek.nim
import std/macros

dumpTree:
  echo "total: ", price * 2
```

```repl shell
> nim c peek.nim
StmtList
  Command
    Ident "echo"
    StrLit "total: "
    Infix
      Ident "*"
      Ident "price"
      IntLit 2
```

`dumpTree` prints the tree while compiling (and the program itself does nothing). Read it from top to bottom: a list of statements, containing one command, `echo`, with two arguments: a string literal, and an infix operation `*` on the name `price` and the number `2`. Every piece of Nim code has a shape like this, built from nodes such as `Ident`, `StrLit`, `Infix` and `Call`.

**A [[macro]] is a proc that works on these trees.** It runs inside the compiler, receives the code you pass it as a `NimNode`, and returns a new `NimNode`, which the compiler then compiles in its place.

Here's one that prints an expression *and* its value, which is handy for debugging:

```nim title=show.nim
import std/macros

macro show(e: untyped): untyped =
  let label = e.repr & " = "          # the source text of the expression
  result = quote do:
    echo `label`, `e`

let price = 4
show(price * 2)          # price * 2 = 8
show(price > 3)          # price > 3 = true
```

Step by step:

1. `e.repr` turns the tree back into source text: `"price * 2"`.
2. `quote do:` writes the output tree as ordinary-looking code.
3. Inside it, backticks splice in values from the macro: `` `label` `` becomes the string, `` `e` `` the original expression.

A [template](node:templates) couldn't do this: it can paste `e`, but it can't turn `e` into the text `"price * 2"`.

**The honest advice:** macros are powerful, and the standard library and popular packages use them for things like JSON mapping, test frameworks and HTML DSLs. In your own code, reach for them last: a proc first, then a generic, then a template. When nothing else can express it, a macro can, and `dumpTree` is how you figure out the tree you need to build.

```compare python
import ast
print(ast.dump(ast.parse('print("total: ", price * 2)')))   # runtime only
```

```compare javascript
// No macros; Babel plugins rewrite syntax trees at build time.
```

```compare rust
// Procedural macros receive a TokenStream and return a new one.
```

```exercise
goal: "Look at the tree of an `if` statement: wrap the two lines in a `dumpTree:` block (and indent them)."
code: |-
  import std/macros

  if x > 0:
    echo "positive"
checks:
  - match: 'dumpTree\s*:\s*\n\s+if\s+x\s*>\s*0\s*:\s*\n\s+echo'
    message: 'Add dumpTree: above the if, and indent the if and echo lines under it.'
solution: |-
  import std/macros

  dumpTree:
    if x > 0:
      echo "positive"
```

```quiz
question: "What does a macro receive and return?"
options:
  - Strings of source code.
  - Syntax trees (NimNode), at compile time.
  - Values, at runtime.
answer: 1
explain: A macro transforms code as a tree while compiling; the result is then compiled normally.
```
