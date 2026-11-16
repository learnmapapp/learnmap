---
title: "Typed classes"
icon: "🏗️"
branch: "objects"
requires: ["interfaces", "functions"]
summary: "Type instance state and distinguish static restrictions from runtime privacy."
---
JavaScript classes work as you know them. TypeScript adds types for fields, and a few keywords. Here's a bank account, written twice.

**Plain JavaScript:**

```javascript
class Account {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
  }
}
```

**TypeScript:**

```typescript
class Account {
  readonly owner: string;
  private balance: number;

  constructor(owner: string, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
  }

  get current(): number {
    return this.balance;
  }
}
```

What changed:

- **Fields are declared up front**, with types. In strict mode, each must be set in the constructor or have a default, or you'll hear about it.
- **`readonly`** fields can only be set in the constructor.
- **`private`** fields can only be used inside the class. `account.balance = 1_000_000` from outside is a compile error.

## The shortcut: parameter properties

Declaring, accepting and assigning each field is repetitive. Put a modifier in front of a constructor parameter, and TypeScript does all three:

```typescript
class Account {
  constructor(
    readonly owner: string,
    private balance = 0,
  ) {}
}
```

Same class, much shorter. You'll see this a lot in Angular and NestJS code.

## `private` versus `#private`

There are two kinds of private:

| | `private balance` | `#balance` |
| --- | --- | --- |
| Comes from | TypeScript | JavaScript itself |
| Enforced | at compile time only | at runtime too |

`private` is erased with the other types, so plain JavaScript can still reach the field. `#balance` is truly hidden. Either is fine; just pick one per codebase.

```tip
Many TypeScript codebases use few classes, and prefer plain objects plus functions. Classes are good for things with identity and state, like this account. Data alone is often a simple object type.
```

```compare java
public class Account {
    private final String owner;
    private long balance;
}
```

```compare kotlin
class Account(val owner: String, private var balance: Long = 0)
```

```exercise
goal: "The counter starts at 0 and gets incremented, but the field is declared as `string`. Fix the field's type."
lang: typescript
code: |
  class Counter {
    private value: string;
    constructor(start = 0) { this.value = start; }
    increment(): number { return ++this.value; }
  }
  console.log(new Counter().increment());
checks:
  - match: 'private\s+value:\s*number;'
    message: "Use number for the counter field."
hint: The start value tells you the type.
solution: |
  class Counter {
    private value: number;
    constructor(start = 0) { this.value = start; }
    increment(): number { return ++this.value; }
  }
  console.log(new Counter().increment());
```

```quiz
question: "What does `constructor(private name: string) {}` do?"
options:
  - Only declares a parameter.
  - Declares a private field called name and assigns the argument to it.
  - Makes the constructor private.
answer: 1
explain: A modifier on a constructor parameter turns it into a parameter property.
```
