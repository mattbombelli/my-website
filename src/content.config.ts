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
  loader: glob({ pattern: '*.json', base: './src/content/ux' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    cover: image(),
    coverAlt: z.string(),
    excerpt: z.string(),
    sections: z.array(
      z.object({
        description: z.string(),
        zones: z.array(
          z.object({
            desktop: z.object({
              columnSpan: z.string(),
              columnOffset: z.string(),
            }),
            tablet: z.object({
              columnSpan: z.string(),
              columnOffset: z.string(),
            }),
            mobileOrder: z.number(),
          }) // zone object
        ), // zones
      }), // section object
    ), // sections
  }),
});

export const collections = { posts, caseStudies };
