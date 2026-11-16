---
title: "Typed modules"
icon: "🧱"
branch: "tooling"
requires: ["type-aliases", "functions"]
summary: "Export reusable contracts and distinguish type-only imports."
---
Modules in TypeScript are JavaScript's `import` and `export`, with types allowed in both. Let's split a little app into files and see the three things that trip newcomers up.

```typescript title=src/user.ts
export interface User {
  id: string;
  name: string;
}

export function displayName(user: User): string {
  return user.name.trim() || "Anonymous";
}
```

```typescript title=src/main.ts
import { displayName, type User } from "./user.js";

const ada: User = { id: "1", name: "Ada" };
console.log(displayName(ada));
```

Types travel across files like everything else. Now the three surprises.

## Surprise 1: `./user.js`, in a TypeScript file?

Yes, really, with `"module": "NodeNext"`. TypeScript doesn't rewrite import paths. After compiling, `main.js` imports `user.js`, so the path must already say `.js`. The checker understands that `./user.js` means `user.ts` while checking.

(Bundlers like Vite are more relaxed and accept `./user` without an extension. Follow whatever your project template does.)

## Surprise 2: `import type`

`User` is only a type, and types are erased. Marking it shows that clearly, and guarantees the import disappears from the JavaScript output:

```typescript
import type { User } from "./user.js";              // whole import
import { displayName, type User } from "./user.js"; // just one name
```

This matters for tools that compile one file at a time (esbuild, Vite, Node's type stripping). They can't look in `user.ts` to find out whether `User` is a type. With `verbatimModuleSyntax` turned on in `tsconfig.json`, TypeScript makes you mark type-only imports, so those tools never trip over them.

## Surprise 3: CommonJS

Older Node code uses `require` and `module.exports`. TypeScript handles both systems, but mixing them is where the configuration gets painful. For new projects, add `"type": "module"` to `package.json` and use `import`/`export` everywhere.

```compare python
from user import display_name, User   # types are ordinary names
```

```compare java
import com.example.User;   // classes and types are one thing
```

```exercise
goal: "`Learner` is only used as a type. Mark the import as type-only, so it's erased from the output."
lang: typescript
code: |
  import { Learner } from "./learner.js";
  export const learner: Learner = { name: "Ada", score: 42 };
checks:
  - match: 'import\s+type\s+\{\s*Learner\s*\}'
    message: "Use import type."
hint: The word type goes right after import.
solution: |
  import type { Learner } from "./learner.js";
  export const learner: Learner = { name: "Ada", score: 42 };
```

```quiz
question: "What happens to `import type { User } from \"./user.js\"` in the compiled JavaScript?"
options:
  - It becomes a normal import.
  - It's removed completely.
  - It becomes a require call.
answer: 1
explain: Type-only imports exist only for the checker, so they're erased.
```
