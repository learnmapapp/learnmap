---
title: Scripts and files
icon: "📄"
branch: build
requires: [derivations, multiline-strings]
summary: writeShellApplication, writeText and other quick builders.
---
Not everything needs a full package. For small scripts and config files, nixpkgs has quick builders.

**A shell script with its dependencies:**

```nix
pkgs.writeShellApplication {
  name = "backup";
  runtimeInputs = [ pkgs.rsync pkgs.coreutils ];
  text = ''
    rsync -a ~/docs/ /mnt/backup/docs/
    echo "Backed up at $(date)"
  '';
}
```

`runtimeInputs` go on the script's `PATH`, so it works even on a machine without `rsync` installed. It also runs `shellcheck` on your script at build time.

**A file with some content:**

```nix
pkgs.writeText "nginx.conf" ''
  server { listen 80; }
''
```

**A folder that merges several packages:**

```nix
pkgs.symlinkJoin {
  name = "my-tools";
  paths = [ pkgs.git pkgs.jq pkgs.ripgrep ];
}
```

**Run a few commands to produce an output:**

```nix
pkgs.runCommand "hello.txt" { } ''
  echo "hello" > $out
''
```

```exercise
goal: Make the script's dependency on `curl` explicit with runtimeInputs.
code: |
  pkgs.writeShellApplication {
    name = "ping-site";
    text = ''
      curl -sI https://nixos.org
    '';
  }
checks:
  - match: 'runtimeInputs\s*=\s*\[[^\]]*pkgs\.curl[^\]]*\]\s*;'
    message: 'Add  runtimeInputs = [ pkgs.curl ];'
output: "HTTP/2 200"
```
