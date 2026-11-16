---
title: Key-value dictionaries
icon: "📖"
branch: data
requires: [arrays]
summary: Look values up by key, and why every lookup hands back an optional.
---
A dictionary maps keys to values. `[String: Int]` maps Strings to Ints.

Let's build the scoreboard for a pub quiz:

```swift title=quiz.swift
var scores: [String: Int] = ["Quizzly Bears": 12, "Les Quizerables": 9]

scores["Trivia Newton John"] = 7        // add a team
scores["Les Quizerables"] = 14          // update
scores["Quizzly Bears", default: 0] += 3 // add points, 0 if missing

for (team, points) in scores.sorted(by: { $0.value > $1.value }) {
    print("\(team): \(points)")
}
```

```repl shell
> swift quiz.swift
Quizzly Bears: 15
Les Quizerables: 14
Trivia Newton John: 7
```

(The `{ $0.value > $1.value }` part is a [closure](node:closures) that says how to sort. You'll meet those later.)

Now, the important bit. What's the type of `scores["Quizzly Bears"]`? It's `Int?`, an [[optional]], not `Int`. The key might not exist, and Swift won't pretend otherwise:

```swift
let points = scores["Quiz Team Aguilera"]   // nil: no such team
let safe = scores["Quiz Team Aguilera"] ?? 0 // 0
```

That `??` gives a fallback when the value is missing. It gets [its own lesson](node:coalescing).

Other handy things:

- `scores["Team"] = nil` **removes** an entry.
- `scores.keys` and `scores.values` give you just one side.
- `scores.count`, `scores.isEmpty` work like for arrays.
- **Order is not guaranteed.** Iterating a dictionary twice can even give different orders between runs. Sort it when order matters, as above.

```compare python
scores = {"Quizzly Bears": 12}
scores["Quizzly Bears"] = scores.get("Quizzly Bears", 0) + 3
```

```compare javascript
const scores = new Map([["Quizzly Bears", 12]]);
scores.set("Quizzly Bears", (scores.get("Quizzly Bears") ?? 0) + 3);
```

```exercise
goal: "Count each fruit. `counts[fruit] += 1` doesn't compile, because the value might be missing. Use a default of 0."
code: |-
  var counts: [String: Int] = [:]
  for fruit in basket {
      counts[fruit] += 1
  }
checks:
  - match: 'counts\[fruit,\s*default:\s*0\]\s*\+=\s*1'
    message: "Use counts[fruit, default: 0] += 1"
solution: |-
  var counts: [String: Int] = [:]
  for fruit in basket {
      counts[fruit, default: 0] += 1
  }
```

```quiz
question: "How do you remove the key \"Bo\" from `var ages: [String: Int]`?"
options:
  - "`ages[\"Bo\"] = 0`"
  - "`ages[\"Bo\"] = nil`"
  - "`ages.delete(\"Bo\")`"
answer: 1
explain: Assigning nil through the subscript removes the entry. Setting 0 would keep it with value 0.
```
