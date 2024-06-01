const PACKAGE = require('./package.json');
const licenseComment = `/*! HTML Artisan v${PACKAGE.version} | (c) Gabriel Rodríguez | https://www.gabrielrf.dev */`

const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/htmlartisan.js',
    output: {
        filename: `htmlartisan-${PACKAGE.version}.min.js`
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
                        preamble: licenseComment
                    }
                }
            }),
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(PACKAGE.version)
            })
        ]
    }
};