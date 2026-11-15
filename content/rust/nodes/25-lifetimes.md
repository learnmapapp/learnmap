---
title: Lifetimes
icon: "⏳"
branch: memory
requires: [slices]
summary: How Rust knows a reference never outlives its data.
---
Every reference has a **lifetime**: the stretch of code where it's valid. Usually the compiler works it out quietly. Sometimes it can't, and asks you:

```rust
fn longest(a: &str, b: &str) -> &str {
    if a.len() > b.len() { a } else { b }
}
```

```repl shell
> cargo build
error[E0106]: missing lifetime specifier
  help: this function's return type contains a borrowed value, but the signature
        does not say whether it is borrowed from `a` or `b`
```

The returned reference points into `a` or `b`. The caller needs to know how long it's valid. You answer with a **lifetime parameter**, written `'a`:

```rust
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() { a } else { b }
}
```

Read it as: "the result lives as long as *both* inputs do". Lifetimes don't change how long anything lives. They describe relationships, so the compiler can check the caller:

```rust
let result;
{
    let short = String::from("hi");
    result = longest("hello", &short);
}
println!("{result}"); // error: `short` does not live long enough
```

Structs that hold references need one too:

```rust
struct Excerpt<'a> {
    text: &'a str,
}
```

```tip
Most of the time you don't write lifetimes. If a function takes one reference and returns one, Rust assumes they're linked. When the annotations get hairy, owning the data (a `String` instead of `&str`) is often the simpler answer.
```

`'static` is the longest lifetime: the whole program. String literals are `&'static str`, they're baked into the binary.

```compare java
// Java's garbage collector keeps referenced objects alive, so this question never comes up.
```

```compare kotlin
// The garbage collector keeps objects alive for as long as anything refers to them.
```

```compare go
// Go's escape analysis moves such values to the heap; the GC handles the rest.
```

```compare python
# Reference counting and a GC keep values alive as long as needed.
```

```compare javascript
// The garbage collector keeps values alive; no annotations needed.
```

```exercise
goal: Add the lifetime `'a` so this compiles.
code: |
  fn first_word(a: &str, b: &str) -> &str {
      if a < b { a } else { b }
  }
checks:
  - match: 'fn\s+first_word\s*<\s*''a\s*>'
    message: "Declare the lifetime after the name: first_word<'a>"
  - match: 'a\s*:\s*&''a\s+str\s*,\s*b\s*:\s*&''a\s+str\s*\)\s*->\s*&''a\s+str'
    message: "Use &'a str for both parameters and the return type."
output: first_word("crab", "apple") == "apple"
```
