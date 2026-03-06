<p align="center">
    <img width="80%" src="graphic/html-artisan-logo-large.svg">
</p>
<br/>
<br/>
<p align="center">
    <img width="420px" src="graphic/usage.gif">
</p>
<br/>


- [What is HTML Artisan?](#introduction)
    - [Why use HTML Artisan?](#why)
    - [Browser compatibility](#compatibility)
- [Installation](#installation)
    - [`npm` package](#installation-npm)
    - [Standalone](#installation-standalone)
- [Usage](#usage)
    - [Examples](#examples-intro)
    - [`HtmlArtisan` and `h()`](#htmlartisan-object)
    - [Basic usage](#basic-usage)
    - [Defining attributes](#attributes)
    - [Creating children](#children)
    - [Using callbacks](#callbacks)
- [Building from source](#building)
- [HTML Artisan's present and future](#outro)
- [Bug reporting](#bug-reporting)

<br/>


<a name="introduction"></a>

# HTML Artisan *v3.0.0*

***HTML Artisan*** is a lightweight JS library for the dynamic, simple and easy-to-read generation of complex HTML structures.

Have you ever had to dynamically create complex HTML trees on the client side, directly in your JS code? That usually ends up looking like a hot mess.

With ***HTML Artisan***, you will be able to create very **readable**, **understandable** and **easily maintainable** HTML-generating code.

So you can say good bye to code like this...

```javascript
let div = document.createElement('div');
div.className = 'my-div';
div.setAttribute('data-my-attr', 'my-data');
let child = document.createElement('div');
child.className = 'child';
child.addEventListener('click', function() {
    console.log('clicked');
});
let subChild = document.createElement('p');
subChild.innerHTML = 'This is my text';
let anotherFirstLevelChild = document.createElement('div');
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
        events: { click: () => { console.log('clicked'); } },
}, [
    ['div', {'class': 'child'}, [
        ['p', null, 'This is my text'],
    ]],
    ['div', {'class': 'sublevel'}],
]);
```

***HTML Artisan*** code is versatile and easy to read and maintain, as it resembles a well organized tree structure.

<a name="why"></a>

## Why use HTML Artisan?

- **Very light**: the library is about *~1.2 KiB* in its minified, <a href="https://github.com/gabrielrf96/html-artisan/releases">standalone version</a>.
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

Note that minimum required browser versions will be higher if you use HTML Artisan as a JS module directly, without a bundler or similar tool.

**Older browsers**: Internet Explorer and older versions of major browsers are no longer supported. If you want to use HtmlArtisan in any of them, you can use [version 1.3.0](https://github.com/gabrielrf96/html-artisan/releases/tag/v1.3.0). Be aware, however, that v1 is discontinued and will never receive any further updates.


<a name="installation"></a>

# Installation

You have two options to get HTML Artisan: as an `npm` package, or as a standalone, minified JS file.

<a name="installation-npm"></a>

## `npm` package

This is the recommended way. Install using `npm`:

```shell
npm i html-artisan
```

And import like this:

```javascript
import { HtmlArtisan, h } from 'html-artisan';
```

As you will see a bit later, `HtmlArtisan` is the main object, and `h()` is a convenient alias for `HtmlArtisan.build()`.

<a name="installation-standalone"></a>

## Standalone

Download the minified JS file directly from the [Releases](https://github.com/gabrielrf96/html-artisan/releases) section in the GitHub repo, and include it in your HTML as you would any other JS file.

The standalone version will declare `HtmlArtisan` and `h` globally (in `window`). It also provides an extra method `HtmlArtisan.fixConflict()` that is not present in the `npm` package version, intended to fix naming conflicts, in the case that you use some other library that also declares `HtmlArtisan` and/or `h` globally.


<a name="usage"></a>

# Usage

<a name="examples-intro"></a>

## Examples

In this repository, you will find a set of [examples](examples) that depict the basic usage of the library, and its main functionalities and utilities. To get started you can check the basic example [here](examples/basic.html).

<a name="htmlartisan-object"></a>

## `HtmlArtisan` and `h()`

`HtmlArtisan` is the main object of this library, containing:
- The `build()` method, which provides the main HTML-building functionality.
- 2 properties, `author` and `version`, which just contain that plain information.

`h()` is an alias pointing to `HtmlArtisan.build()`. Both of them do exactly the same in exactly the same way, so you can use whichever you prefer. That said, however, the recommended and most convenient way of using the library is via the alias function `h()`.

If you installed HTML Artisan as an `npm` package, you will have to import the object or alias:

```javascript
import { h } from 'html-artisan';

// or
import { HtmlArtisan } from 'html-artisan';
```

If you are using the standalone version, both `HtmlArtisan` and the alias function `h()` will already be defined automatically in the global `window` context as soon as you include the JS file in your HTML.

<a name="namespace-conflicts"></a>

### Namespace conflicts

If you're using the `npm` package, naming conflicts are not really an issue, as you can import using aliases if two things have the same name.

However, in the standalone version, it is possible that you're already using some other library that declares either `HtmlArtisan` or, even more likely, `h`. In that case, and as long as HTML Artisan is loaded last, you can use `HtmlArtisan.fixConflict()` to restore the previous values of `HtmlArtisan` and `h`, and assign `HtmlArtisan` to a new home.

```html
<!-- This library loads first, and it sets `HtmlArtisan` and `h` -->
<script type="text/javascript" src="/some-other-library-using-the-same-awesome-names.js"></script>

<!-- Now we load HTML Artisan, and it breaks the other library, because it overwrites both! -->
<script type="text/javascript" src="/html-artisan.js"></script>
```

```javascript
// But we can fix it!

const Artisan = HtmlArtisan.fixConflict();

// Now, HTML Artisan can be referenced as `Artisan` instead.

// In addition, `fixConflict()` has restored `HtmlArtisan` and `h` to the values
// that the previous library, `some-other-library-using-the-same-awesome-names.js`, had set!
```

If you want to fix naming conflicts but still have a convenient alias, you can pass a new alias name
to the `fixConflict()` method, which will declare a new alias in the global `window` context:

```javascript
const Artisan = HtmlArtisan.fixConflict('ht');

// Now, HTML Artisan can be referenced as `Artisan`, and a new alias `ht` exists, pointing at `HtmlArtisan.build()`.

// Same as before, the original `HtmlArtisan` and `h` set by the other library are also restored.

```

<a name="basic-usage"></a>

## Basic usage

The most important thing to learn about HTML Artisan is, of course, how to build HTML, which is its whole purpose.

In order to do that, you can call either the `HtmlArtisan.build()` method or the `h()` alias function. As mentioned before, both of them do exactly the same, and have the same arguments. The alias function is the preferred way, though, so we will use only that from this point forward in the examples.

`h()` receives 4 arguments:
- `tag`: the HTML tag for the created element.
- `attributes`: an optional map of HTML attributes for the created element.
- `children`: an optional list of child elements that we want appended to the element.
- `callback`: we'll learn more about this a bit later, but it's also optional.

For example, this code:
```javascript
h(
    'div', 
    {
        class: 'my-div',
        style: { color: '#333', width: '90%', margin: '0 auto' },
    }, 
    [
        ['p', null, 'This a paragraph generated with HTML Artisan.'],
        ['p', null, 'HTML Artisan is so cool!'],
        ['p', null, [
            "Check out HTML Artisan creator's website at ",
            ['a', { href: 'https://www.gabrielrf.dev' }, 'www.gabrielrf.dev'],
        ]],
    ],
);
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

Note that the `children` can be nested in any way we need, which will produce an entire HTML tree from a single call to `h()`. Don't worry about the format for now, we will dive deep into it in the next sections.

<a name="attributes"></a>

## Defining attributes

If provided, the `attributes` parameter will define a series of HTML attributes for our element.
This parameter acts like a map, where all the **keys** are the attribute **names**.
So, for example, we can easily set an **`id`**, **`class`** and some custom **`data`** attributes for our element like this:

Code:
```javascript
h('div', {
    id: 'super-container',
    class: 'my-div my-thing',
    'data-has-things': 'yas',
    'data-foo': 'bar',
});
```

Output:
```html
<div id="super-container" class="my-div my-thing" data-has-things="yas" data-foo="bar"></div>
```

If, for whatever reason, you need to set a property manually, you can do so using callbacks. See the callbacks section for more information on this topic.

Some things to take into account while defining attributes:

- CSS classes can be passed as either `class` or `className`, but for the moment only as a raw `string` of space-separated class names.

- You can pass the `style` attribute as either a raw `string` or a map of `cssProperty: cssValue`:

    ```javascript
    h('div', {
        style: 'margin: 20px; padding: 10px; border: 1px solid red; font-size: 16px;',
    });

    // This is equivalent:
    h('div', {
        style: {
            margin: '20px',
            padding: '10px',
            border: '1px solid red',
            'font-size': '16px',
        },
    });
    ```

- There are some special HTML Artisan attributes you can pass:

    - **events**: a map of event types and handlers:

        ```javascript
        h('div', {
            events: {
                click: function(e) {
                    console.log('I have been clicked!');
                },
                // ...
            },
        });
        ```

    - **if**: a condition that will determine whether or not this element (and all its children) should be rendered. It can be an expression, a boolean value or a function. To see how it works, you can [check out this example](examples/conditional_elements.html).

    - **callback**: a callback function that will be executed once the object is ready, and all its children (if any) have been appended to it. For more information on this topic, check the callbacks section of the documentation.

<a name="children"></a>

## Creating children

As you have seen, `HtmlArtisan()` accepts a `children` parameter: a list of children that will be appended to the created element. Children can be defined in a variety of different formats in HTML Artisan.

If no children are passed (argument is omitted, or set to `null` or an empty `array`), then the created element will be empty (will have no child nodes).

### Child formats

Child formats are the different ways in which a child can be passed to `h()`. When you pass an array of children to `h()`, you can combine as many different formats as you need in the same call.

There are currently four accepted formats:

- **`string`**: will result in a single text node being appended to the element.

    <details>
    <summary><b>Example</b></summary>

    Code:
    ```javascript
    h('p', null, ['This is a paragraph'])
    ```

    Output:
    ```html
    <p>This is a paragraph</p>
    ```
    </details>

---

- **Generator `function`**: you can pass a function that returns a single child or array of children, and whatever the generator function returns will be appended as children of the created element. The children returned by a generator function can be in any combination of the accepted child formats.

    <details>
    <summary><b>Example</b></summary>

    ```javascript
    let elems = ['1', '2', '3', '4', '5'];
    let element = h('ul', null, [
        () => {
            let result = [];
            for (let i = 0; i < elems.length; i++) {
                result.push( h('li', null, elems[i]) );
            }
            return result;
        }
    ]);
    ```

    The element or elements returned by the generator function can be expressed in any of the accepted child formats:
    - An HTML element.
    - A single string.
    - An array representing another call to `h()` (an ***HTML Artisan array expression***). If you intend to return a single HTML Artisan array expression, it will need to be enclosed in additional array brackects. Otherwise, HTML Artisan will have no way to know if it's an array expression, or an array of children.
    - Another generator function (nesting is possible).

    Of course, any combination of these formats is also accepted within the same generator function.

    See the ***child_functions*** example file for more information.
    </details>

---

- **`HTMLElement`**: an existing HTML element node, which will just be appended normally without any processing.

    <details>
    <summary><b>Example</b></summary>

    ```javascript
    let childOne = document.createElement('div');
    let childTwo = document.createElement('p');
    let result = h('div', null, [childOne, childTwo]);
    ```
    </details>

---

- **HTML Artisan array expression**: an array representing a new call to `h()`, containing the same four arguments that `h()` expects.

    <details>
    <summary><b>Example</b></summary>

    If the call to create an element is like this:

    ```javascript
    h('div', {class: 'my-div'}, 'This is text content!')
    ```

    Then, the equivalent HTML Artisan array expression, which could be passed as a child of another element, would be like this:

    ```javascript
    ['div', {class: 'my-div'}, 'This is text content!']
    ```

    Here is an example of how to pass these "HTML Artisan array expressions" as children of other elements created via HtmlArtisan:
    ```javascript
    let element = h('div', null, [
        ['div', {class: 'my-div'}, 'This is text content!'],
        ['div', {class: 'other-div'}, 'This is other text content!'],
    ]);
    ```

    Output:
    ```html
    <div>
        <div class="my-div">This is text content!</div>
        <div class="other-div">This is other text content!</div>
    </div>
    ```
    </details>


### Passing a single child

If you only want to append a single child, you can pass it as a single value without enclosing it in an array. This is possible with all child formats except for *HTML Artisan array expressions*, which must **always** be enclosed in an array, even if it's a single one. That's because, otherwise, it would be very difficult for HTML Artisan to know whether an array in the `children` argument should be treated as a single child, or as an array of children.

Therefore, a single `string`, generator `function`, or `HTMLElement` may be passed to `h()`:

```javascript
// All of these are valid:
let withSingleString = h('p', null, 'This is a paragraph');

let withSingleGeneratorFunction = h('ul', null, () => {
    let result = [];
    for (let i = 0; i < 10; i++) {
        result.push( h('li', null, `${i}`) );
    }
    return result;
});

let htmlElement = document.createElement('div');
let withSingleHtmlElement = h('div', null, htmlElement);

// But if you want a single HTML Artisan array expression, 
// this is the only valid way to do it (note the enclosing array):
let withSingleHtmlArtisanArrayExpression = h('div', null, [
    ['div', {class: 'my-div'}, 'This is text content!'],
]);
```

### Combining child formats

You can pass children in any of the accepted child formats previously described, and you can also use any combination of them as needed.

Let's imagine, for instance, that you need to create an element with the following children:

- A simple text node.
- A list of paragraphs containing texts from an array.
- A final paragraph with a custom text.

You could do that like this:

```javascript
let texts = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'];
let element = h('div', null, [
    'A simple text node',
    () => texts.map(txt => h('p', null, txt)),
    ['p', null, 'A final paragraph with a custom text.'],
]);
```

If you are able to use the spread operator in your development environment, that generator function can be completely replaced like this:

```javascript
let texts = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'];
let element = h('div', null, [
    'A simple text node',
    ...texts.map(txt => h('p', null, txt)),
    ['p', null, 'A final paragraph with a custom text.'],
]);
```

You might still want to use generator functions for more complex logic, though.

<a name="callbacks"></a>

## Using callbacks

Sometimes, you need to do some special post-processing on the elements you have created.

Using the DOM API directly, this is very simple, since every object is created in a top-level environment, and are accessible if you need them:

```javascript
let elem1 = document.createElement('div');
let child = document.createElement('p');

elem1.appendChild(child);

// 'child' is accessible, we can do some extra operations on it:
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
- All attributes, standard and special, have been processed and/or attached to it.
- All defined children hierarchy has been created and already appended to the element.

So, if you define a callback function for an element, you can access that element and do some post-processing on it **when it has already been created and has all its beautiful children already appended to it**.

A callback function can be defined in two ways:

- By passing a **callback** attribute to the `attributes` parameter:

    ```javascript
    h('div', {
        callback: function() {
            //...
        },
    });
    ```

- By passing a function directly into the `callback` parameter:

    ```javascript
    h('div', null, null, function() {
        //...
    });
    ```

If both ways are used at the same time, the second one will have priority (and it will be the only one to be executed).

In the scope of an HTML Artisan callback function, `this` is the created element whose callback function we're defining. Here's a quick example of this:

```javascript
h('div', { class: 'container' }, [
    ['p', { class: 'first-level-child' }, [
        ['a', { class: 'second-level-child' }, null, function() {
            // 'this' is the 'second-level-child' element
            this.specialMethod = function() {
                // ...
            };

            this.getSomethingUseless = function() { return null; };

            // Some more post-processing
            // ...
        }],
    ]],
]);
```

Of course, that callback function can be extracted to un-clutter the tree-generating code:

```javascript
function postProcessLink() {
    // 'this' is the 'second-level-child' element
    this.specialMethod = function() {
        // ...
    };

    this.getSomethingUseless = function() { return null; };

    // Some more post-processing
    // ...
}

h('div', { class: 'container' }, [
    ['p', { class: 'first-level-child' }, [
        ['a', { class: 'second-level-child' }, null, postProcessLink],
    ]],
]);
```

Since v2.0.0, the created element is also passed as an argument to the callback function, so arrow functions are also suitable for callbacks:

```javascript
h('div', { class: 'container' }, [
    ['p', { class: 'first-level-child' }, [
        ['a', { class: 'second-level-child' }, null, elem => {
            elem.specialMethod = function() {
                // ...
            };

            elem.getSomethingUseless = function() { return null; };

            // Some more post-processing
            // ...
        }],
    ]],
]);
```

As it was also shown before, the callback could also be passed within the
attribute map:

```javascript
h('div', { class: 'container' }, [
    ['p', { class: 'first-level-child' }, [
        ['a', { class: 'second-level-child', callback: postProcessLink }, null],
    ]],
]);
```


<a name="building"></a>

# Building from source

Since v2.0.0, HtmlArtisan uses the **webpack** bundler. To build HTML Artisan from source as a standalone, minified JS file, you will need to have **`node`** and **`npm`** already installed.

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


<a name="outro"></a>

# HTML Artisan's present and future

HTML Artisan has reached a point where I'm satisfied with its current functionalities and architecture, as it meets all my needs perfectly.

However, I'm regularly using this library in my own projects, and I'm always looking out for possible bugs and improvements, and thinking of new functionalities to implement.

Therefore, while there's nothing currently in the works regarding HTML Artisan, its development is still alive and will continue in the future. Besides, it's always open to suggestions and pull requests, so if you want to collaborate, don't be shy!


<a name="bug-reporting"></a>

# Bug reporting

If you experience any kind of trouble while using this library, please feel free to contact me to report any bugs or problems.

The preferred way to report bugs is by opening an <a href="https://github.com/gabrielrf96/html-artisan/issues">**issue on GitHub**</a>.

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
