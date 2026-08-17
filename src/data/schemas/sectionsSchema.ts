import { fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';
import { themes } from '@data/themes.ts';
import { shapes } from '@data/shapes.ts';
import { icons } from '@data/icons.ts';

const themeOptions = themes.map((name) => ({ label: name, value: name }));
const shapesOptions = Object.keys(shapes).map((name) => ({ label: name, value: name }));
const iconsOptions = Object.keys(icons).map((name) => ({ label: name, value: name }));

type SelectOption = { label: string; value: string };

const themeModeOptions: SelectOption[] = [
    { label: "Normal (default)", value: "normal" },
    { label: "Invert", value: "invert" },
];

// shared between desktop and tablet — identical for every collection
const rowSpanOptions: SelectOption[] = [
    { label: "auto (default)", value: "auto" },
    { label: "span 1", value: "1" },
    { label: "span 2", value: "2" },
    { label: "span 3", value: "3" },
    { label: "span 4", value: "4" },
    { label: "span 5", value: "5" },
    { label: "span 6", value: "6" },
];

const rowOffsetOptions: SelectOption[] = [
    { label: "auto (default)", value: "auto" },
    ...Array.from({ length: 10 }, (_, i) => ({ label: String(i + 1), value: String(i + 1) })),
];

function createLayoutFields(columnSpanOptions: SelectOption[], columnOffsetOptions: SelectOption[]) {
    return {
        columnSpan: fields.select({
            label: "Columns",
            options: columnSpanOptions,
            defaultValue: columnSpanOptions[0]?.value ?? "2",
        }),
        columnOffset: fields.select({
            label: "Column offset",
            options: columnOffsetOptions,
            defaultValue: columnOffsetOptions[0]?.value ?? "1",
        }),
        rowSpan: fields.select({
            label: "Rows",
            options: rowSpanOptions,
            defaultValue: "auto",
        }),
        rowOffset: fields.select({
            label: "Row offset",
            options: rowOffsetOptions,
            defaultValue: "auto",
        }),
    };
}

export function createSectionsSchema(
    desktopColumnSpanOptions: SelectOption[],
    desktopColumnOffsetOptions: SelectOption[]
) {
    
    const tabletColumnSpanOptions: SelectOption[] = [
        { label: "span 2", value: "2" },
        { label: "span 3", value: "3" },
        { label: "span 4", value: "4" },
    ];
    const tabletColumnOffsetOptions: SelectOption[] = [
        { label: "Left", value: "1" },
        { label: "Middle", value: "2" },
        { label: "Right", value: "3" },
    ];

    return fields.array(
        fields.object({
            description: fields.text({
                label: 'Section content',
                description: 'This description is used exclusively in Keystatic, to identify each section.',
                validation: { isRequired: true },
            }),
            zones: fields.array(
                fields.object({
                    title: fields.text({ label: 'Section content' }),
                    content: fields.conditional(
                        fields.checkbox({ label: 'Image field', defaultValue: false }),
                        {
                            true: fields.object({
                                image: fields.image({
                                    label: 'Image',
                                    directory: "src/assets/images/ux/",
                                    publicPath: "@images/ux/",
                                    validation: { isRequired: true },
                                }),
                                alt: fields.text({ label: 'Alt text', validation: { isRequired: true } }),
                                caption: fields.text({ label: 'Caption' }),
                                loading: fields.select({
                                    label: "Loading",
                                    description: "determines the loading property of the image. Used by Astro.",
                                    options: [
                                        { label: 'Lazy (default)', value: 'lazy' },
                                        { label: 'Eager', value: 'eager' },
                                    ],
                                    defaultValue: 'lazy',
                                }),
                            }),
                            false: fields.object({
                                content: fields.markdoc({
                                    label: 'Content',
                                    components: {
                                        Button: block({
                                            label: 'Button',
                                            schema: {
                                                label: fields.text({ label: 'Label' }),
                                                href: fields.text({ label: 'Link' }),
                                                shape: fields.select({ label: 'Shape', options: shapesOptions, defaultValue: 'donut' }),
                                                icon: fields.select({ label: 'Icon', options: iconsOptions, defaultValue: 'arrowRight' }),
                                                mainTheme: fields.select({ label: 'Main theme', options: themeOptions, defaultValue: 'default' }),
                                                mainThemeMode: fields.select({ label: 'Main theme mode', options: themeModeOptions, defaultValue: 'normal' }),
                                                hoverTheme: fields.select({ label: 'Hover theme', options: themeOptions, defaultValue: 'default' }),
                                                hoverThemeMode: fields.select({ label: 'Hover theme mode', options: themeModeOptions, defaultValue: 'normal' }),
                                                shapeTheme: fields.select({ label: 'Shape theme', options: themeOptions, defaultValue: 'default' }),
                                                shapeThemeMode: fields.select({ label: 'Shape theme mode', options: themeModeOptions, defaultValue: 'normal' }),
                                                iconTheme: fields.select({ label: 'Icon theme', options: themeOptions, defaultValue: 'default' }),
                                                iconThemeMode: fields.select({ label: 'Icon theme mode', options: themeModeOptions, defaultValue: 'normal' }),
                                            },
                                        }),
                                    },
                                    extension: 'mdoc',
                                }),
                                alignment: fields.select({
                                    label: "Text alignment",
                                    description: "Changes the text alignment within the page",
                                    options: [
                                        { label: 'Left', value: 'left' },
                                        { label: 'Center', value: 'center' },
                                        { label: 'Right', value: 'right' },
                                    ],
                                    defaultValue: 'left',
                                }),
                                subtitle: fields.checkbox({
                                    label: 'Add subtitle',
                                    description: 'This option requires an heading (h1 or h2) in the content; the subsequent paragraph will be used as subtitle within an <hgroup> element.',
                                    defaultValue: false,
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
                                dropCap: fields.checkbox({
                                    label: "Drop cap",
                                    description: "Adds drop cap to the first paragraph found in this zone.",
                                    defaultValue: false,
                                }),
                            }, { label: 'Text', layout: [12, 6, 6, 6, 6, 12] }),
                        }
                    ),

                    desktop: fields.object(
                        createLayoutFields(desktopColumnSpanOptions, desktopColumnOffsetOptions),
                        {
                            label: "Desktop & Laptop layout",
                            description: "Define this zone's layout for desktop & laptop screens.",
                            layout: [6, 6, 6, 6],
                        }
                    ),

                    tablet: fields.object(
                        createLayoutFields(tabletColumnSpanOptions, tabletColumnOffsetOptions),
                        { label: "Tablet layout", layout: [6, 6, 6, 6] }
                    ),

                    mobileOrder: fields.number({
                        label: "Order on mobile",
                        description: "Use this if you want to modify the automatic order of each element in a section. Leave 0 for automatic ordering.",
                        step: 1,
                        defaultValue: 0,
                    }),
                }),
                {
                    label: 'Zones',
                    itemLabel: (props) => {
                        if (props.fields.content.discriminant) {
                            return props.fields.title.value ? props.fields.title.value : 'Image';
                        } else {
                            return props.fields.title.value ? props.fields.title.value : 'Text';
                        }
                    },
                }
            ),

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
                    { label: 'Small', value: 'var(--gap-y-small)' },
                    { label: 'Normal (default)', value: 'var(--gap-y)' },
                    { label: 'Large', value: 'var(--gap-y-large)' },
                ],
                defaultValue: 'var(--gap-y)',
            }),
        }),
        {
            label: 'Page content',
            itemLabel: (props) => props.fields.description.value,
        }
    );
}