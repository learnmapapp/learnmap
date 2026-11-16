---
title: Key-value dictionaries
icon: "📖"
branch: data
requires: [strings]
summary: A Dict looks up values by key, with a key type and a value type.
---
**A word counter, built step by step.** The goal: count how often each word appears in a sentence.

**Step 1: import and create.** `Dict` lives in the standard library's collections module. Like [lists](node:lists), it's typed: here, keys are `String` and values are `Int`.

```mojo
from std.collections import Dict

var counts = Dict[String, Int]()
```

**Step 2: count.** `in` checks whether a key exists. `counts[word] = ...` sets a value, adding the key if it's new.

```mojo title=words.mojo
from std.collections import Dict

def main() raises:
    var words = "the cat saw the other cat".split(" ")
    var counts = Dict[String, Int]()

    for word in words:
        if word in counts:
            counts[word] += 1
        else:
            counts[word] = 1

    print("cat:", counts["cat"])          # cat: 2
    print("dog:", counts.get("dog", 0))   # dog: 0
```

**Step 3: notice the `raises`.** Reading `counts["dog"]` for a key that isn't there raises an error, like Python's `KeyError`. Since `main` uses `counts[...]` to read, it's marked `raises`. When a key might be missing, `counts.get("dog", 0)` is the friendlier option: it returns the default instead.

**Step 4: loop over the result.**

```mojo
    for item in counts.items():
        print(item.key, "→", item.value)
```

Each `item` has a `.key` and a `.value`. Unlike Python, you can't unpack it into `for key, value in ...`. You can also loop over just the keys with `for key in counts:`. Don't rely on the order: a dictionary isn't sorted.

**Dict literals** work when you know the contents up front: `var prices: Dict[String, Float64] = {"tea": 2.5, "cake": 3.75}`.

**Removing** a key: `counts.pop("the")` removes it and returns its value (and raises if it isn't there).

```compare python
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
for key, value in counts.items(): ...
```

```compare javascript
const counts = new Map();
for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
```

```compare rust
let mut counts = HashMap::new();
for w in words { *counts.entry(w).or_insert(0) += 1; }
```

```exercise
goal: "Add a phone number for \"Ana\": set the key `\"Ana\"` to `\"555-0101\"` in `phones`."
code: |-
  from std.collections import Dict

  def main():
      var phones = Dict[String, String]()
      print(len(phones))
checks:
  - match: 'phones\["Ana"\]\s*=\s*"555-0101"'
    message: 'Write phones["Ana"] = "555-0101" before the print.'
solution: |-
  from std.collections import Dict

  def main():
      var phones = Dict[String, String]()
      phones["Ana"] = "555-0101"
      print(len(phones))
```

```quiz
question: "Which lookup can't raise an error when the key is missing?"
options:
  - "`d[\"key\"]`"
  - "`d.get(\"key\", 0)`"
  - Both can raise.
answer: 1
explain: get with a default returns the default for a missing key; d["key"] raises.
```
