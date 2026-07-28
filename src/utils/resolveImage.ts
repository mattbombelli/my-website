export async function resolveImage(path: string | null){
    if (!path) return null;

    try {
        const resolvedPath = decodeURIComponent(path)
            .replace('@images/', '/src/assets/images/');
        const module = await import(/* @vite-ignore */ resolvedPath);
        return module.default;
    } catch(e){
        console.error(`Could not resolve image: ${path}`);
        return null;
    }
}