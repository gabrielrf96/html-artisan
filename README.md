<p align="center">
    <img width="80%" src="graphic/html-artisan-logo-large.svg">
</p>
<br/>
<br/>
<p align="center">
    <img width="420px" src="graphic/usage.gif">
</p>
<br/>

# HTML Artisan *v1.2.0*

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

- **Very light**: the library is about *~1.2 KB* in its minified <a href="https://github.com/gabrielrf96/html-artisan/releases">release version</a>.
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

### Advanced functionalities and tips
***HTML Artisan*** comes with some convenient functionalities intended to boost your productivity.

---

#### Defining attributes
If provided, the `attributes` parameter will define a series of HTML attributes for our element.
This parameter acts like a map, where all the **keys** are the attribute **names**.
So, for example, we can easily set an **id**, **class** and some custom **data** attributes for our element:

Code:
```javascript
h('div', {
    id: 'super-container',
    'class': 'my-div my-thing',
    'data-has-things': 'yas',
    'data-foo': 'bar'
});
```

Output:
```html
<div id="super-container" class="my-div my-thing" data-has-things="yas" data-foo="bar"></div>
```

HTML Artisan will automatically decide whether each passed attribute should be assigned as an object property, or as an HTML element attribute. You need not worry about that.

If you need to set an object property manually (because you need, for example, to set a method on the element you are creating), you can do so using callbacks. See the callbacks section for more information on this topic.

Some things to take into account while defining attributes:
- Since 'class' is a reserved word, it should be quoted.

- CSS classes can be passed as either 'class' or 'className'.

- You can pass the 'style' attribute as either a *raw string* or a map of *cssProperty: cssValue*:

    ```javascript
    h('div', {
        'style': 'margin: 20px; padding: 10px; border: 1px solid red; font-size: 16px;'
    });
    // This is equivalent:
    h('div', {
        'style': {
            margin: '20px',
            padding: '10px',
            border: '1px solid red',
            'font-size': '16px'
        }
    });
    ```

- There are some special HTML Artisan attributes you can pass:

    - **events**: a map of event types and handlers:

        ```javascript
        h('div', {
            events: {
                click: function(e) {
                    console.log('I have been clicked!');
                }
                // ...
            }
        });
        ```

    - **callback**: a callback function that will be executed once the object (and all its children) has finished being created. For more information on this topic, check the callbacks section of the documentation.

---

#### Creating children
As you have seen, `HtmlArtisan()` accepts a `children` parameter.

You can pass a **single string**, or an **array of child elements**.

##### Passing a string
If you pass a single string, a single child text node will be created:

Code:
```javascript
h('p', null, 'This a paragraph');
// This is equivalent to passing the string as the only element of a children array:
h('p', null, ['This an equally valid way of creating a paragraph'])
```

Output:
```html
<p>This is a paragraph</p>

<p>This an equally valid way of creating a paragraph</p>
```

##### Passing an array of children
Children of an HTML-Artisan-defined element can be represented in a variety of ways:

- An **HTML element** that has been previously created:

    ```javascript
    var childOne = document.createElement('div');
    var childTwo = document.createElement('p');
    var result = h('div', null, [childOne, childTwo]);
    ```

- An **array representing another 'call' to HtmlArtisan()**:

    ```javascript
    var element = h('div', null, [
        ['div', {'class': 'my-div'}] // if no children are passed, an empty element will be created
    ]);
    ```

- A **function** that returns an element or an array of elements:

    ```javascript
    var elems = ['1', '2', '3', '4', '5'];
    var element = h('ul', null, [
        function() {
            var result = [];
            for (var i = 0; i < elems.length; i++) {
                result.push( h('li', null, elems[i]) );
            }
            return result;
        }
    ]);
    ```

    Note that these elements need to be HTML elements, created either with HTML Artisan calls or with the native DOM API.

- A **string**. Like we said earlier, passing a string will create a text child node:

    ```javascript
    h('p', null, ['This is a paragraph!']);
    ```

---

#### Using callbacks
Sometimes, you need to do some special post-processing on the elements you have created.

Using the DOM API, this is very simple, since every object is created in a top-level environment, and are accessible if you need them:

```javascript
var elem1 = document.createElement('div');
var child = document.createElement('p');

elem1.appendChild(child);

// 'child' is accessible, we can do some extra coding on it:
child.myMethod = function() {
    // ...
}
doSomeStuff(child);
// ...
```

Looking at an **HTML Artisan** piece of code, you might be tempted to think that child elements are inaccessible.

Yes, the code is well-structured and easy to read... but what if you need to touch a child element? Do you need to create it in advance and then pass it as a parameter? Doesn't that defeat the entire purpose of HTML Artisan?

To solve that issue, we have **callback** functions. A callback function defined for an HTML Artisan element will be executed once the element has been created. An HTML Artisan element is considered 'created' once:

- The element itself has been created.
- All attributes, standard and special, have been attached to it.
- All defined children hierarchy has been created and already appended to the element.

So, if you define a callback function for an element, you can access that element and do some post-processing on it **when it has already been created and has all its beautiful children already appended to it**.

A callback function can be defined in two ways:

- By passing a **callback** attribute to the `attributes` parameter:

    ```javascript
    h('div', {
        callback: function() {
            //...
        }
    })
    ```

- By passing a function directly into the `callback` parameter:

    ```javascript
    h('div', null, null, function() {
        //...
    })
    ```

If both ways are used at the same time, the second one will prevail (and it will be the only one to be executed).

In the scope of an HTML Artisan callback function, `this` is the created element whose callback function we're defining. Here's a quick example of this:

```javascript
h('div', {'class': 'container'}, [
    ['p', {'class': 'first-level-child'}, [
        ['a', {'class': 'second-level-child'}, null, function() {
            // 'this' is the 'second-level-child' element
            this.specialMethod = function() {
                // ...
            }

            this.getSomethingUseless = function() { return null; }

            // Some more post-processing
            // ...
        }]
    ]]
]);
```

Of course, that callback function can be extracted to un-clutter the tree-generating code:

```javascript
function postProcessLink() {
    // 'this' is the 'second-level-child' element
    this.specialMethod = function() {
        // ...
    }

    this.getSomethingUseless = function() { return null; }

    // Some more post-processing
    // ...
}

h('div', {'class': 'container'}, [
    ['p', {'class': 'first-level-child'}, [
        ['a', {'class': 'second-level-child'}, null, postProcessLink]
    ]]
]);
```

---

## HTML Artisan's present and future
I'm still working to improve **HTML Artisan** and bring new functionalities and utilities.

### Currently working on / future improvements
I'm currently working on the following points to improve **HTML Artisan**:

- List of supported browsers and versions
- Error and warning logging to improve development workflows
- Raw attributes support
- Iterating utilities
- Conditional elements

### Bug reporting and contact
If you experience any kind of trouble while using this library, please feel free to contact me to report any bugs or problems.

You can contact me by:

- Opening an <a href="https://github.com/gabrielrf96/html-artisan/issues">**issue on GitHub**</a>
- Sending me an e-mail to <a href="mailto:dev.gabrielrf@gmail.com">**dev.gabrielrf@gmail.com**</a>
- DM me on Twitter: <a href="https://twitter.com/Gabri239">**Gabri239**</a>

<br/>
<br/>
<p align="center">
  <img width="20%" src="graphic/html-artisan-logo-small.svg">
</p>
