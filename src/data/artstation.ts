/**
 * ArtStation posts (artstation.com/comadden), pulled into src/data/artstation.json
 * by `node scripts/sync-artstation.mjs`. Images are hotlinked from ArtStation's CDN.
 * `model` points at an entry in src/data/models.ts, shown as a spin-around 3D viewer.
 */
import raw from './artstation.json';

export type ArtCategory = 'arch-viz' | 'product' | 'post-production' | 'other';

export interface ArtAsset {
  type: 'image' | 'video';
  image: string;
  /** Player URL for video assets (Vimeo, ArtStation). */
  embed?: string;
  title?: string;
}

export interface ArtProject {
  hash: string;
  slug: string;
  title: string;
  description: string;
  software: string[];
  date: string;
  category: ArtCategory;
  cover: string;
  assets: ArtAsset[];
  /** id in src/data/models.ts */
  model?: string;
}

export const artstationProfile: string = raw.profile;
export const artstationPulled: string = raw.pulled;

export const artProjects: ArtProject[] = (raw.projects as ArtProject[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const artUrl = (hash: string) => `https://www.artstation.com/artwork/${hash}`;
export const artYear = (p: ArtProject) => Number(p.date.slice(0, 4));
