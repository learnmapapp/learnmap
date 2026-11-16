---
title: "Tagged unions"
icon: "🚥"
branch: "modeling"
requires: ["literal-types", "narrowing", "object-types"]
summary: "Keep each state and its valid data together."
---
**The problem.** You're loading data, and the state looks like this:

```typescript
type Request = {
  loading: boolean;
  data?: string[];
  error?: string;
};
```

Count the combinations: `loading: true` with an `error`? `data` **and** `error` both set? Nothing set at all? That type allows eight combinations, and only three of them make sense. Every component reading it has to guess.

**The fix.** List the states that are actually possible, each with a tag that says which one it is:

```typescript
type Request =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

That's a [[discriminated union]]. `status` is the **discriminant**: a property with a different [literal type](node:literal-types) in each member. Impossible states are now impossible to write:

```typescript
const r: Request = { status: "success", message: "?" };
//                                      ~~~~~~~ Object literal
//                 may only specify known properties.
```

## Checking the tag narrows the whole object

```typescript
function render(r: Request): string {
  if (r.status === "loading") {
    return "Loading...";
  }
  if (r.status === "error") {
    return `Failed: ${r.message}`;       // message exists here
  }
  return r.data.join(", ");              // only success is left
}
```

Try reading `r.data` inside the error branch and the checker stops you, because errors don't have data.

A `switch` on the tag reads well when there are many cases:

```typescript
switch (r.status) {
  case "loading": return "Loading...";
  case "error":   return `Failed: ${r.message}`;
  case "success": return r.data.join(", ");
}
```

```tip
Any property name works as the tag: `kind`, `type` and `status` are common. It just needs a literal type in every member.
```

```compare kotlin
sealed interface Request
object Loading : Request
data class Success(val data: List<String>) : Request
data class Failure(val message: String) : Request
```

```compare rust
enum Request { Loading, Success(Vec<String>), Error(String) }
```

```exercise
goal: "This code reads `value` in the failed case, and `message` in the ready one. Check for `\"ready\"` instead."
lang: typescript
code: |
  type Result = { status: "ready"; value: number } | { status: "failed"; message: string };
  function describe(result: Result): string {
    if (result.status === "failed") return String(result.value);
    return result.message;
  }
checks:
  - match: 'result\.status\s*===\s*"ready"'
    message: "Narrow to the ready variant before reading value."
hint: Change the string the status is compared with.
solution: |
  type Result = { status: "ready"; value: number } | { status: "failed"; message: string };
  function describe(result: Result): string {
    if (result.status === "ready") return String(result.value);
    return result.message;
  }
```

```quiz
question: "What makes a union *discriminated*?"
options:
  - Every member is a class.
  - Every member has a shared property with a different literal type.
  - The union has exactly two members.
answer: 1
explain: The shared literal property, such as status, tells the checker which member it's looking at.
```
