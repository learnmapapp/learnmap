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
question: What should a program do before relying on an externally supplied dictionary key?
options:
  - Check presence or handle the missing-key failure.
  - Assume every missing key is automatically stored as zero.
  - Treat all keys as valid list indices.
answer: 0
explain: A dictionary's key type does not guarantee that a particular key exists.
```
