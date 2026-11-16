---
title: "String methods"
icon: "🧹"
branch: "collections"
requires: ["strings", "functions"]
summary: "Clean text, split it into fields, and join it again."
---
**The mess.** A user pasted this into your sign-up form:

```python
raw = "   Ada Lovelace, ada@EXAMPLE.com ,  London\n"
```

Extra spaces, odd capitals, a trailing newline. Let's clean it up step by step. Each method returns a **new** string, since strings never change.

**Step 1, trim the edges.** `strip()` removes whitespace (spaces, tabs, newlines) from both ends:

```repl
> raw.strip()
'Ada Lovelace, ada@EXAMPLE.com ,  London'
```

**Step 2, cut it into fields.** `split(",")` breaks it at each comma and gives you a list:

```repl
> raw.strip().split(",")
['Ada Lovelace', ' ada@EXAMPLE.com ', '  London']
```

**Step 3, tidy each field.** Strip again, and lowercase the email:

```python
name, email, city = [part.strip() for part in raw.split(",")]
email = email.lower()
print(name, email, city)   # Ada Lovelace ada@example.com London
```

(That `[... for ...]` is a comprehension, coming up in [Comprehensions](node:comprehensions). And `name, email, city = ...` is [unpacking](node:unpacking).)

**Step 4, glue it back together.** `join` is the opposite of `split`. It's called on the separator, which looks backwards at first:

```repl
> " | ".join([name, email, city])
'Ada Lovelace | ada@example.com | London'
```

## The rest of the toolkit

| Method | What it does |
| --- | --- |
| `s.lower()`, `s.upper()`, `s.title()` | change case |
| `s.replace("old", "new")` | replace every occurrence |
| `s.startswith("http")`, `s.endswith(".py")` | true or false checks |
| `s.find("@")` | position of the first match, or `-1` |
| `s.split()` (no argument) | split on any run of whitespace |
| `s.isdigit()` | are all characters digits? |

```tip
`split()` with no argument is extra smart: it ignores leading and trailing whitespace and treats several spaces as one. `"  a   b ".split()` gives `['a', 'b']`.
```

```compare javascript
raw.trim().split(",");          // trim, not strip
["a", "b"].join(" | ");         // join is called on the array in JS
```

```compare java
raw.strip().split(",");         // Java 11 added strip too
String.join(" | ", parts);
```

```exercise
goal: "The last name comes out as `'Grace\\n'`. Strip the whitespace off `line` before splitting it."
lang: python
code: |
  line = "  Ada,Grace\n"
  names = line.split(",")
  print(names)
checks:
  - match: 'line\.strip\(\s*\)\.split\('
    message: Call line.strip().split(",").
hint: Methods chain left to right, so strip first and then split.
solution: |
  line = "  Ada,Grace\n"
  names = line.strip().split(",")
  print(names)
```

```quiz
question: "What does `\"-\".join([\"2025\", \"01\", \"31\"])` return?"
options:
  - "`'2025-01-31'`"
  - "`['2025-', '01-', '31-']`"
  - "`'-2025-01-31-'`"
answer: 0
explain: join puts the separator between the items, not around them.
```
