---
title: "Compiler settings"
icon: "⚙️"
branch: "core"
requires: ["toolchain"]
summary: "Choose strict checking and settings that match the host."
---
`tsconfig.json` tells the compiler which files to check and how picky to be. `tsc --init` generates a long file, but a small project only needs a handful of settings. Here's a lean one, annotated:

```json title=tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

| Setting | What it does |
| --- | --- |
| `target` | which JavaScript version to output and assume |
| `module` | which import/export system to use and how to find modules |
| `strict` | turn on the full set of safety checks (more below) |
| `noEmit` | only check; don't write `.js` files |
| `skipLibCheck` | don't re-check the type files of your dependencies |
| `include` | which folders are part of the project |

## Why `strict` matters most

`strict: true` switches on a family of checks. The two you'll notice most:

**`noImplicitAny`.** Without it, a parameter with no type silently becomes `any`, which turns off checking for it:

```typescript
function double(value) {     // strict: "Parameter 'value' implicitly
  return value * 2;          // has an 'any' type."
}
```

**`strictNullChecks`.** Without it, `null` and `undefined` sneak into every type, and the most common JavaScript crash goes unnoticed:

```typescript
const user = users.find(u => u.id === 7);   // might be undefined
console.log(user.name);                      // strict: "'user' is
                                             // possibly 'undefined'."
```

Turn `strict` on for every new project. For an existing JavaScript codebase, [Migrating JavaScript](node:js-migration) shows how to get there gradually.

```warn
Different frameworks need different `module` and `target` values. If you use Vite, Next.js or another framework, start from the tsconfig its project template creates rather than writing one from scratch.
```

```compare kotlin
// Kotlin has no "non-strict" mode: null safety is always on.
```

```compare python
# mypy's --strict flag plays the same role as "strict": true.
```

```exercise
goal: "Turn on the strict family of checks."
lang: json
code: |
  {
    "compilerOptions": { "strict": false, "noEmit": true },
    "include": ["src"]
  }
checks:
  - match: '"strict":\s*true'
    message: Set strict to true.
hint: It's a boolean.
solution: |
  {
    "compilerOptions": { "strict": true, "noEmit": true },
    "include": ["src"]
  }
```

```quiz
question: "With `strict` off, what type does an unannotated parameter like `function f(x)` get?"
options:
  - "`unknown`"
  - "`any`, which switches off checking for it"
  - "`string`"
answer: 1
explain: That's why noImplicitAny, part of strict, reports it instead.
```
