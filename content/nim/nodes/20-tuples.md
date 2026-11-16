---
title: Named tuples
icon: "🎁"
branch: data
requires: [types]
summary: Group a few values without declaring a type, name the fields, and unpack them.
---
**When you'd reach for a tuple:** a proc needs to return two things. A minimum *and* a maximum. A quotient *and* a remainder. A name *and* an age. Declaring a whole [object](node:objects) type for that feels heavy. A tuple is the lightweight option:

```nim title=stats.nim
proc minMax(xs: openArray[int]): (int, int) =
  result = (xs[0], xs[0])
  for x in xs:
    if x < result[0]: result[0] = x
    if x > result[1]: result[1] = x

let (lo, hi) = minMax([7, 2, 9, 4])
echo lo, " to ", hi      # 2 to 9
```

Three things just happened:

1. `(int, int)` is a tuple type: two ints, in order.
2. `(xs[0], xs[0])` builds a tuple value; `result[0]` reads its first field.
3. `let (lo, hi) = ...` **unpacks** it into two separate names.

**Named fields** make it clearer. Give each field a name, and you can use `.name` instead of `[0]`:

```nim
proc minMax(xs: openArray[int]): tuple[lo, hi: int] =
  result = (lo: xs[0], hi: xs[0])
  for x in xs:
    result.lo = min(result.lo, x)
    result.hi = max(result.hi, x)

let span = minMax([7, 2, 9, 4])
echo span.hi - span.lo   # 7
echo span                 # (lo: 2, hi: 9)
```

Notice that `echo` prints a tuple nicely, field names included. That makes them handy in quick debugging too.

**Tuples are compared by structure.** Two tuple types with the same fields in the same order are the same type. That's convenient, and it's also the moment to switch to an `object`: when the data has a meaning of its own, like `Point` or `Customer`, give it a real type, so the compiler can tell a `Point` from a `Size` that also happens to have two ints.

**Swapping without a temp variable** is a classic tuple trick:

```nim
var a = 1
var b = 2
(a, b) = (b, a)
echo a, b    # 21
```

```compare python
def min_max(xs):
    return min(xs), max(xs)
lo, hi = min_max([7, 2, 9, 4])
```

```compare javascript
function minMax(xs) {
  return [Math.min(...xs), Math.max(...xs)];
}
const [lo, hi] = minMax([7, 2, 9, 4]);
```

```compare rust
fn min_max(xs: &[i32]) -> (i32, i32) { /* ... */ }
let (lo, hi) = min_max(&[7, 2, 9, 4]);
```

```exercise
goal: "Replace the three lines after `person` with one line that unpacks it: `let (name, age) = person`."
code: |-
  let person = ("Ada", 36)
  let t = person
  let name = t[0]
  let age = t[1]
  echo name, " is ", age
checks:
  - match: 'let\s*\(\s*name\s*,\s*age\s*\)\s*=\s*person'
    message: Write let (name, age) = person
  - notMatch: 't\[\d\]'
    message: Remove the lines that read t[0] and t[1].
solution: |-
  let person = ("Ada", 36)
  let (name, age) = person
  echo name, " is ", age
```

```quiz
question: "Given `let p = (x: 3, y: 4)`, which two expressions both read 4?"
options:
  - "p.y and p[1]"
  - "p.y and p[2]"
  - "p[\"y\"] and p[1]"
answer: 0
explain: Tuple fields can be read by name or by position, starting at 0.
```
