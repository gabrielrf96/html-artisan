import packageInfo from './package.json' with { type: 'json' };

const LICENSE_COMMENT = `/*! HTML Artisan v${packageInfo.version} | (c) Gabriel Rodríguez | https://www.gabrielrf.dev */`

import TerserPlugin from 'terser-webpack-plugin';

export default {
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
