---
title: "Scope"
icon: "🔭"
branch: "functions"
requires: ["functions"]
summary: "Local names, enclosing functions, and explicit state."
---
**Question 1.** What does this print?

```python
message = "global"

def show():
    print(message)

show()
```

It prints `global`. A function can **read** names from outside it. When Python looks up a name, it checks the function first, then any enclosing function, then the module, then the built-ins like `len` and `print`. That's the [[scope]] chain.

**Question 2.** And this one?

```python
count = 0

def bump():
    count = count + 1

bump()
```

It crashes:

```repl
> bump()
error: UnboundLocalError: cannot access local variable 'count' where it is not associated with a value
```

The rule behind it: **assigning to a name anywhere in a function makes that name local to the whole function.** Python sees `count = ...`, decides `count` is local, and then the right-hand side tries to read a local that doesn't exist yet.

**Question 3.** So how do you change an outside value? Mostly, you don't. You pass it in and return the new value:

```python
def bump(count):
    return count + 1

count = 0
count = bump(count)
```

That's easier to test and to follow, because everything the function touches is in its signature.

## The escape hatches

When you truly need it, two keywords exist:

- `global count` lets a function assign to a module-level name.
- `nonlocal count` lets an inner function assign to a name in the function around it.

`nonlocal` has a nice use: a function that remembers things between calls, called a [[closure]]:

```python
def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

tick = make_counter()
tick(); tick()
print(tick())   # 3
```

`global`, on the other hand, is usually a sign the code wants restructuring.

```tip
`if` and `for` blocks don't create a new scope in Python. A variable assigned inside a loop is still there after the loop ends.
```

```compare javascript
let count = 0;
function bump() { count += 1; }   // JS allows this directly
```

```compare go
var count int
func bump() { count++ }   // package-level vars are assignable too
```

```exercise
goal: "`add` updates its local `total` and then throws it away. Return the updated total."
lang: python
code: |
  def add(total, amount):
      total += amount

  print(add(10, 5))
checks:
  - match: '^\s+return\s+total\s*$'
    message: "Add return total after the update."
hint: Without a return statement, the function gives back None.
solution: |
  def add(total, amount):
      total += amount
      return total

  print(add(10, 5))
```

```quiz
question: "Why does assigning to `count` inside a function break a read of `count` earlier in that same function?"
options:
  - Assignments make the name local for the whole function.
  - Python runs functions bottom to top.
  - A function may only use names it defines itself.
answer: 0
explain: The decision is made per function, before it runs. One assignment anywhere makes the name local everywhere in that function.
```
