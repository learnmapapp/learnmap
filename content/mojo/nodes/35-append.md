---
title: Append elements
icon: "➕"
branch: data
requires: [lists]
summary: Grow a list with append, insert, extend and +=.
---
**Building a shopping list, one step at a time.** Watch the list change after each line:

```mojo title=shopping.mojo
def main():
    var cart: List[String] = []
    cart.append("bread")            # [bread]
    cart.append("milk")             # [bread, milk]
    cart.insert(0, "coffee")        # [coffee, bread, milk]
    cart.extend(["eggs", "jam"])    # [coffee, bread, milk, eggs, jam]
    cart += ["apples"]              # [coffee, bread, milk, eggs, jam, apples]
    print(len(cart), "items")
```

```repl shell
> mojo run shopping.mojo
6 items
```

**The four ways to grow a list:**

| Method | Adds | Where |
| --- | --- | --- |
| `append(x)` | one item | at the end |
| `insert(i, x)` | one item | before position `i` |
| `extend(other)` | every item of another list | at the end |
| `+=` | same as extend | at the end |

**Use `append` by default.** Adding at the end is fast, no matter how long the list is. `insert(0, x)` has to shift every existing item one place to the right, which gets slow for long lists. If you're always adding at the front, consider building the list in reverse and flipping it at the end.

**The list has to be a `var`.** Appending changes the list. Inside a function, that means a read-only parameter can't be appended to; take `mut items: List[String]` instead:

```mojo
def add_defaults(mut cart: List[String]):
    cart.append("bags")

def main():
    var cart: List[String] = ["tea"]
    add_defaults(cart)
    print(len(cart))   # 2
```

**A new list instead?** `a + b` creates a new list with the items of both, leaving `a` and `b` unchanged.

**Tip:** if you know roughly how many items are coming, `List[Int](capacity=1000)` reserves room up front, so the list doesn't have to grow step by step.

```compare python
cart.append("bread")
cart.insert(0, "coffee")
cart.extend(["eggs", "jam"])
```

```compare javascript
cart.push("bread");
cart.unshift("coffee");
cart.push(...["eggs", "jam"]);
```

```compare rust
cart.push("bread".to_string());
cart.insert(0, "coffee".to_string());
```

```exercise
goal: "Add 42 to the end of `numbers` with the `append` method."
code: |-
  def main():
      var numbers: List[Int] = [7, 13]
      print(len(numbers))
checks:
  - match: 'numbers\.append\(\s*42\s*\)'
    message: Write numbers.append(42) before the print.
solution: |-
  def main():
      var numbers: List[Int] = [7, 13]
      numbers.append(42)
      print(len(numbers))
```

```quiz
question: "`var x: List[Int] = [1, 2]`, then `x.insert(1, 9)`. What is x?"
options:
  - "[9, 1, 2]"
  - "[1, 9, 2]"
  - "[1, 2, 9]"
answer: 1
explain: insert(1, 9) puts 9 at index 1, shifting the rest to the right.
```
