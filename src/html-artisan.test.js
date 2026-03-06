import { jest, afterEach, test, expect } from '@jest/globals';
import { HtmlArtisan, h } from './html-artisan';

afterEach(() => {
    jest.clearAllMocks();
});

test('HtmlArtisan.build() and h() are equivalent', () => {
    let fromNamespace = HtmlArtisan.build('div', { 'class': 'test' }, 'Test');
    let fromAlias = h('div', { 'class': 'test' }, 'Test');

    expect(fromNamespace.outerHTML).toBe(fromAlias.outerHTML);
});

test('basic functionality', () => {
    const ID = 'artisan-id';
    const CLASS = 'artisan-example wrapper';
    const DATA = 'yes'

    let element = h('span', {
        id: ID,
        className: CLASS,
        'data-something-important': DATA,
    });

    expect(element.tagName.toLowerCase()).toBe('span');
    expect(element.id).toBe(ID);
    expect(element.className).toBe(CLASS);
    expect(element.dataset.somethingImportant).toBe(DATA);
});

test('setting class via `class`', () => {
    const CLASS = 'artisan-example wrapper';

    let element = h('span', { class: CLASS });

    expect(element.className).toBe(CLASS);
});

test('setting style as a string', () => {
    let element = h('p', {
        style: "color: #333; width: 90%; margin: 0 auto; background-color: #F2F2F2;",
    });

    expect(element.style.color).toBe('rgb(51, 51, 51)');
    expect(element.style.width).toBe('90%');
    expect(element.style.margin).toBe('0px auto');
    expect(element.style.backgroundColor).toBe('rgb(242, 242, 242)');
});

test('setting style as a map', () => {
    let element = h('p', {
        style: { color: '#333', width: '90%', margin: '0 auto', 'background-color': '#F2F2F2' },
    });

    expect(element.style.color).toBe('rgb(51, 51, 51)');
    expect(element.style.width).toBe('90%');
    expect(element.style.margin).toBe('0px auto');
    expect(element.style.backgroundColor).toBe('rgb(242, 242, 242)');
});

test('setting event handlers', () => {
    const ID = 'some-id';

    const log = jest.spyOn(console, 'log');

    let element = h('div', {
        id: ID,
        events: {
            click: ev => {
                console.log(`element with ID "${ev.currentTarget.id}" was clicked`);
            },
        },
    });

    element.click();

    expect(log).toHaveBeenCalledWith(`element with ID "${ID}" was clicked`);
});

test('passing callback in attributes', () => {
    const ID = 'some-id';

    const log = jest.spyOn(console, 'log');

    h('div', {
        id: ID,
        callback: element => {
            console.log(`calling callback for element with id "${element.id}"`);
        },
    });

    expect(log).toHaveBeenCalledWith(`calling callback for element with id "${ID}"`);
});

test('passing callback as argument has priority', () => {
    const ID = 'some-id';

    const log = jest.spyOn(console, 'log');

    h(
        'div',
        {
            id: ID,
            callback: () => {
                console.log(`this callback should never be called`);
            },
        },
        null,
        element => {
            console.log(`calling callback for element with id "${element.id}"`);
        }
    );

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(`calling callback for element with id "${ID}"`);
});

test('conditional rendering with simple expression', () => {
    // Single element
    let element = h('div', { if: false });

    expect(element).toBeNull();

    // Nested element
    element = h('div', null, [
        ['p', null, 'This paragraph should be rendered'],
        ['p', { if: false }, 'This paragraph should NOT be rendered'],
    ]);

    expect(element.childElementCount).toBe(1);
    expect(element.children[0].textContent).toBe('This paragraph should be rendered');
});

test('conditional rendering with function', () => {
    // Single element
    let element = h('div', { if: () => false });

    expect(element).toBeNull();

    // Nested element
    element = h('div', null, [
        ['p', null, 'This paragraph should be rendered'],
        ['p', { if: () => false }, 'This paragraph should NOT be rendered'],
    ]);

    expect(element.childElementCount).toBe(1);
    expect(element.children[0].textContent).toBe('This paragraph should be rendered');
});

test('deeply nested conditional rendering', () => {
    let element = h('div', null, [
        ['div', null, [
            ['p', null, 'This paragraph should be rendered'],
            ['p', { if: () => false }, 'This paragraph should NOT be rendered'],
        ]],
        ['div', null, [
            ['p', null, 'This other paragraph should be rendered'],
            ['p', { if: () => false }, 'This other paragraph should NOT be rendered'],
        ]],
    ]);

    expect(element.innerHTML).toBe(
        '<div><p>This paragraph should be rendered</p></div><div><p>This other paragraph should be rendered</p></div>'
    );
});

