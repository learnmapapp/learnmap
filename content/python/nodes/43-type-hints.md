---
title: "Type hints"
icon: "🏷️"
branch: "objects"
requires: ["dataclasses", "none"]
summary: "Describe expected values without pretending annotations are runtime checks."
---

A [[type hint]] documents the values a function expects and returns. Editors and static checkers can use these annotations to find mistakes before execution:

```python
def greeting(name: str) -> str:
    return f"Hello, {name}"

scores: dict[str, int] = {"Ada": 42}
names: list[str] = list(scores)
```

Annotations do not automatically validate inputs or convert values at runtime. A checker such as mypy or Pyright is a separate tool; the interpreter still executes the actual operations in the function body.

## Missing values and collections

Use a union to include alternatives:

```python
def first_name(names: list[str]) -> str | None:
    if not names:
        return None
    return names[0]

name = first_name([])
if name is not None:
    print(name.upper())
```

The explicit `None` check narrows the possible type for a checker. Prefer specific collection element types to an uninformative bare `list`. `Any` opts out of many static checks, while `object` accepts any value but requires narrowing before type-specific operations.

Introduce hints at useful boundaries, then keep them consistent with real behavior. An annotation that lies is worse than one you have not added yet.

```compare kotlin
fun firstName(names: List<String>): String? = names.firstOrNull()
```

```compare rust
fn first_name(names: &[String]) -> Option<&str> {
    names.first().map(String::as_str)
}
```

```exercise
goal: "Declare that first_name can return a string or None."
lang: python
code: |
  def first_name(names: list[str]) -> str:
      if not names:
          return None
      return names[0]

  print(first_name([]))
checks:
  - match: "\\)\\s*->\\s*str\\s*\\|\\s*None\\s*:"
    message: "Change the return annotation to str | None."
hint: "Change the return annotation to str | None."
```

```quiz
question: "Does number: int = \"hello\" automatically convert the string or raise because of the annotation?"
options:
  - "Yes, it converts to an integer."
  - "Yes, annotations enforce every assignment."
  - "No, annotations alone do neither."
answer: 2
explain: "A static checker can flag the mismatch, but the annotation itself does not perform runtime validation."
```
