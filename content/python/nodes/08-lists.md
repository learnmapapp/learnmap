---
title: "Lists"
icon: "📋"
branch: "collections"
requires: ["strings"]
summary: "Ordered, growable collections with zero-based indexing."
---
**Scenario:** you're writing a shopping list app. Here's the list, in square brackets:

```python
basket = ["apples", "bread", "coffee"]
```

Items can be anything (numbers, strings, even other lists), and they can be mixed, though in practice one kind per list keeps things sane.

You read items by position, starting at 0, just like [strings](node:strings):

```repl
> basket = ["apples", "bread", "coffee"]
> basket[0]
'apples'
> basket[-1]
'coffee'
> len(basket)
3
```

## Changing the list

Unlike strings, lists are [[mutable]]: you change them in place.

```python
basket.append("milk")        # add to the end
basket.insert(0, "bananas")  # add at a position
basket.remove("bread")       # remove the first match
last = basket.pop()          # remove and return the last item
basket[0] = "pears"          # replace an item
```

To check if something is in the list, use `in`:

```python
if "coffee" in basket:
    print("Don't forget the filter papers")
```

## The trap everyone falls into once

Methods that change a list in place return `None`, Python's "nothing" value. So this innocent-looking line destroys your list:

```repl
> basket = ["apples"]
> basket = basket.append("milk")
> print(basket)
None
```

`append` added the milk, returned `None`, and then the assignment stuck the `basket` label on that `None`. Just call it on its own line: `basket.append("milk")`. The same goes for `sort()`, `reverse()` and `remove()`.

```tip
Want a sorted **copy** instead? `sorted(basket)` returns a new list and leaves the original alone. [Lambdas and sorting](node:lambdas-sorting) goes further.
```

```compare javascript
basket.push("milk");    // JS's push returns the new length
```

```compare java
List<String> basket = new ArrayList<>(List.of("apples", "bread"));
basket.add("milk");
```

```exercise
goal: "The list ends up as `None`. Add \"Nix\" while keeping the list."
lang: python
code: |
  languages = ["Python", "Rust"]
  languages = languages.append("Nix")
  print(languages)
checks:
  - match: '^languages\.append\(\s*["'']Nix["'']\s*\)\s*$'
    message: Call languages.append("Nix") on its own line, without assigning the result.
hint: append changes the list itself and returns None.
solution: |
  languages = ["Python", "Rust"]
  languages.append("Nix")
  print(languages)
```

```quiz
question: "What does `[\"a\", \"b\"].append(\"c\")` return?"
options:
  - "`['a', 'b', 'c']`"
  - "`None`"
  - "`3`"
answer: 1
explain: In-place methods return None. The list itself changed, but the call doesn't hand it back.
```
