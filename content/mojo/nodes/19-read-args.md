---
title: Read-only inputs
icon: "👀"
branch: functions
requires: [functions]
summary: Parameters are borrowed for reading by default, so passing big values is cheap and safe.
---
Think of lending someone a book to read in your living room. They can read every page, but they can't write in it, and they can't take it home. When they're done, you still have your book, and it hasn't changed.

That's what Mojo does with a parameter by default. It's called a **read** argument, and it's one of three [[argument convention|argument conventions]]:

| Convention | In the signature | The function can... |
| --- | --- | --- |
| read | `x: T` (the default) | look at the caller's value |
| mut | `mut x: T` | change the caller's value |
| var | `var x: T` | own a value of its own |

```mojo title=report.mojo
def summarize(scores: List[Int]) -> Int:
    var total = 0
    for s in scores:
        total += s
    return total

def main():
    var scores: List[Int] = [72, 88, 95, 61]
    print(summarize(scores))   # 316
    print(len(scores))         # 4: still ours, unchanged
```

**Two benefits at once:**

1. **It's fast.** `summarize` doesn't get a copy of the list; it reads the caller's list directly. Pass a list with ten million numbers, and nothing gets copied.
2. **It's safe.** Try `scores.append(100)` inside `summarize`, and the compiler refuses, because the function only has read access. The caller can trust that the list comes back as it was.

In Python, passing a list also avoids a copy, but the function is free to change it, and you only find out by reading the function body. In Mojo, the signature tells you.

**Need to change something locally?** Make your own copy inside the function: `var sorted_scores = scores.copy()`, and change that one. [Copies](node:copies) explains why lists need an explicit `.copy()`.

**Read arguments aren't copies.** Since the function sees the original value, a read argument is also efficient for small types like `Int`. You never have to worry about whether to "pass by reference" for performance; the default already does the right thing.

```compare python
def summarize(scores: list[int]) -> int:
    scores.append(100)   # allowed: the caller's list changes!
    return sum(scores)
```

```compare rust
fn summarize(scores: &Vec<i32>) -> i32 {   // a shared borrow, like Mojo's read
    scores.iter().sum()
}
```

```exercise
goal: "`total_length` must not change the list. Remove the line that modifies it, so the function compiles."
code: |-
  def total_length(words: List[String]) -> Int:
      words.append("extra")
      var total = 0
      for w in words:
          total += len(w)
      return total
checks:
  - notMatch: 'words\.append'
    message: The read-only list can't be appended to. Remove that line.
  - match: 'return\s+total'
    message: Keep returning total.
solution: |-
  def total_length(words: List[String]) -> Int:
      var total = 0
      for w in words:
          total += len(w)
      return total
```

```quiz
question: "When you pass a list to `def f(items: List[Int])`, what does f get?"
options:
  - A full copy of the list.
  - Read-only access to the caller's list, without a copy.
  - Ownership of the list.
answer: 1
explain: The default read convention borrows the value immutably, so nothing is copied.
```
