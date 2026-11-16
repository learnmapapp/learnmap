---
title: Reference objects
icon: "🔗"
branch: data
requires: [objects]
summary: ref object types are shared rather than copied, can be nil, and are freed automatically.
---
**Value or reference? Predict the two outputs:**

```nim title=sharing.nim
type
  Counter = object
    hits: int
  SharedCounter = ref object
    hits: int

var a = Counter(hits: 0)
var b = a
b.hits += 1
echo a.hits      # ?

var c = SharedCounter(hits: 0)
var d = c
d.hits += 1
echo c.hits      # ?
```

```repl shell
> nim r sharing.nim
0
1
```

**What happened:**

```text
plain object: copied              ref object: shared

  a: [hits: 0]                      c ---+
  b: [hits: 1]                           +--> [hits: 1]
                                    d ---+
```

`var b = a` copied a plain [object](node:objects). `var d = c` copied only the *reference*, an arrow pointing at one shared object. So `d.hits += 1` changed the object `c` points to as well.

**Declaring one:** `ref object` instead of `object`. That's the whole syntax change; you create, read and write fields the same way.

**When you want a [[ref]]:**

- Several parts of the program need to see the *same* thing: a shared settings object, a node in a tree, a player that two teams list.
- The data structure points at itself, like a linked list or tree. A plain object can't contain itself (it would be infinitely big), but it can contain a `ref` to one.

**When you don't:** small data that's naturally copied, like points, colors, money amounts. Plain objects are simpler and faster, so start there.

**`nil`: the empty reference.** A `ref` variable can point at nothing:

```nim
var e: SharedCounter       # nil until assigned
if e == nil:
  echo "no counter yet"
echo e.hits                # crashes: nil access
```

Check for `nil` wherever a `ref` might be unset.

**Who frees the memory?** Nim does. Since Nim 2.0, memory management (ORC) counts references and frees an object as soon as nothing points at it any more. No `free`, no garbage collector pauses.

**A `ref` parameter can be changed in place** without `var`, because the proc gets a copy of the arrow, which points at the same object. Use `var` only if the proc must make the caller's variable point somewhere else.

```compare python
# Every Python object is a reference, so b = a always shares.
```

```compare javascript
// Objects are always shared references; spread copies:  const b = { ...a };
```

```compare rust
use std::rc::Rc;
use std::cell::RefCell;
let c = Rc::new(RefCell::new(Counter { hits: 0 }));   // shared and mutable
```

```exercise
goal: "Both teams should share the same `Player`, so that renaming it shows up in both. Change `Player` to a `ref object`."
code: |-
  type
    Player = object
      name: string

  var p = Player(name: "Kim")
  var redTeam = @[p]
  var blueTeam = @[p]
  p.name = "Kim L."
  echo redTeam[0].name
checks:
  - match: 'Player\s*=\s*ref\s+object'
    message: Write Player = ref object
solution: |-
  type
    Player = ref object
      name: string

  var p = Player(name: "Kim")
  var redTeam = @[p]
  var blueTeam = @[p]
  p.name = "Kim L."
  echo redTeam[0].name
```

```quiz
question: "What is the value of a `ref object` variable that was declared but never assigned?"
options:
  - An object with default field values.
  - "nil"
  - It doesn't compile without a value.
answer: 1
explain: A ref starts as nil, pointing at nothing. Create the object with Type(...) first.
```
