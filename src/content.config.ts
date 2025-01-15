import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const illustration = defineCollection({
    loader: glob({pattern: "**/*.{md,mdx}", base: "./src/projects/illustration/"}),
    schema: ({ image }) => z.object({
        title: z.string(),
        datePublished: z.coerce.date(),
        slug: z.string(),
        order: z.number(),
        thumbnail: image(),
        background: z.string(),
        text: z.string(),
        draft: z.boolean(),
    }),
});

export const collections = { illustration };