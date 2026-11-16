---
title: Custom addition
icon: "➗"
branch: design
requires: [metatables, functions]
summary: Teach your tables +, == and < with arithmetic and comparison metamethods.
---
Let's make 2D vectors that you can add with `+`, like the built-in numbers. The plan: one shared metatable, and a small function that creates vectors with it.

```lua title=vector.lua
local Vector = {}

local function vec(x, y)
  return setmetatable({ x = x, y = y }, Vector)
end

Vector.__add = function(a, b)
  return vec(a.x + b.x, a.y + b.y)
end

Vector.__eq = function(a, b)
  return a.x == b.x and a.y == b.y
end

Vector.__tostring = function(v)
  return ("(%g, %g)"):format(v.x, v.y)
end

local pos = vec(1, 2)
local step = vec(3, 0)
print(pos + step)                -- (4, 2)
print(pos + step == vec(4, 2))   -- true
```

**How it works.** For `a + b`, Lua first checks whether both are numbers. They aren't, so it looks for `__add` in `a`'s metatable, then in `b`'s, and calls `__add(a, b)`.

That "then in `b`'s" matters for mixed operations. In `2 * v`, the left side is a number, so Lua finds `__mul` on `v`, but the arguments still arrive in order: `__mul(2, v)`. Your function needs to check which side is the number:

```lua
Vector.__mul = function(a, b)
  if type(a) == "number" then a, b = b, a end   -- now a is the vector
  return vec(a.x * b, a.y * b)
end

print(2 * pos, pos * 2)   -- (2, 4)  (2, 4)
```

The full menu:

| Operators | Metamethods |
| --- | --- |
| `+ - * / % ^` | `__add __sub __mul __div __mod __pow` |
| `//` and unary `-` | `__idiv __unm` |
| `..` | `__concat` |
| `== < <=` | `__eq __lt __le` |
| `& \| ~ << >>` | `__band __bor __bxor __shl __shr` |

There's no `__ne`, `__gt` or `__ge`: Lua derives `~=` from `__eq`, and `a > b` from `b < a`.

Without `__eq`, `==` compares tables by **identity**: two separate tables with the same contents are not equal. That's why `__eq` is on the list above.

```compare python
class Vector:
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
```

```compare rust
impl Add for Vector {
    type Output = Vector;
    fn add(self, o: Vector) -> Vector { Vector { x: self.x + o.x, y: self.y + o.y } }
}
```

```compare javascript
// JavaScript has no operator overloading: you'd write a.add(b)
```

```exercise
goal: "Add subtraction: give `Vector` an `__sub` metamethod that returns `vec(a.x - b.x, a.y - b.y)`."
code: |-
  Vector.__add = function(a, b)
    return vec(a.x + b.x, a.y + b.y)
  end
checks:
  - match: 'Vector\.__sub\s*=\s*function\(\s*a\s*,\s*b\s*\)'
    message: Define Vector.__sub = function(a, b)
  - match: 'return\s+vec\(\s*a\.x\s*-\s*b\.x\s*,\s*a\.y\s*-\s*b\.y\s*\)'
    message: Return vec(a.x - b.x, a.y - b.y)
solution: |-
  Vector.__add = function(a, b)
    return vec(a.x + b.x, a.y + b.y)
  end

  Vector.__sub = function(a, b)
    return vec(a.x - b.x, a.y - b.y)
  end
```

```quiz
question: "Two tables have the same fields and no metatable. What is `a == b`?"
options:
  - true, because their contents are equal.
  - false, because without __eq, tables are compared by identity.
  - An error.
answer: 1
explain: Without __eq, == only returns true for the very same table.
```
