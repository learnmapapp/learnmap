---
title: Transfer ownership
icon: "📦"
branch: functions
requires: [read-args]
summary: A var parameter owns its value, and the ^ sigil hands yours over without a copy.
---
A story in three acts.

**Act 1: a function that keeps what it's given.** Some functions need a value of their own, typically to store it somewhere. A `var` parameter means "I'll own this value":

```mojo
def archive(var notes: List[String]) -> List[String]:
    notes.append("-- archived --")   # it's ours, so we may change it
    return notes^
```

**Act 2: the caller decides.** For cheap, implicitly copyable values like `Int` or `String`, calling `archive(x)` just gives the function its own copy. A list isn't copied implicitly, because that could be expensive, so `archive(my_notes)` is a compile error that asks you to choose. Pass `my_notes.copy()` to keep your own list, or, if you don't need it anymore, hand it over with the **transfer sigil** `^`:

```mojo title=notes.mojo
def main():
    var my_notes: List[String] = ["buy milk", "call Ana"]
    var stored = archive(my_notes^)    # moved, not copied
    print(len(stored))                 # 3
```

`my_notes^` means "take it, I'm done with it". No copy is made; the function now owns the original list.

**Act 3: the variable is empty.** After the transfer, `my_notes` holds nothing. Using it is a compile error, not a crash:

```mojo
var stored = archive(my_notes^)
print(len(my_notes))   # error: use of uninitialized value 'my_notes'
```

That's the point of [[ownership]]: at any moment, exactly one variable owns each value, and the compiler tracks it for you. You can give `my_notes` a fresh value later (`my_notes = []`) and use it again.

**Why `return notes^` in act 1?** Same idea: the function hands its list over to the caller instead of copying it on the way out.

**You don't need `^` for brand-new values.** `archive(["a", "b"])` passes a value nobody else owns, so it's moved automatically.

**When to use what:**

- Just looking? Use a [read argument](node:read-args).
- Changing the caller's value in place? Use [`mut`](node:mutable-args).
- Keeping or consuming the value? Use `var`, and callers pass `x^` when they're done with `x`.

```compare rust
fn archive(mut notes: Vec<String>) -> Vec<String> { notes }
let stored = archive(my_notes);   // Rust moves by default
```

```compare python
# Python passes references; there's no ownership to transfer.
stored = archive(my_notes)
```

```exercise
goal: "`main` doesn't need `items` after the call. Transfer it into `consume` with the `^` sigil instead of copying it."
code: |-
  def consume(var items: List[Int]) -> Int:
      return len(items)

  def main():
      var items: List[Int] = [1, 2, 3]
      print(consume(items))
checks:
  - match: 'consume\(\s*items\^\s*\)'
    message: Pass items^ to transfer it.
solution: |-
  def consume(var items: List[Int]) -> Int:
      return len(items)

  def main():
      var items: List[Int] = [1, 2, 3]
      print(consume(items^))
```

```quiz
question: "After `send(data^)`, what happens if you read `data`?"
options:
  - You get an empty value.
  - The program crashes when it runs.
  - The compiler reports a use of an uninitialized value.
answer: 2
explain: The transfer leaves data uninitialized, and the compiler won't let you read it until you assign it again.
```
