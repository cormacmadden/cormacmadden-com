# cormacmadden.com

Personal portfolio — Astro static site, served by nginx in Docker.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run check      # type-check .astro files and content
```

## Where things live

| What | Where |
| --- | --- |
| Case studies (one per project) | `src/content/projects/<slug>.mdx` — schema in `src/content.config.ts` |
| Lens pages (intro + ordered project list) | `src/data/lenses.ts` |
| Hero line, keywords, links | `src/data/site.ts` |
| Experience timeline | `src/data/timeline.ts` |
| Hero / clip videos (MP4) | `public/media/<slug>/` |
| Case-study images (optimised at build) | `src/assets/projects/<slug>/` |
| ArtStation grid on /work/media | `src/data/artstation.ts` (hotlinked from ArtStation CDN) |
| Vimeo videos on /work/media | `src/data/vimeo.json`, thumbnails in `src/assets/video/` |

Add a project: create `src/content/projects/my-project.mdx`, fill the frontmatter,
and add its slug to a lens in `src/data/lenses.ts`. It appears at `/work/my-project`.
A Media & 3D post can also go on a lens page: add `media/<slug>` (its slug in `src/data/artstation.json`) to the lens's list.

## Media & 3D pages

`/work/media` lists the ArtStation posts; each one has its own page at `/work/media/<slug>`
with the images, video, text and software pulled from ArtStation.

```sh
npm run sync:artstation          # refresh src/data/artstation.json from ArtStation
node scripts/sync-artstation.mjs --check   # CI: fail if it's out of date
```

The sync keeps hand-written fields: `slug`, `category`, `model` (links a post to a 3D model
in `src/data/models.ts`) and any entry with no `hash` (something not posted on ArtStation).

## Video

`/work/media` has a Video section fed by `src/data/vimeo.json`, grouped into
`walkthrough`, `tool` and `film`. Thumbnails are self-hosted in `src/assets/video/<id>.jpg`,
and the Vimeo player is only loaded when a visitor presses play, so the page
makes no third-party request before that.

```sh
npm run sync:vimeo                    # refresh from vimeo.com/cormacmadden
node scripts/sync-vimeo.mjs --check   # CI: fail if it's out of date
```

The sync keeps hand-written fields: `category`, `feature` (shows first), `blurb`,
`hide`, and edited titles. New uploads arrive as `category: film`, `feature: false`.

## Adding a 3D model

1. Export a `.glb` from Blender (one scene).
2. Shrink it — textures are usually most of the size:

   ```sh
   npx @gltf-transform/cli optimize in.glb public/models/<name>.glb \
     --compress meshopt --texture-compress webp --texture-size 1024
   ```

   Add `--join false` if you want to name parts in `shell` (below) — joining merges objects.
   (The shed went from 108 MB to 6.6 MB this way.)
3. Add an entry to `src/data/models.ts`, then point a post at it with `model: <id>` in
   `src/data/artstation.json` (or `model:` in a case study's frontmatter). The viewer is three.js with one shadow-casting sun:
   set `sun` (direction the light comes from) and, for interiors, `shell` (walls, roof, floor —
   they receive shadows but don't block the sun). It shows on /work/media and loads when a visitor
   scrolls to it (poster image first).
4. For a poster image, load the model, pick an angle, and save `public/models/<name>-poster.webp`.

Keep source `.glb` files out of the repo — only the optimised copy goes in `public/models/`.

NDA rule: no JLR screenshots — use representative renders with `hero.representative: true`.

## Deploy

The site runs on the mini PC (LXC 192.168.1.214): nginx in Docker (`Dockerfile`,
`docker/nginx.conf`) on port 8088, published at cormacmadden.com by the existing
`minipc-docker` Cloudflare tunnel, with no ports opened on the router.
`.github/workflows/deploy.yml` redeploys on every push to `main` via the
self-hosted runner.

**[docs/DEPLOY.md](docs/DEPLOY.md) has the one-time setup and the troubleshooting notes.**

```sh
docker compose up -d --build     # deploy by hand, on the LXC
docker compose logs -f web       # watch it
```
