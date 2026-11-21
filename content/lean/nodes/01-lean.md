---
title: Lean
icon: "📐"
kind: hub
branch: core
summary: A functional programming language that can also check proofs.
---
Lean is a programming language and a **proof assistant**. You can use it to write ordinary programs, and you can use the same language to state facts about those programs and prove them. Lean checks every step of a proof, so a proof that Lean accepts is correct.

It was started by Leonardo de Moura at Microsoft Research, and is now developed by the Lean FRO. Mathematicians use it to check research proofs, and engineers use it to verify software, such as parts of AWS's access-control system.

```lean title=Hello.lean
def greet (name : String) : String :=
  s!"Hello, {name}!"

#eval greet "Lean" -- "Hello, Lean!"

def double (n : Nat) : Nat := n * 2

theorem double_is_even (n : Nat) : double n % 2 = 0 := by
  unfold double
  omega
```

The first parts are normal functions. The last part is a **theorem**: a claim that `double` always returns an even number, for **every** `n`, followed by a proof that Lean checks.

## What makes Lean different

- **Functional.** Values don't change, and functions return results instead of modifying things. Data types are built from a few simple ideas.
- **A very strong type system.** Types can talk about values, like "a list of exactly 3 items". The same system expresses logical statements.
- **Interactive.** In your editor, Lean shows what it knows and what's left to prove after every line.

## This course

You'll start with programming (basics, data types and programs) and then move on to proofs and the tactics that make proving practical. You don't need any background in maths or logic. If you can read a little code, you're ready.

```tip
Lean files end in .lean. You'll mostly see .lean code here, plus a few shell commands for the tools.
```

```compare python
def greet(name: str) -> str:
    return f"Hello, {name}!"
# Python can test greet, but it can't prove a property for every input.
```

```compare typescript
function greet(name: string): string { return `Hello, ${name}!`; }
```

```compare kotlin
fun greet(name: String) = "Hello, $name!"
```

```compare rust
fn greet(name: &str) -> String { format!("Hello, {name}!") }
```

```exercise
goal: "Run your first Lean command: use `#eval` to evaluate `greet \"world\"`."
code: |
  def greet (name : String) : String :=
    s!"Hello, {name}!"

checks:
  - match: '^#eval\s+greet\s+"world"'
    message: "Add a line: #eval greet \"world\""
solution: |
  def greet (name : String) : String :=
    s!"Hello, {name}!"

  #eval greet "world"
```

```quiz
question: "What does Lean do with a theorem's proof?"
options:
  - "Checks every step, and rejects the file if the proof is wrong."
  - "Runs some random tests."
  - "Ignores it; it's documentation."
answer: 0
explain: "Lean is a proof assistant. A theorem is only accepted when the proof really proves it."
```
