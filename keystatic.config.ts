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
            zones: fields.array(
              fields.object({
                // zone: fields.conditional({
                //   label: 'Image zone',
                //   description: 'Turn this checkbox on if this zone is supposed to have an image.',
                //   defaultValue: false,
                // }),

                // Written content
                content: fields.markdoc({
                  label: "Card content",
                }),

                // Image content
                image: fields.object({
                  src: fields.image({
                    label: 'Image',
                    directory: 'src/assets/images/ux/',
                    publicPath: '@images/ux/',
                  }),
                  alt: fields.text({
                    label: 'Alt text',
                    validation: {
                      isRequired: true,
                    },
                  }),
                  caption: fields.text({
                    label: 'Caption',
                    multiline: true,
                  }),
                }, {
                  label: 'Image',
                }),

                // Zone layout: desktop
                desktop: fields.object({
                  columnSpan: fields.select({
                    label: "Column span",
                    description:
                      "Choose how many columns this card will occupy.",
                    options: [
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                      { label: "6", value: "6" }
                    ],
                    defaultValue: "2",
                  }),
                  columnOffset: fields.select({
                    label: "Column offset",
                    description: "Choose from which column this element will start from.",
                    options: [
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                      { label: "5", value: "5" },
                    ],
                    defaultValue: "2",
                  }),
                }, {
                  label: "Desktop & Laptop layout"
                }), // desktop object

                // Zone layout: tablet
                tablet: fields.object({
                  columnSpan: fields.select({
                    label: "Column span",
                    description:
                      "Choose how many columns on tablet this card will take.",
                    options: [
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                    ],
                    defaultValue: "2",
                  }),
                  columnOffset: fields.select({
                    label: "Column offset",
                    description: "Choose where this element will start from.",
                    options: [
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                    ],
                    defaultValue: "2",
                  }),
                }, {
                  label: "Tablet layout",
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
                itemLabel: (props) => 'Zone',
              }
            ), // zones array
          }),
          {
            label: 'Page content',
            itemLabel: (props) => 'Section grid',
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
