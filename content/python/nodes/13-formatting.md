---
title: "Formatting text"
icon: "📝"
branch: "collections"
requires: ["numbers", "strings", "functions"]
summary: "Embed values with f-strings and control their presentation."
---
Put an `f` in front of a string and you can drop expressions into it with `{}`. That's an [[f-string]], and it's how modern Python builds text:

```python
name = "Ada"
items = 3
print(f"{name} bought {items} items")          # Ada bought 3 items
print(f"Next year {name} turns {36 + 1}")      # any expression works
```

## The bit after the colon

Inside the braces, a colon starts a tiny formatting language. Let's print a receipt and see what each piece does:

```python
lines = [("Coffee", 2.5), ("Croissant", 3.25), ("Juice", 4)]
for item, price in lines:
    print(f"{item:<12}{price:>8.2f}")
print(f"{'Total':<12}{9.75:>8.2f}")
```

```text
Coffee          2.50
Croissant       3.25
Juice           4.00
Total           9.75
```

Decoding the spec `{price:>8.2f}`:

| Piece | Means |
| --- | --- |
| `>` | align right (`<` is left, `^` is centre) |
| `8` | take up at least 8 characters |
| `.2f` | fixed-point with 2 decimals |

A few more you'll use all the time:

```repl
> f"{1234567:,}"
'1,234,567'
> f"{0.257:.1%}"
'25.7%'
> f"{7:03}"
'007'
```

## The debugging trick

Add `=` after an expression, and Python prints its source too. It's great for quick debugging:

```repl
> total = 9.75
> f"{total=}"
'total=9.75'
> f"{total * 2 = }"
'total * 2 = 19.5'
```

```tip
You'll see older styles in existing code: `"%s bought %d" % (name, items)` and `"{} bought {}".format(name, items)`. They still work. For new code, f-strings are the clearest choice.
```

```compare javascript
`${name} bought ${items} items`   // template literal
price.toFixed(2)                    // a separate method call
```

```compare kotlin
"$name bought $items items"
"%.2f".format(price)
```

```exercise
goal: "Show `price` with exactly two decimals, so it prints `Price: 12.50`."
lang: python
code: |
  price = 12.5
  print(f"Price: {price}")
checks:
  - match: '\{price:\.2f\}'
    message: "Add :.2f inside the braces: {price:.2f}."
hint: The format spec goes after a colon inside the braces.
solution: |
  price = 12.5
  print(f"Price: {price:.2f}")
```

```quiz
question: "What does `f\"{3:>4}\"` produce?"
options:
  - "`'3   '`"
  - "`'   3'`"
  - "`'0003'`"
answer: 1
explain: The > aligns right inside a field of 4 characters, so three spaces come first.
```
