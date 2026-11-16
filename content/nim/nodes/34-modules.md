---
title: Import modules
icon: 📦
branch: design
requires:
  - procedures
summary: import makes another module’s public API available; from .
---

import makes another module’s public API available; from ... import narrows which names you bring into scope.

```nim
import std/strutils
from std/math import sqrt
echo "nim".capitalizeAscii()
echo sqrt(9.0)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about import modules.
lang: nim
code: |-
  import std/strutils
  from std/math import sqrt
  echo "nim".capitalizeAscii()
  echo sqrt(4.0)
checks:
  - match: sqrt\(9\.0\)
    message: Use sqrt(9.0) for this step.
  - notMatch: sqrt\(4\.0\)
    message: Replace sqrt(4.0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `from std/math import sqrt` make available?
options:
  - A local copy of the module's source text.
  - The selected `sqrt` name.
  - Every name from every standard module.
answer: 1
explain: A selective import brings the requested public name into scope.
```
