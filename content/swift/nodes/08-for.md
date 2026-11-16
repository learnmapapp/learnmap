---
title: Ranges and iteration
icon: "🔁"
branch: flow
requires: [types]
summary: for-in over ranges, arrays and strings, plus stride and enumerated.
---
Swift has one kind of `for` loop: **for-in**. It walks through anything that's a sequence.

Let's print a times table:

```swift title=table.swift
for n in 1...5 {
    print("\(n) × 7 = \(n * 7)")
}
```

```repl shell
> swift table.swift
1 × 7 = 7
2 × 7 = 14
3 × 7 = 21
4 × 7 = 28
5 × 7 = 35
```

The two range operators again:

- `1...5` is **closed**: 1, 2, 3, 4, 5.
- `0..<5` is **half-open**: 0, 1, 2, 3, 4. Perfect for indexes, because an array of 5 items has indexes 0 to 4.

Recipes for other loops you might want:

```swift
// Every second number: 0, 2, 4, 6, 8
for i in stride(from: 0, to: 10, by: 2) { }

// Counting down: 3, 2, 1
for i in (1...3).reversed() { }

// Items with their position
let podium = ["Ana", "Ben", "Cy"]
for (index, name) in podium.enumerated() {
    print("\(index + 1). \(name)")
}

// Characters in a string
for letter in "hey" { }

// Don't need the counter? Use _
for _ in 1...3 { print("hip hip hooray!") }
```

There's no C-style `for (i = 0; i < n; i++)`. It was removed in Swift 3, and nobody misses it: ranges and `stride` cover every case, without off-by-one mistakes in the update step.

`break` and `continue` work as usual.

```compare python
for n in range(1, 6):
    print(f"{n} × 7 = {n * 7}")
```

```compare kotlin
for (n in 1..5) {
    println("$n × 7 = ${n * 7}")
}
```

```compare javascript
for (let n = 1; n <= 5; n++) {
  console.log(`${n} × 7 = ${n * 7}`);
}
```

```exercise
goal: The countdown should print 10, 8, 6, 4, 2. Replace the range with a stride that steps by -2.
code: |-
  for n in 1...10 {
      print(n)
  }
checks:
  - match: 'for\s+n\s+in\s+stride\(from:\s*10,\s*(through:\s*2|to:\s*[01]),\s*by:\s*-2\)'
    message: "Use stride(from: 10, through: 2, by: -2)."
solution: |-
  for n in stride(from: 10, through: 2, by: -2) {
      print(n)
  }
hint: stride(from:to:by:) stops before the end; stride(from:through:by:) includes it.
```

```quiz
question: "How many times does `for i in 0..<3` run?"
options:
  - "2"
  - "3"
  - "4"
answer: 1
explain: "0..<3 gives 0, 1 and 2: three iterations."
```
