---
title: Booleans and nil
icon: "⚖️"
branch: basics
requires: [basic-types]
summary: true, false, nil, and the two kinds of and/or.
---
`true`, `false` and `nil` are just [[atom|atoms]]: `true == :true`. `nil` means "nothing here".

Elixir has two families of boolean operators.

**Strict**: `and`, `or`, `not` demand an actual boolean on the left:

```repl
> true and false
false
> 1 and true
error: ** (BadBooleanError) expected a boolean on left-side of "and", got: 1
```

**Relaxed**: `&&`, `||`, `!` work with any value. Only `false` and `nil` count as "falsy"; **everything else is truthy**, including `0`, `""` and `[]`:

```repl
> nil || "default"
"default"
> 0 || "default"
0
> "" && "yes"
"yes"
> !nil
true
```

`||` is the handy "fallback value" trick: `name = input || "stranger"`.

Comparison works across all types, with `==`, `!=`, `<`, `>`, `<=`, `>=`, plus the strict `===` and `!==`.

```warn
`0` and `""` are truthy in Elixir, unlike JavaScript and Python. Only `false` and `nil` are falsy.
```

```compare javascript
0 || "default"; // "default" (0 is falsy in JS!)
```

```compare python
0 or "default"  # "default" (0 is falsy in Python!)
```

```compare kotlin
val name = input ?: "stranger" // only null triggers the fallback
```

```compare java
String name = input != null ? input : "stranger";
```

```compare go
// No truthiness: conditions must be bool.
```

```quiz
question: What does  `0 || :fallback`  return?
options:
  - :fallback
  - "0"
  - "`false`"
answer: 1
explain: 0 is truthy in Elixir, so || returns it. Only `nil` and `false` trigger the fallback.
```
