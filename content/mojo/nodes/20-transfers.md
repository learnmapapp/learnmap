---
title: Transfer ownership
icon: 🔧
branch: functions
requires:
  - read-args
summary: A var parameter takes ownership of a value.
---

A var parameter takes ownership of a value. The postfix ^ explicitly transfers the original, leaving that binding unavailable until reinitialized.

A useful term here is [[ownership]]: The responsibility for a value’s lifetime and eventual destruction.

```mojo
def consume(var text: String):
    print(text)

def main() raises:
    var text = String("Mojo")
    consume(text^)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about transfer ownership.
lang: mojo
code: |-
  def consume(var text: String):
      print(text)

  def main() raises:
      var text = String("Mojo")
      consume(text)
checks:
  - match: consume\(text\^\)
    message: Use consume(text^) for this step.
  - notMatch: consume\(text\)
    message: Replace consume(text) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about transfer ownership is correct?
options:
  - The ^ sigil clones the value while retaining the original.
  - Transferred storage can always be read through the old binding.
  - A var parameter takes ownership of a value. The postfix ^ explicitly transfers the original,
    leaving that binding unavailable until reinitialized.
answer: 2
explain: A var parameter takes ownership of a value. The postfix ^ explicitly transfers the
  original, leaving that binding unavailable until reinitialized.
```
