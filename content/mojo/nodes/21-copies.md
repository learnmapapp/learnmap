---
title: Independent value copies
icon: "📑"
branch: functions
requires: [strings]
summary: Copying a value gives you a second, independent value, and big values ask you to copy explicitly.
---
A common Python surprise:

```python
original = [1, 2, 3]
backup = original
original.append(4)
print(backup)   # [1, 2, 3, 4]  -- wait, what?
```

In Python, `backup = original` doesn't copy anything. Both names point at the same list. Mojo works differently: **values have value semantics**. A copy is a completely separate value, and changing one never affects the other.

But which values copy themselves? That depends on the type, and there are two kinds:

| Kind | Examples | `b = a` |
| --- | --- | --- |
| cheap to copy | `Int`, `Float64`, `Bool`, `String` | copies automatically |
| potentially expensive | `List`, `Dict`, most of your own structs | compile error: ask with `a.copy()` |

So in Mojo, the Python example becomes:

```mojo title=backup.mojo
def main():
    var original: List[Int] = [1, 2, 3]
    var backup = original.copy()   # say it explicitly
    original.append(4)
    print(len(original), len(backup))   # 4 3
```

**Why not copy lists automatically?** Because copying a list of a million items takes real time. Writing `.copy()` makes that cost visible in the code. Without it, a single innocent-looking `=` could be the reason a loop is slow.

**The alternatives to copying:**

- Only need to **read** it somewhere else? Pass it to a function as a [read argument](node:read-args). No copy needed.
- Don't need the original anymore? **Transfer** it: `var b = a^`. No copy, and `a` becomes unusable. See [transfers](node:transfers).
- Need two separate values that will each change? Then `.copy()` is exactly right.

In type terms, `Int` and `String` are *implicitly copyable*, while `List` is only *copyable*. You'll write those words yourself when you define [your own types](node:structs).

```compare python
backup = original.copy()   # Python also needs .copy(), but = doesn't warn you
```

```compare rust
let backup = original.clone();   // Rust also makes copies explicit
```

```exercise
goal: "This won't compile because lists aren't copied implicitly. Make `draft` an explicit copy of `final`."
code: |-
  def main():
      var final: List[String] = ["intro", "body"]
      var draft = final
      draft.append("notes")
checks:
  - match: 'var\s+draft\s*=\s*final\.copy\(\)'
    message: Write var draft = final.copy()
solution: |-
  def main():
      var final: List[String] = ["intro", "body"]
      var draft = final.copy()
      draft.append("notes")
```

```quiz
question: "`var a = \"x\"`, `var b = a`, then `b += \"y\"`. What's a?"
options:
  - "\"x\""
  - "\"xy\""
  - It's a compile error, because strings need .copy().
answer: 0
explain: String is implicitly copyable, so b is a separate copy. a is unchanged.
```
