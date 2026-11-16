---
title: "Testing contracts"
icon: "🧪"
branch: "tooling"
requires: ["satisfies", "utility-types", "functions"]
summary: "Keep positive examples and deliberate negative checks next to an API."
---
Normal tests check what code **does**. Sometimes you also want to test what the checker **refuses**: "calling `double` with a string must stay an error". That sounds odd, but it matters for library code and shared helper types, where a loosened type would silently let bugs through.

## Red, then green

**Red:** write the call that should be rejected, and mark it:

```typescript
function double(value: number): number {
  return value * 2;
}

// @ts-expect-error: strings must be rejected
double("21");
```

`@ts-expect-error` says "the next line **must** have a type error". Right now it does, so the check passes. ✅

**Now someone loosens the type:**

```typescript
function double(value: number | string): number {
  return Number(value) * 2;
}

// @ts-expect-error: strings must be rejected
double("21");
// error: Unused '@ts-expect-error' directive.
```

There's no error on that line any more, so the **directive itself** becomes an error. The test fails. That's the point.

## Its dangerous cousin: `@ts-ignore`

`@ts-ignore` silences the next line whether or not it has an error. If the error goes away, nothing tells you, and if a different error appears, that's hidden too. Prefer `@ts-expect-error` everywhere, including when you're temporarily silencing a real problem: you'll be told when it's fixed.

## Checking exact types

To check that a type is **exactly** right, test frameworks have helpers. Vitest ships `expectTypeOf`:

```typescript
import { expectTypeOf, test } from "vitest";

test("first keeps the element type", () => {
  expectTypeOf(first(["a", "b"])).toEqualTypeOf<string | undefined>();
});
```

These run as part of the normal type check, so `tsc --noEmit` in CI catches regressions.

```compare python
# mypy has a similar idea: # type: ignore[code] plus
# --warn-unused-ignores to report ignores that aren't needed.
```

```compare rust
// compile_fail doctests check that a snippet doesn't compile.
```

```exercise
goal: "`@ts-ignore` wouldn't notice if strings started being accepted. Use the directive that requires an error."
lang: typescript
code: |
  function double(value: number): number { return value * 2; }
  // @ts-ignore strings are intentionally rejected
  double("21");
checks:
  - match: '//\s*@ts-expect-error'
    message: "Use @ts-expect-error instead of @ts-ignore."
hint: Its name says it expects an error.
solution: |
  function double(value: number): number { return value * 2; }
  // @ts-expect-error strings are intentionally rejected
  double("21");
```

```quiz
question: "What happens when a line under `// @ts-expect-error` has no type error?"
options:
  - Nothing.
  - The directive is reported as unused, which is an error.
  - The line is skipped at runtime.
answer: 1
explain: That's what makes it useful as a test.
```
