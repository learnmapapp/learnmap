---
title: Ownership
icon: "🔑"
kind: hub
branch: memory
requires: [functions, types]
summary: Every value has exactly one owner.
---
Here's the big idea. Most languages either make you free memory yourself (C) or run a garbage collector (Java, Python, Go, JavaScript). Rust does neither. It uses three rules about [[ownership]]:

1. Every value has one **owner**, a variable.
2. There's only one owner at a time.
3. When the owner goes out of scope, the value is dropped (cleaned up).

The surprising part is rule 2. Assigning a `String` to another variable doesn't copy it, it **moves** it:

```rust
let a = String::from("crab");
let b = a;              // ownership moves to b
println!("{a}");
```

```repl shell
> cargo build
error[E0382]: borrow of moved value: `a`
  value moved here: `let b = a;`
```

After the [[move]], `a` is empty, so Rust won't let you use it. That's how Rust knows exactly when to free memory, with no garbage collector and no double frees.

Small, simple values like numbers and `bool` are copied instead, so they don't have this problem. If you really want a full copy of a `String`, ask for it with `.clone()`.

```compare java
// In Java, both names point to the same object, and the GC frees it
// later.
String a = "crab";
String b = a;
```

```compare python
# In Python, both names share one object; reference counting cleans up.
a = "crab"
b = a
```

```compare javascript
// Both names share the value; the garbage collector cleans up later.
const a = "crab";
const b = a;
```

```compare kotlin
// Both names reference one object; the JVM GC frees it later.
val a = "crab"
val b = a
```

```compare go
// Go copies the string header, both stay usable; the GC frees memory
// later.
a := "crab"
b := a
```

```exercise
goal: Keep both `a` and `b` usable by making an explicit copy.
code: |
  let a = String::from("crab");
  let b = a;
  println!("{a} {b}");
checks:
  - match: 'let\s+b\s*=\s*a\.clone\(\)'
    message: Ask for a copy with .clone()
output: crab crab
```

## Moving into functions

Passing a value to a function moves it too, exactly like assigning it:

```rust
fn eat(food: String) {
    println!("nom {food}");
} // food is dropped here

let snack = String::from("kelp");
eat(snack);
eat(snack); // error: use of moved value
```

Returning a value moves it back out. You *could* pass ownership back and forth all day, but that gets clumsy, which is exactly why [borrowing](node:borrowing) exists.

Where does this come from? Strings, vectors and boxes keep their data on the **heap**, and the variable on the stack is just a small handle to it. Ownership decides which handle frees the heap data. Plain numbers live entirely on the stack, so copying them is cheap and safe.

```quiz
question: "`let a = vec![1]; let b = a;`  Which variable can you still use?"
options:
  - Both
  - Only a
  - Only b
answer: 2
explain: The vector moved to b. Using a afterwards is a compile error.
```
