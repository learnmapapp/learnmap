---
title: "Class contracts"
icon: "🤝"
branch: "objects"
requires: ["classes", "structural-typing"]
summary: "Use implements as a verification step, not an implementation generator."
---
You know from [structural typing](node:structural-typing) that a class fits an interface just by having the right shape. So what's `implements` for? It moves the error to a better place.

Watch where the error lands **without** it:

```typescript
interface Notifier {
  send(to: string, message: string): Promise<void>;
}

class EmailNotifier {
  async sned(to: string, message: string) { /* ... */ }  // typo
}

// 200 lines later, in another file:
const notifier: Notifier = new EmailNotifier();
//    ~~~~~~~~ Property 'send' is missing in type 'EmailNotifier'.
```

The error appears where the class is **used**, maybe in someone else's code. Now **with** it:

```typescript
class EmailNotifier implements Notifier {
//    ~~~~~~~~~~~~~ Class 'EmailNotifier' incorrectly implements
//                  interface 'Notifier'.
  async sned(to: string, message: string) { /* ... */ }
}
```

The error is right on the class, where the typo is. `implements` is a promise you make up front: "this class is a `Notifier`", and the checker holds you to it.

## A swappable design

Interfaces shine when several classes can play the same role:

```typescript
class SmsNotifier implements Notifier {
  async send(to: string, message: string) { /* ... */ }
}

class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, message: string) {
    this.sent.push(`${to}: ${message}`);
  }
}

function welcome(user: { email: string }, notifier: Notifier) {
  return notifier.send(user.email, "Welcome aboard!");
}
```

`welcome` doesn't care which one it gets. In tests, pass the `FakeNotifier` and check `sent`.

## Two things `implements` doesn't do

- **It doesn't add any code.** It only checks. You still write every method yourself.
- **It doesn't type the parameters for you.** Each method in the class needs its own annotations.

A class can implement several interfaces: `class X implements A, B`.

```compare java
class EmailNotifier implements Notifier { ... }  // required in Java
```

```compare go
// Go has no implements keyword at all; fitting the shape is enough.
```

```exercise
goal: "`Greeter` fits `Speaker` by accident. Declare it, so the checker will catch future mistakes on the class itself."
lang: typescript
code: |
  interface Speaker { speak(name: string): string; }
  class Greeter {
    speak(name: string): string { return `Hello, ${name}`; }
  }
  console.log(new Greeter().speak("Ada"));
checks:
  - match: 'class\s+Greeter\s+implements\s+Speaker\s*\{'
    message: "Add implements Speaker after the class name."
hint: implements goes between the class name and the brace.
solution: |
  interface Speaker { speak(name: string): string; }
  class Greeter implements Speaker {
    speak(name: string): string { return `Hello, ${name}`; }
  }
  console.log(new Greeter().speak("Ada"));
```

```quiz
question: "What's the main benefit of `implements` in TypeScript?"
options:
  - Without it, a class can't be used where the interface is expected.
  - Mismatches are reported on the class itself, instead of where it's used.
  - It generates the methods from the interface.
answer: 1
explain: Structural typing already lets the class fit. implements moves the check to the class declaration.
```
