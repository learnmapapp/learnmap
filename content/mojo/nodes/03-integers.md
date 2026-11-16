---
title: Integer widths
icon: 🔢
branch: basics
requires:
  - variables
summary: Int is the native-word signed integer type.
---

Int is the native-word signed integer type. Fixed-width types such as UInt8 make representation and range choices explicit.

```mojo
def main() raises:
    var small: UInt8 = 200
    var wide = Int(small)
    print(wide)
```

## Put it to work

Compare the worked example with the starting code below. Identify the changed operation, predict its effect, and repair it. Then try a second input locally to check your understanding.

```exercise
goal: Repair the starting example using what you learned about integer widths.
lang: mojo
code: |-
  def main() raises:
      var small: UInt8 = 100
      var wide = Int(small)
      print(wide)
checks:
  - match: UInt8\s+=\s+200
    message: Use UInt8 = 200 for this step.
  - notMatch: UInt8\s+=\s+100
    message: Replace UInt8 = 100 in the starting code.
hint: Compare the worked example with the starting code below. Identify the changed operation,
  predict its effect, and repair it. Then try a second input locally to check your understanding.
```

```quiz
question: Which statement about integer widths is correct?
options:
  - Int is the native-word signed integer type. Fixed-width types such as UInt8 make representation
    and range choices explicit.
  - UInt8 stores negative values.
  - Int always has exactly eight bits.
answer: 0
explain: Int is the native-word signed integer type. Fixed-width types such as UInt8 make
  representation and range choices explicit.
```
