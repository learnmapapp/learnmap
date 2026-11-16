---
title: Remove an element
icon: "➖"
branch: data
requires: [append]
summary: pop removes an item and hands it back, from the end or from any position.
---
A stack of plates: you put new plates on top, and you take plates off the top. A list with `append` and `pop` works exactly like that.

```mojo title=undo.mojo
def main():
    var history: List[String] = []
    history.append("type 'Hello'")
    history.append("make bold")
    history.append("change color")

    var last = history.pop()
    print("Undo:", last)            # Undo: change color
    print(len(history), "left")     # 2 left
```

**`pop()` does two things at once:** it removes the last item *and* returns it, so you can use it. That's what makes it perfect for undo histories, to-do stacks and depth-first searches.

**Removing from elsewhere.** `pop(i)` removes the item at index `i`:

```mojo
var queue: List[String] = ["Ana", "Ben", "Cleo"]
var next_up = queue.pop(0)    # "Ana"; queue is now [Ben, Cleo]
```

Like [`insert`](node:append), popping from the front shifts every remaining item, so it's slow for long lists. For a real first-in-first-out queue, look at `Deque` in the standard library.

**Popping from an empty list** is a runtime error, just like reading past the end. Guard it:

```mojo
if len(history) > 0:
    print("Undo:", history.pop())
else:
    print("Nothing to undo")
```

**Clearing everything.** `history.clear()` empties the list in one go.

**Removing by value**, like "remove 'Ben'", means finding the index first. A loop over `range(len(queue))` finds it, and `queue.pop(i)` removes it. Or build a new list with only the items you want to keep, which is often simpler to read.

| Goal | Code |
| --- | --- |
| remove and use the last item | `x = items.pop()` |
| remove the item at index i | `items.pop(i)` |
| remove everything | `items.clear()` |

```compare python
last = history.pop()
next_up = queue.pop(0)
```

```compare javascript
const last = history.pop();
const nextUp = queue.shift();
```

```compare rust
let last = history.pop();      // returns Option<T>
let next_up = queue.remove(0);
```

```exercise
goal: "Take the top card off the deck: pop the last item into a variable `card`."
code: |-
  def main():
      var deck: List[String] = ["7♠", "Q♥", "A♦"]
      print(card, len(deck))
checks:
  - match: 'var\s+card\s*=\s*deck\.pop\(\s*\)'
    message: Write var card = deck.pop() before the print.
solution: |-
  def main():
      var deck: List[String] = ["7♠", "Q♥", "A♦"]
      var card = deck.pop()
      print(card, len(deck))
```

```quiz
question: "`var x: List[Int] = [4, 5, 6]`. What does `x.pop(1)` return, and what's left?"
options:
  - 5, and [4, 6]
  - 4, and [5, 6]
  - 6, and [4, 5]
answer: 0
explain: pop(1) removes and returns the item at index 1.
```
