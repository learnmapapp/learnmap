---
title: "Sets"
icon: "🎯"
branch: "collections"
requires: ["dictionaries"]
summary: "Keep unique values and express membership, union, and intersection."
---
A set is a bag of **unique** items, with no order. Two quick demos show why it's useful.

**Demo 1, removing duplicates:**

```repl
> visitors = ["ada", "bob", "ada", "cy", "bob"]
> set(visitors)
{'ada', 'bob', 'cy'}
> len(set(visitors))
3
```

(The order you see may differ. Sets don't keep one.)

**Demo 2, fast lookups.** Checking `x in some_list` walks the list from the start. Checking `x in some_set` jumps straight to the answer, like a dictionary key. With a big list of banned words, that's a real difference:

```python
banned = {"spam", "scam", "free money"}
if word in banned:
    print("Blocked")
```

## Venn diagrams in code

Got two groups? Sets answer "who's in both?" and friends with a single operator:

```python
python_fans = {"ada", "bob", "cy"}
rust_fans = {"bob", "cy", "dee"}

python_fans & rust_fans   # in both:     {'bob', 'cy'}
python_fans | rust_fans   # in either:   {'ada', 'bob', 'cy', 'dee'}
python_fans - rust_fans   # only Python: {'ada'}
python_fans ^ rust_fans   # just one:    {'ada', 'dee'}
```

Add and remove with `add` and `discard`:

```python
tags = {"python"}
tags.add("beginner")
tags.add("python")     # already there: nothing happens
tags.discard("java")   # not there: also fine
```

## Two small gotchas

- `{}` is an empty **dictionary**, not an empty set. Write `set()` instead.
- Items must be [[hashable]]: numbers, strings and tuples are fine, lists aren't.

```compare javascript
const a = new Set(["ada", "bob"]);
const both = a.intersection(b);   // newer JS added set methods
```

```compare kotlin
val both = pythonFans intersect rustFans
val either = pythonFans union rustFans
```

```exercise
goal: "`both` should hold the names that appear in **both** groups. Right now it has everyone."
lang: python
code: |
  readers = {"Ada", "Grace"}
  writers = {"Grace", "Linus"}
  both = readers | writers
  print(sorted(both))
checks:
  - match: 'both\s*=\s*readers\s*&\s*writers'
    message: "Use & for intersection, rather than | for union."
hint: "| means either; & means both."
solution: |
  readers = {"Ada", "Grace"}
  writers = {"Grace", "Linus"}
  both = readers & writers
  print(sorted(both))
```

```quiz
question: "What is `type({})`?"
options:
  - set
  - dict
  - tuple
answer: 1
explain: "Empty braces make an empty dictionary. For an empty set, call set()."
```
