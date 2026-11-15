---
title: Iterators
icon: "🔄"
branch: collections
requires: [vectors, closures]
summary: iter, into_iter, and why iterators are lazy.
---
An [[iterator]] hands out values one at a time. Every `for` loop uses one under the hood. You get them from collections in three flavours, just like the `for` loop forms:

| Method | Yields | The collection… |
| --- | --- | --- |
| `.iter()` | `&T` | stays usable |
| `.iter_mut()` | `&mut T` | can be changed in place |
| `.into_iter()` | `T` | is consumed |

At heart an iterator is a value with a `next()` method that returns `Some(item)` until it runs out:

```rust
let v = vec![1, 2];
let mut it = v.iter();
it.next(); // Some(&1)
it.next(); // Some(&2)
it.next(); // None
```

Iterators are **lazy**. Building one does nothing; work only happens when something pulls values out. The pullers are called *consumers*:

```repl
> vec![1, 2, 3].iter().sum::<i32>()
6
> vec![4, 9, 2].iter().max()
Some(9)
> vec![1, 2, 3].iter().count()
3
> (1..=4).product::<i32>()
24
```

Ranges are iterators too, which is why `for i in 0..10` works.

```warn
`for x in v` calls `into_iter()` and moves `v`. Write `for x in &v` (same as `v.iter()`) if you still need the vector after the loop.
```

```compare python
it = iter([1, 2])
next(it)  # 1
```

```compare javascript
const it = [1, 2][Symbol.iterator]();
it.next(); // { value: 1, done: false }
```

```compare java
Iterator<Integer> it = List.of(1, 2).iterator();
it.next();
```

```compare kotlin
val it = listOf(1, 2).iterator()
it.next()
```

```compare go
for i, v := range []int{1, 2} { } // range is built into the language
```

```exercise
goal: Compute the sum with an iterator instead of the manual loop.
code: |
  let nums = vec![3, 4, 5];
  let mut total = 0;
  for n in &nums {
      total += n;
  }
checks:
  - match: 'nums\.iter\(\)\.sum(::<i32>)?\(\)'
    message: "Try  let total: i32 = nums.iter().sum();"
  - notMatch: 'for\s'
    message: You don't need the for loop anymore.
output: "total == 12"
```
