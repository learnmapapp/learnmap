---
title: Task CLI
icon: 🏷️
branch: tools
requires:
  - json
  - cli
  - testing
  - options
  - format
summary: Keep argument validation separate from task creation and JSON serialization.
---

Keep argument validation separate from task creation and JSON serialization. Extend this tool with a storage module and tests for empty arguments and invalid files.

```nim
import std/[json, os]
let args = commandLineParams()
if args.len != 1 or args[0].len == 0:
  quit("Usage: tasks <nonempty-title>", 1)
let task = %*{"title": args[0], "done": false}
echo $task
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about task cli.
lang: nim
code: |-
  import std/[json, os]
  let args = commandLineParams()
  if args.len != 1 or args[0].len == 0:
    quit("Usage: tasks <nonempty-title>", 1)
  let task = %*{"title": args[0], "done": true}
  echo $task
checks:
  - match: '"done":\s+false'
    message: 'Use "done": false for this step.'
  - notMatch: '"done":\s+true'
    message: 'Replace "done": true in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Where should the task CLI reject missing or empty titles?
options:
  - Only while displaying the saved JSON.
  - After treating every empty title as complete.
  - At argument validation before creating its JSON task.
answer: 2
explain: Validate input before constructing and serializing the domain value.
```
