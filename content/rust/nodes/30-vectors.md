---
title: Vectors
icon: "📋"
branch: collections
requires: [borrowing, loops]
summary: Vec<T>, the growable list you'll use everywhere.
---
A [[vector|Vec]] is a list that can grow. Make one with `Vec::new()` or the `vec!` macro:

```rust
let mut crabs: Vec<&str> = Vec::new();
crabs.push("Ferris");
crabs.push("Corro");

let primes = vec![2, 3, 5, 7];
```

Reading elements, two ways:

```rust
let first = primes[0];         // panics if out of range
let tenth = primes.get(9);     // Option<&i32>: None if out of range
```

Use `get` when the index might not exist; it hands you an `Option` instead of crashing.

Looping, three ways, depending on what you need:

```rust
for p in &primes { }        // borrow each element (&i32)
for p in &mut numbers { *p += 1; } // change each element
for p in primes { }         // consume the vector, taking each element
```

That last one **moves** the vector into the loop. Afterwards `primes` is gone.

Handy methods:

```repl
> let mut v = vec![3, 1, 2];
> v.sort(); v
[1, 2, 3]
> v.pop()
Some(3)
> v.contains(&1)
true
> v.len()
2
```

A `Vec<T>` derefs to a slice `&[T]`, so everything that works on slices works on vectors too.

```compare python
primes = [2, 3, 5, 7]
primes.append(11)
```

```compare javascript
const primes = [2, 3, 5, 7];
primes.push(11);
```

```compare java
List<Integer> primes = new ArrayList<>(List.of(2, 3, 5, 7));
primes.add(11);
```

```compare kotlin
val primes = mutableListOf(2, 3, 5, 7)
primes.add(11)
```

```compare go
primes := []int{2, 3, 5, 7}
primes = append(primes, 11)
```

```exercise
goal: Use `get` instead of indexing, so a missing element doesn't crash.
code: |
  let names = vec!["Ferris", "Corro"];
  let third = names[2];
checks:
  - match: 'names\.get\(\s*2\s*\)'
    message: Use names.get(2), which returns an Option.
output: third == None
```
