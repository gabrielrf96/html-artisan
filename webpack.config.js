const PACKAGE = require('./package.json');
const LICENSE_COMMENT = `/*! HTML Artisan v${PACKAGE.version} | (c) Gabriel Rodríguez | https://www.gabrielrf.dev */`

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'web',
    entry: './scripts/build-standalone.js',
    output: {
        iife: true,
        filename: 'html-artisan.min.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    ecma: 2023,
                    format: {
                        comments: false,
                        preamble: LICENSE_COMMENT,
                    },
                },
            }),
        ],
    }
};
