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
question: What does `Python.import_module("math")` obtain?
options:
  - A Python module accessed through interoperability.
  - A statically typed Mojo module with no Python runtime.
  - A compiled C library with no wrapper.
answer: 0
explain: The boundary uses Python objects and requires a compatible Python runtime.
```
