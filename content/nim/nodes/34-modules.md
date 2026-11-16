---
title: Import modules
icon: "🔌"
branch: design
requires: [procedures]
summary: Every .nim file is a module; import the standard library and your own files.
---
**A tour of the standard library, in five imports.** Every `.nim` file is a module, and `import` makes another module's public names available. The standard library lives under `std/`:

```nim title=tour.nim
import std/strutils          # string tools
import std/[math, random, times]   # several at once

echo "nim".toUpperAscii()    # NIM          (strutils)
echo sqrt(2.0)               # 1.414...     (math)
randomize()
echo rand(1..6)              # a dice roll  (random)
echo now().year              # this year    (times)
```

**The modules you'll import most:**

| Module | For |
| --- | --- |
| `std/strutils` | split, strip, replace, parseInt, … |
| `std/sequtils` | map, filter, toSeq, … |
| `std/tables` | Table, CountTable, OrderedTable |
| `std/options` | Option, some, none |
| `std/os` | files, directories, command-line arguments |
| `std/json` | parsing and generating JSON |
| `std/strformat` | `fmt"..."` string interpolation |

A few basics, like `echo`, `len`, `seq` and `$`, live in the `system` module, which is always imported.

**Your own modules.** Split a program into files in the same folder, and import them by file name without `.nim`:

```nim title=geometry.nim
proc area*(w, h: float): float = w * h
proc perimeter*(w, h: float): float = 2 * (w + h)
```

```nim title=main.nim
import geometry

echo area(3, 4)              # 12.0
```

Run `nim r main.nim`; the compiler finds and compiles `geometry.nim` automatically. Note the `*` after the names in `geometry.nim`. It means "visible to other modules", and the [next lesson](node:exports) is about it.

**Where did that name come from?** Nim imports all public names straight into your file, which is convenient but can leave you guessing. Three ways to be explicit:

```nim
from std/math import sqrt, PI        # only these names
import std/math except log            # everything but log
from std/strutils import nil          # nothing: write strutils.split(...)
```

You can always qualify a name with its module, `math.sqrt(2.0)`, even after a plain import. If two modules export the same name, Nim picks the right one by the argument types; when it can't decide, it asks you to qualify.

```compare python
import math
from math import sqrt
```

```compare javascript
import { area } from "./geometry.js";
```

```compare rust
mod geometry;
use geometry::area;
```

```exercise
goal: "`split` and `join` come from `std/strutils`, which isn't imported. Add the import on the first line."
code: |-
  let words = "red green blue".split(' ')
  echo words.join(", ")
checks:
  - match: '^import\s+std/strutils'
    message: Start with import std/strutils
solution: |-
  import std/strutils
  let words = "red green blue".split(' ')
  echo words.join(", ")
```

```quiz
question: "How do you import a file called `utils.nim` in the same folder?"
options:
  - "`import utils`"
  - "`import \"utils.nim\"`"
  - "`import std/utils`"
answer: 0
explain: Use the file name without the .nim extension. std/ is only for the standard library.
```
