---
title: match
icon: "🎯"
branch: data
requires: [enums, control-flow]
summary: Pattern matching that never forgets a case.
---
`match` compares a value against patterns, one by one, and runs the first arm that fits. It's [[pattern matching]]: checking the shape *and* pulling data out in one go:

```rust
fn area(s: &Shape) -> f64 {
    match s {
        Shape::Circle { radius } => 3.14 * radius * radius,
        Shape::Rectangle { width, height } => width * height,
        Shape::Point => 0.0,
    }
}
```

The best part: `match` must be **exhaustive**. Add a new variant to `Shape`, and every `match` that forgets it stops compiling:

```repl shell
> cargo build
error[E0004]: non-exhaustive patterns: `&Shape::Point` not covered
```

When you really don't care about the rest, `_` matches anything:

```rust
match number {
    0 => "zero",
    1..=9 => "small",
    _ => "big",
}
```

```compare java
return switch (s) {
    case Circle c -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.width() * r.height();
    case Point p -> 0.0;
};
```

```compare kotlin
when (s) {
    is Shape.Circle -> PI * s.radius * s.radius
    is Shape.Rectangle -> s.width * s.height
    Shape.Point -> 0.0
}
```

```compare python
match s:
    case Circle(radius=r): return 3.14 * r * r
    case Rectangle(width=w, height=h): return w * h
    case Point(): return 0.0
```

```compare javascript
switch (s.kind) {
  case "circle": return 3.14 * s.radius ** 2;
  // nothing reminds you about a missing case
}
```

```compare go
switch v := s.(type) {
case Circle: return 3.14 * v.Radius * v.Radius
default: return 0 // the compiler won't check for missing cases
}
```

```exercise
goal: The compiler complains that `Light::Green` isn't covered. Fix it.
code: |
  match light {
      Light::Red => "stop",
      Light::Yellow => "careful",
  }
checks:
  - match: 'Light::Green\s*=>|_\s*=>'
    message: Add an arm for Light::Green.
output: '"go"'
```

## match is an expression

Like `if`, a `match` produces a value, so every arm must produce the same type:

```rust
let message = match status {
    200 => "ok",
    404 => "not found",
    500..=599 => "server error",
    _ => "something else",
};
```

Arms are checked top to bottom, so put specific patterns before general ones. If a later arm can never be reached, the compiler warns you.

An arm can run a whole block with `{ … }`. And `match` works on tuples, which makes checking two things at once tidy:

```rust
match (is_admin, is_owner) {
    (true, _) => "full access",
    (false, true) => "edit",
    (false, false) => "read only",
}
```

There's more in [Patterns in depth](node:patterns).

```quiz
question: "What does _ mean in a match arm?"
options:
  - The value must be empty.
  - Match anything, and don't bind it.
  - Skip this match entirely.
answer: 1
explain: _ is the catch-all pattern. It matches any value without giving it a name.
```
