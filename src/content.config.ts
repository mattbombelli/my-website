// @ts-ignore
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/posts' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/ux' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    cover: image(),
    coverAlt: z.string(),
    excerpt: z.string(),
  }),
});

export const collections = { posts, caseStudies };
