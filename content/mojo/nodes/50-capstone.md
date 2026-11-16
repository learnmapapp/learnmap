---
title: Validated numeric pipeline
icon: "🏁"
branch: tools
requires: [iteration]
summary: "Capstone: parse, validate, summarize and test sensor data, using everything from the course."
---
Time to put it together. A weather station sends readings as text, one per line. Some are broken. Your program should turn them into numbers, skip the junk, and report the average. It's small, but it touches most of what you've learned.

**The plan:**

```text
"21.5", "19.0", "error", "23.5", "999"   raw text
          | parse_reading (raises)
          v
[21.5, 19.0, 23.5]                       List[Float64], junk skipped
          | average (raises on empty)
          v
21.333...                                one number
```

**Piece 1: parse one reading.** Conversion can fail, so it [raises](node:errors). Physically impossible values are rejected too:

```mojo
def parse_reading(text: String) raises -> Float64:
    var value = Float64(text)
    if value < -90.0 or value > 60.0:
        raise Error(t"impossible temperature: {value}")
    return value
```

**Piece 2: average a list.** An empty list has no average, and dividing by zero would give `nan`, so it's an error. The list is a [read argument](node:read-args): no copy.

```mojo
def average(values: List[Float64]) raises -> Float64:
    if len(values) == 0:
        raise Error("no valid readings")
    var total = 0.0
    for v in values:
        total += v
    return total / Float64(len(values))
```

**Piece 3: the pipeline.** [Handle](node:handling) each bad reading, keep the good ones, report:

```mojo title=station.mojo
def main() raises:
    var raw: List[String] = ["21.5", "19.0", "error", "23.5", "999"]
    var good: List[Float64] = []
    var skipped = 0

    for text in raw:
        try:
            good.append(parse_reading(text))
        except:
            skipped += 1

    print(t"{len(good)} readings, {skipped} skipped")
    print(t"Average: {average(good)}")
```

`main` keeps `raises` because `average` can still fail, when every reading is broken. That's a real outcome, so it's right to let it surface.

**Piece 4: tests**, in `test_station.mojo`:

```mojo
from station import average, parse_reading
from std.testing import assert_equal, assert_raises, TestSuite

def test_average() raises:
    assert_equal(average([2.0, 4.0]), 3.0)

def test_empty_list_raises() raises:
    with assert_raises(contains="no valid"):
        _ = average(List[Float64]())

def test_rejects_impossible() raises:
    with assert_raises():
        _ = parse_reading("999")

def main() raises:
    TestSuite.discover_tests[__functions_in_module()]().run()
```

(The tests import from `station`, so in a real project you'd move `main` out of `station.mojo`, or keep the functions in their own module.)

**Where to go from here:** make the pipeline faster by loading readings into [SIMD vectors](node:simd) and [reducing](node:simd-reduce) them; read real data with `open`; or use [NumPy from Mojo](node:python) for statistics you don't want to write yourself.

```compare python
def average(values: list[float]) -> float:
    if not values:
        raise ValueError("no valid readings")
    return sum(values) / len(values)
```

```compare rust
fn average(values: &[f64]) -> Result<f64, String> {
    if values.is_empty() { return Err("no valid readings".into()); }
    Ok(values.iter().sum::<f64>() / values.len() as f64)
}
```

```exercise
goal: "Finish `maximum`: raise `Error(\"empty\")` for an empty list, otherwise loop and return the largest value."
code: |-
  def maximum(values: List[Float64]) -> Float64:
      var best = values[0]
      return best
checks:
  - match: 'def\s+maximum\(\s*values\s*:\s*List\[\s*Float64\s*\]\s*\)\s+raises\s*->\s*Float64'
    message: The function can fail now, so add raises to the signature.
  - match: 'if\s+len\(\s*values\s*\)\s*==\s*0\s*:\s*\n\s+raise\s+Error\("empty"\)'
    message: 'Start with: if len(values) == 0: raise Error("empty")'
  - match: 'for\s+(\w+)\s+in\s+values\s*:\s*\n\s+if\s+\1\s*>\s*best\s*:\s*\n\s+best\s*=\s*\1'
    message: 'Loop: for v in values: if v > best: best = v'
solution: |-
  def maximum(values: List[Float64]) raises -> Float64:
      if len(values) == 0:
          raise Error("empty")
      var best = values[0]
      for v in values:
          if v > best:
              best = v
      return best
```

```quiz
question: "Why does `main` in station.mojo still need `raises`?"
options:
  - Because parse_reading can raise.
  - Because average can raise when no reading is valid, and main doesn't catch that.
  - Every main function needs raises.
answer: 1
explain: The parse errors are handled in the loop, but the error from average is passed on.
```
