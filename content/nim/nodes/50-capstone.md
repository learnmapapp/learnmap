---
title: Task CLI
icon: "📝"
branch: tools
requires: [json, cli, testing, options, format]
summary: Build a small to-do program that saves tasks as JSON, combining much of the course.
---
**The brief.** Build `tasks`, a to-do list for the terminal:

```repl shell
> ./tasks add "Water the plants"
Added #1
> ./tasks add "Write the report"
Added #2
> ./tasks done 1
Completed #1
> ./tasks list
[x]  1  Water the plants
[ ]  2  Write the report
```

Tasks are saved in `tasks.json`, so they survive between runs. Here's a plan, and the code for each part, with links back to where each idea was introduced.

**Part 1: the data.** An [object](node:objects) per task, and a seq of them:

```nim title=tasks.nim
import std/[json, os, options, strformat, strutils]

type
  Task* = object
    id*: int
    title*: string
    done*: bool

const StoreFile = "tasks.json"
```

**Part 2: load and save.** [JSON](node:json) maps straight onto the object. A missing file just means no tasks yet:

```nim
proc load(): seq[Task] =
  if fileExists(StoreFile):
    result = parseJson(readFile(StoreFile)).to(seq[Task])

proc save(tasks: seq[Task]) =
  writeFile(StoreFile, (%tasks).pretty)
```

**Part 3: the logic, as pure functions.** These are easy to [test](node:testing), because they don't touch files or the terminal. They're [exported](node:exports) with `*`, so the test file can import them. Finding a task might fail, so it returns an [Option](node:options):

```nim
func nextId*(tasks: seq[Task]): int =
  result = 1
  for t in tasks:
    if t.id >= result:
      result = t.id + 1

func findIndex*(tasks: seq[Task], id: int): Option[int] =
  for i, t in tasks:
    if t.id == id:
      return some(i)
  none(int)

func render*(t: Task): string =
  let box = if t.done: "[x]" else: "[ ]"
  fmt"{box} {t.id:>2}  {t.title}"
```

**Part 4: the commands.** [Command-line arguments](node:cli) pick the action, and `case` dispatches:

```nim
proc main() =
  let args = commandLineParams()
  if args.len == 0:
    quit("usage: tasks add TITLE | done ID | list", 1)

  var tasks = load()
  case args[0]
  of "add":
    let task = Task(id: nextId(tasks), title: args[1..^1].join(" "))
    tasks.add(task)
    save(tasks)
    echo "Added #", task.id
  of "done":
    let id =
      try: parseInt(args[1])
      except ValueError: -1
    let found = tasks.findIndex(id)
    if found.isNone:
      quit(fmt"No task #{args[1]}", 1)
    tasks[found.get].done = true
    save(tasks)
    echo "Completed #", id
  of "list":
    for t in tasks:
      echo render(t)
  else:
    quit("unknown command: " & args[0], 1)

when isMainModule:
  main()
```

**Part 5: tests for the pure part.** `main` only runs [when this is the main module](node:when), so importing `tasks` from a test file doesn't start the program:

```nim title=tests/ttasks.nim
import std/[unittest, options]
import ../tasks

suite "tasks":
  test "ids continue after the highest":
    check nextId(@[Task(id: 1), Task(id: 4)]) == 5

  test "missing task":
    check findIndex(@[Task(id: 1)], 9).isNone
```

**Ideas to take it further:** a `remove` command; a `--all` flag for `list` with [parseopt](node:cli); storing the file in `getConfigDir()` with [portable paths](node:paths); [sorting](node:sorting) open tasks first.

```compare python
# Same plan in Python: dataclasses, json, argparse, pytest.
```

```compare javascript
// Same plan in Node: plain objects, JSON, process.argv, a test runner.
```

```compare rust
// Same plan in Rust: a struct with serde, clap, and #[test] functions.
```

```exercise
goal: "Add the `clear` command: it keeps only the tasks that aren't done. Write `tasks = tasks.filterIt(not it.done)` in the branch (filterIt is in std/sequtils)."
code: |-
  import std/sequtils

  case command
  of "clear":
    save(tasks)
    echo "Cleared finished tasks"
  else:
    discard
checks:
  - match: 'of\s+"clear"\s*:\s*\n\s+tasks\s*=\s*tasks\.filterIt\(\s*not\s+it\.done\s*\)\s*\n\s+save\(tasks\)'
    message: Put tasks = tasks.filterIt(not it.done) before save(tasks).
solution: |-
  import std/sequtils

  case command
  of "clear":
    tasks = tasks.filterIt(not it.done)
    save(tasks)
    echo "Cleared finished tasks"
  else:
    discard
```

```quiz
question: "Why are nextId, findIndex and render written as funcs?"
options:
  - funcs run faster than procs.
  - They have no side effects, so they're easy to test without files or a terminal.
  - Only funcs can return an Option.
answer: 1
explain: Keeping logic pure and pushing input and output to main makes the core easy to test.
```
