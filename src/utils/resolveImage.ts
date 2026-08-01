import sharp from 'sharp';
import { join } from 'node:path';
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/images/**/*.{png,jpg,jpeg,webp}',
    { eager: true }
);

export async function resolveImage(path: string | null) {
    if (!path) return null;

    try {
        const resolvedPath = decodeURIComponent(path)
            .replace('@images/', '/src/assets/images/');

        const module = images[resolvedPath];

        if (!module) {
            console.error(`Image not found: ${resolvedPath}`);
            return null;
        }

        const { data } = await sharp(join(process.cwd(), resolvedPath))
            .rotate()
            .raw()
            .ensureAlpha()
            .resize(20, null, { fit: 'inside' })
            .median(3)
            .blur(6)
            .webp({ quality: 5 })
            .toBuffer({ resolveWithObject: true });

        const placeholder = `data:image/webp;base64,${data.toString('base64')}`;

        return {
            ...module.default,
            placeholder
        };
    } catch (e) {
        console.error(`Could not resolve image: ${path}`, e);
        return null;
    }
}