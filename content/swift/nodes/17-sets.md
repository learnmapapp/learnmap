---
title: Unique sets
icon: "🎯"
branch: data
requires: [arrays]
summary: Sets keep each value once, answer "is it in there?" fast, and do Venn-diagram maths.
---
Two friends compare the films they've seen. Which films have both seen? Which has only Ana seen? That's set maths, and Swift's `Set` makes it read like the question:

```swift title=films.swift
let ana: Set = ["Alien", "Up", "Heat", "Coco"]
let ben: Set = ["Up", "Coco", "Jaws"]

print(ana.intersection(ben))        // seen by both: Up, Coco
print(ana.subtracting(ben))         // only Ana: Alien, Heat
print(ana.union(ben).count)         // 5 different films in total
print(ana.symmetricDifference(ben)) // seen by exactly one of them
```

(Writing `: Set` is needed here. Without it, a list in square brackets would become an `Array`.)

A set has three defining traits:

1. **No duplicates.** Inserting something that's already there does nothing.
2. **No order.** Printing the same set twice may show its items in different orders.
3. **Fast lookups.** `contains` takes about the same time whether the set has ten items or ten million. With an array, it has to check each item in turn.

That third point is the everyday reason to reach for a set. Checking whether you've already seen something, inside a loop, is the typical use:

```swift
var seen: Set<String> = []
for word in words {
    if seen.contains(word) {
        print("Duplicate: \(word)")
    }
    seen.insert(word)
}
```

To get a sorted array back out, call `.sorted()`. To remove duplicates from an array (if you don't care about order), `Array(Set(items))` does it in one go.

Elements need to be `Hashable`. Strings, numbers and simple enums already are; your own types can be with one word, as you'll see with [protocols](node:protocols).

```compare python
ana = {"Alien", "Up", "Heat"}
ben = {"Up", "Jaws"}
print(ana & ben, ana - ben, ana | ben)
```

```compare kotlin
val ana = setOf("Alien", "Up", "Heat")
val both = ana intersect setOf("Up", "Jaws")
```

```exercise
goal: Find the tags used in both posts with a set operation, instead of the nested loop.
code: |-
  var shared: [String] = []
  for tag in postA {
      if postB.contains(tag) { shared.append(tag) }
  }
checks:
  - match: 'let\s+shared\s*=\s*postA\.intersection\(postB\)'
    message: Use let shared = postA.intersection(postB)
  - notMatch: 'for\s+tag'
    message: The loop isn't needed any more.
solution: |-
  let shared = postA.intersection(postB)
```

```quiz
question: "`var s: Set = [1, 2]; s.insert(2); s.insert(3)` — what's `s.count`?"
options:
  - "3"
  - "4"
  - "2"
answer: 0
explain: 2 was already there, so inserting it again changes nothing. The set holds 1, 2 and 3.
```
