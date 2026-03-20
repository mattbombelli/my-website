import { config, fields, collection } from '@keystatic/core'

export default config({
    storage: {
        kind: 'github',
        repo: {
            owner: 'mattbombelli',
            name: 'my-website',
        },    
        pathPrefix: 'src/content',
    },
    collections: {
        illustration: collection({
            label: 'Illustrations',
            slugField: 'slug',
            path: 'projects/illustration/*/',
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
        }),
        blog: collection({
            label: 'Blogs',
            slugField: 'slug',
            path: 'blog/*/',
            schema: {
                title: fields.text({ label: 'Title' }),
                slug: fields.text({ label: 'Slug' }),
                category: fields.select({
                    label: 'Category',
                    description: 'Choose a category for your article',
                    options: [
                        { label: 'Miscellaneous', value: 'miscellaneous' },
                        { label: '3D Projects', value: '3d-projects' },
                    ],
                    defaultValue: 'miscellaneous',
                }),
                tags: fields.array(
                    fields.text({ label: 'Tags' }),
                    {
                        label: 'Tag',
                        itemLabel: props => props.value
                    }
                ),
            },
        }),
    },
});