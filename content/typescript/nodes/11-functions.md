---
title: "Typed functions"
icon: "🔧"
branch: "functions"
requires: ["primitives"]
summary: "Type parameters and return values at the call boundary."
---
A typed function signature is a contract with two sides:

```typescript
function formatPrice(amount: number, currency: string): string {
  return `${amount.toFixed(2)} ${currency}`;
}
```

- **The caller promises** to pass a number and a string.
- **The function promises** to return a string.

The checker holds both sides to it. Let's break each promise and see.

**The caller breaks it:**

```typescript
formatPrice("12.5", "EUR");
//          ~~~~~~ Argument of type 'string' is not assignable
//                 to parameter of type 'number'.
formatPrice(12.5);
//~~~~~~~~~ Expected 2 arguments, but got 1.
```

Unlike JavaScript, where missing arguments silently become `undefined`, TypeScript counts them.

**The function breaks it:**

```typescript
function formatPrice(amount: number, currency: string): string {
  if (amount < 0) {
    return null;
  //~~~~~~ Type 'null' is not assignable to type 'string'.
  }
  return `${amount.toFixed(2)} ${currency}`;
}
```

## Should you write the return type?

The return type can be inferred, so it's optional. But writing it has a nice effect: **errors show up inside the function**, where the mistake is, rather than at some distant caller who got an unexpected type. A good habit: write return types on exported functions, and let small private helpers infer.

Arrow functions work the same way:

```typescript
const formatPrice = (amount: number, currency: string): string =>
  `${amount.toFixed(2)} ${currency}`;
```

## Functions that return nothing

Use `void` for functions that are called for their effect:

```typescript
function logPrice(amount: number): void {
  console.log(formatPrice(amount, "EUR"));
}
```

```compare python
def format_price(amount: float, currency: str) -> str:
    return f"{amount:.2f} {currency}"
```

```compare go
func FormatPrice(amount float64, currency string) string {
	return fmt.Sprintf("%.2f %s", amount, currency)
}
```

```exercise
goal: "The signature promises a `number`, but the body returns text. Return the sum itself."
lang: typescript
code: |
  function add(left: number, right: number): number {
    return String(left + right);
  }
  console.log(add(20, 22));
checks:
  - match: 'return\s+left\s*\+\s*right\s*;'
    message: "Return left + right without converting to text."
hint: Remove the String(...) conversion.
solution: |
  function add(left: number, right: number): number {
    return left + right;
  }
  console.log(add(20, 22));
```

```quiz
question: "Why write an explicit return type when TypeScript can infer it?"
options:
  - Inferred return types aren't checked.
  - Mistakes are reported inside the function, instead of at the callers.
  - It makes the function run faster.
answer: 1
explain: With an explicit return type, a wrong return value is flagged on the return line, where the bug actually is.
```
