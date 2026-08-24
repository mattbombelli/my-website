import { resolveImageOrThrow } from './resolveImageOrThrow';

export async function resolveImageWithPlaceholder(path: string) {
    const image = await resolveImageOrThrow(path);
    return {
        image,
        placeholderStyle: `--blurhash-gradient: url("${image.placeholder}");`,
    };
}