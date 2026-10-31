import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Chromium blocks external SVG masks on file:// pages. Embed only masks;
// regular images keep their existing URLs and WebP handling in both modes.
export function inlineSvgMasks(css, imageRoot) {
    return css.replace(
        /((?:-webkit-)?mask-image:\s*)url\((['"]?)@img\/([^'"()]+\.svg)\2\)/g,
        (_, property, quote, asset) => {
            const svg = readFileSync(resolve(imageRoot, asset), 'utf8');
            return `${property}url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
        }
    );
}
