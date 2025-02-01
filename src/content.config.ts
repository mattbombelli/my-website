import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const blog = defineCollection({
    loader: glob({pattern: "**/*.{md,mdx}", base: "./src/content/blog/"}),
    schema: ({ image }) => z.object({
        title: z.string(),
        datePublished: z.coerce.date(),
        slug: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        featuredImage: image(),
        excerpt: z.string(),
        featured: z.boolean(),
        draft: z.boolean(),
    })
});

const categories = defineCollection({
    // loader: glob({ pattern: })
})

const illustration = defineCollection({
    loader: glob({pattern: "**/*.{md,mdx}", base: "./src/content/projects/illustration/"}),
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

export const collections = { illustration, blog };