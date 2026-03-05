import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { replaceInFileSync } from 'replace-in-file';

import packageInfo from '../package.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
    const changedFiles = replaceInFileSync({
        files: [
            `${__dirname}/../README.md`,
            `${__dirname}/../API.md`,
        ],
        from: /# HTML Artisan \*v([^*]*)\*/g,
        to: `# HTML Artisan *v${packageInfo.version}*`
    });

    changedFiles.push(...replaceInFileSync({
        files: [
            `${__dirname}/../src/html-artisan.js`,
        ],
        from: /\/\*! HTML Artisan v([^*|]*) \|/g,
        to: `/*! HTML Artisan v${packageInfo.version} |`
    }))

    console.log('Version injected successfully: ', changedFiles);
} catch (error) {
    console.error('Error occurred: ', error);
}
