/*! HTML Artisan v1.2.0 | (c) Gabriel Rodríguez Fernández | https://twitter.com/Gabri239 */

(function(namespace, alias) {

    // If the namespace or the alias function name already exist, store them so they can be restored
    var initialHtmlArtisanObject = typeof window[namespace] !== 'undefined' ? window[namespace]:null;
    var initialAliasObject = typeof window[alias] !== 'undefined' ? window[alias]:null;

    // Attributes that should be initially ignored (they are processed in some special way)
    var ignoredAttributes = ['events', 'style', 'if', 'callback'];

    /**
     * Creates an HTML element with the desired tag and attributes, and attaches the desired children.
     * @param {string} tag The HTML tag for the element.
     * @param {Object} attributes A map containing pairs of attributeName: attributeValue.
     *     Valid attributes are:
     *     - Any valid HTML attribute, including data-* attributes.
     *     CSS classes can be passed as either 'className' or 'class'.
     *     The 'style' attribute can be passed as a string, or a map containing pairs of cssProperty: cssValue
     *     - 'events': a map of event handlers. E.g. {click: function() {...}, mouseover: function() {...}}
     *     - 'callback': a function that will be called once the element and all its children are created,
     *     immediately before returning the element. In this function's environment, 'this' is the element
     *     that has been created (with all children already attached, too).
     * @param {Array[]|string} children An array of children elements, or a single string (text node child).
     *     Valid elements that can be passed as children:
     *     - An element.
     *     - An array representing another element that HtmlArtisan should create: [tag, attributes, children]
     *     - A function returning an element or an array of elements.
     *     - A string. In this case, a child text node will be created and attached in this position.
     * @param {Function} callback This callback function works exactly the same as the one that can be passed
     *     in the 'attributes' parameter. If both of them are defined, this function will override the one from
     *     'attributes'.
     *
     * @returns {Element} The created element with all its children and attributes already attached
     */
    var HtmlArtisan = function(tag, attributes, children, callback) {
        var element = document.createElement(tag);

        if (typeof attributes !== 'undefined' && attributes !== null) {
            if (typeof attributes.if !== 'undefined' && attributes.if !== null) {
                var shouldBeRendered = typeof attributes.if === 'function' ? attributes.if():attributes.if;
                if (!shouldBeRendered) {
                    return null;
                }
            }

            for (var attribute in attributes) {
                if (ignoredAttributes.indexOf(attribute) === -1) {
                    if (attribute in element) {
                        element[attribute] = attributes[attribute];
                    } else {
                        element.setAttribute(attribute, attributes[attribute]);
                    }
                }
            }

            for (var event in attributes.events) {
                var handler = attributes.events[event];
                if (element.addEventListener) {
                    element.addEventListener(event, handler);
                } else {
                    element.attachEvent('on' + event, handler);
                }
            }

            if (typeof attributes.style === 'string') {
                element.style = attributes.style;
            } else {
                for (var styleRule in attributes.style) {
                    if (typeof element.style[styleRule] !== 'undefined') {
                        element.style[styleRule] = attributes.style[styleRule];
                    }
                }
            }
        }

        if (typeof children !== "undefined") {
            // If a single string is passed as 'children', convert to an array (utility for the creating of text child nodes)
            if (typeof children === 'string') {
                children = [children];
            }

            for (var i = 0; i < children.length; i++) {
                if (children[i] !== null) {
                    if (children[i] instanceof Node) {
                        element.appendChild(children[i]);
                    } else if (typeof children[i] === 'function') {
                        var result = children[i]();
                        if (result instanceof Array) {
                            result.forEach(function(resultElem) {
                                element.appendChild(resultElem);
                            });
                        } else {
                            element.appendChild(result);
                        }
                    } else if (typeof children[i] === 'string') {
                        element.appendChild(
                            document.createTextNode(children[i])
                        );
                    } else if (children[i] instanceof Array) {
                        var child = HtmlArtisan.apply(null, children[i]);
                        if (child !== null) {
                            element.appendChild(child);
                        }
                    }
                }
            }
        }

        callback = (typeof callback !== 'undefined' && callback !== null) ? callback:((attributes && attributes.callback) || null);
        if (callback !== null) {
            callback.apply(element);
        }

        return element;
    }

    HtmlArtisan.fixConflict = function(removeAll) {
        window[alias] = initialAliasObject;
        if (removeAll === true) {
            window[namespace] = initialHtmlArtisanObject;
        }
        return HtmlArtisan;
    };

    HtmlArtisan.author = 'Gabriel Rodríguez Fernández | https://twitter.com/Gabri239';
    HtmlArtisan.version = '1.2.0';

    window[namespace] = HtmlArtisan;
    window[alias] = HtmlArtisan;

})('HtmlArtisan', 'h');
