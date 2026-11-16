---
title: "Typed DOM access"
icon: "🌐"
branch: "applications"
requires: ["nullability", "type-guards"]
summary: "Handle missing nodes and narrow to the element you need."
---
Let's build a tiny "character counter" for a text box, and let the checker review every line.

```html
<textarea id="bio"></textarea>
<p id="count"></p>
```

**First attempt**, straight from a JavaScript tutorial:

```typescript
const bio = document.querySelector("#bio");
const count = document.querySelector("#count");

bio.addEventListener("input", () => {
//~ 'bio' is possibly 'null'.
  count.textContent = `${bio.value.length} / 160`;
  //                         ~~~~~ Property 'value' does not
  //                               exist on type 'Element'.
});
```

Two complaints, and both are fair.

**Complaint 1: "possibly null".** `querySelector` returns `null` when nothing matches. A typo in `"#bio"` would crash at runtime, and the checker doesn't know your HTML.

**Complaint 2: "value doesn't exist on Element".** From a selector like `"#bio"`, TypeScript can't tell what kind of element it is. A plain `Element` has no `value`; only form fields do.

## Fixing it properly

Check that the element exists **and** is the right kind, with `instanceof`:

```typescript
const bio = document.querySelector("#bio");
const count = document.querySelector("#count");

if (!(bio instanceof HTMLTextAreaElement) || !count) {
  throw new Error("Character counter markup is missing");
}

bio.addEventListener("input", () => {
  count.textContent = `${bio.value.length} / 160`;
});
```

After the guard, `bio` is an `HTMLTextAreaElement` and `count` is an `Element`. Both checks happen at runtime, so if the HTML changes, you get a clear error instead of a mystery.

## Helpful shortcuts

**Tag selectors are typed automatically.** TypeScript knows what tags give you:

```typescript
document.querySelector("textarea");   // HTMLTextAreaElement | null
document.querySelector("a");          // HTMLAnchorElement | null
```

**Events are typed too.** In `addEventListener("keydown", e => ...)`, `e` is a `KeyboardEvent`, so `e.key` autocompletes.

**`as` and `!`** work too, as in `document.querySelector("#bio") as HTMLTextAreaElement`. They're shorter, but they only silence the checker: nothing is verified at runtime.

```compare javascript
// Same code, no checks: a typo in the selector crashes later.
```

```compare kotlin
// Kotlin/JS: document.getElementById("bio") as HTMLTextAreaElement
```

```exercise
goal: "`element` might not be a button, so `disabled` isn't known to exist. Check that it's an `HTMLButtonElement`."
lang: typescript
code: |
  const element = document.querySelector("#save");
  if (element) {
    element.disabled = true;
  }
checks:
  - match: 'if\s*\(element\s+instanceof\s+HTMLButtonElement\)\s*\{'
    message: "Narrow with instanceof HTMLButtonElement."
hint: "instanceof checks for null too, so it can replace the existing condition."
solution: |
  const element = document.querySelector("#save");
  if (element instanceof HTMLButtonElement) {
    element.disabled = true;
  }
```

```quiz
question: "What's the type of `document.querySelector(\".title\")`?"
options:
  - "`HTMLElement`"
  - "`Element | null`"
  - "`HTMLHeadingElement`"
answer: 1
explain: A class selector says nothing about the tag, and the element might not exist.
```
