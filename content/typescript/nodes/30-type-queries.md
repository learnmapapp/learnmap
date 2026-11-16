---
title: "Type queries"
icon: "🔭"
branch: "generics"
requires: ["inference", "type-aliases"]
summary: "Derive a type from a value with typeof in a type position."
---
Usually you write a type, then create values that match it. Sometimes it's nicer the other way round: you already have a value, and you want its type. In a **type** position, `typeof` does that.

```typescript
const defaults = {
  retries: 3,
  timeoutMs: 5000,
  label: "api",
};

type Settings = typeof defaults;
// { retries: number; timeoutMs: number; label: string }
```

Add a property to `defaults`, and `Settings` updates by itself. No second definition to keep in sync.

## Two `typeof`s

JavaScript already has a `typeof` operator. TypeScript reuses the word in type positions, and it does something different there:

```typescript
// In an expression: the JavaScript operator, run at runtime.
if (typeof value === "string") { /* ... */ }

// After "type X =" or ":": the TypeScript one, compile time only.
type Settings = typeof defaults;                  // a whole type
```

Where it's written tells you which one it is.

## Where it shines

**Functions you didn't write.** `ReturnType` (from [utility types](node:utility-types)) with `typeof` gives you a function's result type:

```typescript
function createStore() {
  return { items: [] as string[], add(item: string) { /* ... */ } };
}

type Store = ReturnType<typeof createStore>;
```

**Config objects.** Combined with [keyof](node:keyof):

```typescript
type SettingName = keyof typeof defaults;
// "retries" | "timeoutMs" | "label"
```

```warn
`typeof` only works on values (variables, functions, imports), not on types. `typeof User`, where User is a type alias, is an error. You already have that type: just write `User`.
```

```compare python
# No direct equivalent; you'd write a TypedDict by hand.
```

```compare go
// No equivalent: Go types are always declared explicitly.
```

```exercise
goal: "`defaults` is a value, so it can't be used as a type directly. Derive `Settings` from it with `typeof`."
lang: typescript
code: |
  const defaults = { retries: 3, label: "Learner" };
  type Settings = defaults;
  const settings: Settings = { retries: 2, label: "Course" };
  console.log(settings);
checks:
  - match: 'type\s+Settings\s*=\s*typeof\s+defaults;'
    message: "Use typeof defaults in the type alias."
hint: Put typeof in front of the value.
solution: |
  const defaults = { retries: 3, label: "Learner" };
  type Settings = typeof defaults;
  const settings: Settings = { retries: 2, label: "Course" };
  console.log(settings);
```

```quiz
question: "`const port = 8080; type P = typeof port;` What is P?"
options:
  - "`number`"
  - "`8080`"
  - "`\"number\"`"
answer: 1
explain: A const gets its literal type, and typeof in a type position gives you that type. The string "number" is what the runtime typeof operator would return.
```
