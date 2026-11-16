---
title: "Typed functions"
icon: "🔧"
branch: "functions"
requires: ["primitives"]
summary: "Type parameters and return values at the call boundary."
---

A parameter annotation says what callers must supply; a return annotation says what they can expect back:

```typescript
function add(left: number, right: number): number {
  return left + right;
}
console.log(add(20, 22)); // 42
```

TypeScript can infer a return type from the implementation. An explicit annotation is useful when an exported function should keep a deliberate contract as its body changes.

## No useful result

Use `void` for a function whose return value is not intended for use:

```typescript
function announce(message: string): void {
  console.log(message);
}
announce("ready");
```

`void` is not the same as never. A function that returns normally without a useful result differs from one that cannot finish normally.

The checker verifies calls and return statements, but annotations do not validate arbitrary JavaScript callers at runtime. Keep runtime checks when the function sits on an untrusted boundary. Avoid implicit `any` parameters, which discard information at precisely the point where callers need a contract.

```compare javascript
function add(left, right) { return left + right; }
```

```compare python
def add(left: int, right: int) -> int:
    return left + right
```

```compare kotlin
fun add(left: Int, right: Int): Int = left + right
```

```compare go
func add(left int, right int) int { return left + right }
```

```compare rust
fn add(left: i32, right: i32) -> i32 { left + right }
```

```compare java
int add(int left, int right) { return left + right; }
```

```exercise
goal: "Return the sum as a number, matching the signature."
lang: typescript
code: |
  function add(left: number, right: number): number {
    return String(left + right);
  }
  console.log(add(20, 22));
checks:
  - match: "return\\s+left\\s+\\+\\s+right;"
    message: "Return left + right without converting to text."
hint: "Return left + right without converting to text."
```

```quiz
question: "Where is an explicit return annotation especially useful?"
options:
  - "For documenting and maintaining an exported contract."
  - "For automatically converting the result."
  - "For making all calls asynchronous."
answer: 0
explain: "A declared return type records what the public function promises its callers."
```
