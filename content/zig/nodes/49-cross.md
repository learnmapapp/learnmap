---
title: Cross compilation
icon: 🧪
branch: tools
requires:
  - build
summary: The -target option selects an output platform.
---

The -target option selects an output platform. Producing a binary for another platform does not make it runnable on the host machine.

```shell
zig build-exe hello.zig -target x86_64-linux -O ReleaseSafe
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about cross compilation.
lang: shell
code: zig build-exe hello.zig -target aarch64-macos -O ReleaseSafe
checks:
  - match: x86_64\-linux
    message: Use x86_64-linux for this step.
  - notMatch: aarch64\-macos
    message: Replace aarch64-macos in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: What does `-target x86_64-linux` select during compilation?
options:
  - An emulator that runs the output automatically.
  - The output binary's target platform.
  - The host operating system's current desktop settings.
answer: 1
explain: Cross compilation produces target code without making it runnable on the host.
```
