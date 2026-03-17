import { config, fields, collection } from '@keystatic/core'

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        illustration: collection({
            label: 'Illustrations',
            slugField: 'slug',
            path: 'src/content/projects/illustration/*/',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title' }),
                datePublished: fields.text({ label: 'Date Published' }),
                slug: fields.text({ label: 'Slug' }),
                order: fields.integer({ label: 'Order' }),
                thumbnail: fields.image({ label: 'Thumbnail' }),
                background: fields.text({ label: 'Background Color' }),
                text: fields.text({ label: 'Description', multiline: true }),
                draft: fields.checkbox({ label: 'Draft' }),
                content: fields.markdoc({ label: 'Content' }),
            }
        })
    },
});