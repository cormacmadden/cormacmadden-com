/**
 * Pull the Vimeo uploads into src/data/vimeo.json and download any missing
 * thumbnails into src/assets/video/.
 *
 *   npm run sync:vimeo              # update
 *   npm run sync:vimeo -- --check   # exit 1 if anything changed (for CI)
 *
 * Hand-written fields are kept: category, feature, blurb, hide, and an edited
 * title (titles are only taken from Vimeo for videos that are new here).
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const USER = 'cormacmadden';
const OUT = new URL('../src/data/vimeo.json', import.meta.url);
const THUMBS = new URL('../src/assets/video/', import.meta.url);
const UA = { 'User-Agent': 'Mozilla/5.0 (portfolio sync)', Accept: 'application/json' };
const check = process.argv.includes('--check');

async function json(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

const exists = (url) => access(url).then(() => true, () => false);

const previous = JSON.parse(await readFile(OUT, 'utf8'));
const keep = new Map(previous.videos.map((v) => [v.id, v]));

// The public API returns 20 per page.
const list = [];
for (let page = 1; ; page++) {
  const batch = await json(`https://vimeo.com/api/v2/${USER}/videos.json?page=${page}`);
  if (!Array.isArray(batch) || batch.length === 0) break;
  list.push(...batch);
  if (batch.length < 20) break;
}
if (list.length === 0) throw new Error('Vimeo returned no videos: refusing to overwrite the file');

await mkdir(fileURLToPath(THUMBS), { recursive: true });

const videos = [];
for (const item of list) {
  const id = String(item.id);
  const old = keep.get(id) ?? {};
  videos.push({
    id,
    title: old.title ?? item.title,
    blurb: old.blurb ?? '',
    date: item.upload_date.slice(0, 10),
    duration: item.duration,
    category: old.category ?? 'film',
    feature: old.feature ?? false,
    ...(old.hide ? { hide: true } : {}),
  });

  const thumb = new URL(`${id}.jpg`, THUMBS);
  if (!(await exists(thumb))) {
    // thumbnail_large ends in _640; ask for the 1280-wide version instead.
    const src = item.thumbnail_large.split('?')[0].replace(/_640$/, '_1280');
    const res = await fetch(`${src}?region=us`, { headers: UA });
    if (!res.ok) throw new Error(`${res.status} fetching thumbnail for ${id}`);
    await writeFile(thumb, Buffer.from(await res.arrayBuffer()));
    console.log(`thumbnail  ${id}.jpg`);
  }
}

const next = JSON.stringify(
  { pulled: new Date().toISOString().slice(0, 10), profile: `https://vimeo.com/${USER}`, videos },
  null,
  1,
) + '\n';

const current = await readFile(OUT, 'utf8');
// Ignore the pulled date when deciding whether anything really changed.
const strip = (s) => s.replace(/"pulled": "[^"]*"/, '');
const changed = strip(current) !== strip(next);

if (check) {
  console.log(changed ? 'vimeo.json is out of date: run npm run sync:vimeo' : 'vimeo.json is up to date');
  process.exit(changed ? 1 : 0);
}

if (changed) {
  await writeFile(OUT, next);
  console.log(`wrote ${videos.length} videos to src/data/vimeo.json`);
} else {
  console.log(`no changes (${videos.length} videos)`);
}
