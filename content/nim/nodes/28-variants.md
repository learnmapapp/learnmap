---
title: Variant objects
icon: 💬
branch: data
requires:
  - enums
  - objects
summary: A variant object stores fields selected by a discriminator.
---

A variant object stores fields selected by a discriminator. Access fields only in the matching branch to avoid invalid-field errors.

```nim
type
  Kind = enum text, count
  Value = object
    case kind: Kind
    of text: message: string
    of count: number: int
let value = Value(kind: text, message: "hello")
case value.kind
of text: echo value.message
of count: echo value.number
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about variant objects.
lang: nim
code: |-
  type
    Kind = enum text, count
    Value = object
      case kind: Kind
      of text: message: string
      of count: number: int
  let value = Value(kind: text, message: "bye")
  case value.kind
  of text: echo value.message
  of count: echo value.number
checks:
  - match: message:\s+"hello"
    message: 'Use message: "hello" for this step.'
  - notMatch: message:\s+"bye"
    message: 'Replace message: "bye" in the starting code.'
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: When is a variant object's `message` field valid?
options:
  - Only after converting the object into a tuple.
  - When its discriminator selects the text variant.
  - In every variant regardless of its discriminator.
answer: 1
explain: The active discriminator determines which variant fields are available.
```
