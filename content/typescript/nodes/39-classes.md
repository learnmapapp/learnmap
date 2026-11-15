---
title: "Typed classes"
icon: "🏗️"
branch: "objects"
requires: ["interfaces", "functions"]
summary: "Type instance state and distinguish static restrictions from runtime privacy."
---

Classes keep their JavaScript construction and method behavior, with types added to instance members:

```typescript
class Counter {
  private value: number;
  constructor(start = 0) {
    this.value = start;
  }
  increment(): number {
    this.value += 1;
    return this.value;
  }
}
console.log(new Counter(10).increment()); // 11
```

Strict property initialization checks that declared fields are initialized, assigned in construction, or explicitly handled in another supported way.

## Two forms of privacy

TypeScript's `private` restricts checked access but does not provide the same runtime privacy as JavaScript `#private` fields. Use `#value` when actual JavaScript private-field semantics are part of the design.

A parameter property such as `constructor(private value = 0) {}` is shorthand for declaring and initializing a field. It is one example of TypeScript syntax that generates runtime code rather than merely disappearing.

Use classes when instances and behavior fit the model. Functions with plain typed objects are often sufficient for data transformations.

```exercise
goal: "Declare the field as a number to match construction and updates."
lang: typescript
code: |
  class Counter {
    private value: string;
    constructor(start = 0) { this.value = start; }
    increment(): number { return ++this.value; }
  }
  console.log(new Counter().increment());
checks:
  - match: "private\\s+value:\\s+number;"
    message: "Use number for the counter field."
hint: "Use number for the counter field."
```

```quiz
question: "Which form supplies JavaScript runtime private-field semantics?"
options:
  - "The TypeScript private modifier alone."
  - "#private fields."
  - "An underscore in the name."
answer: 1
explain: "# fields use JavaScript runtime privacy; TypeScript private is primarily a checking restriction."
```
