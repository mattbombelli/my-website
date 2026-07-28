import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
    nodes: {
        document: {
            ...nodes.document,
            render: component('./src/components/primitives/MarkdocDocument.astro'),
        },
    }
});