---
title: "The toolchain"
icon: "🧰"
branch: "core"
requires: ["typescript"]
summary: "Install the compiler locally and distinguish checking from execution."
---
Let's get from an empty folder to a checked TypeScript file. You need [Node.js](https://nodejs.org) installed; any current LTS version works.

**Step 1: a project with TypeScript in it.**

```shell
mkdir hello-ts && cd hello-ts
npm init -y
npm install --save-dev typescript
```

That installs `tsc`, the TypeScript [[compiler]], into this project only. That's better than a global install, because every teammate and CI machine then uses the exact same version.

**Step 2: a config file.**

```shell
npx tsc --init
```

This writes `tsconfig.json`, with sensible defaults and lots of commented-out options. [Compiler settings](node:tsconfig) looks at the important ones. (`npx` runs a tool installed in the project.)

**Step 3: some code.** Create `hello.ts` next to it:

```typescript title=hello.ts
const message: string = "Hello, types!";
console.log(message.toUpperCase());
```

**Step 4: check it.**

```shell
npx tsc --noEmit
```

No output means no errors. Now break something, say `message.toUpperCas()`, and run it again: you get the file, the line, and a suggestion for what you meant.

## Wait, how do I run it?

This surprises people: **`tsc` checks and translates, but it doesn't run anything.** There are a few ways to actually run the code:

- `npx tsc` without `--noEmit` writes `hello.js`, which you run with `node hello.js`.
- Recent Node.js versions can run many `.ts` files directly (`node hello.ts`) by stripping the types. They don't check them, though.
- In web projects, a bundler such as Vite strips types as it serves files, and you run `tsc --noEmit` separately as the checker.

So the common setup is "something fast strips the types, and `tsc --noEmit` checks them", often as an npm script in CI.

```tip
Your editor runs the same checker continuously. VS Code has it built in, and WebStorm and other JetBrains IDEs do too. Most of the time you'll see errors long before you run `tsc`.
```

```compare javascript
// No build or check step: node hello.js just runs it.
```

```compare go
// go build checks and compiles in one step, and go run runs it.
```

```exercise
goal: "Check the project for type errors **without** writing any `.js` files."
lang: shell
code: |
  npx tsc
checks:
  - match: 'npx\s+tsc\s+--noEmit'
    message: Add --noEmit to the compiler command.
hint: There's a flag that means "don't emit output".
solution: |
  npx tsc --noEmit
```

```quiz
question: "You run `npx tsc --noEmit` and it prints nothing. What does that mean?"
options:
  - Nothing was checked, because no files were emitted.
  - The project type-checks without errors.
  - The program ran successfully.
answer: 1
explain: --noEmit still checks everything; it just skips writing JavaScript. Silence means no errors.
```
