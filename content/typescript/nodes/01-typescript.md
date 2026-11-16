---
title: "TypeScript"
icon: "🔷"
branch: "core"
requires: []
summary: "JavaScript plus a static checker, not a different runtime."
kind: "hub"
---
Here's a bug that has shipped to production a thousand times:

```javascript
function greet(user) {
  return "Hello, " + user.name.toUpperCase();
}

greet({ nmae: "Ada" });
// TypeError: Cannot read properties of undefined
```

JavaScript only finds out when that line runs, maybe in front of a customer. Here's the same code in TypeScript:

```typescript title=greet.ts
type User = { name: string };

function greet(user: User): string {
  return "Hello, " + user.name.toUpperCase();
}

greet({ nmae: "Ada" });
//      ~~~~ Object literal may only specify known properties,
//           and 'nmae' does not exist in type 'User'.
```

Your editor underlines the typo **as you type it**. That's TypeScript in one sentence: **JavaScript, plus a checker that reads your code and points out mistakes before it runs.**

## Three things to know up front

- **It's still JavaScript.** Every JavaScript feature works. The `: string` and `type User` bits are additions, and the compiler strips them out, leaving plain JavaScript that runs anywhere JavaScript does.
- **Types are a design tool.** Writing `type User = { name: string }` documents what your function expects, and the checker keeps that documentation honest.
- **Types vanish at runtime.** The checker only knows what you told it. Data from a server or a form can still be anything; the [Runtime boundaries](node:json-validation) branch shows how to handle that.

## How this map works

Start with [the toolchain](node:toolchain) to get the checker running on your machine. If you'd rather not install anything yet, paste the examples into the [TypeScript playground](https://www.typescriptlang.org/play), which shows the errors right in the browser. Then the branches cover:

- **Values and shapes**: annotating variables, arrays and objects.
- **Functions**: typing parameters, callbacks and return values.
- **Narrowing safely** and **Modeling data**: the parts that make TypeScript really pay off.
- **Reusable types**: generics, and types computed from other types.
- **Classes**, **Project tooling** and **Runtime boundaries**: using it in a real codebase.

You'll want to know basic JavaScript: variables, functions, objects, arrays and arrow functions. The exercises are checked here in the browser by pattern, without running a compiler.

```compare python
# Python type hints are similar in spirit: optional annotations
# that a separate checker (mypy, pyright) verifies.
```

```compare java
// Java checks types too, but at compile time it also decides how
// the program runs. TypeScript's types are erased completely.
```

```exercise
goal: "The checker flags the typo in this call. Fix the property name."
lang: typescript
code: |
  type User = { name: string };

  function greet(user: User): string {
    return "Hello, " + user.name.toUpperCase();
  }

  greet({ nmae: "Ada" });
checks:
  - match: 'greet\(\{\s*name:\s*"Ada"\s*\}\)'
    message: Spell the property as name.
hint: Compare the property in the call with the one in type User.
solution: |
  type User = { name: string };

  function greet(user: User): string {
    return "Hello, " + user.name.toUpperCase();
  }

  greet({ name: "Ada" });
```

```quiz
question: "What happens to `: string` annotations when TypeScript compiles to JavaScript?"
options:
  - They become runtime checks that throw on bad values.
  - They're removed; the output is plain JavaScript.
  - They're kept as comments.
answer: 1
explain: Types exist for the checker and your editor. The JavaScript that runs has none of them.
```
