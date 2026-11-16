---
title: Cross-compilation
icon: "🌍"
branch: tools
requires: [build]
summary: Build for Windows, Linux or a Raspberry Pi from whatever machine you're on.
---
This is Zig's party trick. Sitting on a Mac, you can produce a Windows `.exe`, a Linux binary, and a Raspberry Pi binary, without installing anything else:

```repl shell
> zig build -Dtarget=x86_64-windows
> zig build -Dtarget=x86_64-linux
> zig build -Dtarget=aarch64-linux
```

That's it. No extra toolchains, no Docker, no virtual machines. A Zig download bundles what it needs for all major platforms, including C standard libraries.

A **target** is written `cpu-os`, sometimes with an ABI on the end:

| Target | Runs on |
| --- | --- |
| `x86_64-windows` | most Windows PCs |
| `aarch64-macos` | Apple Silicon Macs |
| `x86_64-linux-musl` | Linux, as a fully static binary |
| `aarch64-linux` | Raspberry Pi 4/5, ARM servers |
| `wasm32-wasi` | WebAssembly runtimes |

`zig targets` lists everything, although the output is long.

Without a build script, single files work too:

```repl shell
> zig build-exe hello.zig -target aarch64-linux
```

Want a build that always targets one platform, whatever the command line says? Resolve a fixed target in `build.zig`:

```zig title=build.zig
const pi_target = b.resolveTargetQuery(.{
    .cpu_arch = .aarch64,
    .os_tag = .linux,
});
```

```tip
Zig can cross-compile C and C++ too. `zig cc` is a drop-in C compiler, and some Go and Rust projects use it purely to make cross-compiling their C dependencies painless.
```

```compare rust
// rustup target add x86_64-pc-windows-gnu
// cargo build --target x86_64-pc-windows-gnu
// (plus a cross linker for many targets)
```

```exercise
goal: The kiosk app should always build for 64-bit ARM Linux. Fill in the target query.
code: |-
  const kiosk_target = b.resolveTargetQuery(.{
      .cpu_arch = .x86_64,
      .os_tag = .windows,
  });
checks:
  - match: '\.cpu_arch\s*=\s*\.aarch64'
    message: 64-bit ARM is .aarch64.
  - match: '\.os_tag\s*=\s*\.linux'
    message: The operating system is .linux.
solution: |-
  const kiosk_target = b.resolveTargetQuery(.{
      .cpu_arch = .aarch64,
      .os_tag = .linux,
  });
```

```quiz
question: What do you need to install to build a Windows binary on Linux with Zig?
options:
  - A Windows SDK and a cross linker.
  - Nothing beyond Zig itself.
  - Wine, to run the Windows compiler.
answer: 1
explain: Zig ships with cross-compilation support for all major targets built in.
```
