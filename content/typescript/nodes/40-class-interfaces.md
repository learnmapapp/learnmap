---
title: "Class contracts"
icon: "🤝"
branch: "objects"
requires: ["classes", "structural-typing"]
summary: "Use implements as a verification step, not an implementation generator."
---

A class can declare that its instances satisfy an interface:

```typescript
interface Speaker {
  speak(name: string): string;
}
class Greeter implements Speaker {
  speak(name: string): string {
    return `Hello, ${name}`;
  }
}
const speaker: Speaker = new Greeter();
console.log(speaker.speak("Ada"));
```

`implements` checks the resulting instance shape. It does not provide method bodies or automatically copy parameter annotations into the class implementation.

## Instance and constructor sides

The interface above describes instances, not the class's constructor or its static members. A factory needing `new` support should use a constructor signature, separately from the instance contract.

In ordinary structural cases, a compatible class can satisfy the same interface even without an explicit `implements` clause. Writing it still makes intent visible and catches a missing member at the class declaration.

Keep interface contracts focused on behavior the caller needs. A class with extra methods can still be used through a smaller interface, reducing coupling to its implementation details.

```exercise
goal: "State that Greeter implements the Speaker interface."
lang: typescript
code: |
  interface Speaker { speak(name: string): string; }
  class Greeter {
    speak(name: string): string { return `Hello, ${name}`; }
  }
  console.log(new Greeter().speak("Ada"));
checks:
  - match: "class\\s+Greeter\\s+implements\\s+Speaker\\s+\\{"
    message: "Add implements Speaker after the class name."
hint: "Add implements Speaker after the class name."
```

```quiz
question: "Does implements fill in method bodies or infer all implementation parameters?"
options:
  - "Yes, both."
  - "No, the class must supply its implementation and annotations."
  - "It generates an abstract runtime class."
answer: 1
explain: "implements checks the instance contract; it does not generate the implementation."
```
