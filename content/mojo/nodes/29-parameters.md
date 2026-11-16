---
title: Compile-time parameters
icon: "🎚️"
branch: comptime
requires: [comptime]
summary: Square brackets pass values to the compiler, parentheses pass values to the running program.
---
Mojo functions can take two kinds of input, and the brackets tell them apart:

```text
repeat[3]("Hello")
      ^^^           parameter: known when the program compiles
         ^^^^^^^^^  argument: known when the program runs
```

Here's that function:

```mojo title=repeat.mojo
def repeat[count: Int](message: String):
    comptime for i in range(count):
        print(message)

def main():
    repeat[3]("Hello")
```

```repl shell
> mojo run repeat.mojo
Hello
Hello
Hello
```

Because `count` is a [[parameter]], the compiler knows it's 3 while compiling. `comptime for` then *unrolls* the loop: the compiled program contains three `print` calls in a row, with no counter and no loop check. Call `repeat[5]` somewhere else, and the compiler produces a second version with five prints.

**Parameters versus arguments:**

| | Parameters `[...]` | Arguments `(...)` |
| --- | --- | --- |
| Known | at compile time | at runtime |
| Can come from | literals, `comptime` values | anything, including user input |
| Used for | sizes, types, settings | the data being processed |
| Each different value | makes a separate compiled version | uses the same compiled code |

You've seen parameters already: in `List[Int]` the type `Int` is a parameter, and in [generics](node:generics) `[T: Shape]` is a type parameter. Numbers work the same way.

**When are parameters worth it?** When a value shapes the code itself: how many lanes a vector has, how far a loop unrolls, which algorithm variant to use. The compiler can then optimize for that exact value. For ordinary data, use arguments. Making everything a parameter would just produce lots of compiled copies.

**Parameters can have defaults** and be named, just like arguments:

```mojo
def pad[width: Int = 8](text: String) -> String:
    var result = text
    while len(result) < width:
        result += " "
    return result

pad("hi")             # width 8
pad[width=12]("hi")   # width 12
```

```compare rust
fn repeat<const COUNT: usize>(message: &str) {
    for _ in 0..COUNT { println!("{message}"); }
}
repeat::<3>("Hello");
```

```compare python
# Python has no compile-time parameters; everything is a runtime argument.
def repeat(count: int, message: str): ...
```

```exercise
goal: "Make `scale` a compile-time parameter: move it into square brackets before the regular arguments."
code: |-
  def multiply(scale: Int, x: Int) -> Int:
      return x * scale

  def main():
      print(multiply(10, 4))
checks:
  - match: 'def\s+multiply\[\s*scale\s*:\s*Int\s*\]\(\s*x\s*:\s*Int\s*\)'
    message: 'Write def multiply[scale: Int](x: Int) -> Int:'
  - match: 'multiply\[\s*10\s*\]\(\s*4\s*\)'
    message: Call it as multiply[10](4).
solution: |-
  def multiply[scale: Int](x: Int) -> Int:
      return x * scale

  def main():
      print(multiply[10](4))
```

```quiz
question: "In `resize[64](image)`, which value must be known when compiling?"
options:
  - "`64`"
  - "`image`"
  - Both.
answer: 0
explain: Square brackets hold compile-time parameters. image is an ordinary runtime argument.
```
