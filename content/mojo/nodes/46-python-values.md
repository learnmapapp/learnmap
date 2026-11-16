---
title: Convert Python results
icon: "🔁"
branch: tools
requires: [python]
summary: Python calls return PythonObject; convert with Int(py=...), String(py=...) and friends.
---
**Bug hunt.** This looks reasonable, but doesn't compile:

```mojo
var stats = Python.import_module("statistics")
var median: Float64 = stats.median(Python.list(3, 9, 4))
```

The compiler complains that it can't convert a `PythonObject` to `Float64`. Everything a Python call returns is a [[PythonObject]]: a Mojo value that wraps "some Python thing". It could be a float, a list, `None`, or anything else. Mojo can't know which until the program runs, so it won't guess.

The fix is to say what you expect, with `py=`:

```mojo title=median.mojo
from std.python import Python

def main() raises:
    var stats = Python.import_module("statistics")
    var result = stats.median(Python.list(3, 9, 4))
    var median = Float64(py=result)
    print(median * 2.0)   # 8.0
```

**The conversions:**

| You expect | Write |
| --- | --- |
| an integer | `Int(py=obj)` |
| a float | `Float64(py=obj)` |
| a string | `String(py=obj)` |
| a boolean | `Bool(py=obj)` |

If the Python value doesn't fit, say it's `"hello"` and you asked for `Int`, the conversion raises an error. That's why the surrounding function needs `raises`, or a [try/except](node:handling).

**When to convert, and when not to.** A `PythonObject` works fine as long as you only pass it back to Python: `np.sort(data)` doesn't need any conversion. Convert at the **boundary**, at the moment a value moves from the Python world into your Mojo code. From then on, Mojo knows the type, checks it, and runs it at full speed.

```text
Python world:  stats.median(...)    returns a PythonObject, could be anything
                     |
                     v
the boundary:  Float64(py=result)   convert once, here
                     |
                     v
Mojo world:    a Float64            typed, checked, fast
```

**The other direction** is mostly automatic: pass a Mojo `Int`, `Float64` or `String` to a Python function, and Mojo wraps it for you.

```compare python
# In Python, everything is already a Python object:
median = statistics.median([3, 9, 4])
```

```compare rust
// With PyO3, extracting is also explicit:
let median: f64 = result.extract()?;
```

```exercise
goal: "Turn the Python result into a Mojo `Int` with `Int(py=...)`, so it can be added to `bonus`."
code: |-
  from std.python import Python

  def main() raises:
      var builtins = Python.import_module("builtins")
      var count = builtins.len(Python.list(1, 2, 3))
      var bonus: Int = 10
      print(count + bonus)
checks:
  - match: 'var\s+count\s*=\s*Int\(\s*py\s*=\s*builtins\.len\(Python\.list\(1,\s*2,\s*3\)\)\s*\)'
    message: Wrap the call in Int(py=...).
solution: |-
  from std.python import Python

  def main() raises:
      var builtins = Python.import_module("builtins")
      var count = Int(py=builtins.len(Python.list(1, 2, 3)))
      var bonus: Int = 10
      print(count + bonus)
```

```quiz
question: "What type does a Python call return in Mojo?"
options:
  - The matching Mojo type, like Float64.
  - PythonObject.
  - String.
answer: 1
explain: Python values stay wrapped in PythonObject until you convert them with Int(py=...), String(py=...), and so on.
```
