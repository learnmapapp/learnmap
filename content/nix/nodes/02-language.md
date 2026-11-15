---
title: The language
icon: "🗣️"
kind: hub
branch: language
requires: [nix]
summary: A small, lazy, functional language for describing things.
---
Every Nix file is written in the Nix language. Don't worry: it's small. There are no classes, no loops and no variables that change. If you've written JSON, you've already seen half of it.

```nix
{
  name = "hello";
  version = "2.12.1";
  tags = [ "cli" "demo" ];
}
```

The other half is **functions**, which let you turn small descriptions into bigger ones.

Three things make it special:

- **Everything is an [[expression]].** A file doesn't *do* something, it *evaluates to* something.
- **It's pure.** The same code always gives the same result. No hidden state.
- **It's [[lazy]].** Nix only computes what is actually needed. That's how it can describe 100,000 packages without evaluating them all.

```quiz
question: What does a Nix file do when you evaluate it?
options:
  - It runs its statements from top to bottom.
  - It evaluates to a single value.
  - It installs packages immediately.
answer: 1
explain: A Nix file is one big expression, and the result is one value. Often an attribute set.
```

## What the language doesn't have

Nix leaves out a lot on purpose, and knowing that saves confusion:

- **No variables that change.** Names are bound once, with `let` or in sets.
- **No loops.** You transform lists with `map`, `filter` and friends.
- **No statements, no side effects.** Evaluating a file can't write files or install anything. Building is a separate step.
- **No classes or objects.** Attribute sets and functions do all the work.

What's left is small enough to learn in an afternoon: values, attribute sets, `let`, functions, `if`, `with`, `inherit` and `import`. The rest of this branch covers each one.

```quiz
question: How do you apply a change to every element of a list in Nix?
options:
  - With a for loop.
  - With map and a function.
  - By mutating the list in place.
answer: 1
explain: "There are no loops. map (x: …) list returns a new list."
```
