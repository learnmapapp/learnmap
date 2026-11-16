---
title: Command-line arguments
icon: "⌨️"
branch: tools
requires: [paths, sequences]
summary: Read arguments with commandLineParams, parse options with std/parseopt, and exit with a status code.
---
**Let's build `greet`, a tiny command-line tool, in three versions.**

**Version 1: positional arguments.** `commandLineParams()` from `std/os` returns everything after the program name, as a `seq[string]`:

```nim title=greet.nim
import std/os

let args = commandLineParams()
if args.len == 0:
  quit("usage: greet NAME...", 1)
for name in args:
  echo "Hello, ", name, "!"
```

```repl shell
> nim c greet.nim
> ./greet Ada Linus
Hello, Ada!
Hello, Linus!
> ./greet
usage: greet NAME...
```

`quit(message, code)` prints the message and exits with that status code. By convention, `0` means success and anything else means failure, which scripts and CI check.

**Version 2: options.** Real tools take flags like `--shout` and `-n:3`. Parsing those by hand gets messy, so use `std/parseopt`:

```nim title=greet.nim
import std/[parseopt, strutils]

var names: seq[string]
var shout = false
var times = 1

for kind, key, val in getopt():
  case kind
  of cmdArgument:
    names.add(key)
  of cmdLongOption, cmdShortOption:
    case key
    of "shout", "s": shout = true
    of "times", "n": times = parseInt(val)
    else: quit("unknown option: " & key, 1)
  of cmdEnd: discard

for name in names:
  let line = "Hello, " & name & "!"
  for _ in 1..times:
    echo(if shout: line.toUpperAscii() else: line)
```

```repl shell
> ./greet --shout -n:2 Ada
HELLO, ADA!
HELLO, ADA!
```

`getopt()` walks the arguments and tells you, for each one, what kind it is: a plain argument, a long option (`--shout`) or a short one (`-s`). Values follow a colon or equals sign: `-n:2`, `--times=2`.

**Version 3: when it grows.** For subcommands and generated `--help` text, look at the `cligen` package, which builds a whole CLI from a proc's signature. See [packages](node:packages) for installing it.

**Testing tip:** `nim r greet.nim -- Ada` passes `Ada` to the program, not to the compiler. Everything after the file name goes to the program; the `--` just makes that unambiguous.

```compare python
import sys
names = sys.argv[1:]
# or argparse for options
```

```compare javascript
const names = process.argv.slice(2);
// or util.parseArgs for options
```

```compare rust
let names: Vec<String> = std::env::args().skip(1).collect();
// or the clap crate for options
```

```exercise
goal: "Exit with status 1 and a usage message when no arguments are given: replace `discard` with `quit(\"usage: hello NAME\", 1)`."
code: |-
  import std/os

  let args = commandLineParams()
  if args.len == 0:
    discard
  echo "Hello, ", args[0]
checks:
  - match: 'if\s+args\.len\s*==\s*0\s*:\s*\n\s+quit\(\s*"usage: hello NAME"\s*,\s*1\s*\)'
    message: 'Write quit("usage: hello NAME", 1) inside the if.'
solution: |-
  import std/os

  let args = commandLineParams()
  if args.len == 0:
    quit("usage: hello NAME", 1)
  echo "Hello, ", args[0]
```

```quiz
question: "For `./tool a.txt -v`, what does `commandLineParams()` return?"
options:
  - "@[\"./tool\", \"a.txt\", \"-v\"]"
  - "@[\"a.txt\", \"-v\"]"
  - "@[\"a.txt\"]"
answer: 1
explain: The program name isn't included, and options are returned as-is; parseopt interprets them.
```
