# HTML Artisan *v1.1.0*

***HTML Artisan*** is a lightweight JS library for the dynamic, simple and easy-to-read generation of complex HTML structures.

Have you ever had to dynamically create complex HTML trees on the client side, directly in your JS code? That usually ends up looking like a hot mess.

With ***HTML Artisan***, you will be able to create very **readable**, **understandable** and **easily maintainable** HTML-generating code.

So you can say good bye to code like this...

```javascript
var div = document.createElement('div');
div.className = 'my-div';
div.setAttribute('data-my-attr', 'my-data');
var child = document.createElement('div');
child.className = 'child';
child.addEventListener('click', function() {
    console.log('clicked');
});
var subChild = document.createElement('p');
subChild.innerHTML = 'This is my text';
var anotherFirstLevelChild = document.createElement('div');
anotherFirstLevelChild.className = 'sublevel'
child.appendChild(subChild);
div.appendChild(child);
div.appendChild(anotherFirstLevelChild);
```

And hello to code like this!

```javascript
h('div', {
        'class': 'my-div',
        'data-my-attr': 'my-data',
        events: {click: function () { console.log('clicked'); }}
}, [
    ['div', {'class': 'child'}, [
        ['p', null, 'This is my text']
    ]],
    ['div', {'class': 'sublevel'}]
]);
```

***HTML Artisan*** code is versatile and easy to read and maintain, as it resembles a well organized tree structure.


## Why should I use HTML Artisan?

- **Very light**: the library is about *~2 KB* in its minified version.
- Keeps all the **performance** benefits of vanilla JS but with a **prettier syntax**. HTML structures are generated using core JS functionality, so it's very **efficient** and **fast**.
- Produces **structured**, **easy to read** and **maintainable** code.
- Can be **easily combined** with other libraries, like jQuery, to boost productivity.


## How to use?

### Examples
In this repository, you will find a set of [examples](examples) that depict the basic use of the library, and its main functionalities and utilities. To get started you can check the basic example [here](examples/basic.html).

You can also dive directly into the source code [here](src/htmlartisan.js)

### The HtmlArtisan object
Once included in your project, ***HTML Artisan*** will create a namespace/object containing all functionality. This is the `HtmlArtisan` object.

***HTML Artisan*** will also create a short, convenient alias for this object: `h`

### Namespace conflict
If this convenience alias causes a conflict in your project, because the `h` namespace needs to be used by some other library (or simply because you don't fancy that name, or want to use it for another global variable), you can easily fix this conflict with `HtmlArtisan.fixConflict()`.

You can either replace the alias with a new one of your choosing:
```javascript
var ht = HtmlArtisan.fixConflict();
// Now 'h' doesn't exist (or has been restored to its original self).
// HtmlArtisan, however, still exists
```

Or you can just completely remove all HtmlArtisan variables from the global scope (both `HtmlArtisan` and `h`) by calling `fixConflict` with its `removeAll` parameter set to `true`.
```javascript
var ht = HtmlArtisan.fixConflict(true);
// Now 'HtmlArtisan' and 'h' don't exist (or have been restored to their original selves)
```

### Basic usage
The ***HTML Artisan*** object itself is a function besides being its own namespace (just like jQuery). Calling the `HtmlArtisan` object as a function will unleash its HTML-generating power.

For example, this code:
```javascript
h('div', {
    'class': 'my-div',
    'style': {color: '#333', width: '90%', margin: '0 auto'}
}, [
    ['p', null, 'This a paragraph generated with HTML Artisan.'],
    ['p', null, 'HTML Artisan is so cool!'],
    ['p', null, [
        "HTML Artisan's creator, Gabriel, is on "
        ['a', {href: 'https://twitter.com/Gabri239'}, 'Twitter!'],
    ]]
]);
```

Will generate this HTML structure:
```html
<div class="my-div" style="color: #333; width: 90%; margin: 0 auto;">
    <p>This a paragraph generated with HTML Artisan.</p>
    <p>HTML Artisan is so cool!</p>
    <p>
        HTML Artisan's creator, Gabriel, is on
        <a href="https://twitter.com/Gabri239">Twitter</a>
    </p>
</div>
```

For an extended look into how `HtmlArtisan()` works (and its parameters) you can check the [API reference](API.md).
