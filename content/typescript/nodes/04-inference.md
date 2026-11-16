---
title: "Type inference"
icon: "🔎"
branch: "basics"
requires: ["tsconfig"]
summary: "Let the checker infer obvious types; annotate useful boundaries."
---
A common first reaction to TypeScript: "So I have to write types on everything?" Mostly, no. The checker works out a lot by itself. That's [[inference]], and it's easiest to see by hovering in your editor. Here's what the tooltips would show:

```typescript
let count = 0;                    // let count: number
const name = "Ada";               // const name: "Ada"
const scores = [90, 85, 77];      // const scores: number[]
const user = { name, active: true };
// const user: { name: string; active: boolean }

function double(n: number) {      // function double(n: number): number
  return n * 2;
}
```

You wrote one annotation, `n: number`, and everything else was figured out. (`const name` gets the exact type `"Ada"` rather than `string`, because a `const` can never change. [Literal types](node:literal-types) explains why that's useful.)

## Where inference can't help: parameters

The checker can work out a variable's type from its value. A parameter has no value until someone calls the function, so there's nothing to infer from:

```typescript
function double(value) {
  //            ~~~~~ Parameter 'value' implicitly has an 'any' type.
  return value * 2;
}
```

In [strict mode](node:tsconfig), that's an error. Annotate it, and callers get checked:

```typescript
function double(value: number) {
  return value * 2;
}
double("21");
//     ~~~~ Argument of type 'string' is not assignable
//          to parameter of type 'number'.
```

## A rule of thumb

- **Annotate** function parameters, and exported functions' return types (they're your public contract).
- **Let inference work** for local variables.
- **Annotate** a variable when it starts empty and gets filled later. `const ids = []` doesn't tell the checker what will go in it, so write `const ids: string[] = []`.

```compare kotlin
val count = 0            // Kotlin infers locals the same way
fun double(n: Int) = n * 2
```

```compare java
var count = 0;           // Java's var: inferred locals, since Java 10
```

```exercise
goal: "`value` is implicitly `any`, so callers aren't checked. Annotate the parameter as a number."
lang: typescript
code: |
  function double(value) {
    return value * 2;
  }
  console.log(double(21));
checks:
  - match: 'value:\s*number'
    message: "Add : number after value."
hint: The annotation goes right after the parameter name.
solution: |
  function double(value: number) {
    return value * 2;
  }
  console.log(double(21));
```

```quiz
question: "What type does TypeScript infer for `let total = 0`?"
options:
  - "`0`"
  - "`number`"
  - "`any`"
answer: 1
explain: A let can be reassigned later, so it gets the general type number. A const would get the exact type 0.
```
