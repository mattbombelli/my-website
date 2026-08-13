import { parse } from 'node-html-parser';

export const rawMarkdocConfig = {
    tags: {
        Button: {
            render: 'astro-button-placeholder',
            attributes: {
                label: { type: String },
                href: { type: String },
                shape: { type: String },
                icon: { type: String },
                mainTheme: { type: String },
                mainThemeMode: { type: String },
                hoverTheme: { type: String },
                hoverThemeMode: { type: String },
                shapeTheme: { type: String },
                shapeThemeMode: { type: String },
                iconTheme: { type: String },
                iconThemeMode: { type: String },
            },
        },
    },
};

export function stripArticleWrapper(html: string): string {
    const root = parse(html);
    const article = root.querySelector('article');
    const container = article ? article : root;
    return container.innerHTML;
}

export function wrapSubtitle(html: string): string {
    const root = parse(html);
    const heading = root.querySelector('h1, h2');
    const next = heading?.nextElementSibling;

    if (heading && next && next.tagName === 'P') {
        const wrapped = `<hgroup>${heading.outerHTML}${next.outerHTML}</hgroup>`;
        heading.replaceWith(wrapped);
        next.remove();
    }

    return root.toString();
}

export function extractButtons(node: any, buttons: any[] = [], counter = { i: 0 }): any[] {
    if (node?.name === 'astro-button-placeholder') {
        const id = `button-placeholder-${counter.i++}`;
        node.attributes.id = id;
        buttons.push({ id, ...node.attributes });
    }
    if (Array.isArray(node?.children)) {
        node.children.forEach((child: any) => extractButtons(child, buttons, counter));
    }
    return buttons;
}

export function splitOnButtons(html: string, buttons: any[]): { type: 'html' | 'button'; content: string | any }[] {
    let remaining = html;
    const segments: { type: 'html' | 'button'; content: string | any }[] = [];

    buttons.forEach((button) => {
        const marker = `id="${button.id}"`;
        const markerIndex = remaining.indexOf(marker);
        if (markerIndex === -1) return;

        const tagStart = remaining.lastIndexOf('<astro-button-placeholder', markerIndex);
        const openTagEnd = remaining.indexOf('>', markerIndex) + 1;

        const closeTagIndex = remaining.indexOf('</astro-button-placeholder>', openTagEnd);
        const endIndex = closeTagIndex !== -1
            ? closeTagIndex + '</astro-button-placeholder>'.length
            : openTagEnd;

        segments.push({ type: 'html', content: remaining.slice(0, tagStart) });
        segments.push({ type: 'button', content: button });

        remaining = remaining.slice(endIndex);
    });

    segments.push({ type: 'html', content: remaining });
    return segments;
}