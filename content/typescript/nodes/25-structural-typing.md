---
title: "Structural typing"
icon: "🧩"
branch: "modeling"
requires: ["interfaces"]
summary: "Compatibility depends on the required shape, not a matching declaration name."
---
If you're coming from Java, C# or Kotlin, this lesson might change how you think about types. Here's a little experiment:

```typescript
interface Duck {
  quack(): string;
}

class Robot {
  quack() { return "BEEP. QUACK."; }
}

function listen(duck: Duck) {
  console.log(duck.quack());
}

listen(new Robot());                         // fine!
listen({ quack: () => "quack?" });           // also fine!
```

`Robot` never mentions `Duck`. There's no `implements`. And yet it's accepted. **Why?**

## Types are shapes, not names

TypeScript's check is: "does this value have everything `Duck` needs?" `Robot` has a `quack()` method returning a string, so it fits. This is [[structural typing]]: compatibility is decided by structure. Java and Kotlin use *nominal* typing, where a class only fits an interface it declares.

It fits JavaScript well, because most JavaScript objects are plain literals that were never declared as any class.

## A consequence: ask for less

Since anything with the right shape fits, a function should ask only for the properties it actually uses:

```typescript
// Demands a whole User, but reads one field.
function greet(user: User) {
  return `Hi ${user.name}`;
}

// Works with users, admins, authors, pets...
function greet(thing: { name: string }) {
  return `Hi ${thing.name}`;
}
```

The second version is easier to call and easier to test: no need to construct a full `User` in a test.

## And one risk

Two unrelated types with the same shape are interchangeable, even when you'd prefer they weren't:

```typescript
type Celsius = { value: number };
type Fahrenheit = { value: number };

const temp: Celsius = { value: 21 };
const oops: Fahrenheit = temp;   // fine, as far as the checker knows
```

Usually that's harmless. When it matters, add a distinguishing property, such as `unit: "C"`, to make the shapes differ.

```compare java
// Nominal: Robot must declare "implements Duck" to be accepted.
```

```compare go
// Go interfaces are structural too: no "implements" keyword.
```

```exercise
goal: "`greet` only reads `name`, but `Named` also demands a `score`, so the call fails. Ask only for what's used."
lang: typescript
code: |
  interface Named { name: string; score: number; }
  function greet(value: Named): string { return `Hello, ${value.name}`; }
  console.log(greet({ name: "Ada" }));
checks:
  - match: 'interface\s+Named\s*\{\s*name:\s*string;\s*\}'
    message: "Remove the score requirement from Named."
hint: Delete the property greet never reads.
solution: |
  interface Named { name: string; }
  function greet(value: Named): string { return `Hello, ${value.name}`; }
  console.log(greet({ name: "Ada" }));
```

```quiz
question: "A class `Printer` has a method `print(): void`, and doesn't mention any interface. Can it be passed where `interface Printable { print(): void }` is expected?"
options:
  - No; it must say implements Printable.
  - Yes; it has the right shape.
  - Only if it extends Printable.
answer: 1
explain: TypeScript compares structure. Matching members are enough.
```
