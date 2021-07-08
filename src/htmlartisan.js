
((namespace, alias) => {

    // If the namespace or the alias function name already exist, store them so they can be restored
    const initialHtmlArtisanObject = typeof window[namespace] !== 'undefined' ? window[namespace]:null;
    const initialAliasObject = typeof window[alias] !== 'undefined' ? window[alias]:null;

    // Attributes that should be initially ignored (they are processed in some special way)
    const ignoredAttributes = ['events', 'style', 'if', 'callback'];

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
            if (child !== null) {
                if (child instanceof Node || typeof child === 'string') {
                    element.append(child);
                } else if (typeof child === 'function') {
                    _processChildrenArray(element, child());
                } else if (child instanceof Array) {
                    let result = HtmlArtisan.apply(null, child);
                    if (result !== null) {
                        element.appendChild(result);
                    }
                }
            }
        }
    }

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
     const HtmlArtisan = (tag, attributes, children, callback) => {
        let element = document.createElement(tag);

        if (typeof attributes !== 'undefined' && attributes !== null) {
            if (typeof attributes.if !== 'undefined' && attributes.if !== null) {
                let shouldBeRendered = typeof attributes.if === 'function' ? attributes.if():attributes.if;
                if (!shouldBeRendered) {
                    return null;
                }
            }

            for (let attribute in attributes) {
                if (!ignoredAttributes.includes(attribute)) {
                    if (attribute in element) {
                        element[attribute] = attributes[attribute];
                    } else {
                        element.setAttribute(attribute, attributes[attribute]);
                    }
                }
            }

            for (let event in attributes.events) {
                element.addEventListener(event, attributes.events[event]);
            }

            if (typeof attributes.style === 'string') {
                element.style = attributes.style;
            } else {
                for (let styleRule in attributes.style) {
                    if (typeof element.style[styleRule] !== 'undefined') {
                        element.style[styleRule] = attributes.style[styleRule];
                    }
                }
            }
        }

        if (typeof children !== "undefined") {
            _processChildrenArray(element, children);
        }

        callback = (typeof callback !== 'undefined' && callback !== null) ? callback:((attributes && attributes.callback) || null);
        if (callback !== null) {
            callback.call(element, element);
        }

        return element;
    }

    HtmlArtisan.fixConflict = removeAll => {
        window[alias] = initialAliasObject;
        if (removeAll === true) {
            window[namespace] = initialHtmlArtisanObject;
        }
        return HtmlArtisan;
    };

    HtmlArtisan.author = 'Gabriel Rodríguez Fernández | https://www.gabrielrf.dev';
    HtmlArtisan.version = typeof __VERSION__ !== 'undefined' ? __VERSION__:null;

    window[namespace] = HtmlArtisan;
    window[alias] = HtmlArtisan;

})('HtmlArtisan', 'h');
