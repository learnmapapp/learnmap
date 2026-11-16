---
title: Typed lists
icon: 📦
branch: data
requires:
  - integers
summary: List[T] is a growable collection with one element type.
---

List[T] is a growable collection with one element type. len reports the number of elements, not allocated capacity.

A useful term here is [[list]]: A dynamically sized homogeneous collection parameterized by its element type.

```mojo
def main() raises:
    var values: List[Int] = [2, 4, 6]
    print(len(values))
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
goal: Repair the starting example using what you learned about typed lists.
lang: mojo
code: |-
  def main() raises:
      var values: List[Int] = [2, 4]
      print(len(values))
checks:
  - match: \[2,\s+4,\s+6\]
    message: Use [2, 4, 6] for this step.
  - notMatch: \[2,\s+4\]
    message: Replace [2, 4] in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `len(values)` report for a `List`?
options:
  - The size in bytes of its element type.
  - Its current number of elements.
  - Its unused allocation capacity.
answer: 1
explain: Length and allocated capacity are separate properties.
```
