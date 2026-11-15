---
title: Indented strings
icon: "📜"
branch: language
requires: [strings]
summary: "Two single quotes for scripts and config files."
---
Config files and shell scripts are full of quotes and newlines. Nix has a second string syntax for them: two single quotes, `''`.

```nix
''
  #!/bin/sh
  echo "Hello from Nix"
  echo "Today is $(date)"
''
```

The common indentation is stripped, so you can indent the string to match your code. The result starts at `#!/bin/sh`.

Interpolation still works:

```nix
''
  server {
    listen ${toString port};
    root ${./public};
  }
''
```

Because `${` means interpolation, you need to escape it when the script itself uses shell variables like `${HOME}`. Write `''${`:

```nix
''
  echo "Home is ''${HOME}"
''
```

`$HOME` without braces doesn't need escaping. Other escapes: `'''` gives `''`, and `''\n` gives a newline.

```compare python
textwrap.dedent("""
    #!/bin/sh
    echo "Hello"
""")
```

```compare javascript
const script = `
#!/bin/sh
echo "Hello"`;
```

```compare java
String script = """
    #!/bin/sh
    echo "Hello"
    """;
```

```compare kotlin
val script = """
    #!/bin/sh
    echo "Hello"
""".trimIndent()
```

```exercise
goal: Escape the shell variable so Nix doesn't try to interpolate it.
code: |
  ''
    echo "User is ${USER}"
  ''
checks:
  - match: "''\\$\\{USER\\}"
    message: "Write ''${USER} so it reaches the shell as ${USER}."
output: '"echo \"User is ${USER}\"\n"'
```
