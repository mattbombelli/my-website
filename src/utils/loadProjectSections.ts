import Markdoc from '@markdoc/markdoc';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { extractHeadings } from '@utils/extractHeadings';
import { resolveImage } from '@utils/resolveImage';
import {
    rawMarkdocConfig,
    stripArticleWrapper,
    wrapSubtitle,
    extractButtons,
    splitOnButtons,
} from '@utils/markdocProcessing';

async function processZone(
    zone: any,
    sectionIndex: number,
    zoneIndex: number,
    slug: string,
    contentBasePath: string
) {
    const textAlignment = !zone.content.discriminant ? zone.content.value.alignment : null;
    const invertType = !zone.content.discriminant ? zone.content.value.typography : null;
    const hasSubtitle = !zone.content.discriminant ? zone.content.value.subtitle : false;
    const zoneThemeMode = !zone.content.discriminant ? zone.content.value.theme : false;

    let contentHtml = null;
    let zoneHeadings: { type: 'h1' | 'h2' | 'h3'; link: string; label: string }[] = [];
    let segments: { type: 'html' | 'button'; content: string | any }[] = [];

    if (!zone.content.discriminant) {
        const filePath = join(
            process.cwd(),
            contentBasePath,
            slug,
            `sections/${sectionIndex}/zones/${zoneIndex}/content/value/content.mdoc`
        );

        const raw = await readFile(filePath, 'utf-8');
        const ast = Markdoc.parse(raw);
        const transformed = Markdoc.transform(ast, rawMarkdocConfig);
        const buttons = extractButtons(transformed);
        const html = Markdoc.renderers.html(transformed);
        const stripped = stripArticleWrapper(html);
        const withSubtitle = hasSubtitle ? wrapSubtitle(stripped) : stripped;

        const extracted = extractHeadings(withSubtitle);
        contentHtml = extracted.html;
        zoneHeadings = extracted.headings;

        segments = splitOnButtons(contentHtml, buttons);
    }

    return {
        ...zone,
        resolvedImage: await resolveImage(
            zone.content.discriminant ? zone.content.value.image : null
        ),
        textAlignment,
        invertType,
        zoneThemeMode,
        contentHtml,
        zoneHeadings,
        segments,
    };
}

export async function loadProjectSections(collection: any, slug: string, contentBasePath: string) {
    const project = await collection.read(slug, { resolveLinkedFiles: true });
    if (!project) throw new Error(`No entry found for slug: ${slug}`);

    const sections = await Promise.all(
        project.sections.map(async (section: any, sectionIndex: number) => ({
            ...section,
            zones: await Promise.all(
                section.zones.map((zone: any, zoneIndex: number) =>
                    processZone(zone, sectionIndex, zoneIndex, slug, contentBasePath)
                )
            ),
        }))
    );

    const allHeadings = sections.flatMap((section) =>
        section.zones.flatMap((zone: any) => zone.zoneHeadings)
    );

    return { project, sections, allHeadings };
}