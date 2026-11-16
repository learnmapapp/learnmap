---
title: Ordered arrays
icon: 🔢
branch: data
requires:
  - for
summary: Array stores ordered elements of one type with zero-based indices.
---

Array stores ordered elements of one type with zero-based indices. Subscripts require a valid index; first provides an optional for potentially empty arrays.

```swift
var topics = ["Swift", "Lua"]
topics.append("Nim")
print(topics[0], topics.count)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare python
values = [2, 4, 6]
print(values[0], len(values))
```

```compare javascript
const values = [2, 4, 6];
console.log(values[0], values.length);
```

```compare rust
fn main() {
    let values = vec![2, 4, 6];
    println!("{} {}", values[0], values.len());
}
```

```exercise
goal: Repair the starting example using what you learned about ordered arrays.
lang: swift
code: |-
  var topics = ["Swift", "Lua"]
  topics.append("Nim")
  print(topics[1], topics.count)
checks:
  - match: topics\[0\]
    message: Use topics[0] for this step.
  - notMatch: topics\[1\]
    message: Replace topics[1] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about ordered arrays is correct?
options:
  - Array stores ordered elements of one type with zero-based indices. Subscripts require a valid
    index; first provides an optional for potentially empty arrays.
  - An out-of-bounds subscript returns nil.
  - Array indices start at 1.
answer: 0
explain: Array stores ordered elements of one type with zero-based indices. Subscripts require a
  valid index; first provides an optional for potentially empty arrays.
```
