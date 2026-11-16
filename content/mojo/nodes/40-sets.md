---
title: Unique values
icon: 💬
branch: data
requires:
  - lists
summary: Set stores unique hashable values.
---

Set stores unique hashable values. Adding an existing value does not increase its length.

```mojo
from std.collections import Set

def main() raises:
    var topics = Set[String]()
    topics.add("Mojo")
    topics.add("Mojo")
    print(len(topics))
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about unique values.
lang: mojo
code: |-
  from std.collections import Set

  def main() raises:
      var topics = Set[String]()
      topics.add("Rust")
      topics.add("Mojo")
      print(len(topics))
checks:
  - match: topics\.add\("Mojo"\)
    message: Use topics.add("Mojo") for this step.
  - notMatch: topics\.add\("Rust"\)
    message: Replace topics.add("Rust") in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: How many values remain after adding `"Mojo"` twice to an empty set?
options:
  - "`0`"
  - "`1`"
  - "`2`"
answer: 1
explain: Sets retain unique values rather than duplicate occurrences.
```
