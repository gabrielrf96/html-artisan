/*! HTML Artisan | MIT License | (c) Gabriel Rodríguez | https://www.gabrielrf.dev */

((namespace, alias) => {
    'use strict';

    // If the namespace or the alias function name already exist, store them so they can be restored
    const initialHtmlArtisanObject = window[namespace] ?? null;
    const initialAliasObject = window[alias] ?? null;

    // Attributes that should be initially ignored (they are processed in some special way)
    const ignoredAttributes = ['events', 'style', 'if', 'callback'];

    /**
     * Processes an attribute map, properly assigning attribute values to the element.
     *
     * @param {HTMLElement} element The HTML element that the attributes will be set on.
     * @param {Object} attributes The attribute map. See HtmlArtisan function docs for more information on the attribute map format
     *
     * @returns {boolean} Boolean determining whether or not the element should be created (depending on attributes.if)
     */
    const _processAttributeMap = (element, attributes) => {
        if ((attributes?.if ?? null) !== null) {
            const shouldBeRendered = typeof attributes.if === 'function' ? attributes.if() : attributes.if;

            if (!shouldBeRendered) {
                return false;
            }
        }

        for (const attribute in attributes) {
            if (!ignoredAttributes.includes(attribute)) {
                if (attribute in element) {
                    element[attribute] = attributes[attribute];
                } else {
                    element.setAttribute(attribute, attributes[attribute]);
                }
            }
        }

        for (const event in attributes.events) {
            element.addEventListener(event, attributes.events[event]);
        }

        if (typeof attributes.style === 'string') {
            element.style = attributes.style;
        } else {
            for (const styleRule in attributes.style) {
                if (element.style[styleRule]) {
                    element.style[styleRule] = attributes.style[styleRule];
                }
            }
        }

        return true;
    };

    /**
     * Processes a child or array of children, and attaches them to the desired element.
     *
     * @param {HTMLElement} element The HTML element that the children will be attached to.
     * @param {Array[]|HTMLElement|Function|string} children The child or children, expressed in any of the HtmlArtisan-accepted formats.
     */
    const _processChildrenArray = (element, children) => {
        // If a valid single element is passed as 'children', convert to an array of children
        if (['string', 'function'].includes(typeof children) || children instanceof HTMLElement || children === null) {
            children = [children];
        }

        for (const child of children) {
            if (child === null) {
                continue;
            }

            if (child instanceof Node || typeof child === 'string') {
                element.append(child);
            } else if (typeof child === 'function') {
                _processChildrenArray(element, child());
            } else if (child instanceof Array) {
                const result = HtmlArtisan.apply(null, child);

                if (result !== null) {
                    element.appendChild(result);
                }
            }
        }
    };

    /**
     * Creates an HTML element with the desired tag and attributes, and attaches the desired children.
     * @param {string} tag The HTML tag for the element.
     * @param {Object} attributes A map containing pairs of attributeName: attributeValue.
     *     Valid attributes are:
     *     - Any valid HTML attribute, including data-* attributes.
     *       CSS classes can be passed as either 'className' or 'class'.
     *       The 'style' attribute can be passed as a string, or a map containing pairs of cssProperty: cssValue
     *     - 'events': a map of event handlers. E.g. {click: function() {...}, mouseover: function() {...}}
     *     - 'callback': a function that will be called once the element and all its children are created,
     *       immediately before returning the element. In this function's environment, 'this' is the element
     *       that has been created (with all children already attached, too). The created element is also passed
     *       as a function argument (so you can use arrow functions for callbacks).
     * @param {Array[]|HTMLElement|Function|string} children An array of children*, or a single child**.
     *     * Valid elements that can be passed in a children array:
     *     - A DOM element.
     *     - An array representing another element that HtmlArtisan should create: [tag, attributes, children]
     *     - A function returning an element or an array of elements.
     *     - A string. In this case, a child text node will be created and attached in this position.
     *     ** Valid elements that can be passed as a single child (directly, without enclosing in an array):
     *     - A DOM element.
     *     - A function returning an element or an array of elements.
     *     - A string. In this case, a child text node will be createed and attached.
     * @param {Function} callback This callback function works exactly the same as the one that can be passed
     *     in the 'attributes' parameter. If both of them are defined, this function will override the one from
     *     'attributes'.
     *
     * @returns {Element} The created element with all its children and attributes already attached
     */
     const HtmlArtisan = (tag = 'div', attributes = null, children = null, callback = null) => {
        const element = document.createElement(tag);

        if (attributes !== null) {
            let elementVisible = _processAttributeMap(element, attributes);
            if (!elementVisible) {
                return null;
            }
        }

        if (children !== null) {
            _processChildrenArray(element, children);
        }

        callback = callback ?? attributes?.callback ?? null;

        if (callback !== null) {
            callback.call(element, element);
        }

        return element;
    };

    HtmlArtisan.fixConflict = removeAll => {
        window[alias] = initialAliasObject;

        if (removeAll === true) {
            window[namespace] = initialHtmlArtisanObject;
        }

        return HtmlArtisan;
    };

    HtmlArtisan.author = 'Gabriel Rodríguez | https://www.gabrielrf.dev';
    HtmlArtisan.version = typeof __VERSION__ !== 'undefined' ? __VERSION__ : null;

    window[namespace] = HtmlArtisan;
    window[alias] = HtmlArtisan;

})('HtmlArtisan', 'h');
