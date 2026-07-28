import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
    nodes: {
        document: {
            ...nodes.document,
            render: null,
        },
        image: {
            ...nodes.image, 
            render: component('./src/components/primitives/MarkdocFigure.astro'),
        }
    }
});