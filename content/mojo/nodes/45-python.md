---
title: Call Python
icon: "🐍"
branch: tools
requires: [handling]
summary: Import any Python module from Mojo and call it, from the standard library to NumPy.
---
**Why would a fast language want to call Python?** Because Python has a library for everything, and rewriting them all would take decades. Mojo lets you write the speed-critical parts in Mojo and borrow the rest from Python.

```mojo title=today.mojo
from std.python import Python

def main() raises:
    var datetime = Python.import_module("datetime")
    var today = datetime.date.today()
    print("Today is", today.strftime("%A"))
```

```repl shell
> mojo run today.mojo
Today is Monday
```

**Step by step:**

1. **`from std.python import Python`** brings in the bridge to Python.
2. **`Python.import_module("datetime")`** is Mojo's version of `import datetime`. It returns the module as a value.
3. From there, the code looks like Python: `datetime.date.today()`, `today.strftime("%A")`. Attribute lookups and calls are passed to the Python interpreter.
4. **`raises` on `main`.** `import_module` raises if the module can't be found, and any Python call can raise a Python exception. Use [try/except](node:handling) if you want to recover from that.

**Which Python?** Mojo uses the Python interpreter of the environment it runs in. Installing NumPy with `pixi add numpy` or `uv add numpy` makes it importable:

```mojo
var np = Python.import_module("numpy")
var data = np.array(Python.list(3, 1, 2))
print(np.sort(data))   # [1 2 3]
```

**Python values from Mojo.** `Python.list(3, 1, 2)` builds a Python list. Mojo numbers and strings are converted automatically when you pass them to a Python function.

**The trade-off:** code that runs through Python runs at Python speed, and the compiler can't check it. A typo like `today.strftimee(...)` only fails when that line runs. Use Python for convenience and libraries, and Mojo for the hot loops.

What you get back from Python is a `PythonObject`. To use it as a Mojo `Int` or `String`, convert it; that's the [next lesson](node:python-values).

```compare python
import datetime
today = datetime.date.today()
print("Today is", today.strftime("%A"))
```

```compare rust
// Rust can call Python with the PyO3 crate, with more setup.
```

```exercise
goal: "Import Python's `math` module with `Python.import_module` and print `math.sqrt(16)`."
code: |-
  from std.python import Python

  def main() raises:
      var math = 
      print(math.sqrt(16))
checks:
  - match: 'var\s+math\s*=\s*Python\.import_module\("math"\)'
    message: 'Write var math = Python.import_module("math")'
solution: |-
  from std.python import Python

  def main() raises:
      var math = Python.import_module("math")
      print(math.sqrt(16))
```

```quiz
question: "Why does a function using `Python.import_module` need `raises`?"
options:
  - Because Python is slow.
  - Because the import, or any Python call, can fail with an error.
  - It doesn't need it.
answer: 1
explain: The module might be missing, and Python calls can raise exceptions, so the function must be able to pass them on.
```
