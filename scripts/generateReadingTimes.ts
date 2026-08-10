import { createReader } from "@keystatic/core/reader";
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import Markdoc from '@markdoc/markdoc';
import keystaticConfig from "../keystatic.config";
import { calculateReadingTime } from "../src/utils/calculateReadingTime";

const reader = createReader(process.cwd(), keystaticConfig);
const caseStudySlugs = await reader.collections.caseStudies.list();

async function getArticleText(slug: string): Promise<string> {
    const caseStudy = await reader.collections.caseStudies.read(slug, { resolveLinkedFiles: true});
    if (!caseStudy) throw new Error(`No case study found for slug: ${slug}`);

    const fragments = await Promise.all(
        caseStudy.sections.flatMap((section, sectionIndex) =>
            section.zones.map(async (zone, zoneIndex) => {
                if (zone.content.discriminant) return '';

                const filePath = join(
                    process.cwd(),
                    'src/content/ux',
                    slug,
                    `sections/${sectionIndex}/zones/${zoneIndex}/content/value/content.mdoc`
                );

                const raw = await readFile(filePath, 'utf-8');
                const ast = Markdoc.parse(raw);
                const transformed = Markdoc.transform(ast);
                return Markdoc.renderers.html(transformed);
            })
        )
    )

    return fragments.join('');
}

const readingTimes = {
    caseStudies: Object.fromEntries(
        await Promise.all(
            caseStudySlugs.map(async (slug) => {
                const text = await getArticleText(slug);
                return [slug, calculateReadingTime(text)];
            })
        )
    ),
};

await mkdir('src/content/_generated', {recursive: true});
await writeFile(
    'src/content/_generated/reading-times.json',
    JSON.stringify(readingTimes, null, 2)
);

console.log(`Generated reading times for ${caseStudySlugs.length} case studies.`);