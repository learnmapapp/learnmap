---
title: "Interfaces"
icon: "📐"
branch: "modeling"
requires: ["type-aliases"]
summary: "Name object contracts and extend them with additional fields."
---
An [[interface]] is another way to name an object type:

```typescript
interface User {
  id: string;
  name: string;
}
```

That's equivalent to `type User = { id: string; name: string }`. So why have both? Interfaces have two abilities aliases don't share. Let's build up a small model to see them.

## Ability 1: `extends`

Interfaces can build on each other:

```typescript
interface Named {
  name: string;
}

interface User extends Named {
  id: string;
}

interface Admin extends User {
  permissions: string[];
}
```

An `Admin` must have `name`, `id` and `permissions`. If a child tries to change an inherited property to something incompatible, you get an error at the declaration, which is a helpful early warning. (Aliases get the same combination with `&`, see [intersections](node:intersections).)

## Ability 2: declaration merging

Declare the same interface twice and the two are merged:

```typescript
interface User { id: string }
interface User { email: string }
// User now has id AND email
```

In your own code, that's usually a surprise rather than a feature. It exists so libraries can be extended. For example, adding a property to the browser's `Window`:

```typescript
declare global {
  interface Window {
    analytics: { track(event: string): void };
  }
}
```

## So which one?

| | `interface` | `type` |
| --- | --- | --- |
| Object shapes | ✅ | ✅ |
| Unions, tuples, function types | ❌ | ✅ |
| `extends` | ✅ | use `&` |
| Merges duplicate declarations | ✅ | ❌, it's an error |

The TypeScript team's own advice: use `interface` for object shapes until you need something only `type` can do. Plenty of teams use `type` everywhere, and that's fine too. Consistency matters more than the choice.

```compare java
interface Admin extends User { List<String> permissions(); }
```

```compare go
type Admin struct { User; Permissions []string }  // embedding
```

```exercise
goal: "The learner object has a `name`, but `Learner` doesn't require one. Make `Learner` extend `Named`."
lang: typescript
code: |
  interface Named { name: string; }
  interface Learner { score: number; }
  const learner: Learner = { name: "Ada", score: 42 };
  console.log(learner.name);
checks:
  - match: 'interface\s+Learner\s+extends\s+Named\s*\{'
    message: "Use interface Learner extends Named."
hint: extends goes between the interface name and the opening brace.
solution: |
  interface Named { name: string; }
  interface Learner extends Named { score: number; }
  const learner: Learner = { name: "Ada", score: 42 };
  console.log(learner.name);
```

```quiz
question: "Which of these can only be written with `type`, not `interface`?"
options:
  - "An object with a name property"
  - "`\"on\" | \"off\"`"
  - An object that extends another object type
answer: 1
explain: Interfaces only describe object shapes. Unions need a type alias.
```
