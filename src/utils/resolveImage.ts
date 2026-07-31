import sharp from 'sharp';
import { join } from 'node:path';
import { encode } from 'blurhash';
import { blurhashToCssGradientString } from '@unpic/placeholder';
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

        const { data, info } = await sharp(join(process.cwd(), resolvedPath))
            .rotate()
            .raw()
            .ensureAlpha()
            .resize(32, 32, { fit: 'inside' })
            .toBuffer({ resolveWithObject: true });

        const aspectRatio = info.width / info.height;
        const baseComponent = 5;

        let componentX = Math.round(baseComponent * Math.sqrt(aspectRatio));
        let componentY = Math.round(baseComponent / Math.sqrt(aspectRatio));

        componentX = Math.min(9, Math.max(1, componentX));
        componentY = Math.min(9, Math.max(1, componentY));

        let placeholder = null;

        try {
            const hash = encode(new Uint8ClampedArray(data), info.width, info.height, componentX, componentY);
            placeholder = blurhashToCssGradientString(hash, componentX, componentY);
        } catch (e) {
            console.warn(`Could not generate placeholder for image: ${resolvedPath}`);
        }

        return {
            ...module.default,
            placeholder
        };
    } catch (e) {
        console.error(`Could not resolve image: ${path}`, e);
        return null;
    }
}