---
title: if let and let else
icon: "🪝"
branch: data
requires: [match, option-result]
summary: Match just one pattern without a full match.
---
A full `match` is overkill when you only care about one case:

```rust
match config.port {
    Some(port) => println!("listening on {port}"),
    None => {}
}
```

`if let` says the same thing more directly:

```rust
if let Some(port) = config.port {
    println!("listening on {port}");
} else {
    println!("no port set");
}
```

Read it as: "if `config.port` matches the pattern `Some(port)`, run this with `port` bound".

**let else** flips it around. It binds the variable for the rest of the function, or bails out:

```rust
fn greet(name: Option<&str>) -> String {
    let Some(name) = name else {
        return "Hello, stranger".to_string();
    };
    format!("Hello, {name}")
}
```

The `else` block *must* leave: `return`, `break`, `continue` or a panic. This keeps the happy path unindented.

**while let** loops as long as the pattern keeps matching. Perfect for draining a stack:

```rust
let mut stack = vec![1, 2, 3];
while let Some(top) = stack.pop() {
    println!("{top}"); // 3, 2, 1
}
```

```compare python
if (port := config.port) is not None:
    print(f"listening on {port}")
```

```compare javascript
if (config.port != null) {
  console.log(`listening on ${config.port}`);
}
```

```compare java
config.port().ifPresent(port ->
    System.out.println("listening on " + port));
```

```compare kotlin
config.port?.let { port -> println("listening on $port") }
val name = name ?: return "Hello, stranger"
```

```compare go
if port, ok := config["port"]; ok { fmt.Println("listening on", port) }
```

```exercise
goal: Replace the match with an `if let`.
code: |
  match maybe_crab {
      Some(crab) => println!("found {crab}"),
      None => {}
  }
checks:
  - match: 'if\s+let\s+Some\(\s*crab\s*\)\s*=\s*maybe_crab'
    message: "Start with  if let Some(crab) = maybe_crab {"
  - notMatch: 'match\s'
    message: The match isn't needed anymore.
output: found Ferris
```
