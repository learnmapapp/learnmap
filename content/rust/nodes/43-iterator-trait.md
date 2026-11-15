---
title: Implement Iterator
icon: "🎰"
branch: traits
requires: [iterators, generics]
summary: One method, next, and you get all the adapters for free.
---
`Iterator` is just a trait. Implement one method, `next`, and your type gets `map`, `filter`, `sum`, `zip` and dozens more for free:

```rust
struct Countdown {
    n: u32,
}

impl Iterator for Countdown {
    type Item = u32;

    fn next(&mut self) -> Option<u32> {
        if self.n == 0 {
            None
        } else {
            self.n -= 1;
            Some(self.n + 1)
        }
    }
}
```

`type Item = u32;` is an **associated type**: each implementation says which type it yields.

Now it works in a `for` loop and with every adapter:

```rust
for n in (Countdown { n: 3 }) {
    println!("{n}…"); // 3… 2… 1…
}

let total: u32 = Countdown { n: 4 }.map(|n| n * 10).sum(); // 100
```

Iterators can be infinite. That's fine, because they're lazy:

```rust
struct Fib { a: u64, b: u64 }

impl Iterator for Fib {
    type Item = u64;
    fn next(&mut self) -> Option<u64> {
        let r = self.a;
        (self.a, self.b) = (self.b, self.a + self.b);
        Some(r)
    }
}

let first: Vec<u64> = Fib { a: 0, b: 1 }.take(8).collect();
// [0, 1, 1, 2, 3, 5, 8, 13]
```

```tip
For quick one-offs, `std::iter::from_fn(|| ...)` and `std::iter::successors` build an iterator from a closure, no struct needed.
```

```compare python
def countdown(n):
    while n > 0:
        yield n
        n -= 1
```

```compare javascript
function* countdown(n) { while (n > 0) yield n--; }
```

```compare java
class Countdown implements Iterator<Integer> { public boolean hasNext() {...} public Integer next() {...} }
```

```compare kotlin
fun countdown(n: Int) = sequence { var i = n; while (i > 0) yield(i--) }
```

```compare go
for n := range countdown(3) { } // range-over-func iterators, Go 1.23+
```

```exercise
goal: Fill in the associated type, so Evens yields u32 values.
code: |
  impl Iterator for Evens {
      fn next(&mut self) -> Option<u32> {
          self.n += 2;
          Some(self.n)
      }
  }
checks:
  - match: 'type\s+Item\s*=\s*u32\s*;'
    message: "Add  type Item = u32;  inside the impl."
output: "[2, 4, 6]"
```
