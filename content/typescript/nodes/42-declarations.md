---
title: "Declaration files"
icon: "📄"
branch: "tooling"
requires: ["modules"]
summary: "Describe JavaScript APIs without claiming to implement them."
---
**Q: I installed a JavaScript library, and TypeScript says "Could not find a declaration file for module". What?**

The library is plain JavaScript, with no types. TypeScript can see the code is there, but doesn't know what's in it. Type information for JavaScript lives in [[declaration file]]s: `.d.ts` files that contain **only types**, with no implementation.

**Q: Where do I get one?**

Check in this order:

1. **The library ships its own.** Most modern packages do. You'll see `"types"` in its `package.json`, and everything just works.
2. **DefinitelyTyped has them.** A huge community project of types for libraries that don't ship them. Install them separately, as a dev dependency:

   ```shell
   npm install --save-dev @types/lodash
   ```

   Node itself gets its types the same way: `@types/node`.
3. **Neither.** Write a minimal one yourself, which is the next question.

**Q: What does a declaration file look like?**

Like the signatures from a TypeScript file, without the bodies, and with `declare`:

```typescript title=src/types/slugify.d.ts
declare module "tiny-slugify" {
  export function slugify(text: string, separator?: string): string;
}
```

That's enough for `import { slugify } from "tiny-slugify"` to be checked. You only describe what you use.

**Q: What does `declare` mean?**

"This exists at runtime, but somewhere else; trust me about its type." No code is generated for it. It's also how you describe globals that something else creates, such as a value injected by a build tool or a script tag:

```typescript title=src/globals.d.ts
declare const BUILD_VERSION: string;
declare const analytics: { track(event: string): void };
```

**Q: Is TypeScript checking that those are correct?**

No, and that's the important bit. Declarations are **promises**. If the real `slugify` takes different arguments, the checker can't know. Keep handwritten ones small, and prefer official types when they exist.

```compare python
# The equivalent is a .pyi stub file, often from typeshed.
```

```compare kotlin
// Kotlin/JS uses "external" declarations the same way.
```

```exercise
goal: "The build tool injects `BUILD_LABEL` as text, but it's declared as a number. Fix the declaration."
lang: typescript
code: |
  declare const BUILD_LABEL: number;
  export function buildLabel(): string { return BUILD_LABEL; }
checks:
  - match: 'BUILD_LABEL:\s*string'
    message: "Declare BUILD_LABEL as a string."
hint: Only the type changes.
solution: |
  declare const BUILD_LABEL: string;
  export function buildLabel(): string { return BUILD_LABEL; }
```

```quiz
question: "A `.d.ts` file says a function returns `number`, but the JavaScript actually returns a string. What happens?"
options:
  - TypeScript reports a mismatch.
  - Nothing is reported; your code trusts the declaration and may break at runtime.
  - The function is converted to return a number.
answer: 1
explain: Declarations aren't checked against the JavaScript. They're trusted as written.
```
