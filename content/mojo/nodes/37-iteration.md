---
title: Process a list
icon: "🔄"
branch: data
requires: [lists]
summary: Loop over items with for, over indexes with range, and backwards with reversed.
---
Three questions about a week of step counts, and the loop that fits each one:

```mojo
def main():
    var steps: List[Int] = [8200, 4300, 11050, 9900, 3100, 12400, 7600]
```

**1. "What's the total?" You only need the values.**

```mojo
    var total = 0
    for s in steps:
        total += s
    print("Total:", total)                 # Total: 56550
```

`for s in steps` hands you each item in turn. This is the loop to reach for first: short, and it can't run past the end.

**2. "Which days hit 10,000?" You need the position too.**

```mojo
    for day in range(len(steps)):
        if steps[day] >= 10000:
            print("Goal reached on day", day + 1)   # days 3 and 6
```

`range(len(steps))` produces 0 to 6, the valid indexes. Use this form when you need the index, or when you want to *change* items: `steps[day] += 500` works here, while assigning to `s` in the first form wouldn't change the list.

**3. "Show the most recent day first." You need a different order.**

```mojo
    for s in reversed(steps):
        print(s)                            # 7600, 12400, 3100, ...
```

`reversed` walks the list backwards without creating a reversed copy.

**Summary:**

| You need | Write |
| --- | --- |
| each value | `for x in items` |
| index (and value) | `for i in range(len(items))` |
| to change items | `for i in range(len(items)): items[i] = ...` |
| reverse order | `for x in reversed(items)` |

**Don't add or remove items while looping over the same list.** The loop is walking through it while it changes under its feet. Collect what to add or remove in a second list, and apply the changes after the loop.

```compare python
total = sum(steps)
for day, s in enumerate(steps):
    if s >= 10000: print(day + 1)
```

```compare javascript
for (const s of steps) total += s;
steps.forEach((s, day) => { if (s >= 10000) console.log(day + 1); });
```

```compare rust
let total: i32 = steps.iter().sum();
for (day, s) in steps.iter().enumerate() { }
```

```exercise
goal: "Find the longest name: loop over `names` and keep the longest one in `longest`."
code: |-
  def main():
      var names: List[String] = ["Al", "Beatrix", "Cy"]
      var longest = ""
      print(longest)
checks:
  - match: 'for\s+(\w+)\s+in\s+names\s*:'
    message: Loop with for name in names
  - match: 'if\s+len\(\s*\w+\s*\)\s*>\s*len\(\s*longest\s*\)\s*:\s*\n\s+longest\s*=\s*\w+'
    message: 'Inside the loop: if len(name) > len(longest): longest = name'
solution: |-
  def main():
      var names: List[String] = ["Al", "Beatrix", "Cy"]
      var longest = ""
      for name in names:
          if len(name) > len(longest):
              longest = name
      print(longest)
```

```quiz
question: "You want to double every number in a list, in place. Which loop works?"
options:
  - "`for x in nums: x *= 2`"
  - "`for i in range(len(nums)): nums[i] *= 2`"
  - Both.
answer: 1
explain: The for-in loop gives read-only access to each item. To change items, go through the index.
```
