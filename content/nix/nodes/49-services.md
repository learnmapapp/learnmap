---
title: Services
icon: "⚙️"
branch: systems
requires: [nixos-modules]
summary: Databases, web servers and your own systemd units.
---
NixOS has modules for thousands of services. Turning one on is usually one line, with options for the rest:

```nix
services.postgresql = {
  enable = true;
  package = pkgs.postgresql_16;
  ensureDatabases = [ "shop" ];
};

services.nginx = {
  enable = true;
  virtualHosts."shop.example.org" = {
    enableACME = true;
    forceSSL = true;
    locations."/".proxyPass = "http://127.0.0.1:4000";
  };
};

security.acme = {
  acceptTerms = true;
  defaults.email = "admin@example.org";
};
```

That's a database, a reverse proxy and automatic HTTPS certificates. Search every option at search.nixos.org/options.

For your own program, write a systemd service:

```nix
systemd.services.shop = {
  description = "The shop backend";
  wantedBy = [ "multi-user.target" ];
  after = [ "postgresql.service" ];
  serviceConfig = {
    ExecStart = "${pkgs.shop}/bin/shop";
    DynamicUser = true;
    Restart = "always";
  };
};
```

Don't forget the firewall. It's on by default:

```nix
networking.firewall.allowedTCPPorts = [ 80 443 ];
```

```exercise
goal: Open ports 80 and 443 in the firewall.
code: |
  services.nginx.enable = true;
checks:
  - match: 'networking\.firewall\.allowedTCPPorts\s*=\s*\[\s*(80\s+443|443\s+80)\s*\]\s*;'
    message: 'Add  networking.firewall.allowedTCPPorts = [ 80 443 ];'
output: "nginx is reachable on :80 and :443"
```
