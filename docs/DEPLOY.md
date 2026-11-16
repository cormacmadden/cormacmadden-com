# Deploying cormacmadden.com

The site is a static Astro build served by nginx in a Docker container on the
mini PC (LXC 102, hostname `docker`, 192.168.1.214), next to Nextcloud, OpenClaw
and the rest. The `minipc-docker` Cloudflare tunnel that already runs there
publishes it at cormacmadden.com. Nothing is forwarded on the router, no port is
open to the internet, and the desktop PC is not involved — so the site stays up
whether or not it is on.

```
GitHub (push to main)
  └─ self-hosted runner on the LXC
       └─ docker compose up -d --build
            └─ cormacmadden-com   nginx + the built site, :8088 on the LXC
                 ↑
            minipc-docker tunnel ── outbound to Cloudflare ── cormacmadden.com
```

The tunnel already routes `cloud`, `claw` and `gymin` to other ports on
192.168.1.214 the same way. The site is just one more entry.

## One-time setup

### 1. First deploy on the LXC

```sh
git clone https://github.com/cormacmadden/cormacmadden-com.git /srv/cormacmadden-com
cd /srv/cormacmadden-com
docker compose up -d --build
curl -I http://localhost:8088/        # expect 200 OK
```

The first build takes a few minutes (npm install plus image optimisation).

### 2. Point the tunnel at it

Cloudflare dashboard → **Tunnels** → `minipc-docker` → the route list:

| Hostname | Service |
| --- | --- |
| `cormacmadden.com` | `http://192.168.1.214:8088` |
| `www.cormacmadden.com` | `http://192.168.1.214:8088` |

`www` previously pointed at `http://192.168.1.140:4321` — the Astro dev server
on the desktop PC. Repointing it is what cuts that dependency.

HTTP inside the LAN is fine: the public leg is HTTPS, terminated by Cloudflare
with a certificate it manages.

### 3. Hand it over to GitHub Actions

`.github/workflows/deploy.yml` runs on every push to `main` using the same
self-hosted runner as DigitalTwinWebApp and life-os. Runners are registered per
repository, so this repo needs its own: GitHub → **Settings** → **Actions** →
**Runners** → **New self-hosted runner**, then run the shown commands on the LXC
as the user that owns the runner service.

The runner needs permission to use Docker (in the `docker` group, or root) and a
checkout directory it can keep. Nothing is stored in GitHub: no secrets, no
registry, no SSH keys.

## Everyday use

| Task | Command |
| --- | --- |
| Deploy | `git push` (or **Run workflow** in the Actions tab) |
| Deploy by hand | `cd /srv/cormacmadden-com && git pull && docker compose up -d --build` |
| Logs | `docker compose logs -f web` |
| Is it serving? | `curl -I http://192.168.1.214:8088/` |
| Roll back | `git revert` the commit and push, or check out an older commit and run the compose command |

## If something breaks

**The site is down but the container is up.** The container and the tunnel are
separate: check `docker compose ps` first, then the tunnel's status in the
Cloudflare dashboard. A tunnel that is Healthy but returns 502 usually means the
route's service URL is wrong — it must be `http://192.168.1.214:8088`, not
`localhost`, because cloudflared runs in its own container.

**Cloudflare error 1033.** The tunnel itself is down. Restart its container on
the LXC; it is not managed by this repo.

**The build fails on the runner.** Build it by hand on the LXC to see the full
output: `docker build -t cormacmadden-com:test .`. It needs enough free disk for
node_modules plus the image — the N95 box can get tight.

**A page 404s but exists locally.** nginx serves `/work/thing` from
`/work/thing/index.html` (see `docker/nginx.conf`). If you change
`build.format` or `trailingSlash` in `astro.config.mjs`, that rule changes too.

## Notes

- Port 8088 is published on the LXC so the tunnel (and you, on the LAN or over
  Tailscale) can reach it. It is not exposed to the internet.
- Cloudflare caches static assets at its edge. Astro fingerprints everything in
  `/_astro/`, so a deploy can't serve stale assets, but after replacing an image
  or a PDF in `public/` you may want **Caching → Purge Everything** once.
- `www` and the apex both serve the site. Canonical links point at the apex, so
  search engines treat that as the real address; add a Cloudflare redirect rule
  if you would rather `www` bounced to it.
