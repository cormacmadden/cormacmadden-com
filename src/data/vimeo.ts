/**
 * Vimeo uploads (vimeo.com/cormacmadden), pulled into src/data/vimeo.json by
 * `npm run sync:vimeo`. Thumbnails are self-hosted in src/assets/video/<id>.jpg
 * so the page makes no request to Vimeo until someone presses play.
 *
 * Hand-written fields kept by the sync script: category, feature, blurb, year, hide
 * (and any title you have edited).
 */
import type { ImageMetadata } from 'astro';
import raw from './vimeo.json';

export type VideoCategory = 'walkthrough' | 'tool' | 'film';

export interface Video {
  id: string;
  title: string;
  blurb: string;
  date: string;
  /** Length in seconds. */
  duration: number;
  /** The year the work was made, when that isn't the year it was uploaded. */
  year?: number;
  category: VideoCategory;
  feature: boolean;
  hide?: boolean;
  thumb?: ImageMetadata;
  url: string;
  embed: string;
}

const thumbs = import.meta.glob<{ default: ImageMetadata }>('../assets/video/*.jpg', { eager: true });

const thumbFor = (id: string) => thumbs[`../assets/video/${id}.jpg`]?.default;

export const vimeoProfile: string = raw.profile;
export const vimeoPulled: string = raw.pulled;

export const videos: Video[] = (raw.videos as Omit<Video, 'thumb' | 'url' | 'embed'>[])
  .filter((v) => !v.hide)
  .map((v) => ({
    ...v,
    thumb: thumbFor(v.id),
    url: `https://vimeo.com/${v.id}`,
    // dnt=1 stops Vimeo tracking the viewer; the iframe is only created on play.
    embed: `https://player.vimeo.com/video/${v.id}?dnt=1&autoplay=1&title=0&byline=0&portrait=0`,
  }))
  .sort((a, b) => Number(b.feature) - Number(a.feature) || b.date.localeCompare(a.date));

export const videosBy = (category: VideoCategory) => videos.filter((v) => v.category === category);

export const videoYear = (v: Video) => v.year ?? Number(v.date.slice(0, 4));

/** 776 -> "12:56", 46 -> "0:46" */
export const videoLength = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
