---
title: File URLs and data
icon: "💾"
branch: tools
requires: [codable]
summary: Build file paths with URL, then read and write Data, and Codable values on top of it.
---
Here's a recipe card for the thing every small tool eventually needs: **save some settings to disk, and load them again next time.**

**Ingredients:**

- a `URL` that points at the file
- `Data`, which is just bytes
- [Codable](node:codable) to turn your struct into bytes and back

**Method:**

```swift title=prefs.swift
import Foundation

struct Prefs: Codable {
    var theme = "dark"
    var fontSize = 14
}

// 1. Where should the file live?
let folder = URL(filePath: FileManager.default.currentDirectoryPath)
let file = folder.appending(path: "prefs.json")

// 2. Save
func save(_ prefs: Prefs) throws {
    let data = try JSONEncoder().encode(prefs)
    try data.write(to: file, options: .atomic)
}

// 3. Load, falling back to defaults if there's no file yet
func load() -> Prefs {
    guard let data = try? Data(contentsOf: file) else { return Prefs() }
    return (try? JSONDecoder().decode(Prefs.self, from: data)) ?? Prefs()
}

var prefs = load()
prefs.fontSize += 1
try save(prefs)
print("Saved font size \(prefs.fontSize) to \(file.path())")
```

Run it a few times, and the font size grows by one each run, because the value survives between runs.

**Notes on the method:**

- **Swift uses `URL` for files, not plain strings.** `URL(filePath:)` makes one from a path, and `appending(path:)` adds parts with the right separators. `file.path()` turns it back into a string, for printing.
- **`.atomic`** writes to a temporary file first, then swaps it in. If the program crashes mid-write, you keep the old file instead of a half-written one.
- **Both reading and writing throw**: the file might be missing, the disk full, or the folder read-only. Here, loading uses `try?` because "no file yet" is perfectly normal on the first run. Saving uses `try`, because a failed save is worth knowing about.
- Plain text works the same way: `try String(contentsOf: file, encoding: .utf8)` and `try text.write(to: file, atomically: true, encoding: .utf8)`.

**Variations:** in an app, you'd save into the app's own folder instead of the current directory, for example `URL.documentsDirectory.appending(path: "prefs.json")`. `FileManager.default` also checks whether files exist, lists folders and creates directories.

```compare python
from pathlib import Path
file = Path.cwd() / "prefs.json"
file.write_text(json.dumps(prefs))
```

```compare javascript
import { writeFileSync } from "node:fs";
writeFileSync("prefs.json", JSON.stringify(prefs));
```

```exercise
goal: "Build the path with URL methods instead of gluing strings together: make `notes` with `folder.appending(path: \"notes.txt\")`."
code: |-
  let notes = URL(filePath: folder.path() + "/" + "notes.txt")
checks:
  - match: 'let\s+notes\s*=\s*folder\.appending\(\s*path:\s*"notes\.txt"\s*\)'
    message: 'Write let notes = folder.appending(path: "notes.txt")'
solution: |-
  let notes = folder.appending(path: "notes.txt")
```

```quiz
question: "Why pass `.atomic` when writing data?"
options:
  - It makes the write faster.
  - A crash halfway through leaves the old file intact instead of a broken one.
  - It encrypts the file.
answer: 1
explain: Atomic writes go to a temporary file first and replace the original only when complete.
```
