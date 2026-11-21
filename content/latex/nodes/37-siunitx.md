---
title: Numbers and units
icon: "📏"
branch: math
requires: [math-mode]
summary: siunitx for consistent numbers, units and quantities.
---
Units should be upright, separated from the number by a thin space, and formatted the same way everywhere. The `siunitx` package does all of that:

```latex
\usepackage{siunitx}

The rod is \qty{1.5}{\metre} long and weighs \qty{2.3}{\kilo\gram}.
Light travels at \qty{299792458}{\metre\per\second}.
Avogadro's number is \num{6.022e23}.
The angle is \ang{45} and the range is \qtyrange{10}{20}{\celsius}.
A plain unit: \unit{\kilo\watt\hour}.
```

- `\num{...}` formats a number: digit grouping, proper minus signs, and `e23` becomes ×10²³.
- `\qty{number}{unit}` is a quantity. `\unit{...}` is a unit on its own.
- Units are built from names: `\kilo\metre`, `\per\second`, `\square\metre`. You can also write `\qty{9.81}{m/s^2}`.

## Settings

```latex
\sisetup{
  per-mode = symbol,        % m/s instead of m s⁻¹
  group-separator = {,},    % 1,000,000
  round-mode = places,
  round-precision = 2,
}
```

## Aligned table columns

The `S` column type aligns numbers on the decimal point in tables:

```latex
\begin{tabular}{l S[table-format=3.2]}
  Item & {Price} \\
  Tea  & 2.5 \\
  Cake & 12.75 \\
  Feast & 105.1
\end{tabular}
```

Put text in an `S` column inside braces, like `{Price}`.

```exercise
goal: "Use `\\qty` for the speed, with the units `\\kilo\\metre\\per\\hour`."
code: |
  The limit is 50 km/h.
checks:
  - match: '\\qty\{50\}\{\\kilo\\metre\\per\\hour\}'
    message: "Write \\qty{50}{\\kilo\\metre\\per\\hour}."
solution: |
  The limit is \qty{50}{\kilo\metre\per\hour}.
```

```quiz
question: "What does `\\num{1.2e-5}` print?"
options:
  - "1.2 × 10⁻⁵"
  - "1.2e-5 in monospace"
  - "0.000012"
answer: 0
explain: "siunitx turns e-notation into a proper power of ten."
```