test('passing single child as string', () => {
    let element = h('div', null, 'This is the content');

    expect(element.childElementCount).toBe(0);
    expect(element.childNodes[0].textContent).toBe('This is the content');
});

test('passing single child as HTML element', () => {
    let child = document.createElement('p');
    child.textContent = 'This is the content';

    let element = h('div', null, child);

    expect(element.childElementCount).toBe(1);
    expect(element.children[0].outerHTML).toBe('<p>This is the content</p>');
});

test('passing single child as generator function', () => {
    let generator = () => {
        let result = [];

        for (let i = 0; i < 4; i++) {
            result.push(h('span', null, `${i}`));
        }

        return result;
    };

    let element = h('div', null, [generator]);

    expect(element.childElementCount).toBe(4);
    expect(element.children[0].outerHTML).toBe('<span>0</span>');
    expect(element.children[1].outerHTML).toBe('<span>1</span>');
    expect(element.children[2].outerHTML).toBe('<span>2</span>');
    expect(element.children[3].outerHTML).toBe('<span>3</span>');
});

test('passing multiple children in multiple formats', () => {
    let existingElement = document.createElement('p');
    existingElement.textContent = 'This is the second content';

    let element = h('div', null, [
        // A single string
        'This is the first content',

        // An HTML element
        existingElement,

        // A generator function
        () => {
            let result = [];

            for (let i = 0; i < 4; i++) {
                result.push(h('span', null, `${i}`));
            }

            return result;
        },

        // A HTML Artisan array expression
        ['a', { href: 'https://www.gabrielrf.dev' }, 'A link'],
    ]);

    expect(element.childNodes.length).toBe(7);
    expect(element.childElementCount).toBe(6);
    expect(element.childNodes[0].textContent).toBe('This is the first content');
    expect(element.children[0].outerHTML).toBe('<p>This is the second content</p>');
    expect(element.children[1].outerHTML).toBe('<span>0</span>');
    expect(element.children[2].outerHTML).toBe('<span>1</span>');
    expect(element.children[3].outerHTML).toBe('<span>2</span>');
    expect(element.children[4].outerHTML).toBe('<span>3</span>');
    expect(element.children[5].outerHTML).toBe('<a href="https://www.gabrielrf.dev">A link</a>');
});

test('passing multiple deeply nested children in multiple formats', () => {
    let existingElement = document.createElement('p');
    existingElement.textContent = 'This is the second content';

    let element = h('div', null, [
        ['div', { class: 'inner-wrapper-a' }, [
            // A single string
            'This is the first content',

            // An HTML element
            existingElement,

            // A HTML Artisan array expression
            ['div', { class: 'deep' }, [
                'This is very deep',
                ['p', null, 'Like... very, very deep!'],
            ]]
        ]],
        ['div', { class: 'inner-wrapper-b' }, [
            // A generator function
            () => {
                let result = [];

                for (let i = 0; i < 4; i++) {
                    result.push(h('span', null, `${i}`));
                }

                return result;
            },

            // A HTML Artisan array expression
            ['a', { href: 'https://www.gabrielrf.dev' }, 'A link'],
        ]],
    ]);

    expect(element.childElementCount).toBe(2);

    let innerWrapperA = element.children[0];
    expect(innerWrapperA.className).toBe('inner-wrapper-a');
    expect(innerWrapperA.childNodes.length).toBe(3);
    expect(innerWrapperA.childElementCount).toBe(2);
    expect(innerWrapperA.childNodes[0].textContent).toBe('This is the first content');
    expect(innerWrapperA.children[0].outerHTML).toBe('<p>This is the second content</p>');

    let deep = innerWrapperA.children[1];
    expect(deep.className).toBe('deep');
    expect(deep.childNodes.length).toBe(2);
    expect(deep.childElementCount).toBe(1);
    expect(deep.childNodes[0].textContent).toBe('This is very deep');
    expect(deep.children[0].outerHTML).toBe('<p>Like... very, very deep!</p>');

    let innerWrapperB = element.children[1];
    expect(innerWrapperB.className).toBe('inner-wrapper-b');
    expect(innerWrapperB.childElementCount).toBe(5);
    expect(innerWrapperB.children[0].outerHTML).toBe('<span>0</span>');
    expect(innerWrapperB.children[1].outerHTML).toBe('<span>1</span>');
    expect(innerWrapperB.children[2].outerHTML).toBe('<span>2</span>');
    expect(innerWrapperB.children[3].outerHTML).toBe('<span>3</span>');
    expect(innerWrapperB.children[4].outerHTML).toBe('<a href="https://www.gabrielrf.dev">A link</a>');
});
