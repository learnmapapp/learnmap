---
title: "Lists"
icon: "📋"
branch: "collections"
requires: ["strings"]
summary: "Ordered, growable collections with zero-based indexing."
---

A [[list]] stores an ordered sequence. It can grow, shrink, and contain different types, though consistent element types are usually easier to work with.

```python
languages = ["Python", "Rust"]
languages.append("Nix")
print(languages[0])       # Python
print(len(languages))    # 3
last = languages.pop()
print(last)              # Nix
```

`append` changes the existing list and returns `None`. Do not write `languages = languages.append("Nix")`; that would replace your list binding with `None`.

Use `in` to test membership: `"Rust" in languages` is true. Assigning an index replaces that element, and `del languages[0]` removes one. Out-of-range indexing raises `IndexError`.

## One item or many?

`append([3, 4])` adds one nested list. `extend([3, 4])` adds two individual items:

```python
numbers = [1, 2]
numbers.extend([3, 4])
print(numbers)  # [1, 2, 3, 4]
```

Lists are [[mutable]]. Two names can refer to the same list; explore the consequences in [mutability](node:mutability).

```compare javascript
const languages = ["Python", "Rust"];
languages.push("Nix");
```

```compare rust
let mut languages = vec!["Python", "Rust"];
languages.push("Nix");
```

```exercise
goal: "Append \"Nix\" without replacing the languages binding."
lang: python
code: |
  languages = ["Python", "Rust"]
  languages = languages.append("Nix")
  print(languages)
checks:
  - match: "^languages\\.append\\(\\s*[\"']Nix[\"']\\s*\\)\\s*$"
    message: "Call languages.append(\"Nix\") on its own line."
hint: "Call languages.append(\"Nix\") on its own line."
```

```quiz
question: "What does list.append return?"
options:
  - "The updated list."
  - "The added element."
  - "None."
answer: 2
explain: "append changes the list in place and returns None."
```
