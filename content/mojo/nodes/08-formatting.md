---
title: Template strings
icon: 🔧
branch: basics
requires:
  - strings
  - integers
summary: Mojo 1.2 template strings use the t prefix and braces for expressions.
---

Mojo 1.2 template strings use the t prefix and braces for expressions. Formatting syntax is version-sensitive, so use the pinned toolchain.

```mojo
def main() raises:
    var name = String("Ada")
    var count = 3
    print(t"{name} completed {count} lessons")
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about template strings.
lang: mojo
code: |-
  def main() raises:
      var name = String("Ada")
      var count = 3
      print(t"{name} completed {count + 1} lessons")
checks:
  - match: \{count\}\s+lessons
    message: Use {count} lessons for this step.
  - notMatch: \{count\s+\+\s+1\}\s+lessons
    message: Replace {count + 1} lessons in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about template strings is correct?
options:
  - Current Mojo template strings require JavaScript backticks.
  - The t prefix creates an OS thread.
  - Mojo 1.2 template strings use the t prefix and braces for expressions. Formatting syntax is
    version-sensitive, so use the pinned toolchain.
answer: 2
explain: Mojo 1.2 template strings use the t prefix and braces for expressions. Formatting syntax is
  version-sensitive, so use the pinned toolchain.
```
