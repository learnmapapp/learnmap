---
title: Meet Swift
icon: "🐦"
branch: core
requires: []
summary: What Swift is good at, and how to run your first line of it.
kind: hub
---
Swift was created by Apple in 2014 to replace Objective-C, and it's now the language for iPhone, iPad, Mac and Apple Watch apps. Don't let that box it in, though: it's open source, runs on Linux and Windows, and is used for servers and command-line tools too.

If you've written Kotlin, TypeScript or Rust, Swift will feel familiar. It has type inference, optionals instead of null crashes, value types, and a modern take on concurrency.

Let's run something. Create a file called `hello.swift`:

```swift title=hello.swift
let name = "Swift"
print("Hello, \(name)!")
```

Then open a terminal in that folder:

```repl shell
> swift hello.swift
Hello, Swift!
```

No `main` function, no class, no imports. In a script, the top-level code simply runs from top to bottom. (Apps and packages have a defined entry point, which you'll see later.)

That `\(name)` inside the string is **string interpolation**: Swift puts the value of `name` there. You'll use it constantly.

Two ways to run Swift code:

| Command | What it does |
| --- | --- |
| `swift hello.swift` | runs the file as a script, straight away |
| `swiftc hello.swift -o hello` | compiles it into a program called `hello` |

```tip
These lessons use **Swift 6**. On a Mac, Swift comes with Xcode (or `xcode-select --install`). On Linux and Windows, get it from swift.org. Check what you have with `swift --version`.
```

```compare python
name = "Python"
print(f"Hello, {name}!")
```

```compare javascript
const name = "JavaScript";
console.log(`Hello, ${name}!`);
```

```compare kotlin
val name = "Kotlin"
println("Hello, $name!")
```

```exercise
goal: Greet yourself. Change the name, and use interpolation so the message reads "Hello, " followed by the name.
code: |-
  let name = "Swift"
  print("Hello, name!")
checks:
  - match: '\\\(name\)'
    message: "Put the variable inside \\( ) to interpolate it: \\(name)"
  - notMatch: 'let name = "Swift"'
    message: Change the name to your own.
solution: |-
  let name = "Ada"
  print("Hello, \(name)!")
hint: Writing name inside the quotes prints the word "name". Wrap it in a backslash and parentheses.
```

```quiz
question: What happens when you run `swift hello.swift`?
options:
  - It checks the file for errors, but doesn't run it.
  - It runs the file's top-level code, from top to bottom.
  - It looks for a function called main and runs that.
answer: 1
explain: The swift command runs a file as a script. Top-level statements are the program.
```
