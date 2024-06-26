<p align="center">
    <img width="80%" src="graphic/html-artisan-logo-large.svg">
</p>
<br/>
<br/>
<p align="center">
    <img width="420px" src="graphic/usage.gif">
</p>
<br/>

**Key aspects**
<ul>
    <li><a href="#introduction">What is HTML Artisan?</a></li>
    <li><a href="#why">Why should I use HTML Artisan?</a></li>
    <li><a href="#compatibility">Browser compatibility</a></li>
    <li><a href="#how">How to use?</a>
        <ul>
            <li><a href="#examples-intro">Examples</a></li>
            <li><a href="#htmlartisan-object">The HtmlArtisan object</a></li>
            <li><a href="#namespace-conflicts">Fixing namespace conflicts</a></li>
            <li><a href="#basic-use">Basic usage</a></li>
            <li><a href="#advanced-use">Advanced functionalities and tips</a>
                <ul>
                    <li><a href="#attributes">Defining attributes</a></li>
                    <li><a href="#children">Creating children</a></li>
                    <li><a href="#callbacks">Using callbacks</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><a href="#building">Building from source</a></li>
    <li><a href="#outro">HTML Artisan's present and future</a>
        <ul>
            <li><a href="#future">Currently working on / future improvements</a></li>
            <li><a href="#contact">Contact and bug reporting</a></li>
        </ul>
    </li>
    <li><a href="API.md">API Reference</a></li>
</ul>
<br/>

<a name="introduction"></a>
# HTML Artisan *v2.1.0*

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


<a name="why"></a>
## Why should I use HTML Artisan?

- **Very light**: the library is about *~1.14 KB* in its minified <a href="https://github.com/gabrielrf96/html-artisan/releases">release version</a>.
- Keeps all the **performance** benefits of vanilla JS but with a **prettier syntax**. HTML structures are generated using core JS functionality, so it's very **efficient** and **fast**.
- Produces **structured**, **easy to read** and **maintainable** code.
- Can be **easily combined** with other libraries to boost productivity.
- It's ideal for small dynamic projects where using a front end framework like Vue.js or React would be overkill.


<a name="compatibility"></a>
## Browser compatibility
HTML Artisan is built to be compatible with all major browsers, on both desktop and mobile devices. HTML Artisan is guaranteed to work in the following browsers, in which it has been thoroughly tested (compatibility is not, however, limited to this list):

- Google Chrome >= 85
- Mozilla Firefox >= 79
- Microsoft Edge >= 85
- Safari >= 14
- Opera >= 71

