import { resolveImage } from './resolveImage.ts';

export async function resolveImageOrThrow(path: string | undefined | null) {
    if (!path) {
        throw new Error('Image path is required but was not provided.');
    }

    const image = await resolveImage(path);
    if (!image) {
        throw new Error(`Could not resolve required image: ${path}`);
    }
    return image;
}