/**
 * Pull the ArtStation posts into src/data/artstation.json.
 *
 *   node scripts/sync-artstation.mjs            # update
 *   node scripts/sync-artstation.mjs --check    # exit 1 if anything changed (for CI)
 *
 * Hand-written fields are kept: `model` (id in src/data/models.ts), `category`,
 * and any entry with no `hash` (e.g. the shed studio, which isn't on ArtStation).
 */
import { readFile, writeFile } from 'node:fs/promises';

const USER = 'comadden';
const OUT = new URL('../src/data/artstation.json', import.meta.url);
const UA = { 'User-Agent': 'Mozilla/5.0 (portfolio sync)', Accept: 'application/json' };

const slugify = (s) =>
  s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const text = (html = '') =>
  html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\n{3,}/g, '\n\n').trim();

const embedSrc = (html = '') => html.match(/src=['"]([^'"]+)['"]/)?.[1];

async function json(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

const previous = JSON.parse(await readFile(OUT, 'utf8'));
const keep = new Map(previous.projects.map((p) => [p.hash || p.slug, p]));

const list = [];
for (let page = 1; ; page++) {
  const { data = [] } = await json(`https://www.artstation.com/users/${USER}/projects.json?page=${page}`);
  if (data.length === 0) break;
  list.push(...data);
}

const projects = [];
for (const item of list) {
  const detail = await json(`https://www.artstation.com/projects/${item.hash_id}.json`);
  const old = keep.get(item.hash_id) ?? {};
  projects.push({
    hash: item.hash_id,
    slug: old.slug ?? slugify(detail.title),
    title: detail.title,
    description: text(detail.description_html ?? detail.description),
    software: (detail.software_items ?? []).map((s) => s.name),
    date: (detail.published_at ?? detail.created_at ?? '').slice(0, 10),
    category: old.category ?? 'other',
    cover: detail.cover?.medium_image_url ?? detail.assets?.[0]?.image_url ?? item.cover?.medium_image_url,
    assets: (detail.assets ?? [])
      .filter((a) => a.asset_type !== 'cover')
      .map((a) => {
        const embed = embedSrc(a.player_embedded ?? '');
        return embed
          ? { type: 'video', image: a.image_url, embed, title: text(a.title ?? '') || undefined }
          : { type: 'image', image: a.image_url };
      }),
    ...(old.model ? { model: old.model } : {}),
  });
}

// Entries that aren't on ArtStation (no hash) stay as they are.
for (const p of previous.projects) if (!p.hash) projects.push(p);

const next = { pulled: new Date().toISOString().slice(0, 10), profile: `https://www.artstation.com/${USER}`, projects };
const changed = JSON.stringify(next.projects) !== JSON.stringify(previous.projects);

if (process.argv.includes('--check')) {
  console.log(changed ? 'ArtStation data is out of date — run: node scripts/sync-artstation.mjs' : 'ArtStation data is up to date.');
  process.exit(changed ? 1 : 0);
}
await writeFile(OUT, JSON.stringify(next, null, 1) + '\n');
console.log(`Wrote ${projects.length} projects${changed ? '' : ' (no changes)'}.`);
