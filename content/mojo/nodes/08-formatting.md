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
question: Which Mojo 1.2 spelling interpolates `name` into a template string?
options:
  - '`"Hello, {name}"`'
  - '`"Hello, ${name}"`'
  - '`t"Hello, {name}"`'
answer: 2
explain: The `t` prefix enables the template-string expression syntax used in this course.
```
