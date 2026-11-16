---
title: Key-value dictionaries
icon: 🔢
branch: data
requires:
  - strings
  - lists
summary: Dict[K, V] associates typed keys with typed values.
---

Dict[K, V] associates typed keys with typed values. Validate presence or handle missing-key failure when a key comes from external input.

```mojo
from std.collections import Dict

def main() raises:
    var scores = Dict[String, Int]()
    scores["Ada"] = 8
    print(scores["Ada"])
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about key-value dictionaries.
lang: mojo
code: |-
  from std.collections import Dict

  def main() raises:
      var scores = Dict[String, Int]()
      scores["Ada"] = 0
      print(scores["Ada"])
checks:
  - match: scores\["Ada"\]\s+=\s+8
    message: Use scores["Ada"] = 8 for this step.
  - notMatch: scores\["Ada"\]\s+=\s+0
    message: Replace scores["Ada"] = 0 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about key-value dictionaries is correct?
options:
  - Dict[K, V] associates typed keys with typed values. Validate presence or handle missing-key
    failure when a key comes from external input.
  - Every missing key is inserted with zero automatically.
  - A dictionary is always sorted by key.
answer: 0
explain: Dict[K, V] associates typed keys with typed values. Validate presence or handle missing-key
  failure when a key comes from external input.
```
