# HTML Artisan *v2.0.1* API Reference

## Content

 1. [HtmlArtisan()](#htmlartisan)
 2. [HtmlArtisan.fixConflict()](#fixconflict)
 3. [HtmlArtisan.version](#version)

---
<a name="htmlartisan"></a>
### `HtmlArtisan(tag [, attributes, children, callback])`
Creates an HTML element with the desired tag and attributes, and attaches the desired children.

#### Parameters
 - **tag** *{string}*<br/>
    The HTML tag for the element. Defaults to 'div'.

 - **attributes** *{Object}* (optional)<br/>
A map containing pairs of attributeName: attributeValue.
Valid attributes are:
	 - **Any valid HTML attribute**, including data-* attributes.
CSS classes can be passed as either 'className' or 'class'.
The 'style' attribute can be passed as a string, or a map containing pairs of cssProperty: cssValue.
	- **'events'**: a map of event handlers. E.g. {click: function() {...}, mouseover: function() {...}}
	- **'if'**: a condition that will determine whether or not this element (and all its children) should be rendered. It can be an expression, a boolean value or a function.
	- **'callback'**: a function that will be called once the element and all its children are created, immediately before returning the element. In this function's environment, *'this'* is the element that has been created (with all children already attached, too). The created element is also passed as an argument to the callback function, so arrow functions can be used in this context, too.

 - **children** *{Array[]|HTMLElement|Function|string}* (optional)<br/>
 An array of children, or a single child.
 If an array of children is passed, each child element can be expressed or passed in a variety of ways:
	 - With a DOM element object, as in `document.createElement(...)`
	 - With an array representing another HtmlArtisan element (HtmlArtisan array expression): `[tag, attributes, children]`.
	 - With a function returning an element or an array of elements. The element or elements returned by a generator function can be, again, expressed in any of the formats accepted by HtmlArtisan (HTMLElement, string, HtmlArtisan array expression, and even another generator function; a combination of any number of these formats is also possible).
	 - With a string. In this case, a child text node will be created.

	These different ways can be combined as needed to build our children arrays.
 	Moreover, instead of passing an array of children, you can pass a single child element. In this case, the amount of ways to express that child element are more limited:
	 - With a DOM element object.
	 - With a function returning an element or an array of elements.
	 - With a string. In this case, a child text node will be created.

 	If you want to pass a single array representing another HtmlArtisan element, you have to enclose it in another array: `[ [tag, attributes, children] ]`

- **callback** *{Function}* (optional)<br/>
This callback function works exactly the same as the one that can be passed in the 'attributes' parameter. If both of them are defined, this function will override the one from 'attributes'.

#### Returns
The created HTML element with all its children and attributes already attached.

---
<a name="fixconflict"></a>
### `HtmlArtisan.fixConflict([removeAll])`
Fixes conflicts concerning the use of the `HtmlArtisan` and/or `h` namespaces by restoring the state of said namespaces to the values they had before HtmlArtisan took control of them.

#### Parameters
 - **removeAll** *{boolean}* (optional, default `false`)<br/>
 If `false`, only the `h` alias will be restored.
 If `true`, `HtmlArtisan` will also be restored.

#### Returns
The `HtmlArtisan` object, so it can be assigned to a new variable.

---
<a name="version"></a>
### `HtmlArtisan.version`
A static property containing the version of HTML Artisan that is being used.

---
