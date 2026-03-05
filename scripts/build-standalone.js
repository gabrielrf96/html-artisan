// Script to build HTML Artisan as a legacy standalone file to use directly instead of using npm / modules

import { HtmlArtisan } from '../src/html-artisan.js';

const namespace = 'HtmlArtisan';
const alias = 'h';

// If the namespace or the alias function name already exist, store them so they can be restored
const initialHtmlArtisanObject = window[namespace] ?? null;
const initialAliasObject = window[alias] ?? null;

HtmlArtisan.fixConflict = (newAlias = null) => {
    // Restore previous global values
    window[namespace] = initialHtmlArtisanObject;
    window[alias] = initialAliasObject;

    if (newAlias !== null) {
        window[newAlias] = HtmlArtisan.build;
    }

    return HtmlArtisan;
};

window[namespace] = HtmlArtisan;
window[alias] = HtmlArtisan.build;
