---
title: Call Python
icon: 🧩
branch: tools
requires:
  - handling
summary: Python interoperability loads an installed Python module.
---

Python interoperability loads an installed Python module. A compatible Python runtime must be available; Python objects remain dynamic at this boundary.

```mojo
from std.python import Python

def main() raises:
    var math = Python.import_module("math")
    print(math.sqrt(9))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about call python.
lang: mojo
code: |-
  from std.python import Python

  def main() raises:
      var math = Python.import_module("math")
      print(math.sqrt(4))
checks:
  - match: math\.sqrt\(9\)
    message: Use math.sqrt(9) for this step.
  - notMatch: math\.sqrt\(4\)
    message: Replace math.sqrt(4) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about call python is correct?
options:
  - Python interoperability loads an installed Python module. A compatible Python runtime must be
    available; Python objects remain dynamic at this boundary.
  - Importing Python makes all calls statically typed Mojo functions.
  - Python interoperability needs no Python runtime.
answer: 0
explain: Python interoperability loads an installed Python module. A compatible Python runtime must
  be available; Python objects remain dynamic at this boundary.
```
