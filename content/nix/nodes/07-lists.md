---
title: Lists
icon: "📋"
branch: language
requires: [numbers]
summary: Square brackets, spaces, no commas.
---
Lists go between square brackets, and the elements are separated by **spaces**, not commas:

```repl
> [ 1 2 3 ]
[ 1 2 3 ]
> [ "git" "curl" ] ++ [ "vim" ]
[ "git" "curl" "vim" ]
```

`++` joins two lists. Elements can be of mixed types.

```compare python
["git", "curl"] + ["vim"]
```

```compare javascript
[...["git", "curl"], "vim"]
```

```compare java
Stream.concat(List.of("git", "curl").stream(), Stream.of("vim")).toList()
```

```compare kotlin
listOf("git", "curl") + "vim"
```

The space-separation has one classic trap. Function calls also use spaces, so a call inside a list must be wrapped in parentheses:

```repl
> [ toString 1 ]
[ «primop toString» 1 ]
> [ (toString 1) ]
[ "1" ]
```

The first list has **two** elements: the function itself, and the number.

```exercise
goal: Add `"jq"` to the end of this list.
code: |
  [ "git" "curl" ]
checks:
  - notMatch: '"\s*,'
    message: No commas in Nix lists. Just spaces.
  - match: '\[\s*"git"\s+"curl"\s+"jq"\s*\]|\+\+\s*\[\s*"jq"\s*\]'
    message: Put "jq" after "curl", separated by a space.
output: '[ "git" "curl" "jq" ]'
```

## Working with lists

Lists are transformed with functions, never changed in place:

```repl
> map (x: x * 10) [ 1 2 3 ]
[ 10 20 30 ]
> builtins.filter (x: x > 1) [ 1 2 3 ]
[ 2 3 ]
> builtins.elem "git" [ "git" "vim" ]
true
> builtins.elemAt [ "a" "b" "c" ] 1
"b"
> builtins.head [ 1 2 3 ]
1
> lib.unique [ 1 1 2 ]
[ 1 2 ]
> builtins.concatLists [ [ 1 ] [ 2 3 ] ]
[ 1 2 3 ]
```

Building a list conditionally is a common need:

```nix
packages = [ pkgs.git ] ++ lib.optionals isLinux [ pkgs.strace ];
```

```quiz
question: "How many elements does  [ map (x: x) [ 1 ] ]  have?"
options:
  - "1"
  - "3"
  - "2"
answer: 1
explain: "Without parentheses, spaces separate elements: map, (x: x) and [ 1 ] are three separate elements. Write [ (map (x: x) [ 1 ]) ] for one."
```
