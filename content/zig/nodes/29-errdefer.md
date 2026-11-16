---
title: errdefer cleanup
icon: "🧯"
branch: errors
requires: [defer, try]
summary: Cleanup that only runs if the function fails, for undoing half-finished work.
---
Building a house goes in steps: foundation, walls, roof. If the roof order falls through, you don't want to leave a roofless shell standing. But if everything succeeds, you certainly don't want to knock the house down.

`defer` would always knock it down. **`errdefer`** only runs when the function **returns an error**:

```zig title=house.zig
fn buildHouse(allocator: std.mem.Allocator) !*House {
    const house = try allocator.create(House);
    errdefer allocator.destroy(house); // only if a later step fails

    house.walls = try buildWalls(allocator);
    errdefer freeWalls(allocator, house.walls);

    house.roof = try orderRoof(); // fails? walls freed, then the house
    return house; // success: nothing undone, the caller owns it
}
```

On the success path, both `errdefer`s are skipped and the caller gets a finished house. If `orderRoof` fails, Zig runs the `errdefer`s registered *so far*, in reverse: walls first, then the house.

This pattern shows up whenever a function **creates something and hands it to the caller**: constructors, `init` functions, loaders. For the parts the function only needs temporarily, keep using plain `defer`.

Here's a quick way to choose:

| The thing you made... | Use |
| --- | --- |
| is only needed inside this function | `defer` |
| is returned to the caller on success | `errdefer` |

You can even capture the error, which is handy for logging: `errdefer |err| std.log.err("build failed: {}", .{err});`

```exercise
goal: "`loadDeck` returns the cards to its caller, but `defer` frees them even on success. Free them only when a later step fails."
code: |-
  fn loadDeck(allocator: std.mem.Allocator) ![]Card {
      const cards = try allocator.alloc(Card, 52);
      defer allocator.free(cards);
      try shuffle(cards);
      return cards;
  }
checks:
  - match: 'errdefer\s+allocator\.free\(cards\)'
    message: Use errdefer, so the cards are only freed when the function fails.
  - notMatch: '(^|[^r])defer\s+allocator\.free'
    message: A plain defer would free the cards the caller is about to use.
solution: |-
  fn loadDeck(allocator: std.mem.Allocator) ![]Card {
      const cards = try allocator.alloc(Card, 52);
      errdefer allocator.free(cards);
      try shuffle(cards);
      return cards;
  }
```

```quiz
question: A function allocates a buffer, uses it to build a string, and returns the string (not the buffer). How should it free the buffer?
options:
  - "`defer`, since the buffer is only needed inside the function."
  - "`errdefer`, since the function can fail."
  - It shouldn't; the caller frees it.
answer: 0
explain: The buffer never leaves the function, so it must be freed on every path. That's defer.
```
