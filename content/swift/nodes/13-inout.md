---
title: Mutating arguments
icon: "🔄"
branch: functions
requires: [functions, bindings]
summary: inout lets a function change the caller's variable, and & makes that visible.
---
Parameters are constants, and values like `Int` and `String` are copied into a function. So how would you write a function that changes *the caller's* variable? Here's a first attempt:

```swift
func levelUp(_ level: Int) {
    level += 1   // error: left side of mutating operator isn't mutable: 'level' is a 'let' constant
}
```

Even if this compiled, it would only change a local copy. The fix is **`inout`**:

```swift title=level.swift
func levelUp(_ level: inout Int) {
    level += 1
}

var heroLevel = 1
levelUp(&heroLevel)
levelUp(&heroLevel)
print(heroLevel)  // 3
```

Two parts make this work:

1. **`inout`** in the parameter type says "I'll modify this, and the change goes back to the caller".
2. **`&`** at the call site is required. It warns anyone reading the call that `heroLevel` may change. No surprise side effects.

Under the hood, Swift copies the value in, lets the function change the copy, and writes it back when the function returns ("copy-in, copy-out"). The compiler usually optimises that into direct access.

Because the caller's variable is going to change, you can only pass a `var`. A `let` or a literal (`levelUp(&5)`) won't compile.

The standard library uses `inout` for things like `swap(&a, &b)`. In your own code, prefer **returning a new value** when it's natural (`heroLevel = nextLevel(heroLevel)`), and keep `inout` for when it really reads better, such as updating several variables at once.

```compare python
# Python can't rebind the caller's int; you'd return the new value:
hero_level = level_up(hero_level)
```

```compare rust
fn level_up(level: &mut i32) { *level += 1; }
level_up(&mut hero_level);
```

```exercise
goal: "`double` should double the caller's score. Make the parameter inout, and pass the variable with &."
code: |-
  func double(_ value: Int) {
      value *= 2
  }

  var score = 21
  double(score)
checks:
  - match: '_\s+value\s*:\s*inout\s+Int'
    message: Mark the parameter as inout Int.
  - match: 'double\(&score\)'
    message: Pass the variable with &score.
solution: |-
  func double(_ value: inout Int) {
      value *= 2
  }

  var score = 21
  double(&score)
```

```quiz
question: Why does Swift require `&` when passing an inout argument?
options:
  - It makes the call faster.
  - It shows at the call site that the variable may be changed.
  - It converts the value into a pointer you can do arithmetic with.
answer: 1
explain: The & is a visible warning to the reader. Swift doesn't expose a raw pointer here.
```
