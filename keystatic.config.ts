import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Mattia Bombelli',
    },
    navigation: [
      'caseStudies',
      '---',
      'blog'
    ],
  },
  collections: {

    // UX case studies
    caseStudies: collection({
      label: 'Case studies',
      slugField: 'title',
      path: 'src/content/ux/*',
      entryLayout: 'content',
      columns: ['title'],
      format: { 
        data: 'json',
        contentField: 'content',
      },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
          }
        }),
        cover: fields.image({
          label: 'Cover image',
          description: 'Questa immagine verrà usata come copertina per il progetto.',
          directory: 'src/assets/images/ux/',
          publicPath: '@images/ux/',
          validation:{
            isRequired: true,
          }
        }),
        coverAlt: fields.text({
          label: 'Cover alt',
          description: 'Defines alt text for cover image.',
          validation:{
            isRequired: true,
          }
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Massimo 500 caratteri.',
          multiline: true,
          validation: {
            isRequired: true,
            length: {
              max: 500,
            }
          }
        }),
        // actual content, determined by format.contentField
        content: fields.markdoc({
          extension: 'md',
          label: 'Content',
        }),
      }
    }),

    // blog
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blogs/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/posts',
              publicPath: '../../assets/images/posts/',
            },
          },
        }),
      },
    }),
  },
});