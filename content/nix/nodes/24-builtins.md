---
title: Builtins
icon: "🧰"
branch: language
requires: [functions]
summary: The functions that come with the language.
---
Nix ships with a set of built-in functions, all in the `builtins` set:

```repl
> builtins.length [ 1 2 3 ]
3
> builtins.attrNames { b = 2; a = 1; }
[ "a" "b" ]
> builtins.map (x: x * 2) [ 1 2 3 ]
[ 2 4 6 ]
> builtins.filter (x: x > 1) [ 1 2 3 ]
[ 2 3 ]
> builtins.toJSON { port = 80; }
"{\"port\":80}"
> builtins.readFile ./version.txt
"1.4.2\n"
```

A few are so common they're available without the prefix: `map`, `toString`, `import`, `throw`, `baseNameOf`, `isNull`, `removeAttrs`.

```repl
> toString 42
"42"
> map (n: "v${toString n}") [ 1 2 ]
[ "v1" "v2" ]
```

Numbers don't turn into strings on their own: `"port ${8080}"` is an error. Use `toString`.

Explore them in the [REPL](node:repl): type `builtins.` and press Tab.

```compare python
len([1, 2, 3])
list(map(lambda x: x * 2, [1, 2, 3]))
json.dumps({"port": 80})
```

```compare javascript
[1, 2, 3].length;
[1, 2, 3].map((x) => x * 2);
JSON.stringify({ port: 80 });
```

```compare java
List.of(1, 2, 3).size();
List.of(1, 2, 3).stream().map(x -> x * 2).toList();
```

```compare kotlin
listOf(1, 2, 3).size
listOf(1, 2, 3).map { it * 2 }
```

```exercise
goal: Fix the string by turning the port number into a string.
code: |
  "listening on ${port}"
checks:
  - match: '\$\{\s*(builtins\.)?toString\s+port\s*\}'
    message: 'Numbers need toString: ${toString port}'
output: '"listening on 8080"'
```
