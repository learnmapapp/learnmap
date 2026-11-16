---
title: "Declaration files"
icon: "📄"
branch: "tooling"
requires: ["modules"]
summary: "Describe JavaScript APIs without claiming to implement them."
---

A [[declaration file]] uses `.d.ts` to describe values and types supplied elsewhere. A bundler-provided constant could be declared as:

```typescript
declare const BUILD_LABEL: string;
export function buildLabel(): string {
  return BUILD_LABEL;
}
```

The declaration lets the checker understand the name. Your build system must actually provide `BUILD_LABEL`; the declaration creates no variable at runtime.

## Library contracts

Some packages ship their own declarations. Others use separate `@types/...` packages. Installing declarations does not install the runtime implementation, and installing JavaScript does not always provide complete declarations.

An ambient declaration such as `declare module "some-library"` can describe an untyped package. Avoid making every export `any` merely to remove errors; that creates an unchecked hole at the integration boundary.

Declaration files should match the behavior consumers really receive, including optional values and errors. If a package changes its runtime API, old declarations can still type-check code that fails when executed. Validate integrations with runtime tests as well as type checks.

```exercise
goal: "Declare the host-supplied label as text."
lang: typescript
code: |
  declare const BUILD_LABEL: number;
  export function buildLabel(): string { return BUILD_LABEL; }
checks:
  - match: "BUILD_LABEL:\\s+string"
    message: "Use string to describe the supplied label."
hint: "Use string to describe the supplied label."
```

```quiz
question: "What does `declare const BUILD_LABEL: string` create at runtime?"
options:
  - A new global variable initialized to an empty string.
  - Nothing; a host must supply the value.
  - A runtime type validator.
answer: 1
explain: declare describes an externally supplied value and does not implement it.
```
