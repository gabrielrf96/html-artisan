const PACKAGE = require('../package.json');
const replace = require('replace-in-file');

try {
    const changedFiles = replace.sync({
        files: [
            `${__dirname}/../README.md`,
            `${__dirname}/../API.md`,
        ],
        from: /# HTML Artisan \*v([^*]*)\*/g,
        to: `# HTML Artisan *v${PACKAGE.version}*`
    });

    console.log('Version injected successfully: ', changedFiles);
} catch (error) {
    console.error('Error occurred: ', error);
}
