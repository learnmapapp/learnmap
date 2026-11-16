---
title: "Primitive types"
icon: "🔢"
branch: "basics"
requires: ["inference"]
summary: "Use string, number, and boolean rather than wrapper-object types."
---

The everyday primitive types use lowercase names:

```typescript
const name: string = "Ada";
const score: number = 42;
const active: boolean = true;
console.log(`${name}: ${score}, active=${active}`);
```

`number` covers ordinary integer and floating-point values. TypeScript does not create a separate safe integer type automatically. JavaScript's `bigint` is distinct, and arithmetic cannot freely mix it with `number`.

## Types do not convert values

An annotation describes a value; it does not parse text. `Number("42")` performs a runtime conversion, while writing `: number` does not.

```typescript
const input = "42";
const parsed = Number(input);
console.log(Number.isFinite(parsed)); // true
```

Capitalized `String`, `Number`, and `Boolean` describe wrapper objects and are almost never what you want for ordinary values. Use lowercase primitives in application contracts.

`null` and `undefined` have their own types under strict `null` checking. A value that can be absent needs that possibility represented explicitly, rather than assuming every variable can silently hold anything.

```compare python
score: int = int("42")  # annotations alone do not convert here either
```

```compare javascript
const score = Number("42");
```

```exercise
goal: Convert the text before assigning it to a number.
lang: typescript
code: |
  const input = "42";
  const score: number = input;
  console.log(score + 1);
checks:
  - match: Number\(input\)
    message: Use Number(input) to convert the text.
hint: Use `Number(input)` to convert the text.
```

```quiz
question: "Does a : number annotation parse a numeric string?"
options:
  - "Yes."
  - "No; conversion requires runtime code."
  - "Only for constants."
answer: 1
explain: "Annotations describe expected types; Number or another parser performs conversion."
```
