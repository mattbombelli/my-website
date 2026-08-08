import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "Mattia Bombelli",
    },
    navigation: ["caseStudies", "---", "blog"],
  },
  collections: {
    // UX case studies
    caseStudies: collection({
      label: "Case studies",
      slugField: "title",
      path: "src/content/ux/*",
      entryLayout: "content",
      columns: ["title"],
      format: {
        data: "json",
      },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
          },
        }),
        cover: fields.image({
          label: "Cover image",
          description:
            "Questa immagine verrà usata come copertina per il progetto.",
          directory: "src/assets/images/ux/",
          publicPath: "@images/ux/",
          validation: {
            isRequired: true,
          },
        }),
        coverAlt: fields.text({
          label: "Cover alt",
          description: "Defines alt text for cover image.",
          validation: {
            isRequired: true,
          },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "Massimo 500 caratteri.",
          multiline: true,
          validation: {
            isRequired: true,
            length: {
              max: 500,
            },
          },
        }),
        sections: fields.array(
          fields.object({
            description: fields.text({
              label: 'Section content',
              description: 'This description is used exclusively in Keystatic, to identify each section.',
              validation: {
                isRequired: true
              }
            }),
            zones: fields.array(
              fields.object({
                title: fields.text({
                  label: 'Section content'
                }),
                content: fields.conditional(
                  fields.checkbox({
                    label: 'Image field',
                    defaultValue: false,
                  }),
                  {
                    true: fields.object({
                      image: fields.image({
                        label: 'Image',
                        directory: "src/assets/images/ux/",
                        publicPath: "@images/ux/",
                        validation: {
                          isRequired: true,
                        }
                      }),
                      alt: fields.text({
                        label: 'Alt text',
                        validation: {
                          isRequired: true,
                        }
                      }),
                      caption: fields.text({
                        label: 'Caption',
                      }),
                      loading: fields.select({
                        label: "Loading",
                        description: "determines the loading property of the image. Used by Astro.",
                        options: [
                          { label: 'Lazy (default)', value: 'lazy'},
                          { label: 'Eager', value: 'eager'}
                        ],
                        defaultValue: 'lazy'
                      }),
                    }),
                    false: fields.object({
                      content: fields.markdoc({
                        label: 'Content',
                        extension: 'mdoc',
                      }),

                      alignment: fields.select({
                        label: "Text alignment",
                        description: "Changes the text alignment within the page",
                        options: [
                          { label: 'Left', value: 'left'},
                          { label: 'Center', value: 'center'},
                          { label: 'Right', value: 'right'},
                        ],
                        defaultValue: 'left'
                      }),

                      subtitle: fields.checkbox({
                        label: 'Add subtitle',
                        description: 'This option requires an heading (h1 or h2) in the content; the subsequent paragraph will be used as subtitle within an <hgroup> element.',
                        defaultValue: false
                      }),

                      typography: fields.checkbox({
                        label: 'Invert font family',
                        description: 'Invert the fonts associated with the content.',
                        defaultValue: false,
                      }),
                      
                      theme: fields.checkbox({
                        label: "Invert zone's theme",
                        description: "Invert the zone's theme colors.",
                        defaultValue: false,
                      }),
                    }, {
                      label: 'Text',
                      layout: [12,6,6,6,6]
                    }),
                }),

                // Zone layout: desktop
                desktop: fields.object({
                  columnSpan: fields.select({
                    label: "Columns",
                    options: [
                      { label: "span 2", value: "2" },
                      { label: "span 3", value: "3" },
                      { label: "span 4", value: "4" },
                    ],
                    defaultValue: "2",
                  }),
                  columnOffset: fields.select({
                    label: "Column offset",
                    options: [
                      { label: "Left", value: "1" },
                      { label: "Middle", value: "2" },
                      { label: "Right", value: "3" },
                      { label: "Full width", value: "4" },
                    ],
                    defaultValue: "2",
                  }),
                  rowSpan: fields.select({
                    label: "Rows",
                    options: [
                      { label: "auto (default)", value: "auto" },
                      { label: "span 1", value: "1" },
                      { label: "span 2", value: "2" },
                      { label: "span 3", value: "3" },
                      { label: "span 4", value: "4" },
                      { label: "span 5", value: "5" },
                      { label: "span 6", value: "6" }
                    ],
                    defaultValue: "auto"
                  }),
                  rowOffset: fields.select({
                    label: "Row offset",
                    options: [
                      { label: "auto (default)", value: "auto" },
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                      { label: "6", value: "6" },
                      { label: "7", value: "7" },
                      { label: "8", value: "8" },
                      { label: "9", value: "9" },
                      { label: "10", value: "10" },
                    ],
                    defaultValue: "auto",
                  }),
                }, {
                  label: "Desktop & Laptop layout",
                  description: "Define this zone's layout for desktop & laptop screens.",
                  layout: [6, 6, 6, 6]
                }), // desktop object

                // Zone layout: tablet
                tablet: fields.object({
                  columnSpan: fields.select({
                    label: "Columns",
                    options: [
                      { label: "span 1", value: "1" },
                      { label: "span 2", value: "2" },
                      { label: "span 3", value: "3" },
                      { label: "span 4", value: "4" },
                    ],
                    defaultValue: "2",
                  }),
                  columnOffset: fields.select({
                    label: "Column offset",
                    options: [
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                    ],
                    defaultValue: "2",
                  }),
                  rowSpan: fields.select({
                    label: "Rows",
                    options: [
                      { label: "auto (default)", value: "auto" },
                      { label: "span 1", value: "1" },
                      { label: "span 2", value: "2" },
                      { label: "span 3", value: "3" },
                      { label: "span 4", value: "4" },
                      { label: "span 5", value: "5" },
                      { label: "span 6", value: "6" }
                    ],
                    defaultValue: "auto",
                  }),
                  rowOffset: fields.select({
                    label: "Row offset",
                    options: [
                      { label: "auto (default)", value: "auto" },
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                      { label: "6", value: "6" },
                      { label: "7", value: "7" },
                      { label: "8", value: "8" },
                      { label: "9", value: "9" },
                      { label: "10", value: "10" },
                    ],
                    defaultValue: "auto",
                  }),
                }, {
                  label: "Tablet layout",
                  layout: [6, 6, 6, 6]
                }), // tablet

                // Zone layout: mobile
                mobileOrder: fields.number({
                  label: "Order on mobile",
                  description:
                    "Use this if you want to modify the automatic order of each element in a section. Leave 0 for automatic ordering.",
                  step: 1,
                  defaultValue: 0,
                }),

              }), // zone object
              {
                label: 'Zones',
                itemLabel: (props) => {
                  if (props.fields.content.discriminant){
                    return props.fields.title.value ? props.fields.title.value : 'Image';
                  } else {
                    return props.fields.title.value ? props.fields.title.value : 'Text';
                  }
                },
              }
            ), // zones array
            
            carousel: fields.checkbox({
              label: "Carousel section",
              description: "Turns the section into a carousel on mobile.",
              defaultValue: false,
            }),

            theme: fields.select({
              label: "Theme mode",
              description: "Choose the theme mode for this section",
              options: [
                { label: 'Normal (default)', value: 'normal' },
                { label: 'Invert', value: 'invert' },
              ],
              defaultValue: 'normal',
            }),

            rowGap: fields.select({
              label: "Row gap",
              description: "Choose a row gap for this section.",
              options: [
                { label:'Small', value: 'var(--gap-y-small)' },
                { label:'Normal (default)', value: 'var(--gap-y)' },
                { label:'Large', value: 'var(--gap-y-large)' },
              ],
              defaultValue: 'var(--gap-y)',
            }),
          }),
          
          {
            label: 'Page content',
            itemLabel: (props) => props.fields.description.value,
          }
        ), // section array
      },
    }),

    // blog
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
