/**
 * Creates an HTML element with the desired tag and attributes, and attaches the desired children.
 *
 * @param {string} tag The HTML tag for the element. If not provided, defaults to 'div'.
 *
 * @param {{ [ key: string ]: any }|null} attributes A map containing pairs of `attributeName: attributeValue`.
 *     Can be omitted, in which case it will be `null`.
 *
 *     Valid attributes are:
 *     - Any valid HTML attribute, including `data-*` attributes.
 *       CSS classes can be passed as either `className` or `class`.
 *       The `style` attribute can be passed as a `string`, or a map containing pairs of `cssProperty: cssValue`.
 *     - `if`: a boolean expression or callback function, which will be evaluated to determine whether the element
 *       should be rendered or not. If the boolean expression, or the result of calling the callback function, is
 *       `false`, then `null` will be returned by the function and the element or child will not be rendered.
 *     - `events`: a map of event handlers. E.g. `{click: function() {...}, mouseover: function() {...}}`.
 *     - `callback`: a function that will be called once the element and all its children are created,
 *       immediately before returning the element. In this function's environment, `this` is the element
 *       that has been created (with all children already attached, too). The created element is also passed
 *       as a function argument (so you can use arrow functions for callbacks).
 *
 * @param {Array[]|HTMLElement|Function|string|null} children An array of children (1), or a single child (2).
 *     Can be omitted, in which case it will be `null`.
 *
 *     (1) Valid elements that can be passed in a children array:
 *     - A DOM element.
 *     - An array representing another element that `HtmlArtisan` should create: `[tag, attributes, children]`.
 *     - A function returning an element or an array of elements.
 *     - A `string`. In this case, a child text node will be created and attached in this position.
 *
 *     (2) Valid elements that can be passed as a single child (directly, without enclosing in an array):
 *     - A DOM element.
 *     - A function returning an element or an array of elements.
 *     - A `string`. In this case, a child text node will be createed and attached.
 *
 * @param {Function|null} callback This callback function works exactly the same as the one that can be passed
 *     in the `attributes` parameter. If both of them are defined, this function will override the one from
 *     `attributes`. Can be omitted, in which case it will be `null`.
 *
 * @returns {HTMLElement|null} The created element with all its children and attributes already attached. `null` may be
 *     returned if the evaluation of `attributes.if` yields `false`.
 */
export function h(
    tag?: string,
    attributes?: {[key: string]: any;} | null,
    children?: any[][] | HTMLElement | Function | string | null,
    callback?: Function | null
): HTMLElement | null;

/**
 * The main HTML Artisan object.
 *
 * Using {@link HtmlArtisan.build()} or the standalone function {@link h()} is exactly the same
 * and will yield the same results.
 */
export namespace HtmlArtisan {
    /**
     * Creates an HTML element with the desired tag and attributes, and attaches the desired children.
     *
     * @param {string} tag The HTML tag for the element. If not provided, defaults to 'div'.
     *
     * @param {{ [ key: string ]: any }|null} attributes A map containing pairs of `attributeName: attributeValue`.
     *     Can be omitted, in which case it will be `null`.
     *
     *     Valid attributes are:
     *     - Any valid HTML attribute, including `data-*` attributes.
     *       CSS classes can be passed as either `className` or `class`.
     *       The `style` attribute can be passed as a `string`, or a map containing pairs of `cssProperty: cssValue`.
     *     - `if`: a boolean expression or callback function, which will be evaluated to determine whether the element
     *       should be rendered or not. If the boolean expression, or the result of calling the callback function, is
     *       `false`, then `null` will be returned by the function and the element or child will not be rendered.
     *     - `events`: a map of event handlers. E.g. `{click: function() {...}, mouseover: function() {...}}`.
     *     - `callback`: a function that will be called once the element and all its children are created,
     *       immediately before returning the element. In this function's environment, `this` is the element
     *       that has been created (with all children already attached, too). The created element is also passed
     *       as a function argument (so you can use arrow functions for callbacks).
     *
     * @param {Array[]|HTMLElement|Function|string|null} children An array of children (1), or a single child (2).
     *     Can be omitted, in which case it will be `null`.
     *
     *     (1) Valid elements that can be passed in a children array:
     *     - A DOM element.
     *     - An array representing another element that `HtmlArtisan` should create: `[tag, attributes, children]`.
     *     - A function returning an element or an array of elements.
     *     - A `string`. In this case, a child text node will be created and attached in this position.
     *
     *     (2) Valid elements that can be passed as a single child (directly, without enclosing in an array):
     *     - A DOM element.
     *     - A function returning an element or an array of elements.
     *     - A `string`. In this case, a child text node will be createed and attached.
     *
     * @param {Function|null} callback This callback function works exactly the same as the one that can be passed
     *     in the `attributes` parameter. If both of them are defined, this function will override the one from
     *     `attributes`. Can be omitted, in which case it will be `null`.
     *
     * @returns {HTMLElement|null} The created element with all its children and attributes already attached. `null` may be
     *     returned if the evaluation of `attributes.if` yields `false`.
     */
    function build(
        tag?: string,
        attributes?: {[key: string]: any;} | null,
        children?: any[][] | HTMLElement | Function | string | null,
        callback?: Function | null
    ): HTMLElement | null;
    let author: string;
    let version: string;
}
//# sourceMappingURL=html-artisan.d.ts.map
