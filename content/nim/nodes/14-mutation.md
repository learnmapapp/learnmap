---
title: Mutable parameters
icon: "✏️"
branch: functions
requires: [procedures, bindings]
summary: Parameters are read-only by default; a var parameter lets a proc change the caller's variable.
---
**Bug hunt.** This code is meant to add a bonus to a score. It doesn't compile. Why?

```nim
proc addBonus(score: int) =
  score += 10      # Error: 'score' cannot be assigned to

var points = 50
addBonus(points)
```

**Answer:** parameters in Nim are read-only, like `let`. Inside `addBonus`, `score` is a value you can look at but not change. That's a safe default: when you call a proc, you know it won't secretly modify your variables.

**Fix 1: return the new value.** Usually the cleanest:

```nim
proc withBonus(score: int): int = score + 10

var points = 50
points = withBonus(points)   # 60
```

**Fix 2: a `var` parameter.** Write `var` before the type, and the proc works directly on the caller's variable:

```nim title=bonus.nim
proc addBonus(score: var int) =
  score += 10

var points = 50
addBonus(points)
echo points        # 60
```

The caller must pass something changeable, a `var` variable. `addBonus(50)` or passing a `let` doesn't compile, because there'd be nothing to change.

**When is a `var` parameter the right call?** When the thing being changed is big, or when changing it in place is the whole point:

```nim
proc addTag(tags: var seq[string], tag: string) =
  if tag notin tags:
    tags.add(tag)

var tags = @["nim"]
tags.addTag("fast")
tags.addTag("nim")
echo tags          # @["nim", "fast"]
```

`tags.add(tag)` itself is a proc with a `var` first parameter, which is why you can only call `add` on a `var` sequence.

**Is passing a big `seq` without `var` slow?** No. Read-only parameters aren't copied when that would be expensive; Nim passes them by reference behind the scenes. You choose `var` for *meaning* (this proc changes it), not for speed.

```compare python
def add_tag(tags, tag):   # lists are always shared, so any function can change them
    if tag not in tags:
        tags.append(tag)
```

```compare javascript
function addTag(tags, tag) {   // arrays are shared references too
  if (!tags.includes(tag)) tags.push(tag);
}
```

```compare rust
fn add_bonus(score: &mut i32) {   // like Nim's var parameter
    *score += 10;
}
```

```exercise
goal: "`reset` should set the caller's counter back to 0. Make `counter` a `var` parameter."
code: |-
  proc reset(counter: int) =
    counter = 0

  var clicks = 12
  reset(clicks)
  echo clicks
checks:
  - match: 'proc\s+reset\s*\(\s*counter\s*:\s*var\s+int\s*\)'
    message: 'Write counter: var int'
solution: |-
  proc reset(counter: var int) =
    counter = 0

  var clicks = 12
  reset(clicks)
  echo clicks
```

```quiz
question: "Given `proc grow(n: var int)`, which call compiles?"
options:
  - "`grow(5)`"
  - "`let x = 5; grow(x)`"
  - "`var x = 5; grow(x)`"
answer: 2
explain: A var parameter needs a variable that can be changed, so only a var works.
```
