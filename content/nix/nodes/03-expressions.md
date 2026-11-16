---
title: Expressions
icon: "🧮"
branch: language
requires: [language]
summary: In Nix, everything evaluates to a value.
---
In most languages you write **statements**: do this, then that. Nix only has **expressions**: things that evaluate to a [[value]].

The easiest way to see that is `nix repl`, Nix's interactive prompt. Type `nix repl` in a terminal, enter an expression, and it prints the value (`:q` quits):

```repl
> 1 + 2
3
> "Hello, " + "world"
"Hello, world"
> if 3 > 2 then "yes" else "no"
"yes"
```

Even `if` is an expression. It always produces a value, which is why it **must** have an `else`:

```repl
> if true then 1
error: syntax error, unexpected end of file, expecting 'else'
```

```compare python
"yes" if 3 > 2 else "no"
```

```compare javascript
3 > 2 ? "yes" : "no"
```

```compare java
3 > 2 ? "yes" : "no"
```

```compare kotlin
if (3 > 2) "yes" else "no"
```

```compare go
// Go has no conditional expression; you need a statement:
answer := "no"
if 3 > 2 { answer = "yes" }
```

```exercise
goal: Make this evaluate to `"big"`.
code: |
  if 10 > 50 then "big" else "small"
checks:
  - match: 'if\s+.+\s+then\s+"big"\s+else\s+"small"'
    message: Keep the if / then / else shape; change the condition.
  - notMatch: 'if\s+10\s*>\s*50'
    message: The condition is still false. Make it true.
output: '"big"'
hint: Flip the comparison, or change one of the numbers.
```

## Comments and evaluation

Comments use `#` for a line, or `/* … */` for a block:

```nix
{
  # The port the web server listens on
  port = 8080;
  /* temporarily disabled:
  tls = true; */
}
```

To evaluate a file from the terminal:

```shell
$ nix eval --file ./settings.nix port
8080
$ nix-instantiate --eval --strict settings.nix
{ port = 8080; }
```

Everything nests: anywhere a value can go, you can put any expression that produces one. A list element can be an `if`, an attribute value can be a function call, and so on.

```quiz
question: How do you write a single-line comment in Nix?
options:
  - "// like this"
  - "# like this"
  - "-- like this"
answer: 1
explain: "# starts a line comment; /* */ is for blocks."
```
