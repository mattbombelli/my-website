import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
    nodes: {
        document: {
            ...nodes.document,
            render: component('./src/components/primitives/MarkdocDocument.astro'),
        },
        tags: {
            Button: {
                render: 'Button',
                attributes: {
                    label: { type: String },
                    href: { type: String },
                    shape: { type: String },
                    icon: { type: String },
                    mainTheme: { type: String },
                    hoverTheme: { type: String },
                    shapeTheme: { type: String },
                    iconTheme: { type: String },
                },
            },
        },
    }
});