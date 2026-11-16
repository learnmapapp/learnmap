---
title: Swift packages
icon: "📦"
branch: tools
requires: [swift, testing]
summary: Go from a single file to a real project with Package.swift, targets, dependencies and swift run.
---
Single files with `swift hello.swift` got us a long way. Once a program has several files, tests, or uses someone else's library, it's time for a **package**. The Swift Package Manager is built into the `swift` command, so there's nothing extra to install.

Let's follow one from start to finish.

**1. Create it.**

```repl shell
> mkdir Tally && cd Tally
> swift package init --type executable
Creating executable package: Tally
Creating Package.swift
Creating Sources/main.swift
```

Depending on your Swift version, you may also get a `Tests/` folder. Either way, the layout follows a fixed convention:

```text
Tally/
├── Package.swift          ← the manifest
├── Sources/
│   └── Tally/             ← one folder per target
└── Tests/
    └── TallyTests/        ← test targets live here
```

**2. Read the manifest.** `Package.swift` is itself Swift code:

```swift title=Package.swift
// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "Tally",
    dependencies: [
        .package(url: "https://github.com/apple/swift-argument-parser", from: "1.5.0"),
    ],
    targets: [
        .executableTarget(
            name: "Tally",
            dependencies: [.product(name: "ArgumentParser", package: "swift-argument-parser")]
        ),
        .testTarget(name: "TallyTests", dependencies: ["Tally"]),
    ]
)
```

- The **first comment line is required**. It tells Swift which manifest format to use, so don't delete it.
- A **target** is a module: a folder of source files that compile together. `.executableTarget` builds a program, `.target` builds a library, `.testTarget` holds tests.
- A **dependency** is a Git URL plus a version rule. `from: "1.5.0"` means "1.5.0 or any newer 1.x", following semantic versioning.

**3. Use it.** The everyday commands:

| Command | Does |
| --- | --- |
| `swift build` | compiles everything (and fetches dependencies the first time) |
| `swift run` | builds and runs the executable |
| `swift run Tally --verbose` | passes arguments to your program |
| `swift test` | runs all test targets |

The exact versions of every dependency get recorded in `Package.resolved`. Commit it, so everyone on the team builds with the same versions.

Xcode, VS Code (with the Swift extension) and other editors open a folder with a `Package.swift` directly. No project file needed.

```compare javascript
// package.json + npm install + npm run, roughly
```

```compare rust
// Cargo.toml + cargo build/run/test: the closest relative
```

```compare python
# pyproject.toml plus a tool like uv or pip
```

```exercise
goal: "Add the swift-collections package as a dependency, from version 1.1.0."
code: |-
  let package = Package(
      name: "Tally",
      dependencies: [
      ],
      targets: [
          .executableTarget(name: "Tally"),
      ]
  )
checks:
  - match: '\.package\(\s*url:\s*"https://github\.com/apple/swift-collections(\.git)?"\s*,\s*from:\s*"1\.1\.0"\s*\)'
    message: 'Add .package(url: "https://github.com/apple/swift-collections", from: "1.1.0")'
solution: |-
  let package = Package(
      name: "Tally",
      dependencies: [
          .package(url: "https://github.com/apple/swift-collections", from: "1.1.0"),
      ],
      targets: [
          .executableTarget(name: "Tally"),
      ]
  )
```

```quiz
question: "What does the first line `// swift-tools-version: 6.0` in Package.swift do?"
options:
  - Nothing; it's just a comment.
  - It declares which manifest format and minimum tools version the package needs.
  - It pins the Swift version used at runtime.
answer: 1
explain: Despite looking like a comment, SwiftPM reads it to decide how to interpret the manifest.
```
