import path from 'path';

export function urlToFilename(url) {
    return path.basename(url);
}