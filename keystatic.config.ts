// keystatic.config.ts
import { config, fields, collection } from "@keystatic/core";
import { createSectionsSchema } from '@data/schemas/sectionsSchema';

const caseStudySections = createSectionsSchema(
    [
        { label: "span 2", value: "2" },
        { label: "span 3", value: "3" },
        { label: "span 4", value: "4" },
    ],
    [
        { label: "Left", value: "1" },
        { label: "Middle", value: "2" },
        { label: "Right", value: "3" },
    ]
);

const projectSections = createSectionsSchema(
    [
        { label: "span 2", value: "2" },
        { label: "span 3", value: "3" },
        { label: "span 4", value: "4" },
        { label: "span 5", value: "5" },
        { label: "span 6", value: "6" },
    ],
    Array.from({ length: 5 }, (_, i) => ({
        label: `Offset ${i + 1}`,
        value: String(i + 1),
    }))
);

export default config({
    storage: { kind: "local" },
    ui: {
        brand: { name: "Mattia Bombelli" },
        navigation: ["---", "caseStudies", "illustrations", "---", "blog"],
    },
    collections: {
        caseStudies: collection({
            label: "Case studies",
            slugField: "title",
            path: "src/content/ux/*",
            entryLayout: "content",
            columns: ["title"],
            format: { data: "json" },
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                cover: fields.image({
                    label: "Cover image",
                    description: "Questa immagine verrà usata come copertina per il progetto.",
                    directory: "src/assets/images/ux/",
                    publicPath: "@images/ux/",
                    validation: { isRequired: true },
                }),
                coverAlt: fields.text({
                    label: "Cover alt",
                    description: "Defines alt text for cover image.",
                    validation: { isRequired: true },
                }),
                excerpt: fields.text({
                    label: "Excerpt",
                    description: "Massimo 500 caratteri.",
                    multiline: true,
                    validation: { isRequired: true, length: { max: 500 } },
                }),
                tags: fields.multiselect({
                    label: "Project tags",
                    options: [
                        { label: "UI", value: "UI" },
                        { label: "UX", value: "UX" },
                        { label: "Design system", value: "Design systems" },
                        { label: "Research", value: "Research" },
                        { label: "Testing", value: "Testing" },
                        { label: "Method", value: "Method" },
                    ],
                }),
                sections: caseStudySections,
            },
        }),

        illustrations: collection({
            label: "Illustrations",
            slugField: "title",
            path: "src/content/illustration/*",
            entryLayout: "content",
            columns: ["title"],
            format: { data: "json" },
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                cover: fields.image({
                    label: "Cover image",
                    description: "Questa immagine verrà usata come copertina per il progetto.",
                    directory: "src/assets/images/illustration/",
                    publicPath: "@images/illustration/",
                    validation: { isRequired: true },
                }),
                coverAlt: fields.text({
                    label: "Cover alt",
                    description: "Defines alt text for cover image.",
                    validation: { isRequired: true },
                }),
                excerpt: fields.text({
                    label: "Excerpt",
                    description: "Massimo 500 caratteri.",
                    multiline: true,
                    validation: { isRequired: false, length: { max: 500 } },
                }),
                sections: projectSections,
            }
        }),

        blog: collection({
            label: "Blog",
            slugField: "title",
            path: "src/content/blogs/*",
            format: { contentField: "content" },
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                content: fields.markdoc({
                    label: "Content",
                    options: {
                        image: {
                            directory: "src/assets/images/posts",
                            publicPath: "../../assets/images/posts/",
                        },
                    },
                }),
            },
        }),
    },
});