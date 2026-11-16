---
title: Borrowing
icon: "🤝"
branch: memory
requires: [ownership, structs]
summary: Use a value without taking it, with & and &mut.
---
Moving everything around would get tiring fast. Usually a function only needs to *look* at a value, so you [[borrow]] it with `&`:

```rust
fn shout(text: &String) -> String {
    text.to_uppercase()
}

let name = String::from("ferris");
let loud = shout(&name);
println!("{name} {loud}"); // name is still ours
```

Need to change it? Borrow mutably with `&mut`:

```rust
fn add_claw(text: &mut String) {
    text.push_str(" 🦀");
}
```

The [[borrow checker]] enforces one rule: at any moment you may have **either** any number of `&` references, **or** exactly one `&mut`. Never both.

```repl shell
> cargo build
error[E0502]: cannot borrow `list` as mutable because it is also borrowed as immutable
```

That single rule makes data races impossible, and means nothing can change a value while you're reading it.

```tip
In function parameters, `&str` is nicer than `&String`: it accepts both string literals and `String`s.
```

```compare java
// Java passes object references freely; nothing stops two threads changing one list.
void addClaw(StringBuilder text) { text.append(" 🦀"); }
```

```compare kotlin
// Kotlin passes references freely; read-only vs mutable is only a type-level hint.
fun addClaw(text: StringBuilder) { text.append(" 🦀") }
```

```compare go
// Like passing a pointer, but checked at compile time.
func addClaw(text *string) { *text += " 🦀" }
```

```compare python
# Python passes references to everything; nothing stops shared mutation.
def add_claw(items: list): items.append("🦀")
```

```compare javascript
// JS shares objects freely; nothing stops shared mutation.
function addClaw(items) { items.push("🦀"); }
```

```exercise
goal: Let `measure` borrow the string, so `name` can still be printed afterwards.
code: |
  fn measure(s: String) -> usize { s.len() }

  let name = String::from("ferris");
  let n = measure(name);
  println!("{name} has {n} letters");
checks:
  - match: 'fn\s+measure\s*\(\s*s\s*:\s*&(String|str)\s*\)'
    message: Make the parameter a reference, &String or &str.
  - match: 'measure\(\s*&name\s*\)'
    message: Pass a reference at the call site too, &name.
output: ferris has 6 letters
```

## References are always valid

A reference can never outlive the thing it points to. This classic C bug can't happen:

```rust
fn dangle() -> &String {
    let s = String::from("gone");
    &s
} // s is dropped here, so the reference would point at nothing
```

```repl shell
> cargo build
error[E0106]: missing lifetime specifier
  help: consider returning an owned value: `String`
```

The fix is to return the `String` itself. More in [Lifetimes](node:lifetimes).

One more thing that surprises people: a borrow ends after its **last use**, not at the end of the block. So this is fine:

```rust
let mut v = vec![1, 2];
let first = &v[0];
println!("{first}");  // last use of the borrow
v.push(3);            // fine now
```

```quiz
question: Which rule applies to overlapping active borrows of the same value?
options:
  - Mutable borrows are allowed only for global variables.
  - One exclusive mutable borrow, or shared read-only borrows.
  - Any number of independent mutable and shared borrows together.
answer: 1
explain: A mutable borrow requires exclusive access while it is in use.
```
