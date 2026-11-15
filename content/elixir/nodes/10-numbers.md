---
title: Numbers and math
icon: "🔢"
branch: basics
requires: [iex]
summary: Integers that never overflow, floats, div and rem.
---
Elixir has integers and floats. Integers have no size limit, so they never overflow:

```repl
> 1 + 2
3
> 2 ** 100
1267650600228229401496703205376
> 1_000_000 * 3
3000000
```

Here's the first surprise: `/` **always** returns a float.

```repl
> 10 / 2
5.0
> div(10, 3)
3
> rem(10, 3)
1
```

For whole-number division use `div/2`, and for the remainder `rem/2`. They're functions, not operators.

Floats round the usual way, with helpers in `Float` and `Integer`:

```repl
> Float.round(3.14159, 2)
3.14
> round(2.5)
3
> trunc(9.99)
9
> Integer.to_string(255, 16)
"FF"
```

`1 == 1.0` is true (same value), but `1 === 1.0` is false (different types).

```compare python
10 / 2   # 5.0, same as Elixir
10 // 3  # 3, like div(10, 3)
10 % 3   # 1, like rem(10, 3)
```

```compare javascript
10 / 3;            // 3.333…
Math.floor(10 / 3); // 3
10 % 3;            // 1
```

```compare java
10 / 3;  // 3 (integer division)
10 % 3;  // 1
```

```compare kotlin
10 / 3   // 3
10 % 3   // 1
```

```compare go
10 / 3 // 3
10 % 3 // 1
```

```exercise
goal: Get the whole number of boxes, without a float.
code: |
  boxes = 17 / 5
checks:
  - match: 'div\(\s*17\s*,\s*5\s*\)'
    message: Use div(17, 5) for integer division.
output: "3"
```
