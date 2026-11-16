---
title: Convert Python results
icon: 📦
branch: tools
requires:
  - python
  - conversion
summary: Convert a Python result into a Mojo type when entering typed computation.
---

Convert a Python result into a Mojo type when entering typed computation. Conversion can fail, so keep failure handling at the interoperability boundary.

```mojo
from std.python import Python

def main() raises:
    var builtins = Python.import_module("builtins")
    var result = builtins.int("42")
    var value = Int(py=result)
    print(value + 1)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about convert python results.
lang: mojo
code: |-
  from std.python import Python

  def main() raises:
      var builtins = Python.import_module("builtins")
      var result = builtins.int("42")
      var value = Int(py=result)
      print(value - 1)
checks:
  - match: print\(value\s+\+\s+1\)
    message: Use print(value + 1) for this step.
  - notMatch: print\(value\s+\-\s+1\)
    message: Replace print(value - 1) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How does this Mojo 1.2 example convert a Python integer object into `Int`?
options:
  - "`Int[type=result]`"
  - "`Int(py=result)`"
  - "`result as Int`"
answer: 1
explain: The named `py` initializer performs the explicit Python-to-Mojo conversion.
```
