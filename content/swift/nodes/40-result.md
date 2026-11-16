---
title: Explicit Result values
icon: "📬"
branch: tools
requires: [errors, associated]
summary: Result holds either a success or a failure as a value you can store and pass around.
---
`throws` is great when the caller handles the error right away. But what if the outcome needs to *wait*? You might want to store it in a list of upload results, pass it to another part of the app, or show it later.

**`Result`** packs either outcome into a single value. It's simply an [enum with associated values](node:associated):

```swift
enum Result<Success, Failure: Error> {
    case success(Success)
    case failure(Failure)
}
```

(That's the shape of the standard library's version; you don't need to write it yourself.)

Here's a batch of uploads, where every outcome is kept:

```swift title=uploads.swift
enum UploadError: Error { case tooLarge, offline }

func upload(_ sizeMB: Int) -> Result<String, UploadError> {
    if sizeMB > 10 { return .failure(.tooLarge) }
    return .success("https://files.example/\(sizeMB)")
}

let results = [3, 25, 7].map(upload)

for result in results {
    switch result {
    case .success(let url):
        print("✅ \(url)")
    case .failure(let error):
        print("❌ \(error)")
    }
}
```

```repl shell
> swift uploads.swift
✅ https://files.example/3
❌ tooLarge
✅ https://files.example/7
```

**Converting between the two worlds** is a one-liner each way:

- From throwing code to a Result: `Result { try parse(text) }` catches any error.
- From a Result back to throwing: `try result.get()` returns the success value, or throws the failure.

So which one should you use? In modern Swift, **`throws` is the default**: it's lighter to write, and since Swift 6 it can be typed too. Reach for `Result` when you need to **keep** an outcome as data: collections of outcomes, caching, or callback-based APIs. You'll still see it a lot in older code from before `async`/`await`, where completion handlers used to receive a `Result`.

```compare rust
fn upload(size_mb: u32) -> Result<String, UploadError> { }
```

```compare kotlin
val outcome: Result<String> = runCatching { upload(3) }
```

```compare typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
```

```exercise
goal: "This code uses do/catch only to turn a throwing call into a Result. Replace it with the one-line `Result { try ... }` initializer."
code: |-
  let outcome: Result<Data, Error>
  do {
      outcome = .success(try download())
  } catch {
      outcome = .failure(error)
  }
checks:
  - match: 'let\s+outcome\s*(:\s*Result<Data,\s*(any\s+)?Error>\s*)?=\s*Result\s*\{\s*try\s+download\(\)\s*\}'
    message: "Write let outcome = Result { try download() }"
  - notMatch: '\bdo\s*\{'
    message: The do/catch isn't needed any more.
solution: |-
  let outcome = Result { try download() }
```

```quiz
question: "How do you get the success value out of a Result, throwing if it's a failure?"
options:
  - "`result.value!`"
  - "`try result.get()`"
  - "`result as! Success`"
answer: 1
explain: get() returns the success value, or throws the stored error.
```
