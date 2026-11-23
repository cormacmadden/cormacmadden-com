import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const LENSES = ['digital-twins', 'real-time-3d', 'tools-pipeline'] as const;

/**
 * One Markdown/MDX file per project in src/content/projects.
 * The file name is the slug: src/content/projects/kinect-ue5-plugin.mdx -> /work/kinect-ue5-plugin
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      lenses: z.array(z.enum(LENSES)).default([]),
      tags: z.array(z.string()).default([]),
      /** 1 = featured case study, 2 = solid project, 3 = minor / academic */
      tier: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
      dates: z.object({
        start: z.string(), // "2024-09" style, kept as a string for partial dates
        end: z.string().optional(), // omit = ongoing
      }),
      role: z.string(),
      team: z.string().optional(),
      stack: z.array(z.string()).default([]),
      /** Who made what, shown in the summary box. Supports [text](https://…) links. */
      credit: z.string().optional(),
      problem: z.string().optional(),
      outcome: z.string().optional(),
      hero: z
        .object({
          video: z.string().optional(), // path under /public, e.g. /media/kinect.mp4
          videoSmall: z.string().optional(), // lighter version for screens up to 1280px wide
          poster: image().optional(),
          alt: z.string().default(''),
          representative: z.boolean().default(false), // label NDA-safe stand-in renders
        })
        .optional(),
      /** Extra images shown under "Gallery" on the case study page. */
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
            /** Showcase layout only: share of the row the image takes. */
            span: z.enum(['full', 'half', 'third']).default('half'),
          }),
        )
        .default([]),
      /** Image-led layout: full-bleed cinematic hero, editorial gallery, images open full size. */
      showcase: z.boolean().default(false),
      /** Extra looping clips (paths under /public). */
      clips: z
        .array(z.object({ src: z.string(), poster: image().optional(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      /** id of an entry in src/data/models.ts: shows a spin-around 3D viewer on the page. */
      model: z.string().optional(),
      /**
       * A long video shown after the write-up: a Vimeo id (player loads only on play)
       * or a path under /public (native player, preload none).
       */
      film: z
        .object({
          vimeo: z.string().regex(/^\d+$/).optional(),
          src: z.string().optional(),
          poster: image().optional(),
          title: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })
        .refine((f) => Boolean(f.vimeo) !== Boolean(f.src), 'film needs exactly one of vimeo or src')
        .optional(),
      /** A live site or app: shown as a button under the summary. */
      live: z.object({ href: z.url(), label: z.string() }).optional(),
      video: z.url().optional(), // full demo video (YouTube etc.)
      repo: z.url().optional(),
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      related: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
