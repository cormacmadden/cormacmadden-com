# Deploying cormacmadden.com

The site is a static Astro build served by nginx in a Docker container on the
mini PC (LXC 102, hostname `docker`, 192.168.1.214), next to the other apps.
A second container, `cloudflared`, dials out to Cloudflare and publishes it at
cormacmadden.com. Nothing is forwarded on the router and no port is open to the
internet, so the site stays up whether or not the desktop PC is on.

```
GitHub (push to main)
  └─ self-hosted runner on the LXC
       └─ docker compose up -d --build
            ├─ web     nginx + the built site        (cormacmadden-com)
            └─ tunnel  cloudflared                   (cormacmadden-tunnel)
                 └── outbound to Cloudflare ── cormacmadden.com
```

## One-time setup

### 1. Put the domain on Cloudflare

1. Sign in to Cloudflare, **Add a site**, enter `cormacmadden.com`, free plan.
2. Cloudflare gives you two nameservers. Set them at the registrar where
   cormacmadden.com is registered, replacing the current ones.
3. Wait for the domain to show **Active** in Cloudflare (usually minutes, up to
   24 hours). The tunnel can be set up while that happens.

### 2. Create the tunnel

1. Cloudflare dashboard → **Zero Trust** → **Networks** → **Tunnels** →
   **Create a tunnel** → **Cloudflared**. Name it `cormacmadden-com`.
2. Cloudflare shows an install command containing a long token. Copy only the
   token (the string after `--token`). This is the whole secret; treat it like a
   password.
3. Don't run their install command. Leave the page open for step 4.

### 3. Put the token on the LXC

On the LXC (`ssh` in, or Portainer's console):

```sh
sudo install -d -m 755 /opt/cormacmadden-com
printf 'TUNNEL_TOKEN=%s\n' 'PASTE_THE_TOKEN_HERE' | sudo tee /opt/cormacmadden-com/.env >/dev/null
sudo chmod 600 /opt/cormacmadden-com/.env
```

The file lives outside the repo on purpose, so the token is never committed and
survives every redeploy.

### 4. Point the hostname at the container

Back in the tunnel's **Public Hostnames** tab → **Add a public hostname**:

| Field | Value |
| --- | --- |
| Subdomain | *(leave empty)* |
| Domain | `cormacmadden.com` |
| Path | *(leave empty)* |
| Type | `HTTP` |
| URL | `web:80` |

Add a second hostname with subdomain `www` and the same settings. Cloudflare
creates the DNS records itself, so there is nothing to add in the DNS tab.

`web:80` works because the tunnel container and the site container share the
compose network. HTTP inside the LXC is fine: the public leg of the connection
is HTTPS, terminated by Cloudflare, with a certificate it manages.

### 5. First deploy by hand

Still on the LXC:

```sh
git clone https://github.com/cormacmadden/cormacmadden-com.git /srv/cormacmadden-com
cd /srv/cormacmadden-com
docker compose --env-file /opt/cormacmadden-com/.env up -d --build
```

Check it locally first: `curl -I http://localhost:8088/` should give `200 OK`.
Then open https://cormacmadden.com.

### 6. Hand it over to GitHub Actions

`.github/workflows/deploy.yml` runs on every push to `main` using the same
self-hosted runner as DigitalTwinWebApp and life-os. If the runner isn't
registered for this repo yet: GitHub → repo → **Settings** → **Actions** →
**Runners** → **New self-hosted runner**, and run the shown commands on the LXC
as the user that owns the runner service.

The runner needs:

- permission to use Docker (in the `docker` group, or running as root)
- read access to `/opt/cormacmadden-com/.env`

Nothing else is stored in GitHub: no secrets, no registry, no SSH keys.

## Everyday use

| Task | Command |
| --- | --- |
| Deploy | `git push` (or **Run workflow** in the Actions tab) |
| Deploy by hand | `docker compose --env-file /opt/cormacmadden-com/.env up -d --build` |
| Logs | `docker compose logs -f web` / `docker compose logs -f tunnel` |
| Restart the tunnel | `docker compose restart tunnel` |
| Roll back | `git revert` the commit and push, or check out the older commit and run the compose command |

## If something breaks

**The site is down but the container is up.** Check the tunnel first:
`docker compose logs --tail 50 tunnel`. A healthy tunnel logs
`Registered tunnel connection` four times. `Unauthorized` means the token in
`.env` no longer matches the tunnel in the dashboard.

**Cloudflare shows error 1033 or 502.** The tunnel is connected but can't reach
the site. Confirm the public hostname's URL is exactly `web:80` and that the web
container is running: `docker compose ps`.

**The build fails on the runner.** Build it by hand on the LXC to see the full
output: `docker build -t cormacmadden-com:test .`. It needs enough free disk for
node_modules plus the image — the N95 box can get tight.

**A page 404s but exists locally.** nginx serves `/work/thing` from
`/work/thing/index.html` (see `docker/nginx.conf`). If you change
`build.format` or `trailingSlash` in `astro.config.mjs`, that rule changes too.

## Notes

- The published port 8088 is only for reaching the site on the LAN or over
  Tailscale. The tunnel doesn't use it, so it can be deleted from
  `docker-compose.yml` if you'd rather the site were reachable only through
  Cloudflare.
- Cloudflare caches static assets at its edge. Astro fingerprints everything in
  `/_astro/`, so a deploy can't serve stale assets, but after changing an image
  or a PDF in `public/` you may want **Caching → Purge Everything** once.
- Keep the tunnel token out of git. If it leaks, delete the tunnel in the
  dashboard and make a new one; the only change needed is `.env`.
