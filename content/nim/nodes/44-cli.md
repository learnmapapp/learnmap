---
title: Command-line arguments
icon: 🔧
branch: tools
requires:
  - paths
  - sequences
summary: commandLineParams returns user arguments without the executable name.
---

commandLineParams returns user arguments without the executable name. Check length before indexing and document required arguments.

```nim
import std/os
let args = commandLineParams()
if args.len == 0:
  echo "Usage: tasks <title>"
else:
  echo "Task: ", args[0]
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about command-line arguments.
lang: nim
code: |-
  import std/os
  let args = commandLineParams()
  if args.len == 0:
    echo "Usage: tasks <title>"
  else:
    echo "Task: ", args[1]
checks:
  - match: args\[0\]
    message: Use args[0] for this step.
  - notMatch: args\[1\]
    message: Replace args[1] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about command-line arguments is correct?
options:
  - The first user argument always has index 1.
  - commandLineParams includes the executable name.
  - commandLineParams returns user arguments without the executable name. Check length before
    indexing and document required arguments.
answer: 2
explain: commandLineParams returns user arguments without the executable name. Check length before
  indexing and document required arguments.
```
