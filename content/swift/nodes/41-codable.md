---
title: Encode typed JSON
icon: "🗂️"
branch: tools
requires: [structs, errors]
summary: Conform to Codable, and JSON becomes typed values with one line each way.
---
You've received this from a weather API:

```json title=weather.json
{
  "city": "Lisbon",
  "temp_c": 23.5,
  "sunny": true
}
```

In some languages you'd dig through a dictionary of `Any`, casting each field and hoping. In Swift you describe the **shape** once, and the compiler writes the conversion code:

```swift title=weather.swift
import Foundation

struct Weather: Codable {
    let city: String
    let tempC: Double
    let sunny: Bool

    enum CodingKeys: String, CodingKey {
        case city, sunny
        case tempC = "temp_c"
    }
}

let json = Data(#"{"city": "Lisbon", "temp_c": 23.5, "sunny": true}"#.utf8)

do {
    let weather = try JSONDecoder().decode(Weather.self, from: json)
    print("\(weather.city): \(weather.tempC)°C \(weather.sunny ? "☀️" : "☁️")")
} catch {
    print("Bad JSON: \(error)")
}
```

```repl shell
> swift weather.swift
Lisbon: 23.5°C ☀️
```

What's going on:

- **`Codable`** is two protocols in one: `Decodable` (from JSON) and `Encodable` (to JSON). Because every property is itself Codable, Swift generates all the code.
- **`JSONDecoder().decode(Weather.self, from: json)`** turns `Data` into a `Weather`. The `.self` passes the type itself as an argument.
- **Decoding throws.** A missing key, or a string where a number should be, becomes an error that says exactly which field was wrong. No half-filled objects.
- **`CodingKeys`** maps Swift names to JSON names. You only need it when they differ. (For snake_case keys everywhere, `decoder.keyDecodingStrategy = .convertFromSnakeCase` does it for the whole document.)
- `#"..."#` is a **raw string**, so the quotes inside don't need escaping.

Going the other way is just as short:

```swift
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
let data = try encoder.encode(weather)
print(String(decoding: data, as: UTF8.self))
```

Optional properties (`let humidity: Int?`) are simply nil when the key is missing. Arrays and nested Codable structs work automatically too.

```compare python
data = json.loads(text)
city = data["city"]   # no checking until you use it
```

```compare typescript
const weather = JSON.parse(text) as Weather;  // a promise, not a check!
```

```compare rust
#[derive(Serialize, Deserialize)]
struct Weather { city: String, temp_c: f64, sunny: bool }
```

```exercise
goal: "Make `Song` decodable from JSON, then decode it from `data`."
code: |-
  struct Song {
      let title: String
      let plays: Int
  }

  let song = parse(data)
checks:
  - match: 'struct\s+Song\s*:\s*(Codable|Decodable)'
    message: Conform Song to Codable.
  - match: 'let\s+song\s*=\s*try\s+JSONDecoder\(\)\.decode\(\s*Song\.self\s*,\s*from:\s*data\s*\)'
    message: "Use try JSONDecoder().decode(Song.self, from: data)"
solution: |-
  struct Song: Codable {
      let title: String
      let plays: Int
  }

  let song = try JSONDecoder().decode(Song.self, from: data)
```

```quiz
question: "The JSON is missing a key for a non-optional property. What does `decode` do?"
options:
  - Fills in a default value like 0 or "".
  - Throws an error that names the missing key.
  - Returns nil.
answer: 1
explain: Decoding is strict. A missing required key throws a DecodingError that says which key is missing.
```
