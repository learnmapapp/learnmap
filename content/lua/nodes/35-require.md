---
title: Load a module
icon: "📥"
branch: design
requires: [modules]
summary: How require finds a file, why it only runs it once, and what dots in names mean.
---
You write `local json = require("json")`. What actually happens? Let's answer the questions people usually have.

**Where does `require` look?**

It goes through the templates in `package.path`, replacing each `?` with the module name. Print it to see your own:

```repl shell
> lua -e "print(package.path)"
/usr/local/share/lua/5.4/?.lua;/usr/local/share/lua/5.4/?/init.lua;./?.lua;./?/init.lua
```

So `require("json")` tries `/usr/local/share/lua/5.4/json.lua`, then `.../json/init.lua`, then `./json.lua` in the current directory, and so on. The first file that exists wins.

**What are the dots in `require("app.models.user")`?**

Dots become directory separators: that loads `app/models/user.lua`. Note: you write *no* `.lua` extension in the name.

**What if I call `require` twice?**

The file only runs the first time. Its return value is stored in the table `package.loaded`, and later calls return that same value:

```lua
local a = require("temperature")
local b = require("temperature")
print(a == b)   -- true: the very same table
```

That means module-level code, like reading a config file, happens once. It also means modules are effectively shared singletons: if one file changes a field on the module table, everyone sees it.

**How do I reload a module during development?**

Clear the cache entry first. Neovim users do this a lot:

```lua
package.loaded["temperature"] = nil
local fresh = require("temperature")
```

**What does the error look like when a module can't be found?**

```repl shell
> lua main.lua
error: lua: main.lua:1: module 'temprature' not found:
	no field package.preload['temprature']
	no file '/usr/local/share/lua/5.4/temprature.lua'
	no file './temprature.lua'
	...
```

That list of every path it tried is your friend: check the spelling (as here) and whether you're running `lua` from the directory you think.

**Can I add my own folder?**

Yes, prepend to the path before requiring: `package.path = "./lib/?.lua;" .. package.path`. Or set the `LUA_PATH` environment variable.

```compare python
import json   # cached in sys.modules, like package.loaded
```

```compare javascript
import { readFile } from "node:fs";  // modules are also evaluated only once
```

```exercise
goal: "The module lives in `lib/strings/pad.lua`, relative to the project. Fix the require: no extension, and dots instead of slashes."
code: |-
  local pad = require("lib/strings/pad.lua")
checks:
  - match: 'require\(\s*"lib\.strings\.pad"\s*\)'
    message: 'Write require("lib.strings.pad")'
solution: |-
  local pad = require("lib.strings.pad")
```

```quiz
question: "A module prints \"loading\" at its top level. Three files require it. How often is \"loading\" printed?"
options:
  - Once.
  - Three times.
  - Never, require doesn't run top-level code.
answer: 0
explain: require runs the file once and caches the result in package.loaded.
```
