import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
    globalIgnores(['**/*.min.js']),
    {
        files: ['**/*.js'],
        languageOptions: { globals: globals.browser },
        plugins: {
            js,
        },
        extends: ['js/recommended'],
        rules: {
            'no-unused-vars': 'warn',
        },
    },
    {
        files: ['**/*.test.{js,ts,jsx,tsx}'],
        languageOptions: { globals: globals.browser },
        rules: {
            'no-restricted-properties': [
                'error',
                {
                    property: 'innerText',
                    message: 'Prefer the `textContent` property. `innerText` is always `undefined` in JSDOM. See https://github.com/jsdom/jsdom/issues/1245',
                },
            ],
        },
    },
]);
