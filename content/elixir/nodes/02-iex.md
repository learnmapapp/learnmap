---
title: iex
icon: "⌨️"
branch: basics
requires: [elixir]
summary: The interactive shell, your playground.
---
Type `iex` in a terminal and you get [[iex|Interactive Elixir]], a prompt where you type an expression and see its value right away. Lines starting with `>` in this course are things you type there:

```repl
> 1 + 2
3
> "Elixir" <> " rocks"
"Elixir rocks"
> String.length("drop")
4
```

Strings join with `<>`, not `+`:

```repl
> "a" + "b"
error: ** (ArithmeticError) bad argument in arithmetic expression
```

Stuck? `h` shows the docs for anything:

```repl
> h String.upcase
def upcase(string, mode \\ :default)
Converts all characters in the given string to uppercase…
```

```compare python
"Python" + " rocks"
```

```compare javascript
"JS" + " rocks"
```

```compare java
"Java" + " rocks"
```

```compare kotlin
"Kotlin" + " rocks"
```

```compare go
"Go" + " rocks"
```

```exercise
goal: Join the strings correctly.
code: |
  "Hello, " + "Drop"
checks:
  - notMatch: '\+'
    message: + is for numbers only in Elixir.
  - match: '"Hello, "\s*<>\s*"Drop"'
    message: Use the <> operator.
output: '"Hello, Drop"'
```

## Handy IEx helpers

IEx has a few built-in helpers worth knowing by heart:

| Helper | Does |
| --- | --- |
| `h Enum.map` | show the docs for a function |
| `i "hi"` | show info about a value: type, protocols |
| `v()` | the last result (`v(2)` for line 2) |
| `c "file.ex"` | compile and load a file |
| `recompile()` | reload your Mix project's code |
| `t String` | show the types a module defines |

Press **Tab** to autocomplete module and function names: type `String.` and hit Tab to see everything in the String module.

Stuck in a half-written expression? Type `#iex:break` on its own line to start over.

Don't have Elixir yet? The [install page](https://elixir-lang.org/install.html) lists a package for every major OS; Erlang comes along with it. You won't need it for the exercises on this map, which run in your browser.

```quiz
question: Which IEx helper shows the documentation of a function?
options:
  - i
  - h
  - doc
answer: 1
explain: "`h` is for help: `h String.upcase` shows its docs and examples."
```
