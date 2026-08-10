import { parse } from 'node-html-parser';

export function calculateReadingTime(article: string){
    const text = parse(article).textContent;
    const words = text.split(/\s+/).filter(Boolean);

    const wordCount = words.length;

    const wordsPerMinute = 200;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    if (readingTime > 0){
        if (readingTime === 1) {
            return `${readingTime} minute`;
        } else {
            return `${readingTime} minutes`;
        }
    } else {
        throw new Error('Something went wrong with the reading time calculation.');
    }
}