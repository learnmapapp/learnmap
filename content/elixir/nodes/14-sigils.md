---
title: Sigils
icon: "〰️"
branch: basics
requires: [strings]
summary: "~w for word lists, ~r for regexes, ~D for dates, and more."
---
A [[sigil]] is a shortcut for writing special kinds of text. It starts with `~`, a letter, and a pair of delimiters:

```repl
> ~w(apple banana cherry)
["apple", "banana", "cherry"]
> ~w(red green)a
[:red, :green]
> ~s(She said "hi")
"She said \"hi\""
```

`~w` splits words into a list (add `a` for atoms). `~s` makes a string without escaping quotes.

**Regular expressions** use `~r`:

```repl
> "drop@elixir.org" =~ ~r/@/
true
> Regex.run(~r/(\d+)-(\d+)/, "call 555-1234")
["555-1234", "555", "1234"]
> String.replace("a1b2", ~r/\d/, "#")
"a#b#"
```

**Dates and times**, checked at compile time:

```repl
> ~D[2026-11-15]
~D[2026-11-15]
> Date.add(~D[2026-11-15], 30)
~D[2026-12-15]
> ~T[09:30:00]
~T[09:30:00]
```

You can use `()`, `[]`, `{}`, `//`, `||` or quotes as delimiters, whichever avoids escaping. Libraries define their own sigils too; Phoenix uses `~H` for HTML templates.

```compare python
"apple banana cherry".split()
re.search(r"@", email)
```

```compare javascript
"apple banana cherry".split(" ");
/@/.test(email);
```

```compare java
Pattern.compile("@").matcher(email).find();
```

```compare kotlin
"apple banana cherry".split(" ")
Regex("@").containsMatchIn(email)
```

```compare go
strings.Fields("apple banana cherry")
regexp.MustCompile(`@`).MatchString(email)
```

```exercise
goal: Write the same list with the ~w sigil.
code: |
  colors = ["red", "green", "blue"]
checks:
  - match: '~w[(\[{/|]\s*red\s+green\s+blue\s*[)\]}/|]'
    message: 'Use ~w(red green blue)'
output: '["red", "green", "blue"]'
```
