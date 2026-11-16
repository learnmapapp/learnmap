---
title: Import modules
icon: "📦"
branch: tools
requires: [functions]
summary: Split code into files, import from the standard library, and group modules into packages.
---
**A tour through one small project:**

```text
shop/
├── main.mojo
├── pricing.mojo
└── models/
    ├── __init__.mojo
    └── product.mojo
```

**Stop 1: the standard library.** You've already been importing from it. Everything lives under `std`:

```mojo
from std.collections import Dict, Set
from std.math import sqrt
from std.python import Python
```

Some names are always available without importing: `Int`, `String`, `List`, `print`, `len`, `range` and other basics. Mojo calls these the *prelude*.

**Stop 2: your own module.** Every `.mojo` file is a module, named after the file. Put a function in `pricing.mojo`:

```mojo title=pricing.mojo
def with_vat(price: Float64) -> Float64:
    return price * 1.21
```

And import it in `main.mojo`, which sits in the same folder:

```mojo title=main.mojo
from pricing import with_vat

def main():
    print(with_vat(10.0))
```

A module only contains declarations: functions, structs, traits, `comptime` values. Only the file you run needs a `main`.

**Stop 3: a package.** A folder with an `__init__.mojo` file is a *package*, and its modules are reached with dots:

```mojo
from models.product import Product
```

The `__init__.mojo` file can be empty. It just marks the folder as a package.

**Two import styles:**

| Style | Use as | Good for |
| --- | --- | --- |
| `from pricing import with_vat` | `with_vat(10.0)` | a few names you use often |
| `import pricing` | `pricing.with_vat(10.0)` | making it clear where a name comes from |

The same choice you'd make in Python, with the same trade-offs.

```compare python
from pricing import with_vat
from models.product import Product   # identical
```

```compare javascript
import { withVat } from "./pricing.js";
```

```compare rust
mod pricing;
use pricing::with_vat;
```

```exercise
goal: "Import `sqrt` from the standard library's `std.math` module."
code: |-
  def main():
      print(sqrt(81.0))
checks:
  - match: '^from\s+std\.math\s+import\s+sqrt\s*$'
    message: Add from std.math import sqrt at the top.
solution: |-
  from std.math import sqrt

  def main():
      print(sqrt(81.0))
```

```quiz
question: "What turns a folder into a Mojo package?"
options:
  - A main.mojo file.
  - An __init__.mojo file.
  - A mojoproject.toml file.
answer: 1
explain: A folder with __init__.mojo is a package; its modules are imported with dots.
```
