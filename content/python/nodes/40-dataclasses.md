---
title: "Dataclasses"
icon: "🗃️"
branch: "objects"
requires: ["classes", "dictionaries"]
summary: "Generate useful methods for classes whose main job is holding data."
---

A [[dataclass]] uses annotated fields to generate an initializer, a readable representation, and value-based equality:

```python
from dataclasses import dataclass

@dataclass
class Lesson:
    title: str
    minutes: int = 5

lesson = Lesson("Functions")
print(lesson)  # Lesson(title='Functions', minutes=5)
print(lesson == Lesson("Functions"))  # True
```

Fields without defaults must normally come before fields with defaults. Annotations describe expected types, but do not enforce them at runtime.

## Fresh mutable defaults

Use a factory when each instance needs its own list:

```python
from dataclasses import dataclass, field

@dataclass
class Course:
    title: str
    lessons: list[str] = field(default_factory=list)
```

The factory is called for each instance. It avoids sharing one mutable list, and dataclasses reject many direct mutable defaults.

`@dataclass(frozen=True)` prevents ordinary field reassignment, which helps model values that should not change. It does not recursively freeze nested lists or dictionaries. Add ordinary methods for behavior when useful; dataclasses are still normal classes.

```compare kotlin
data class Lesson(val title: String, val minutes: Int = 5)
```

```compare rust
#[derive(Debug, PartialEq)]
struct Lesson {
    title: String,
    minutes: u32,
}
```

```exercise
goal: "Create an independent lessons list for each Course."
lang: python
code: |
  from dataclasses import dataclass, field

  @dataclass
  class Course:
      title: str
      lessons: list[str] = []

  print(Course("Python"))
checks:
  - match: "lessons:\\s*list\\[str\\]\\s*=\\s*field\\(\\s*default_factory\\s*=\\s*list\\s*\\)"
    message: "Replace [] with field(default_factory=list)."
hint: "Replace [] with field(default_factory=list)."
```

```quiz
question: "Why use field(default_factory=list)?"
options:
  - "To share one list between every instance."
  - "To create a separate list for each instance."
  - "To convert every field to text."
answer: 1
explain: "The factory creates a new list during each instance's initialization."
```
