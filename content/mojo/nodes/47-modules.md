---
title: Import standard modules
icon: 🛠️
branch: tools
requires:
  - functions
summary: Use from module import name to make dependencies explicit.
---

Use from module import name to make dependencies explicit. Standard-library modules in this course use the std namespace.

```mojo
from std.math import sqrt

def main() raises:
    print(sqrt(Float64(9)))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about import standard modules.
lang: mojo
code: |-
  from std.math import sqrt

  def main() raises:
      print(sqrt(Float64(4)))
checks:
  - match: Float64\(9\)
    message: Use Float64(9) for this step.
  - notMatch: Float64\(4\)
    message: Replace Float64(4) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about import standard modules is correct?
options:
  - Every module is implicitly imported with all names.
  - Imports require shell path separators.
  - Use from module import name to make dependencies explicit. Standard-library modules in this
    course use the std namespace.
answer: 2
explain: Use from module import name to make dependencies explicit. Standard-library modules in this
  course use the std namespace.
```
