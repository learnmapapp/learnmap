---
title: Ranges and loops
icon: "🔁"
branch: flow
requires: [arithmetic]
summary: for loops over ranges and collections, and the difference between .. and ..<.
---
A short tour of `for`, one stop at a time.

**Stop 1: counting.** `1..5` is a range from 1 to 5, *including* 5:

```nim
for i in 1..5:
  echo i        # 1 2 3 4 5, one per line
```

**Stop 2: counting up to, but not including.** `0..<5` stops before 5. That's the one you want for indexes, because a list of 5 items has indexes 0 to 4:

```nim
for i in 0..<5:
  echo i        # 0 1 2 3 4
```

| Range | Values | Typical use |
| --- | --- | --- |
| `1..5` | 1, 2, 3, 4, 5 | human counting, "rounds 1 to 5" |
| `0..<5` | 0, 1, 2, 3, 4 | indexes |
| `countdown(5, 1)` | 5, 4, 3, 2, 1 | going backwards |
| `countup(0, 10, 2)` | 0, 2, 4, 6, 8, 10 | steps |

**Stop 3: walking a collection.** Loop over the items directly, no index needed:

```nim title=shopping.nim
let shopping = ["eggs", "flour", "milk"]

for item in shopping:
  echo "- ", item

for i, item in shopping:
  echo i + 1, ". ", item     # 1. eggs, 2. flour, 3. milk
```

With two names, the first gets the index and the second the item. Strings work too: `for c in "abc"` gives you one `char` at a time.

**Stop 4: leaving early.** `break` exits the loop, `continue` skips to the next round:

```nim
for n in 1..100:
  if n mod 2 == 0: continue   # skip even numbers
  if n > 7: break             # stop entirely
  echo n                      # 1 3 5 7
```

**Stop 5: the loop variable is read-only.** Assigning to `i` inside the loop doesn't compile. Use a [while loop](node:while) when you need to control the counter yourself.

```compare python
for i in range(5):        # 0..<5
    print(i)
for i, item in enumerate(shopping):
    print(i, item)
```

```compare javascript
for (let i = 0; i < 5; i++) console.log(i);
shopping.forEach((item, i) => console.log(i, item));
```

```compare rust
for i in 0..5 { println!("{i}"); }       // 0..5 in Rust excludes 5
for (i, item) in shopping.iter().enumerate() { }
```

```exercise
goal: "This prints 0 to 10, but the table should show 1 to 10. Change the range so it starts at 1 and includes 10."
code: |-
  for i in 0..10:
    echo i, " x 7 = ", i * 7
checks:
  - match: 'for\s+i\s+in\s+1\s*\.\.\s*10\s*:'
    message: Use the range 1..10.
solution: |-
  for i in 1..10:
    echo i, " x 7 = ", i * 7
```

```quiz
question: "How many times does `for i in 0..<3` run?"
options:
  - "2"
  - "3"
  - "4"
answer: 1
explain: 0..<3 gives 0, 1 and 2, so three times.
```
