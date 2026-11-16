---
title: Growable sequences
icon: 🚦
branch: data
requires:
  - arrays
summary: A seq is a growable ordered collection; @[...] constructs one.
---

A seq is a growable ordered collection; @[...] constructs one. Its length is available through len.

A useful term here is [[sequence]]: A dynamically sized collection of elements of one type, written seq[T].

```nim
var scores = @[2, 4]
scores.add(6)
echo scores.len
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
goal: Repair the starting example using what you learned about growable sequences.
lang: nim
code: |-
  var scores = @[2, 4]
  scores.add(0)
  echo scores.len
checks:
  - match: scores\.add\(6\)
    message: Use scores.add(6) for this step.
  - notMatch: scores\.add\(0\)
    message: Replace scores.add(0) in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about growable sequences is correct?
options:
  - seq length is part of its static type.
  - Adding an element returns an unrelated immutable sequence.
  - A seq is a growable ordered collection; @[...] constructs one. Its length is available through
    len.
answer: 2
explain: A seq is a growable ordered collection; @[...] constructs one. Its length is available through len.
```
