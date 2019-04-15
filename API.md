# HTML Artisan *v1.2.0* API Reference

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
    The HTML tag for the element.

 - **attributes** *{Object}* (optional)<br/>
A map containing pairs of attributeName: attributeValue.
Valid attributes are:
	 - **Any valid HTML attribute**, including data-* attributes.
CSS classes can be passed as either 'className' or 'class'.
The 'style' attribute can be passed as a string, or a map containing pairs of cssProperty: cssValue.
	- **'events'**: a map of event handlers. E.g. {click: function() {...}, mouseover: function() {...}}
	- **'callback'**: a function that will be called once the element and all its children are created, immediately before returning the element. In this function's environment, *'this'* is the element that has been created (with all children already attached, too).

 - **children** *{Array[]|string}* (optional)<br/>
 An array of child elements, or a single string (single text node child). If an array of children is passed, we need to take into account that each child element can be expressed or passed in a variety of ways:
	 - With an element object, as in `document.createElement(...)`
	 - With an array representing another HtmlArtisan element: `[tag, attributes, children]`.
	 - With a function returning an element or an array of elements.
	 - With a string. In this case, a child text node will be created.
 These different ways can be combined as needed to build our children arrays.

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
