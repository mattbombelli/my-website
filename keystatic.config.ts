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
    ui: {
        navigation:{
            writing: ['blog'],
            projects: ['illustration'],
        }
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
            columns: [ 'title', 'datePublished', 'category'],
            path: 'blog/*/',
            schema: {
                title: fields.text({ 
                    label: 'Title',
                    validation: {
                        isRequired: true,
                    }
                }),
                draft: fields.checkbox({
                    label: 'Draft',
                    description: 'Mark this article as a draft to hide it from publishing.',
                    defaultValue: true,
                }),
                featured: fields.checkbox({
                    label: 'Featured',
                    description: 'Mark this article as featured to show it in the featured section on the homepage.',
                    defaultValue: false,
                }),
                datePublished: fields.date({
                    label: 'Date Published',
                    validation: {
                        isRequired: true,
                    }
                }),
                slug: fields.text({
                    label: 'Slug',
                    validation: {
                        isRequired: true,
                    }
                }),
                category: fields.select({
                    label: 'Category',
                    description: 'Choose a category for your article. By default, it will be set to "Miscellaneous".',
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
                featuredImage: fields.image({ label: 'Featured Image' }),
                excerpt: fields.text({
                    label: 'Excerpt',
                    description: 'Maximum 200 characters.',
                    multiline: true,
                    validation: {
                        isRequired: true,
                        length: {
                            max: 220,
                        },
                    }
                }),

                content: fields.markdoc({ label: 'Content' }),
            },
        }),
    },
});