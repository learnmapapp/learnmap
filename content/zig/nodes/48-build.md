---
title: build.zig
icon: "🏗️"
branch: tools
requires: [imports, tests]
summary: Your build script is a Zig program. Here's what's in the one zig init makes.
---
`zig run file.zig` is fine for one file. Real projects use **`build.zig`**: a build script written in Zig itself. No Makefile, no CMake, no YAML.

Start a project with:

```repl shell
> mkdir todo && cd todo && zig init
info: created build.zig
info: created build.zig.zon
info: created src/main.zig
info: created src/root.zig
```

The generated `build.zig` has lots of helpful comments. Stripped down to its core, it looks like this:

```zig title=build.zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "todo",
        .root_module = b.createModule(.{
            .root_source_file = b.path("src/main.zig"),
            .target = target,
            .optimize = optimize,
        }),
    });
    b.installArtifact(exe);

    const run = b.addRunArtifact(exe);
    const run_step = b.step("run", "Run the app");
    run_step.dependOn(&run.step);
}
```

Read it as a recipe being written down, not cooked: `build` describes a graph of steps, and then the build system runs the parts you ask for.

1. `target` and `optimize` read `-Dtarget=...` and `-Doptimize=...` from the command line.
2. `addExecutable` describes a program. Its **root module** is the file with `main`, and imports are followed from there.
3. `installArtifact` puts the binary in `zig-out/bin/` when you run `zig build`.
4. `b.step("run", ...)` adds a named step, so `zig build run` works.

The everyday commands:

| Command | Does |
| --- | --- |
| `zig build` | compile and install to `zig-out/` |
| `zig build run` | build, then run |
| `zig build test` | run the tests (`zig init` sets this step up) |
| `zig build -Doptimize=ReleaseFast` | an optimised build |
| `zig build --help` | list every step and option |

`build.zig.zon` is the package manifest: name, version and dependencies. (`.zon` is "Zig Object Notation", basically a Zig struct literal.)

```exercise
goal: Rename the program to `notes`, and change its entry point to `src/app.zig`.
code: |-
  const exe = b.addExecutable(.{
      .name = "todo",
      .root_module = b.createModule(.{
          .root_source_file = b.path("src/main.zig"),
          .target = target,
          .optimize = optimize,
      }),
  });
checks:
  - match: '\.name\s*=\s*"notes"'
    message: Set .name to "notes".
  - match: 'b\.path\("src/app\.zig"\)'
    message: Point root_source_file at src/app.zig.
solution: |-
  const exe = b.addExecutable(.{
      .name = "notes",
      .root_module = b.createModule(.{
          .root_source_file = b.path("src/app.zig"),
          .target = target,
          .optimize = optimize,
      }),
  });
```

```quiz
question: "What makes `zig build run` work?"
options:
  - The run command is built into Zig for every project.
  - build.zig creates a step named "run" that depends on running the executable.
  - It runs whichever file contains main.
answer: 1
explain: Named steps come from b.step in build.zig. zig init simply generates the run step for you.
```