**Attention**: support for Internet Explorer and older versions of major browsers has been dropped starting at v2.0.0. If you need to use HtmlArtisan on Internet Explorer, or an older, non-ES6-compliant version of any other browser, you should use [version 1.3.0](https://github.com/gabrielrf96/html-artisan/releases/tag/v1.3.0). Be aware, however, that v1.3.0 is discontinued and will not receive future improvements and/or new functionalities.


<a name="how"></a>
## How to use?

<a name="examples-intro"></a>
### Installation
You have two options to install HTML Artisan:

1. Download the JS file directly from the [Releases](https://github.com/gabrielrf96/html-artisan/releases) section in the GitHub repo.

2. Install using `npm`:
```shell
npm i html-artisan
```

<a name="examples-intro"></a>
### Examples
In this repository, you will find a set of [examples](examples) that depict the basic use of the library, and its main functionalities and utilities. To get started you can check the basic example [here](examples/basic.html).

You can also dive directly into the source code [here](src/htmlartisan.js).

<a name="htmlartisan-object"></a>
### The HtmlArtisan object
Once included in your project, ***HTML Artisan*** will create a namespace/object containing all functionality. This is the `HtmlArtisan` object.

***HTML Artisan*** will also create a short, convenient alias for this object: `h`


<a name="namespace-conflicts"></a>
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

<a name="basic-use"></a>
### Basic usage
The ***HTML Artisan*** object itself is a function besides being its own namespace. Calling the `HtmlArtisan` object as a function will unleash its HTML-generating power.

Remember, calling `HtmlArtisan` is equivalent to calling its alias, `h`.

For example, this code:
```javascript
h('div', {
    'class': 'my-div',
    'style': {color: '#333', width: '90%', margin: '0 auto'}
}, [
    ['p', null, 'This a paragraph generated with HTML Artisan.'],
    ['p', null, 'HTML Artisan is so cool!'],
    ['p', null, [
        "Check out HTML Artisan creator's website at ",
        ['a', {href: 'https://www.gabrielrf.dev'}, 'www.gabrielrf.dev'],
    ]]
]);
```

Will generate this HTML structure:
```html
<div class="my-div" style="color: #333; width: 90%; margin: 0 auto;">
    <p>This a paragraph generated with HTML Artisan.</p>
    <p>HTML Artisan is so cool!</p>
    <p>
        Check out HTML Artisan creator's website at
        <a href="https://www.gabrielrf.dev">www.gabrielrf.dev</a>
    </p>
</div>
```

For an extended look into how `HtmlArtisan()` works (and its parameters) you can check the [API reference](API.md).

<a name="advanced-use"></a>
### Advanced functionalities and tips
***HTML Artisan*** comes with some convenient functionalities intended to boost your productivity.

---

<a name="attributes"></a>
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
- Since 'class' is a reserved keyword, it should be quoted.

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

    - **if**: a condition that will determine whether or not this element (and all its children) should be rendered. It can be an expression, a boolean value or a function. To see how it works, you can [check out this example](examples/conditional_elements.html).

    - **callback**: a callback function that will be executed once the object (and all its children) has finished being created. For more information on this topic, check the callbacks section of the documentation.

---

<a name="children"></a>
#### Creating children
As you have seen, `HtmlArtisan()` accepts a `children` parameter.

You can pass a **single string / function / DOM element**, or an **array of child elements**.

##### Passing a string / function / DOM element
If you pass a single string, a single child text node will be created:

Code:
```javascript
h('p', null, 'This is a paragraph');
// This is equivalent to passing the string as the only element of a children array:
h('p', null, ['This is an equally valid way of creating a paragraph'])
```

Output:
```html
<p>This is a paragraph</p>

<p>This an equally valid way of creating a paragraph</p>
```

Similarly, you can pass a single DOM element or a function as a single child element, without needing to enclose them
in a children array. For more information about passing functions as children, see the next section.

##### Passing an array of children
Children of an HTML-Artisan-defined element can be represented in a variety of ways:

- An **HTML element** that has been previously created:

    ```javascript
    var childOne = document.createElement('div');
    var childTwo = document.createElement('p');
    var result = h('div', null, [childOne, childTwo]);
    ```

- An **array representing another 'call' to HtmlArtisan()**:

  This is what we call an **HTML Artisan array expression**. It is the result of enclosing the parameters you would pass to HtmlArtisan() in an array. For example:

  If the call to create an element was like this:

    ```javascript
    h('div', {'class': 'my-div'}, 'This is text content!')
    ```

  Then, the equivalent HTML Artisan array expression, which could be passed as a child of another element, would be like this:

    ```javascript
    ['div', {'class': 'my-div'}, 'This is text content!']
    ```

  Here is an example of how to pass this "HTML Artisan array expressions" as children of other elements created via HtmlArtisan:

    ```javascript
    var element = h('div', null, [
        ['div', {'class': 'my-div'}] // if no children are passed, an empty element will be created
    ]);
    ```

- A **function** that returns an element or an array of elements:

    This is what we call a **generator function**.

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

    The element or elements returned by the generator function can be expressed in any of the ways accepted by HTML Artisan:
    - An HTML element.
    - A single string.
    - An array representing another 'call' to HtmlArtisan (an ***HTML Artisan array expression***). If you intend to return a single HTML Artisan array expression, it will need to be enclosed in additional Array brackects. Otherwise, HTML Artisan will have no way to know if it's an array expression, or an array of children.
    - Another generator function (nesting is possible).

    Of course, any combination of these formats is also accepted within the same generator function.

    See the ***child_functions*** example for more information.

- A **string**. Like we said earlier, passing a string will create a text child node:

    ```javascript
    h('p', null, ['This is a paragraph!']);
    ```

When creating an element via HtmlArtisan, you can pass children in any of the formats above, and you can also use any combination of them as needed.

Let's imagine, for instance, that you need to create an element with the following children:

- A simple text node.
- A list of paragraphs containing texts from an array.
- A final paragraph with a custom text.

You could then call HtmlArtisan like this:

```javascript
var elems = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'];
var element = h('div', null, [
    'A simple text node',
    function() {
        return elems.map(txt => h('p', null, txt));
    },
    ['p', null, 'A final paragraph with a custom text.']
]);
```

If you are able to use the spread operator in your development environment, that generator function can be completely replaced like this:

```javascript
var elems = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'];
var element = h('div', null, [
    'A simple text node',
    ...elems.map(txt => h('p', null, txt)),
    ['p', null, 'A final paragraph with a custom text.']
]);
```

You might still want tu use generator functions for more complex logics, though.

---

<a name="callbacks"></a>
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

Since v2.0.0, the created element is also passed as an argument to the callback function, so arrow functions are also suitable for callbacks:

```javascript
h('div', {'class': 'container'}, [
    ['p', {'class': 'first-level-child'}, [
        ['a', {'class': 'second-level-child'}, null, elem => {
            elem.specialMethod = function() {
                // ...
            }

            elem.getSomethingUseless = function() { return null; }

            // Some more post-processing
            // ...
        }]
    ]]
]);
```

As it was also shown before, the callback could also be passed within the
attribute map:

```javascript
h('div', {'class': 'container'}, [
    ['p', {'class': 'first-level-child'}, [
        ['a', {'class': 'second-level-child', callback: postProcessLink}, null]
    ]]
]);
```

---

<a name="building"></a>
## Building from source
Since v2.0.0, HtmlArtisan uses the **webpack** bundler. To build HtmlArtisan from source, you will need to have **Node.js** and **npm** already installed.

Once those requirements are met, the first step is cloning the repository:

```shell
git clone git@github.com:gabrielrf96/html-artisan.git
```

After that, `cd` into the repository, install the needed dependencies, and run the `build` command:

```shell
cd html-artisan
npm install
npm run build
```

Now, you will find the minified, production-ready JS file right in the `dist` directory, at the root of the repository. This is the exact same file that you can download from the [Releases](https://github.com/gabrielrf96/html-artisan/releases) section on the project's GitHub page.

---

<a name="outro"></a>
## HTML Artisan's present and future
I'm still working to improve **HTML Artisan** and bring new functionalities and utilities.

<a name="future"></a>
### Currently working on / future improvements
HTML Artisan has reached a point where I'm satisfied with its current functionalities and architecture, as it meets all my needs perfectly.

However, I'm regularly using this library in my own projects, and I'm always looking out for possible bugs and improvements, and thinking of new functionalities to implement.

Therefore, while there's nothing currently in the works regarding HTML Artisan, its development is well alive and will continue in the future. Besides, it's always open to suggestions and pull requests, so if you want to collaborate, don't be shy!

<a name="contact"></a>
### Bug reporting and contact
If you experience any kind of trouble while using this library, please feel free to contact me to report any bugs or problems.

You can contact me by:

- Opening an <a href="https://github.com/gabrielrf96/html-artisan/issues">**issue on GitHub**</a>
- Sending me an e-mail to <a href="mailto:contact@gabrielrf.dev">**contact@gabrielrf.dev**</a>
- DM me on Twitter: <a href="https://twitter.com/Gabri239">**Gabri239**</a>

<br/>
<br/>
<p align="center">
    Made by Gabriel Rodríguez
    <br/>
    <a href="https://www.gabrielrf.dev">www.gabrielrf.dev</a>
</p>


<br/>
<br/>
<p align="center">
  <img width="20%" src="graphic/html-artisan-logo-small.svg">
</p>
