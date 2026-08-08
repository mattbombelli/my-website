import { parse } from 'node-html-parser';

interface HeadingEntry{
    type: 'h1' | 'h2' | 'h3';
    link: string;
    label: string;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export function extractHeadings(html: string): {html: string; headings: HeadingEntry[]} {
    const root = parse(html);
    const headingNodes = root.querySelectorAll('h1, h2, h3');
    const headings: HeadingEntry[] = [];

    headingNodes.map((heading) => {
        const label = heading.textContent.trim();
        const id = slugify(label);

        heading.setAttribute('id', id);

        headings.push({
            type: heading.tagName.toLowerCase() as HeadingEntry['type'],
            link: `#${heading.id}`,
            label
        }) 
    });

    return { html: root.toString(), headings };
}