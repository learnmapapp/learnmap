---
title: "Arrays"
icon: "📋"
branch: "basics"
requires: ["primitives"]
summary: "Describe element types and remember that indexes can miss."
---
An array type says what's **inside** the array. There are two spellings, and they mean the same thing:

```typescript
const scores: number[] = [90, 85, 77];
const names: Array<string> = ["Ada", "Grace"];
```

`number[]` is the common one. You'll see `Array<string>` too, and it'll make more sense after [Generics](node:generics).

## What the checker does for you

Once it knows the element type, the checker follows it through every array method. Watch the types flow (these are hover results):

```typescript
const scores = [90, 85, 77];                   // number[]
const labels = scores.map(s => `${s}%`);       // string[]
const passed = scores.filter(s => s >= 80);    // number[]
const best = Math.max(...scores);              // number
```

And it stops mistakes:

```typescript
scores.push("100");
//          ~~~~~ Argument of type 'string' is not assignable
//                to parameter of type 'number'.
```

## Mixed arrays

If an array really holds more than one kind of thing, say so with a [union](node:unions):

```typescript
const ids: (string | number)[] = [1, "a7", 2];
```

The brackets matter: `string | number[]` would mean "a string, **or** an array of numbers".

## The one gap: reading by index

Look at this:

```typescript
const scores: number[] = [90, 85];
const third = scores[2];     // type: number. Value: undefined!
```

By default, TypeScript assumes an index is in range. The compiler option `noUncheckedIndexedAccess` makes `scores[2]` have type `number | undefined`, so you're forced to check. It's not part of `strict`, but many teams turn it on.

```compare java
List<Integer> scores = List.of(90, 85, 77);
int[] raw = {90, 85, 77};
```

```compare python
scores: list[int] = [90, 85, 77]
```

```exercise
goal: "The array holds numbers, but it's annotated as `string[]`. Fix the element type."
lang: typescript
code: |
  const scores: string[] = [10, 20];
  console.log(scores.map(score => score * 2));
checks:
  - match: 'scores:\s*number\[\]'
    message: Annotate scores as number[].
hint: Name the type of the elements, followed by [].
solution: |
  const scores: number[] = [10, 20];
  console.log(scores.map(score => score * 2));
```

```quiz
question: "What does `string | number[]` mean?"
options:
  - An array of strings and numbers.
  - Either a string, or an array of numbers.
  - An array of strings, or a number.
answer: 1
explain: The [] binds tightly to number. For a mixed array, write (string | number)[].
```
