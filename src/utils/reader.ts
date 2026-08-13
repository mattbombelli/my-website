import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@root/keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);