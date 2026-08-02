import { resolveImage } from './resolveImage.ts';

export async function resolveImageOrThrow(path: string) {
    const image = await resolveImage(path);
    if (!image) {
        throw new Error(`Could not resolve required image: ${path}`);
    }
    return image;
}