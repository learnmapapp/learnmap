---
title: Typed variables
icon: 🏷️
branch: basics
requires:
  - mojo
summary: var declares mutable typed storage.
---

var declares mutable typed storage. The compiler can infer a type from an initializer, but reassignment does not change that type.

```mojo
def main() raises:
    var score: Int = 1
    score += 2
    print(score)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```compare python
score = 1
score += 2
print(score)
```

```compare javascript
let score = 1;
score += 2;
console.log(score);
```

```compare rust
fn main() {
    let mut score = 1;
    score += 2;
    println!("{score}");
}
```

```exercise
goal: Repair the starting example using what you learned about typed variables.
lang: mojo
code: |-
  def main() raises:
      var score: Int = 1
      score -= 2
      print(score)
checks:
  - match: score\s+\+=\s+2
    message: Use score += 2 for this step.
  - notMatch: score\s+\-=\s+2
    message: Replace score -= 2 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: "After `var score: Int = 1`, what can be assigned to `score`?"
options:
  - A string that changes its type to `String`.
  - Any value because `var` disables typing.
  - Another compatible integer value.
answer: 2
explain: The binding is mutable, but its declared type remains fixed.
```
